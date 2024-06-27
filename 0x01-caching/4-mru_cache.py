#!/usr/bin/env python3

"""
    A module that defines a class MRUCache that inherits from BaseCaching
"""

BaseCaching = __import__("base_caching").BaseCaching
from collections import OrderedDict


class MRUCache(BaseCaching):
    """
        A class MRUCache that inherits from BaseCaching
    """
    def __init__(self):
        """
            Construct the object MRUCache
        """
        super().__init__()
        self.cache_data = OrderedDict()

    def put(self, key, item):
        """
            A method that inserts cached items
        """
        if key and item:
            if len(self.cache_data) < BaseCaching.MAX_ITEMS:
                self.cache_data[key] = item
            else:
                if key not in self.cache_data:
                    keys = list(self.cache_data.keys())
                    print("DISCARD: {}".format(keys[-1]))
                    del self.cache_data[keys[-1]]
                self.cache_data[key] = item
                self.cache_data.move_to_end(key)

    def get(self, key):
        """
            A method that returns value of given key
        """
        if not key or not self.cache_data.get(key):
            return None
        self.cache_data.move_to_end(key)
        return self.cache_data.get(key)
