#!/usr/bin/env python3
"""
    A module that defines a class FIFOCache that inherits from BaseCaching
"""

BaseCaching = __import__("base_caching").BaseCaching


class FIFOCache(BaseCaching):
    """
        A class FIFOCache that inherits from BaseCaching
    """
    def __init__(self):
        """
            Construct the object FIFOCache
        """
        super().__init__()

    def put(self, key, item):
        """
            A method that inserts cached items
        """
        if key and item:
            self.cache_data[key] = item
        if len(self.cache_data) > BaseCaching.MAX_ITEMS:
            first = next(iter(self.cache_data))
            print("DISCARD: {}".format(first))
            del self.cache_data[first]

    def get(self, key):
        """
            A method that returns value of given key
        """
        if key:
            return self.cache_data.get(key, None)
        return None
