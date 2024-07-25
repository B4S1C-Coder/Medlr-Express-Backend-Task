# Medlr Express Backend Task
This is an Express based RESTful API for the Medlr Backend Internship Task. It offers CRUD, searching, sorting and filtering of medicines stored in a database and a cache.

## Features
- **CRUD**: The API provides Create, Retrieve, Update and Delete functionality on medicines.

- **Redis Caching**: Redis is used as a cache on top of MongoDB, reducing response times.

## Endpoints
The endpoints can be be found on [Postman Documentation](https://documenter.getpostman.com/view/36439409/2sA3kYheTH) of this API. In brief the endpoints are:

- **Get a medicine (by id)**: Get a medicine
    - Endpoint: `/medicine/:id`
    - Method: `GET`
    - Example Response (200 OK):
    `{
        "_id": "66a0cc6bfc13ae10a3234693",
        "name": "Mineral oil, Petrolatum, Phenylephrine HCl, Shark liver oil",
        "manufacturer": "H E B",
        "price": 4877.34,
        "discountPrice": 2636.98,
        "imageURL": "http://dummyimage.com/186x173.png/5fa2dd/ffffff",
        "quantity": 5,
        "cached": false
    }`

- **Create a medicine**: Create a medicine
    - Endpoint: `/medicine/`
    - Method: `POST`
    - Example Request Body:
    `{
        "name": "Test Medicine",
        "manufacturer": "Test Manufactuer",
        "price": 1589.56,
        "discountPrice": 250.78,
        "quantity": 5,
        "imageURL": "http://dummyimage.com/186x173.png/5fa2dd/ffffff"
    }`
    - Example Response Body (201 Created):
    `{
        "name": "Test Medicine",
        "price": 1589.56,
        "discountPrice": 250.78,
        "quantity": 5,
        "manufacturer": "Test Manufactuer",
        "imageURL": "http://dummyimage.com/186x173.png/5fa2dd/ffffff",
        "_id": "66a269b2b23d12fa9e36f544",
        "createdAt": "2024-07-25T15:05:22.071Z",
        "updatedAt": "2024-07-25T15:05:22.071Z",
        "__v": 0
    }`

- **Update a medicine (by id)**
    - Endpoint: `/medicine/:id`
    - Method: `PUT` or `PATCH` (prefer `PATCH`)
    - Example Request Body: (You can specify more than one field)
    `{
        "quantity": 45
    }`
    - Example Response Body (200 OK):
    `{
        "_id": "66a269b2b23d12fa9e36f544",
        "name": "Test Medicine",
        "price": 1589.56,
        "discountPrice": 250.78,
        "quantity": 45,
        "manufacturer": "Test Manufactuer",
        "imageURL": "http://dummyimage.com/186x173.png/5fa2dd/ffffff",
        "createdAt": "2024-07-25T15:05:22.071Z",
        "updatedAt": "2024-07-25T15:08:21.570Z",
        "__v": 0
    }`

- **Delete a medicine (by id)**
    - Endpoint: `/medicine/:id`
    - Method: `DELETE`
    - Example Response (204 No Content): Only gives status 204 on success

- **Searching and sorting medicines**
    - Example Endpoint: `/medicine/search?name=Guaif&manufacturer=Des&limit=3&sortField=manufacturer&sortOrder=desc`
    - Method: `GET`
    - Example Response:
    `{
        "cached": false,
        "normal": [
            {
            "_id": "66a0cc6bfc13ae10a323468b",
            "name": "Guaifenesin",
            "manufacturer": "Western Family Foods Inc",
            "price": 1883.45,
            "discountPrice": 3039.91,
            "imageURL": "http://dummyimage.com/236x136.png/5fa2dd/ffffff",
            "quantity": 5
            },
            {
            "_id": "66a0cc6cfc13ae10a323491c",
            "name": "Dextromethorphan Hydrobromide, Guaifenesin, Phenylephrine Hydrochloride",
            "manufacturer": "Wakefern Food Corporation",
            "price": 9026.81,
            "discountPrice": 4092.09,
            "imageURL": "http://dummyimage.com/213x139.png/ff4444/ffffff",
            "quantity": 5
            },
            {
            "_id": "66a0cc6cfc13ae10a323488e",
            "name": "Acetaminophen, Dextromethorphan HBr, Guaifenesin, Phenylephrine HCl",
            "manufacturer": "WALGREEN CO.",
            "price": 1250.44,
            "discountPrice": 563.49,
            "imageURL": "http://dummyimage.com/234x161.png/ff4444/ffffff",
            "quantity": 5
            }
        ]
    }`

## Setup (locally)
1. Clone the repo via `git clone https://github.com/B4S1C-Coder/Medlr-Express-Backend-Task`

2. Rename the `.example-env` to `.env` and populate it with relevant values

3. Install dependencies via `npm i`

4. Run the project via `npm run dev`

>**Note**: Optionally you can seed your MongoDB with initial data provided in [MOCK_DATA.json](MOCK_DATA.json) via MongoDB Compass or Atlas.

>**Note**: If you intend to use locally hosted MongoDB and Redis do ensure if any additional dependecies (like bindings etc.) need to be installed. The [package.json](package.json) assumes that you are using remotely hosted MongoDB (Atlas) and Redis (Render).
