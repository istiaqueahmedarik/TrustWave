
# Client Documentation

## Introduction

Our app TrustWave is a financial system that allows users to register, login, and perform transactions securely. It uses a Next.js frontend with server actions for API requests and a Hono.js backend for authentication and transaction management. The app supports user registration, login, payment processing, and data prediction using AI.

---

## Installation

1. **Go to client**:
   ```bash
    cd client
    ```
2. **Install dependencies**:
    ```bash
    npm install
    ```
3. **Start the development server**:
    ```bash
    npm run dev
    ```
4. **Open the app**:
    Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
   

# Server Actions Documentation

We use nextJS server actions as a serverless middleware to handle API requests from the frontend. 

---

## Table of Contents
- [Authentication](#authentication)
- [Payment Processing](#payment-processing)
- [NID Image Processing](#nid-image-processing)
- [Data Prediction](#data-prediction)
- [Utility Functions](#utility-functions)
- [Request Helpers](#request-helpers)
- [Environment Variables](#environment-variables)

---

## Authentication

### **SignUp**  
**Route**: `POST /signup`  
**Parameters** (FormData):
- `name` (string): User's full name.
- `email` (string): Valid email address.
- `password` (string): Minimum 8 characters.
- `confirmPassword` (string): Must match `password`.
- `phone` (string): Minimum 10 digits.
- `dob` (string): Date of birth.
- `nid` (string): National ID number.
- `present_address` / `permanentAddress` (string): User addresses.
- `fathersName` / `mothersName` (string): Parent names.
- `croppedImage` / `nidImage` (base64): Profile and NID images.  

**Behavior**:  
- Validates input using Zod schema.
- Sends data to backend `/signup` endpoint.
- Redirects to `/login` on success.

---

### **Login**  
**Route**: `POST /login`  
**Parameters** (FormData):
- `email` (string): Registered email.
- `password` (string): Minimum 8 characters.  

**Behavior**:  
- Validates credentials.
- Sends request to backend `/login` endpoint.
- Stores JWT token in cookies on success.
- Redirects to `/dashboard`.

---

## Payment Processing

### **Payment**  
**Route**: `POST /payment/auth/pay`  
**Parameters** (FormData):
- `phoneNumber` (string): User's phone number.
- `amount` (string/number): Payment amount.
- `reference` (string): Transaction reference.  

**Behavior**:  
- Requires authenticated token via cookies.
- Sends payment request to backend.
- Redirects to `/dashboard` after processing.

---

## NID Image Processing

### **detectObjectsFromBase64**  
**Endpoint**: External API (`https://api.landing.ai/v1/tools/agentic-object-detection`)  
**Parameters**:
- `base64ImageUrl` (string): Base64-encoded NID image.  

**Behavior**:  
- Detects profile picture bounding box using AI.
- Returns coordinates `[x, y, width, height]`.

---

### **OCRImage**  
**Model**: Google Gemini 2.0 Flash  
**Parameters**:
- `image` / `image1` (base64): NID images.  

**Response Schema**:
```ts
{
  isNID: boolean,
  name: string,
  fatherName: string,
  motherName: string,
  dob: string,
  nid: string,
  address: string,
  blood_type: string,
  box_2d_tx: number,
  box_2d_ty: number,
  box_2d_bx: number,
  box_2d_by: number
}
```
**Behavior**:  
- Extracts structured data from Bangladeshi NID images.
- Returns OCR results and profile picture bounding box.

---

## Data Prediction

### **predict**  
**Model**: Google Gemini 2.0 Flash  
**Parameters**:
- `yVal` (number[]): Array of Y-axis values.
- `xVal` (any[]): Array of X-axis values.
- `dataDetails` (string): Contextual description of data.  

**Response Schema**:
```ts
{
  xVal: number[],
  yVal: number[]
}
```
**Behavior**:  
- Predicts next 10 values for X and Y axes using AI.

---

## Utility Functions

### **Image Cropping** (`crop.tsx`)
- `cropBase64Image(bbox, base64Image)`: Crops an image using bounding box coordinates.
- `imageToBase64(file)`: Converts a `File` object to base64 string.

---

## Request Helpers (`req.tsx`)
| Function | Method | Parameters | Description |
|----------|--------|------------|-------------|
| `post` | POST | `url`, `data` | Basic POST request. |
| `cache_post` | POST | `url`, `data` | Cached POST with 30s revalidation. |
| `get` | GET | `url`, `c` (cache flag) | Cached GET request. |
| `post_with_token` | POST | `url`, `data` | Authenticated POST with JWT token. |
| `get_with_token` | GET | `url`, `c` (cache flag) | Authenticated GET with token. |

---

## Environment Variables
- `SERVER_URL`: Backend API base URL (e.g., `http://localhost:3000/api`).
- `AGENTIC_API_KEY`: API key for Landing.ai object detection.

---

## Error Handling
All functions return `{ error: string }` on failure. Authentication errors return `{ error: "Unauthorized" }`.
# Backend API Documentation

A server-side API for our app TrustWave (Financial System)  built with Hono.js, designed for user authentication, transaction management, and administrative operations. Supports JWT-based authentication, IP restrictions, and integrates with PostgreSQL.

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

