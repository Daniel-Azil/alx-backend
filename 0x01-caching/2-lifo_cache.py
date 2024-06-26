#!/usr/bin/env python3
"""
    A module that defines a class LIFOCache that inherits from BaseCaching
"""

BaseCaching = __import__("base_caching").BaseCaching


class LIFOCache(BaseCaching):
    """
        A class LIFOCache that inherits from BaseCaching
    """
    def __init__(self):
        """
            Construct the object LIFOCache
        """
        super().__init__()

    def put(self, key, item):
        """
            A method that inserts cached items
        """
        if key and item:
            if len(self.cache_data) < BaseCaching.MAX_ITEMS:
                self.cache_data[key] = item
            else:
                self.cache_data[key] = item
                keys = list(self.cache_data.keys())
                print("DISCARD: {}".format(keys[0]))
                del self.cache_data[keys[0]]

    def get(self, key):
        """
            A method that returns value of given key
        """
        if key:
            return self.cache_data.get(key, None)
        return None
