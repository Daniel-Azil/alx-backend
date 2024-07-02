#!/usr/bin/env python3
"""
    A module that paginate a database of popular baby names
"""

import csv
import math
from typing import List, Tuple, Dict, Any


class Server:
    """
        A class that paginate a database of popular baby names
    """
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        self.__myDataSet = None

    def dataset(self) -> List[List]:
        """Cached dataset
        """
        if self.__myDataSet is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__myDataSet = dataset[1:]

        return self.__myDataSet

    def get_page(self, page: int = 1, page_size: int = 10) -> List[List]:
        """
            A method that takes two integer arguments page with default value 1
            and page_size with default value 10
        """
        assert type(page) == int and page > 0
        assert type(page_size) == int and page_size > 0
        start, end = index_range(page, page_size)
        if start >= len(self.dataset()):
            return []
        return self.dataset()[start:end]

    def get_hyper(self, page: int = 1, page_size: int = 10) -> Dict[str, Any]:
        """
            A method that takes two integer arguments page with default value 1
        """
        assert type(page) == int and page > 0
        assert type(page_size) == int and page_size > 0
        total_pages = int(len(self.dataset()) / page_size)
        data = self.get_page(page, page_size),
        next_page = [None, page + 1][(page + 1) < total_pages]
        prev_page = [None, page - 1][page > 1]
        page_size = len(self.get_page(page, page_size))
        return {
            "page_size": page_size,
            "page": page,
            "data": data,
            "next_page": next_page,
            "prev_page": prev_page,
            "total_pages": total_pages
        }


def index_range(page: int, page_size: int) -> Tuple[int, int]:
    """
        A method that takes two integer arguments page and page_size
    """
    start = (page - 1) * page_size
    end = start + page_size
    return (start, end)
