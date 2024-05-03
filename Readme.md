# Toy Shop API Documentation

This API allows you to manage toy shops and their products.

## Get All Shops

### Request

- Method: `GET`
- URL: `/api/shops`

### Response

- Status: 200 OK
- Body: Array of shop objects

## Upsert Shop and Products

### Request

- Method: `POST`
- URL: `/api/shops/:shopId`
- Params:
  - `shopId`: ID of the shop to upsert (integer)
- Body:
  ```json
  {
      "products": [
          {
              "id": "string",
              "name": "string",
              "price": "string"
          }
      ]
  }
