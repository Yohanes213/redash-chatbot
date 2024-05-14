from flask import request, jsonify
from scripts.postgres_utils import connect_to_database
from redash.handlers.base import (
    BaseResource
)
import os
from langchain_core.messages import HumanMessage, SystemMessage
from langchain_openai import ChatOpenAI

VARIABLE_KEY = os.environ.get("OPENAI_API_KEY")
chat = ChatOpenAI(model="gpt-3.5-turbo-1106",api_key=VARIABLE_KEY, temperature=0.2)


dbname = os.getenv("DATABASE")
username = os.getenv("USER_NAME")
password = os.getenv("PASSWORD")
host = os.getenv("HOST")
port = os.getenv("PORT")
conn =  connect_to_database(host, dbname, username, password, port)


class ChatResource(BaseResource):
    def post(self):
        try:

            cur = conn.cursor()
            cur.execute(f"SELECT table_name FROM information_schema.tables WHERE table_schema = '{'my_schema'}'")
            table_names = [row[0] for row in cur.fetchall()]

            schema_info={}
            for table_name in table_names:
                # Get column names for each table
                cur.execute(f"SELECT column_name FROM information_schema.columns WHERE table_schema = 'my_schema' AND table_name = '{table_name}'")
                column_info = {row[0]: row[1] for row in cur.fetchall()}
                
                schema_info[table_name] = column_info
            cur.close()
            conn.close()

            value = request.get_json()
            question = value.get('question')
            messages = [
                    SystemMessage(content= f'You are a helpful assistant.You will return a sql query to find the question.
                     The database has the following schemas: {schema_info}'),
                    HumanMessage(content=question),
                ]

            content = chat.invoke(messages).content

            try:
                start_index = content.index("SELECT")
                end_index = content.index(";") + 1
            except ValueError:
                sql_query = content
            else:
                sql_query = content[start_index:end_index]
            return jsonify(sql_query), 200
        
        except Exception as error:
            print(error)
            return jsonify({"error": "An error occurred"}), 500