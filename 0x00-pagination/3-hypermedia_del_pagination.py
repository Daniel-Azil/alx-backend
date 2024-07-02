#!/usr/bin/env python3
"""
    A module that removes certain row from the dataset when having
    two queries.
"""

import csv
import math
from typing import List, Dict


class Server:
    """
        A class that paginate a database of popular baby names.
    """
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        self.__mydataset = None
        self.__dataset_id = None

    def dataset(self) -> List[List]:
        """
            A method that caches data
        """
        if self.__mydataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__mydataset = dataset[1:]

        return self.__mydataset

    def indexed_dataset(self) -> Dict[int, List]:
        """
            A method that sorted index data
        """
        if self.__dataset_id is None:
            dataset = self.dataset()
            truncated_dataset = dataset[:1000]
            self.__dataset_id = {
                i: dataset[i] for i in range(len(dataset))
            }
        return self.__dataset_id

    def get_hyper_index(self, index: int = None, page_size: int = 10) -> Dict:
        """
            A mothod that deletes returns a dictionary.
        """
        assert type(index) == int and type(page_size) == int
        assert 0 <= index < len(self.indexed_dataset())
        data = []
        next_index = index + page_size
        for i in range(index, next_index):
            if self.indexed_dataset().get(i):
                data.append(self.indexed_dataset()[i])
            else:
                i += 1
                next_index += 1
        return {
            "data": data,
            "index": index,
            "next_index": next_index,
            "page_size": page_size
        }
