MAD9124 Mobile API Development

# Assignment 1 - Basic CRUD

## The brief

This is the first of three take home assignments in this course that will be related, with later assignments building on the functionality of earlier ones. You are going to build the backend web services to support a simple class list application called _cListR_.

For this assignment, you will build the base for the _cListR_ RESTful API using Node.js and the Express framework.

## Core Requirements

1. Using the Express.js framework, the API will expose a full set of CRUD routes (six, including both `put` and `patch`) for each of two resources: **students**, and **courses**. All API resource paths must begin with `/api`.

The resource objects will have the following properties:

#### Student

| Property  | Type   |
| --------- | ------ |
| id        | Number |
| firstName | String |
| lastName  | String |
| nickName  | String |
| email     | String |

#### Course

| Property    | Type   |
| ----------- | ------ |
| id          | Number |
| code        | String |
| title       | String |
| description | String |
| url         | String |

<br/>

2. Each resource should be in its own [Router module](https://expressjs.com/en/4x/api.html#router). Resource collections will be stored as in memory arrays associated with their respective Router module.

3. Routes related to individual members of a resource collection should use an `id` validation middleware which will return a properly formatted 404 response with an errors array.

4. More robust data validation will be implemented in the next assignment, but for now ensure that only expected resource properties are stored for each member of the collection. Do not trust the `id` property in the `req.body`.

5. Ensure that you write clean and readable code. Pay attention to:

- no runtime errors
- consistent 2 space indentation
- logical grouping of related code
- semantically descriptive names for variables and functions
- well organized project folder structure
- properly formatted `package.json` file
  - correct project name
  - your author details

## Logistics

- Clone this repo to your local development environment.
- Build the project on your laptop.
- Test each route with Postman.
- Make git commits as you complete each requirement
- When everything is complete, push the final commit back up to GitHub and submit the GitHub repo's URL on BirghtSpace.
