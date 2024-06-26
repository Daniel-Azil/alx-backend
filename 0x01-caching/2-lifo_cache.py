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
        self.asd_order = []

    def put(self, key, item):
        """
            A method that inserts cached items
        """
        if key is None or item is None:
            pass
        else:
            size = len(self.cache_data)
            if size >= BaseCaching.MAX_ITEMS and key not in self.cache_data:
                print("DISCARD: {}".format(self.asd_order[-1]))
                del self.cache_data[self.asd_order[-1]]
                del self.asd_order[-1]
            if key in self.asd_order:
                del self.asd_order[self.asd_order.index(key)]
            self.asd_order.append(key)
            self.cache_data[key] = item

    def get(self, key):
        """
            A method that returns value of given key
        """
        if key:
            return self.cache_data.get(key, None)
        return None
