#!/usr/bin/env python3

"""
    A module that defines a class LFUCache that inherits from BaseCaching
"""

BaseCaching = __import__("base_caching").BaseCaching


class LFUCache(BaseCaching):
    """
        A class LFUCache that inherits from BaseCaching
    """
    def __init__(self):
        """
            Construct the object LFUCache
        """
        super().__init__()
        self.lfu = []

    def put(self, key, item):
        """
            A method that inserts cached items
        """
        if key is None or item is None:
            pass
        else:
            size = len(self.cache_data)
            if size >= BaseCaching.MAX_ITEMS and key not in self.cache_data:
                print("DISCARD: {}".format(self.lfu[0]))
                del self.cache_data[self.lfu[0]]
                del self.lfu[0]
            if key in self.lfu:
                del self.lfu[self.lfu.index(key)]
            self.lfu.append(key)
            self.cache_data[key] = item

    def get(self, key):
        """
            A method that returns value of given key
        """
        if key:
            if key in self.lfu:
                del self.lfu[self.lfu.index(key)]
                self.lfu.append(key)
            return self.cache_data.get(key, None)
        return None
