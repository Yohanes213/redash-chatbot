import logging
import psycopg2
from psycopg2 import sql
import csv

# Configure logging as requested
logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

formatter = logging.Formatter('%(asctime)s %(name)s %(levelname)s %(message)s')

file_handler = logging.FileHandler('./logs/postgres_utils.log')
file_handler.setLevel(logging.INFO)
file_handler.setFormatter(formatter)

logger.addHandler(file_handler)


def connect_to_database(host: str, database: str, user: str, password: str, port:str) -> psycopg2.connect:
    """
    Connects to a PostgreSQL database and returns the connection object.

    Args:
        host (str): The hostname of the database server.
        database (str): The name of the database.
        user (str): The username for authentication.
        password (str): The password for authentication.
        port (str): The port of the database

    Returns:
        psycopg2.connect: A connection object to interact with the database.
    """

    try:
        connection = psycopg2.connect(host=host, database=database, user=user, password=password, port=port)
        logger.info("Connected to database successfully")
        return connection
    except psycopg2.Error as e:
        logger.error(f"Failed to connect to database: {e}")
        raise

def write_csv_to_database(connection: psycopg2.connect, csv_file: str, table_name: str) -> None:
    """
    Writes data from a CSV file to the specified database table.

    Args:
        connection (psycopg2.connect): A connection object to interact with the database.
        csv_file (str): The path to the CSV file.
        table_name (str): The name of the table to insert data into.

    Returns:
        None
    """

    try:
        cursor = connection.cursor()
        with open(csv_file, 'r') as file:
            reader = csv.reader(file)
            next(reader)  # Skip header row if exists
            for row in reader:
                cursor.execute(f"INSERT INTO {table_name} VALUES ({', '.join(['%s'] * len(row))})",row)
        connection.commit()
        logger.info("Data from CSV file inserted into the database successfully.")
    except Exception as e:
        logger.error(f"Error writing data to database: {e}")
        raise

def execute_schema_script(connection: psycopg2.connect, schema_script_path: str) -> None:
    """
    Executes a SQL schema script to create tables in the database.

    Args:
        connection (psycopg2.connect): A connection object to interact with the database.
        schema_script_path (str): The path to the SQL schema script.

    Returns:
        None
    """

    try:
        cursor = connection.cursor()
        # Read the schema script file
        with open(schema_script_path, 'r') as schema_file:
            script = schema_file.read()
            cursor.execute(script)
        connection.commit()
        logger.info("Schema script executed successfully.")
    except psycopg2.Error as e:
        logger.error(f"Error executing schema script: {e}")
        raise