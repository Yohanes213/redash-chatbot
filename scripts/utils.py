import logging
import pandas as pd


def date_changer(df):
    """
    Converts parsable dates in a DataFrame's 'Date' column to datetime format and drops rows with non-parsable dates.

    Args:
        df (pandas.DataFrame): The DataFrame containing a 'Date' column.

    Returns:
        pandas.Series: The 'Date' column converted to datetime format (if successful).
    """

    logger = logging.getLogger(__name__)
    logger.setLevel(logging.INFO)

    try:
        # Attempt to convert parsable dates to datetime format
        df['Date'] = pd.to_datetime(df['Date'], errors='coerce')

        # Drop rows with non-parsable dates (converted to NaNs)
        df = df.dropna(subset=['Date'])

        logger.info("Successfully converted dates and dropped rows with non-parsable dates.")
        return df['Date']
    except pd.errors.ParserError as err:
        logger.error(f"Error parsing date column: {err}")
        raise
