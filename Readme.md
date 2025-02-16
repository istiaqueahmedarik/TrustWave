# Server-Side API Documentation

A server-side API for our app TrustFlow (Financial System)  built with Hono.js, designed for user authentication, transaction management, and administrative operations. Supports JWT-based authentication, IP restrictions, and integrates with PostgreSQL.

---

## Table of Contents
- [Features](#features)
- [Environment Variables](#environment-variables)
- [API Routes](#api-routes)
  - [Authentication](#authentication)
  - [Transactions](#transactions)
  - [Admin](#admin)
- [Getting Started](#getting-started)

---

## Features
- JWT-based authentication for secure endpoints.
- IP restriction and bot detection (commented out but configurable).
- User registration, login, and role-based access control.
- Transaction processing and balance tracking.
- Admin tools for user/IP management.

---

## Environment Variables
| Variable                   | Description                                  |
|----------------------------|----------------------------------------------|
| `DATABASE_URL`             | PostgreSQL database connection URL.         |
| `JWT_SECRET`               | Secret key for JWT token signing.           |
| `SUPABASE_URL`             | Supabase project URL (unused in current implementation). |
| `SUPABASE_SERVICE_ROLE_KEY`| Supabase service role key (unused).          |
| `TRUST`                    | KV namespace for rate limiting (optional).  |

---

## API Routes

### Authentication

#### `POST /signup`
- **Description**: Register a new user.
- **Request Body**:
  ```json
  {
    "name": "string",
    "email": "string",
    "phone": "string",
    "password": "string",
    "dob": "YYYY-MM-DD",
    "fathersName": "string",
    "mothersName": "string",
    "nid": "string",
    "permanentAddress": "string",
    "present_address": "string",
    "croppedImage": "string (base64)",
    "nidImage": "string (base64)"
  }
  ```
- **Response**: 
  ```json
  { "status": "success", "data": { ...user_details } }
  ```

#### `POST /login`
- **Description**: Authenticate a user and return a JWT token.
- **Request Body**:
  ```json
  { "email": "string", "password": "string" }
  ```
- **Response**:
  ```json
  { "status": "success", "token": "JWT_TOKEN" }
  ```

#### `GET /auth/type`
- **Description**: Retrieve the user's role from the JWT payload.
- **Headers**: `Authorization: Bearer <JWT_TOKEN>`
- **Response**:
  ```json
  { "status": "success", "type": "user/admin" }
  ```

---

### Transactions

#### `GET /auth/all`
- **Description**: Fetch transaction summary for the authenticated user.
- **Headers**: `Authorization: Bearer <JWT_TOKEN>`
- **Response**:
  ```json
  {
    "status": "success",
    "data": {
      "sent": "number",
      "received": "number",
      "balance": "number",
      "all_transactions": [...transactions]
    }
  }
  ```

#### `GET /auth/leaderboard`
- **Description**: Retrieve a leaderboard of users by transaction count.
- **Headers**: `Authorization: Bearer <JWT_TOKEN>`
- **Response**:
  ```json
  { "status": "success", "data": [{ "user_id": "string", "transaction_count": "number" }] }
  ```

#### `POST /auth/pay`
- **Description**: Process a payment to another user.
- **Headers**: `Authorization: Bearer <JWT_TOKEN>`
- **Request Body**:
  ```json
  { "phoneNumber": "string", "amount": "number", "reference": "string" }
  ```
- **Response**:
  ```json
  { "status": "success", "data": { ...transaction_details } }
  ```

---

### Admin

#### `GET /auth/user_list`
- **Description**: List all transactions with user details (admin-only).
- **Headers**: `Authorization: Bearer <JWT_TOKEN>`
- **Response**:
  ```json
  { "status": "success", "data": [...transactions_with_user_info] }
  ```

#### `POST /auth/ban_user`
- **Description**: Ban a user by IP address (admin-only).
- **Headers**: `Authorization: Bearer <JWT_TOKEN>`
- **Request Body**:
  ```json
  { "banIp": "string" }
  ```
- **Response**:
  ```json
  { "status": "success", "data": { ...database_response } }
  ```

---

## Getting Started

1. **Clone the repository**:
   ```bash
   Go to server
   ```

2. **Install dependencies**:
   ```bash
   bun install
   ```

3. **Configure environment variables**:
   Create a `.dev.vars` file with the required variables (see [Environment Variables](#environment-variables)).

4. **Start the server**:
   ```bash
   bun run dev
   ```

---

