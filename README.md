
# Backend  

## Getting Started  

Follow these steps to set up and run the backend locally:  

### 1️⃣ Clone the Repository  
```sh
git clone https://github.com/shivam-puri/user-reg-backend.git
```

### 2️⃣ Navigate to the Project Directory  
```sh
cd user-reg-backend
```

### 3️⃣ Install Dependencies  
```sh
npm install
```

### 4️⃣ Add Environment Variables  
Create a `.env` file in the root directory and add the following variables:  
```env
MONGO_URL=(sent in mail)
JWT_SECRET=(sent in mail)
```

### 5️⃣ Start the Server  
```sh
node index.js
```

The backend will now be running on the specified port. 

---


API documentation for the REST endpoints including the request and response formats for each endpoint.

## API Documentation

### 1. User Registration

**Endpoint:** `POST /api/v1/auth/register`

**Request Format:**

```json
{
    "name": "string",
    "password": "string",
    "date_of_birth": "string (YYYY-MM-DD)",
    "age": "number",
    "gender": "string",
    "about": "string"
}

```

**Response Format:**

- **Success (201 Created):**

```json
{
    "success": true,
    "message": "User registered successfully"
}

```

- **Error (409 Conflict):**

```json
{
    "success": false,
    "message": "User already registered, please login"
}

```

- **Error (400 Bad Request):**

```json
{
    "error": "Name is required" // or other validation errors
}

```

- **Error (500 Internal Server Error):**

```json
{
    "success": false,
    "error": "error details",
    "message": "Error in registration"
}

```

---

### 2. User Login

**Endpoint:** `POST /api/v1/auth/login`

**Request Format:**

```json
{
    "name": "string",
    "password": "string"
}

```

**Response Format:**

- **Success (200 OK):**

```json
{
    "success": true,
    "message": "Logged in successfully",
    "user": {
        "name": "string",
        "age": "number",
        "date_of_birth": "string (YYYY-MM-DD)",
        "gender": "string",
        "about": "string"
    },
    "token": "string"
}

```

- **Error (404 Not Found):**

```json
{
    "success": false,
    "message": "User does not exist Please register"
}

```

- **Error (401 Unauthorized):**

```json
{
    "success": false,
    "message": "Invalid credentials"
}

```

- **Error (400 Bad Request):**

```json
{
    "error": "Invalid Name or password"
}

```

- **Error (500 Internal Server Error):**

```json
{
    "success": false,
    "message": "Error in login",
    "error": "error details"
}

```

---

### 3. User Details

**Endpoint:** `GET /api/v1/user/details`

**Request Format:** (Authorization header required)

```
Authorization: Bearer <token>

```

**Response Format:**

- **Success (200 OK):**

```json
{
    "success": true,
    "message": "User Retrieved Successfully",
    "user": {
        "name": "string",
        "age": "number",
        "date_of_birth": "string (YYYY-MM-DD)",
        "gender": "string",
        "about": "string"
    },
    "token": "string"
}

```

- **Error (404 Not Found):**

```json
{
    "success": false,
    "message": "User not found"
}

```

- **Error (500 Internal Server Error):**

```json
{
    "success": false,
    "error": "error details",
    "message": "Error in getting user"
}

```

---

### 4. Update User

**Endpoint:** `PUT /api/v1/user/update`

**Request Format:** (Authorization header required)

```json
{
    "name": "string", // optional
    "date_of_birth": "string (YYYY-MM-DD)", // optional
    "age": "number", // optional
    "gender": "string", // optional
    "about": "string" // optional
}

```

```
Authorization: Bearer <token>

```

**Response Format:**

- **Success (200 OK):**

```json
{
    "success": true,
    "message": "User Updated Successfully",
    "user": {
        // updated user details
    },
    "token": "string"
}

```

- **Error (404 Not Found):**

```json
{
    "success": false,
    "message": "User not found"
}

```

- **Error (400 Bad Request):**

```json
{
    "success": false,
    "message": "Username is already taken"
}

```

- **Error (500 Internal Server Error):**

```json
{
    "success": false,
    "error": "error details",
    "message": "Error in updating user"
}

```

---

### 5. Update Password

**Endpoint:** `PUT /api/v1/user/update-password`

**Request Format:** (Authorization header required)

```json
{
    "currentPassword": "string",
    "newPassword": "string"
}

```

```
Authorization: Bearer <token>

```

**Response Format:**

- **Success (200 OK):**

```json
{
    "success": true,
    "message": "Password updated successfully"
}

```

- **Error (404 Not Found):**

```json
{
    "success": false,
    "message": "User not found"
}

```

- **Error (400 Bad Request):**

```json
{
    "success": false,
    "message": "Current password is incorrect"
}

```

- **Error (500 Internal Server Error):**

```json
{
    "success": false,
    "error": "error details",
    "message": "Error in updating password"
}

```

---

### 6. Delete User

**Endpoint:** `DELETE /api/v1/user/delete`

**Request Format:** (Authorization header required)

```
Authorization: Bearer <token>

```

**Response Format:**

- **Success (200 OK):**

```json
{
    "success": true,
    "message": "User account deleted successfully"
}

```

- **Error (404 Not Found):**

```json
{
    "success": false,
    "message": "User not found"
}

```

- **Error (500 Internal Server Error):**

```json
{
    "success": false,
    "error": "error details",
    "message": "Error in deleting user account"
}

```

---
