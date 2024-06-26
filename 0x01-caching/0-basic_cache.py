#!/usr/bin/env python3
"""
    A python module create a class BasicCache that inherits
    from BaseCaching and is a caching system.
"""

BaseCaching = __import__("BaseCaching").BaseCaching


class BasicCache(BaseCaching):
    """
        A class BasicCache that inherits from BaseCaching
        and is a caching system.
    """
    def __init__(self):
        """
            Construct the object BasicCache.
        """
        super().__init__()

    def put(self, key, item):
        """
            A mothod that inserts cached items
        """
        if key and item:
            self.cache_data[key] = item

    def get(self, key):
        """
            A method that returns value of given key
        """
        if key:
            return self.cache_data[key]
        else:
            return None
