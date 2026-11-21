# Downbot

Downbot is an authentication-only full-stack foundation for an AI chat workspace. It includes a React/Vite client and an Express/Mongoose API with registration, login, rotating refresh cookies, logout, and a protected account endpoint.

## Requirements

- Node.js 20+
- MongoDB (local or hosted)

## Install and run

From the project root:

```sh
npm install
npm install --prefix backend
npm install --prefix frontend
```

Copy `backend/.env.example` to `backend/.env`, then set two different random JWT secrets of at least 32 characters and your MongoDB URI. Start both apps from the root:

```sh
npm run dev
```

The Vite client runs at `http://localhost:5173`, proxies `/api` requests to `http://localhost:5000`, and requires no CORS configuration. The backend connects to MongoDB before listening.

Production builds:

```sh
npm run build
```

## Authentication API

All routes are under `/api/v1/auth`. Responses use `{ "success": true, "message": "...", "data": {} }` on success or `{ "success": false, "message": "...", "errors": [] }` on failure. The refresh token is only sent as a secure-in-production, HTTP-only cookie; access tokens are returned in `data`.

### `POST /register`

Request:

```json
{ "name": "Ada Lovelace", "email": "ada@example.com", "password": "curious123" }
```

Response (`201`):

```json
{
  "success": true,
  "message": "Account created successfully",
  "data": {
    "accessToken": "<access-token>",
    "user": { "id": "<user-id>", "name": "Ada Lovelace", "email": "ada@example.com" }
  }
}
```

### `POST /login`

Request:

```json
{ "email": "ada@example.com", "password": "curious123" }
```

Response (`200`): same data shape as registration, with `"message": "Login successful"`. Invalid credentials return `401` with `"message": "Invalid credentials"` and an empty `errors` array.

### `POST /refresh`

Send the HTTP-only refresh cookie automatically. The server verifies it against the persisted token and rotates the token pair.

Response (`200`):

```json
{
  "success": true,
  "message": "Session refreshed",
  "data": {
    "accessToken": "<new-access-token>",
    "user": { "id": "<user-id>", "name": "Ada Lovelace", "email": "ada@example.com" }
  }
}
```

### `POST /logout`

Send the refresh cookie to invalidate the server-side session and clear the cookie.

Response (`200`):

```json
{ "success": true, "message": "Logged out successfully", "data": {} }
```

### `GET /me`

Requires `Authorization: Bearer <access-token>`.

Response (`200`):

```json
{
  "success": true,
  "message": "Account retrieved successfully",
  "data": { "user": { "id": "<user-id>", "name": "Ada Lovelace", "email": "ada@example.com" } }
}
```

## Frontend structure

Authentication is organized by feature in four layers: `api` for Axios requests, `state` for Redux Toolkit, `hooks` for orchestration, and `ui` for pages/components.
