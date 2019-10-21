# Project overview
This is for a degree project done at the Royal Institute of Technology in Stockholm 2019. The contributers for this assignment are: Nicklas Ockelberg and Niclas Olsson

Continue reading for information about continuing development, or running the application.

Visit the application at: https://react-fulltest-app.herokuapp.com/

# Running the app
#### Start in local development
Run this commmand in the root directory
```bash
npm install
```

Then run this command in the root directory

```bash
npm run serve
```

And then run this command in the root directory

```bash
npm run dev
```
The app is now up and running, now browse to the url suggested by the Vue cli

------
#### Start in local production
First make sure you have all the environment variables set as suggested [here](#configuring-environment-variables)
Especially making sure that the NODE_ENV is set to production.
Run this commmand in the root directory
```bash
npm install
```

Then run this command in the root directory

```bash
npm run build
```
Then run this command in the root directory

```bash
npm run start
```
The app is now up and running on localhost

------

# About the project

## Front-end
The front end is a Single Page Application written in React. A Single-page Application is very fast for the user after the initial load.


# Configuring environment variables
This application is dependent on some environment variables which have to be set in order for the application to work correctly. These configs can be found in the server directory in the config.js file.

In bash you can set your environment variables with the export command:

```bash
export DBUSER=yourUser
export DBPW=yourPW
export BASE_URL=yourbaseurl
export PORT=yourport
export NODE_ENV=developmentorproduction
```

####Material-UI
Material-UI has been used in order to create the CSS for the web application. This library is based on Material Design and is great for keeping the application looking decent without much effort.

####React Router
In order to navigate to different pages in a Single Page Application, the React Router is used. 

####Redux
To manage state which the whole or multiple parts of the application shares, Redux is used. This allows for a central but encapsulated storage which is easly debuggable during development.

####Axios
In order to handle HTTP requests a third-party package known as Axios is used. Axios handles the HTTP requests using promises which is how it manages to handle the HTTP request asynchronously. 

## Back-end
The back-end is a REST API and [Express](https://expressjs.com/) is used as the web framework. 

### Database
The database used in the project is a MongoDB hosted at mLab. MongoDB databases are, unless something else is the focus, ideal for Node applications, since the saved documents are basically JSON objects which are native to NodeJS.

#### Database Schema
Two collections are used: **user** and **recipes**.
Required fields are marked with [req], optional: [opt]. Followed by the Datatype and potential comments.
Fields which are [opt] should not contain null, undefined or any "empty" value. If omitted the field should not exist.

##### Users-collection
```
{
  "username": **[req]** String,
  "password": **[req]** String,
  "firstname": **[req]** String,
  "lastname": **[req]** String,
  "email": **[req]** String,
}
```
##### Recipes-collection
```
{
  "name": **[req]** String,
  "id": **[req]** String,
  "description": **[req]** String,
  "image": **[req]** String,
  "ingredient": **[req]** Array,
  "step": **[req]** Array,
  "notes": **[opt]** String,
  "comments": **[opt]** Array,
}
```

## Authorization Guard
To protect the data there are 2 levels of authorization, 1 being the highest, 2 lowest.
1. Authorized user
2. Unauthorized user
The access is checked from 2 up to 1. And once a users authorization-level has been approved for the specified action/endpoint, the request gets handled.

Which authorization levels are required for which endpoints/action are showed in the [API endpoints section](#api-endpoints-and-methods).

# API Endpoints and methods
The way this application communicates from client side to the server side is by utilizing Axios as our HTTP-client making request to our backend. We have three endpoints that we use and these are seperated for different areas of the application. These areas are for handling recipes, users and authentication. 

From the client side the communications always goes through something we call a "service" which is from which our Axios request are made. Based on which method is called Axios targets the appropriate API route on the server side. If we for example want to add a recipe Axios will target the /api/recipe endpoint. After the backend finishes whatever Axios requested from it Axios will return the result to the caller.

## Working with our API endpoints
As previously stated we have the three endpoints that we can utilize, these look as following ```api/auth```, ```api/recipe``` and ```api/user```. We will now go through them and look at the possible methods that you can use. 

### Handling authentication
```api/auth```

Method | Route | Description | Minimum Permissions
------------ | ------------- | ------------- | ------------- 
 | **GET** | / | Authenticates a user and gives it a token which it can use to authorize itself | Unauthorized


#### Usage
```GET api/auth/```
##### Parameters:
```json
{
  "username": "username",
  "password": "password",
}
```

##### Response
```json
{
  "message": "Successfully logged in",
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "Bearer",
  "name": "Username",
}
```



### Handling recipes

```api/recipe```

Method | Route | Description | Minimum Permissions
------------ | ------------- | ------------- | ------------- 
| **GET** | / | Gets all the recipes in the database | Unauthorized
**GET** | /:id | Gets the recipe that the id corresponds to | Unauthorized
**POST** | / | Adds a recipe to the database | Logged In 
**POST** | /comment | Adds a comment to the recipe with the corresponding id to the database | Logged In 

#### Usage
```GET api/recipe/```
##### Parameters: NO
##### Response
```json
[
  {
  "_id": "id",
  "name": "Recipe name",
  "id": "String id",
  "description": "A description",
  "image": "IMG-URL",
  "ingredient": [
      {
      "amount": "amount",
      "unit": "unit",
      "name": "name"
      },
      ...
  ],
  "step": [
      {
      "description": "description"
      },
      ...
  ],
  "notes": "Notes",
  "comments": [],
  }
], ...
```

#### Usage
```GET api/recipe/:id```
##### Parameters: NO
##### Response
```json
{
  "_id": "id",
  "name": "Recipe name",
  "id": "String id",
  "description": "A description",
  "image": "IMG-URL",
  "ingredient": [
      {
      "amount": "amount",
      "unit": "unit",
      "name": "name"
      },
      ...
  ],
  "step": [
      {
      "description": "description"
      },
      ...
  ],
  "notes": "Notes",
  "comments": [],
}
```
#### Usage
```POST api/recipe/```
##### Parameters:
```json
{
  "_id": "id",
  "name": "Recipe name",
  "id": "String id",
  "description": "A description",
  "image": "IMG-URL",
  "ingredient": [
      {
      "amount": "amount",
      "unit": "unit",
      "name": "name",
      },
      ...
  ],
  "step": [
      {
      "description": "description"
      },
      ...
  ],
  "notes": "Notes",
  "comments": [],
}
```
#####Response
```json
{
  "message": "Recipe successfully created!"
}
```
```POST api/recipe/comment```
##### Parameters:
```json
{
  "comment": "comment",
  "commentator": "Commentator",
  "recipe": "String id"
}
```
##### Response
```json
{
  "message": "Comment successfully created!"
}
```


### Handling users

```api/user```

Method | Route | Description | Minimum Permissions
------------ | ------------- | ------------- | ------------- 
**POST** | / | Creates a new user | Unauthorized 

#### ```POST api/user/```
##### Parameters:
```json
{
  "username": "Username",
  "firstname": "Firstname",
  "lastname": "Lastname",
  "password": "Password",
  "email": "Email",
}
```

##### Response:
```json
{
  "message": "Account successfully created!"
}
```

------