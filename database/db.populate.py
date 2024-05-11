import os
import psycopg2
import pandas as pd
from sqlalchemy import create_engine

# PostgreSQL connection parameters
dbname = "redash_chatbot_group9"
user = "postgres"
password = "postgres"
host = "localhost"  # or your PostgreSQL host address
port = "5432"  # default PostgreSQL port

# Directory containing CSV files
data_folder = "/home/mahbubah/Desktop/week-3/redash-chatbot/data"

# Connect to PostgreSQL
conn = psycopg2.connect(dbname=dbname, user=user, password=password, host=host, port=port)
cur = conn.cursor()

# Create SQLAlchemy engine
engine = create_engine(f'postgresql://{user}:{password}@{host}:{port}/{dbname}')

# Iterate over files in the data folder
for file_name in os.listdir(data_folder):
    if file_name.endswith('.csv'):
        file_path = os.path.join(data_folder, file_name)
        table_name = os.path.splitext(file_name)[0]  # Use file name as table name (without extension)

        # Read CSV file into Pandas DataFrame
        df = pd.read_csv(file_path)

        # Write DataFrame to PostgreSQL table
        df.to_sql(table_name, engine, if_exists='replace', index=False)

        print(f"Data from '{file_name}' has been successfully loaded into the '{table_name}' table.")

# Commit and close connections
conn.commit()
conn.close()

print("All data has been successfully loaded into PostgreSQL tables.")
