# Medlr Express Backend Task
This is an Express based RESTful API for the Medlr Backend Internship Task. It offers CRUD, searching, sorting and filtering of medicines stored in a database and a cache.

## Features
- **CRUD**: The API provides Create, Retrieve, Update and Delete functionality on medicines.

- **Redis Caching**: Redis is used as a cache on top of MongoDB, reducing response times.

## Endpoints
The endpoints can be be found on [Postman Documentation](https://documenter.getpostman.com/view/36439409/2sA3kYheTH) of this API.

## Setup (locally)
1. Clone the repo via `https://github.com/B4S1C-Coder/Medlr-Express-Backend-Task`

2. Rename the `.example-env` to `.env` and populate it with relevant values

3. Install dependencies via `npm i`

4. Run the project via `npm run dev`

>**Note**: Optionally you can seed your MongoDB with initial data provided in [MOCK_DATA.json](MOCK_DATA.json) via MongoDB Compass or Atlas.
