# Caching System Implementation

This project implements various caching algorithms in Python. Each caching system inherits from a base class `BaseCaching` and provides different eviction policies.

## Caching Systems Implemented

- **Basic Cache**
- **FIFO (First-In-First-Out) Cache**
- **LIFO (Last-In-First-Out) Cache**
- **LRU (Least Recently Used) Cache**
- **MRU (Most Recently Used) Cache**
- **LFU (Least Frequently Used) Cache**

## Files

- `0-basic_cache.py`: Implements a basic caching system without a limit.
- `1-fifo_cache.py`: Implements a FIFO caching system.
- `2-lifo_cache.py`: Implements a LIFO caching system.
- `3-lru_cache.py`: Implements an LRU caching system.
- `4-mru_cache.py`: Implements an MRU caching system.
- `100-lfu_cache.py`: Implements an LFU caching system.

## Usage

Each caching system class provides two main methods:

- `put(self, key, item)`: Adds an item to the cache.
- `get(self, key)`: Retrieves an item from the cache.

### Example usage:

```python
from 1-fifo_cache import FIFOCache

my_cache = FIFOCache()
my_cache.put("A", "Hello")
my_cache.put("B", "World")
print(my_cache.get("A"))  # Output: Hello
