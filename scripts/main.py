import os
from pathlib import Path
from dotenv import load_dotenv
import pandas as pd
from postgres_utils import connect_to_database, execute_schema_script, write_csv_to_database
from utils import date_changer

def load_environment_variables():
    """
    Load environment variables from the .env file.
    """
    env_path = Path('.env')
    load_dotenv(dotenv_path=env_path)

def connect_to_db():
    """
    Establish a connection to the PostgreSQL database.
    """
    dbname = os.getenv("DATABASE")
    username = os.getenv("USER_NAME")
    password = os.getenv("PASSWORD")
    host = os.getenv("HOST")
    port = os.getenv("PORT")
    return connect_to_database(host, dbname, username, password, port)

def process_data_and_upload(conn):
    """
    Process data files and upload them to the database.
    """
    base_folder = 'data'

    for folder in os.listdir(base_folder):
        folder_path = os.path.join(base_folder, folder)

        if 'Chart data.csv' in os.listdir(folder_path):
            csv_file_path = os.path.join(folder_path, 'Chart data.csv')
            df = pd.read_csv(csv_file_path)

            # Manipulate the first column here
            df['Date'] = date_changer(df)

            # Save the modified DataFrame back to a CSV file
            modified_csv_file_path = os.path.join(folder_path, 'modified_chart_data.csv')
            df.to_csv(modified_csv_file_path, index=False)

            # Write the modified CSV file to the database
            table_name = folder.replace(" ", "_")
            write_csv_to_database(conn, modified_csv_file_path, f'my_schema.{table_name}')

        elif len(os.listdir(folder_path)) == 1:
            csv_file_path = os.path.join(folder_path, 'Table data.csv')
            table_name = folder.replace(" ", "_")

            # Write the CSV file to the database without modification
            write_csv_to_database(conn, csv_file_path, f'my_schema.{table_name}')

if __name__ == "__main__":
    load_environment_variables()
    db_connection = connect_to_db()
    execute_schema_script(db_connection, 'scripts/schema.sql')
    process_data_and_upload(db_connection)
