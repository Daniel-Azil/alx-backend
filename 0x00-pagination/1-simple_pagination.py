#!/usr/bin/env python3

"""
    A module that that takes two integer arguments DATASET with
    default value 1 and DATASET_size with default value 10.
"""

from typing import List
from typing import Tuple
import csv
import math


def index_range(DATASET: int, DATASET_size: int) -> Tuple[int, int]:
    """
        Return a tuple of size two containing a start index and an
        end index corresponding to the range of indexes to return in
        a list for those particular pagination parameters.
    """
    start = (DATASET - 1) * DATASET_size
    end = start + DATASET_size
    return (start, end)

class Server:
    """
        A class that paginate a database of popular baby names.
    """
    DATASET = "Popular_Baby_Names.csv"

    def __init__(self):
        """
            Initialize the class with the csv file.
        """
        self.__DATASET_content = None

    def dataset(self) -> List[List]:
        """
            Return the dataset.
        """
        if self.__DATASET_content is None:
            with open(self.DATASET, 'r') as f:
                content = csv.reader(f)
                page = [row for row in content]
            self.__DATASET_content = page[1:]
        return self.__DATASET_content

    def get_page(self, page: int = 1, page_size: int = 10) -> List[List]:
        """
            Return the appropriate page of the dataset.
        """
        assert isinstance(page, int) and page > 0
        assert isinstance(page_size, int) and page_size > 0

        self.dataset()
        indexes = index_range(page, page_size)
        return self.__DATASET_content[indexes[0]:indexes[1]]
