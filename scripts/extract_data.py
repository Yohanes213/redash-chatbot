import pandas as pd

class DataFrameManipulator:
    
    def rename_columns(df, new_column_names):
        """
        Rename columns in the Pandas DataFrame.

        Parameters:
        - new_column_names: Dictionary of old-to-new column names

        Returns:
        - Modified DataFrame
        """
        return df.rename(columns=new_column_names)

    def drop_rows(df, rows_to_drop, by_index=True):
        """
        Drop rows from the Pandas DataFrame.

        Parameters:
        - rows_to_drop: List of index labels or row numbers to drop
        - by_index: If True, drop rows by index labels; if False, drop rows by row numbers

        Returns:
        - Modified DataFrame
        """
        if by_index:
            return df.drop(rows_to_drop)
        else:
            return df.drop(df.index[rows_to_drop])

    def drop_columns(df, columns_to_drop):
        """
        Drop columns from the Pandas DataFrame.

        Parameters:
        - columns_to_drop: List of column names to drop

        Returns:
        - Modified DataFrame
        """
        return df.drop(columns=columns_to_drop)