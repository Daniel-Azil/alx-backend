#!/usr/bin/env python3
"""
    A python module create a class BasicCache that inherits
    from BaseCaching and is a caching system.
"""

BaseCaching = __import__("BaseCaching").BaseCaching


class BasicCache(BaseCaching):
    """ BasicCache defines:
      - inherits from BaseCaching and is a caching system
      - where your data are stored (in a dictionary)
    """
    def __init__(self):
        """ Initiliaze
        """
        super().__init__()

    def put(self, key, item):
        """assign to the {} self.cache_data the item value for the key
        """
        if key and item:
            self.cache_data[key] = item

    def get(self, key):
        """return value in self.cache_data linked to key
        """
        if not key or not self.cache_data.get(key):
            return None
        return self.cache_data.get(key)
