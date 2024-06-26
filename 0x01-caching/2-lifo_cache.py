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
            self.cache_data[key] = item
        if len(self.cache_data) > BaseCaching.MAX_ITEMS:
            last = next(reversed(self.cache_data))
            print("DISCARD: {}".format(last))
            del self.cache_data[last]

    def get(self, key):
        """
            A method that returns value of given key
        """
        if key:
            return self.cache_data.get(key, None)
        return None
