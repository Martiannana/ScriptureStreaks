# Auth Routes Documentation

This document provides an overview of the available authentication-related routes for your application. It includes details about each route and how to make requests from the frontend using Axios.

## Table of Contents
- [Routes](#routes)
  - [Register](#register)
  - [Login](#login)
  - [Google Authentication](#google-authentication)
  - [Check Authentication](#check-authentication)
  - [Update Progress](#update-progress)
  - [Share Verse](#share-verse)
- [Axios Examples](#axios-examples)

## Routes

### 1. Register
**Endpoint:** `/register`

**Method:** `POST`

**Description:** Register a new user.

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "johndoe@example.com",
  "password": "securepassword"
}
```

**Response:**
- `201`: User created successfully.
- `400`: Error message.

---

### 2. Login
**Endpoint:** `/login`

**Method:** `POST`

**Description:** Log in an existing user.

**Request Body:**
```json
{
  "email": "johndoe@example.com",
  "password": "securepassword"
}
```

**Response:**
- `200`: User object and token.
- `401`: Error message.

---

### 3. Google Authentication
**Endpoint:** `/google-auth`

**Method:** `POST`

**Description:** Authenticate or register a user using Google credentials.

**Request Body:**
```json
{
  "googleUser": {
    "email": "johndoe@example.com",
    "given_name": "John",
    "family_name": "Doe",
    "picture": "https://example.com/profile.jpg"
  }
}
```

**Response:**
- `200`: User object and token.
- `400`: Error message.

---

### 4. Check Authentication
**Endpoint:** `/check-auth`

**Method:** `GET`

**Description:** Verify user authentication.

**Headers:**
- `Authorization: Bearer <token>`

**Response:**
- `200`: Authenticated user object.
- `500`: Error message.

---

### 5. Update Progress
**Endpoint:** `/update-progress`

**Method:** `POST`

**Description:** Update user progress (chapter, book, or verse).

**Headers:**
- `Authorization: Bearer <token>`

**Request Body:**
```json
{
  "id": "chapterIdOrBookIdOrVerseId",
  "type": "chapter" | "book" | "verse"
}
```

**Response:**
- `200`: Success.
- `403`: Error message.

---

### 6. Share Verse
**Endpoint:** `/share/:receiver`

**Method:** `POST`

**Description:** Share a verse with another user.

**Headers:**
- `Authorization: Bearer <token>`

**Parameters:**
- `receiver`: The ID of the user receiving the shared verse.

**Response:**
- `200`: Success.
- `403`: Error message.

---

## Axios Examples

Here are examples of how to make requests to these routes using Axios from the frontend.

### Register
```javascript
import axios from 'axios';

const registerUser = async () => {
  try {
    const response = await axios.post('/register', {
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@example.com',
      password: 'securepassword',
    });
    console.log(response.data);
  } catch (error) {
    console.error(error.response.data);
  }
};
```

### Login
```javascript
import axios from 'axios';

const loginUser = async () => {
  try {
    const response = await axios.post('/login', {
      email: 'johndoe@example.com',
      password: 'securepassword',
    });
    console.log(response.data);
    //store token in your local storage to use for future requests
  } catch (error) {
    console.error(error.response.data);
  }
};
```

### Check Authentication
```javascript
import axios from 'axios';

const checkAuth = async (token) => {
    //fetch token from your local storage
  try {
    const response = await axios.get('/check-auth', {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(response.data);
  } catch (error) {
    console.error(error.response.data);
  }
};
```

### Update Progress
```javascript
import axios from 'axios';

/**
 * Generate unique ids for the progress(book, chapter or verse).
 * For book use the book name. For instance, ${book}
 * For chapter, combine the book name and the chapter.For instance, ${book}-${chapter}
 * For verse, combine the book name, chapter and verse. For instance, ${book}-${chapter}-${verse}
 * **/

const updateProgress = async (token, id, type) => {
  try {
    const response = await axios.post(
      '/update-progress',
      { id, type },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log(response.data);
  } catch (error) {
    console.error(error.response.data);
  }
};
```

### Share Verse
```javascript
import axios from 'axios';

const shareVerse = async (token, receiverId) => {
  try {
    const response = await axios.post(
      `/share/${receiverId}`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log(response.data);
  } catch (error) {
    console.error(error.response.data);
  }
};
```

