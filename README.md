# URL Shortener Project

## Table of Contents

1. [Description of Project](https://github.com/iamabhas/nest_url_shortener/blob/main/README.md#1-description-of-project)
2. [Technologies Used](https://github.com/iamabhas/nest_url_shortener/blob/main/README.md#2-technologies-used)
3. [How to Run and Test API](https://github.com/iamabhas/nest_url_shortener/blob/main/README.md#3-how-to-run-and-test-api)
4. [Backend NestJS Setup](https://github.com/iamabhas/nest_url_shortener/blob/main/README.md#4-backend-nestjs-setup)
5. [Use of AI Assistance](https://github.com/iamabhas/nest_url_shortener/blob/main/README.md#5-use-of-ai-assistance)

## 1. Description of Project
I made a URL shortener that takes in a URL from the user and then shortens the URL. Users can also view previous URL history. Users need to be authenticated to use the shortening URL feature.

## 2. Technologies Used
- **Frontend**: React
- **Backend**: NestJS
- **Database**: MongoDB
- **Authentication**: JWT

## 3. How to Run and Test API
i. **Set up the database**:
   - Download MongoDB and create database "nest_url_db".

ii. **Client Setup**:
   - Navigate to the client directory: `cd client`
   - Install dependencies: `npm install`
   - Start the development server: `npm run dev`

iii. **Server Setup**:
   - Navigate to the server directory: `cd server`
   - Install dependencies: `npm install`
   - Start the development server: `npm run start:dev`

iv. **Environment Variables**:
   - Add a `.env` file in the server directory with the following variables:

     ```
     PORT= 5000
     MONGO_URL= CONNECTION STRING
     SALT= 10
     EXPIRES_IN= TIME OF TOKEN EXPIRY
     ACCESS_TOKEN_SECRET= SECRET TOKEN
     ```

v. Test API using Postman: `nest url testing.postman_collection.json` file is present in the root of the repo. Import the repo in Postman to test API routes.

## 4. Backend NestJS Setup
The NestJS backend is organized as follows:

- **Directories**:
  - **auth**: Handles authentication logic.
  - **config**: Contains configuration files for cors and environment variables.
  - **database**: Consist of user and url shortner schemas.
  - **exception**: Handles custom exceptions.
  - **guards**: Contains guard files for route protection with jwt.
  - **shortenUrl**: Manages URL shortening logic.
  - **strategy**: For authentication strategies (not used in project).
  - **types**: Contains consist of global interfaces. auth and shortenUrl directories have their own interface and dto directories.
  - **utils**: Contains Bcrypt hashing helper class.

React was used in frontend and divided in to components and pages. React router was used for routing where as material ui for styling.

## 5. Use of AI Assistance
  I used it for asking these questions:
   - how to truncate string in the javascript
   - how to implement config module and config serice in project
   - .md file format for creating documentation

