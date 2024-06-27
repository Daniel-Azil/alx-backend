# Pagination in Python

This repository contains a series of tasks focused on implementing pagination in Python. The tasks range from creating simple helper functions to more complex pagination methods for handling large datasets and ensuring deletion-resilient pagination.

## Table of Contents
1. [Simple Helper Function](#simple-helper-function)
2. [Simple Pagination](#simple-pagination)
3. [Hypermedia Pagination](#hypermedia-pagination)
4. [Deletion-Resilient Hypermedia Pagination](#deletion-resilient-hypermedia-pagination)

## Simple Helper Function

Write a function named `index_range` that takes two integer arguments `page` and `page_size`. The function returns a tuple of size two containing a start index and an end index corresponding to the range of indexes to return in a list for those particular pagination parameters.

### Example
```python
index_range = __import__('0-simple_helper_function').index_range

res = index_range(1, 7)
print(type(res))  # <class 'tuple'>
print(res)        # (0, 7)

res = index_range(page=3, page_size=15)
print(type(res))  # <class 'tuple'>
print(res)        # (30, 45)

## Simple Pagination
Copy the `index_range` function from the previous task and create a Server class to paginate a database of popular baby names.

### Class: Server
``` python
import csv
import math
from typing import List

class Server:
    """Server class to paginate a database of popular baby names."""
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        self.__dataset = None

    def dataset(self) -> List[List]:
        """Cached dataset."""
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]
        return self.__dataset

    def get_page(self, page: int = 1, page_size: int = 10) -> List[List]:
        """Return the appropriate page of the dataset."""
        assert type(page) is int and page > 0
        assert type(page_size) is int and page_size > 0

        start_index, end_index = index_range(page, page_size)
        return self.dataset()[start_index:end_index]

```


### Example
``` python
server = Server()

print(server.get_page(1, 3))
print(server.get_page(3, 2))
print(server.get_page(3000, 100))
```


## Hypermedia Pagination
Implement a get_hyper method that takes the same arguments as get_page and returns a dictionary containing pagination information.


### Method: get_hyper
``` python

def get_hyper(self, page: int = 1, page_size: int = 10) -> dict:
    """Return a dictionary containing pagination information."""
    data = self.get_page(page, page_size)
    total_pages = math.ceil(len(self.dataset()) / page_size)

    return {
        'page_size': len(data),
        'page': page,
        'data': data,
        'next_page': page + 1 if page < total_pages else None,
        'prev_page': page - 1 if page > 1 else None,
        'total_pages': total_pages
    }

```


### Example
``` python
server = Server()

print(server.get_hyper(1, 2))
print(server.get_hyper(2, 2))
print(server.get_hyper(100, 3))
print(server.get_hyper(3000, 100))
```

## Deletion-Resilient Hypermedia Pagination
Ensure that if rows are removed from the dataset between queries, the user does not miss items when changing pages.

### Method: get_hyper_index
```python
def get_hyper_index(self, index: int = None, page_size: int = 10) -> dict:
    """Return a dictionary with deletion-resilient pagination information."""
    assert type(index) is int and index >= 0
    assert type(page_size) is int and page_size > 0

    indexed_dataset = self.indexed_dataset()
    dataset_size = len(indexed_dataset)
    data = []

    next_index = index
    while len(data) < page_size and next_index < dataset_size:
        item = indexed_dataset.get(next_index, None)
        if item is not None:
            data.append(item)
        next_index += 1

    return {
        'index': index,
        'next_index': next_index,
        'page_size': len(data),
        'data': data
    }
```

### Example
```python

server = Server()
server.indexed_dataset()

index = 3
page_size = 2

# 1- request first index
res = server.get_hyper_index(index, page_size)
print(res)

# 2- request next index
print(server.get_hyper_index(res.get('next_index'), page_size))

# 3- remove the first index
del server._Server__indexed_dataset[res.get('index')]
print("Nb items: {}".format(len(server._Server__indexed_dataset)))

# 4- request again the initial index -> the first data retrieved is not the same as the first request
print(server.get_hyper_index(index, page_size))

# 5- request again initial next index -> same data page as the request 2-
print(server.get_hyper_index(res.get('next_index'), page_size))
```


## Repository
- **GitHub repository:** `alx-backend`
- **Directory:** `0x00-pagination`
- **Files:**
  - `0-simple_helper_function.py`
  - `1-simple_pagination.py`
  - `2-hypermedia_pagination.py`
  - `3-hypermedia_del_pagination.py`
