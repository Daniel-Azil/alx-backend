# queuing

# Inventory and Reservation System

## Overview

This project demonstrates an inventory and seat reservation system using Node.js, Redis, and Kue.

## Features

- **Product Management**:
  - **List Products**: Retrieve all products with their details.
  - **Product Details**: Get details and current stock for a specific product.
  - **Reserve Product**: Reserve a product if stock is available.

- **Seat Reservation**:
  - **Available Seats**: Check the number of available seats.
  - **Reserve Seat**: Initiate seat reservation.
  - **Process Reservations**: Process reservation jobs and update seat availability.

## API Endpoints

### Product Management

- **GET /list_products**
  - Lists all products.

- **GET /list_products/:itemId**
  - Details of a specific product.

- **GET /reserve_product/:itemId**
  - Reserves a product if available.

### Seat Reservation

- **GET /available_seats**
  - Shows the number of available seats.

- **GET /reserve_seat**
  - Initiates a seat reservation.

- **GET /process**
  - Processes reservation jobs and updates seat availability.


