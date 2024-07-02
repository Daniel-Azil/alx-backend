#!/usr/bin/env python3
"""Server class to paginate a database of popular baby names"""

import csv
import math
from typing import List, Tuple, Dict, Any


class Server:
    """Server class to paginate a database of popular baby names.
    """
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        self.__dataset = None

    def dataset(self) -> List[List]:
        """Cached dataset
        """
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]

        return self.__dataset

    def get_page(self, page: int = 1, page_size: int = 10) -> List[List]:
        '''paginate & return the appropriate page of the dataset'''
        assert type(page) == int and page > 0
        assert type(page_size) == int and page_size > 0
        start_index, end_index = index_range(page, page_size)
        if start_index >= len(self.dataset()):
            return []
        return self.dataset()[start_index:end_index]

    def get_hyper(self, page: int = 1, page_size: int = 10) -> Dict[str, Any]:
        '''paginate & returns a dictionary of key-value pairs:'''
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
    '''return a tuple of size two:pagination parameters'''
    start_index = (page - 1) * page_size
    end_index = start_index + page_size
    return (start_index, end_index)
