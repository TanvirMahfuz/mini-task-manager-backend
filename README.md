# Task Manager App

A simple task manager web application that allows users to manage their tasks effectively. Users can create, read, update, and delete tasks, as well as track task progress.

## Features

- **User Authentication**: Register, login, and logout functionality using JWT and email verification.
- **Task Management**: Add, edit, delete, and view tasks.
- **Task Status**: Mark tasks as pending, in-progress, or completed.
- **Task Filtering**: Filter tasks by status.
- **Responsive Design**: Optimized for both desktop and mobile devices.

## Technologies Used

- **Backend**:
  - Node.js with Express.js
  - MongoDB (with Mongoose for ODM)
  - Nodemailer for email verification
- **Authentication**:
  - JWT (JSON Web Tokens) for user authentication

### Clone the repository

```bash
git clone https://github.com/your-username/mini-task-manager-backend.git
```

## Installation

-create a new folder named config in the app directory
-crete a new .js file named config.js
\_app
|\_ config
|\_ config.js

-Now copy the following code and paste it in the config.js file
then replace the values with your own values

```javascript
export const PORT = process.env.PORT || 3000;
export const DB = process.env.DB || "mongodb://localhost:27017/module_18";
export const JWT_KEY = "aksdjnalakjdslakjna238954243n'awfk[";
export const JWT_EXPIRE_TIME = "1d";

export const EMAIL_HOST = "smtp.gmail.com";
export const EMAIL_PORT = 465;
export const EMAIL_USER = "tanvirmahfuz22@gmail.com";
export const EMAIL_PASSWORD = "phditzpyznuqntkl";

export const WEB_CACHE = false;
export const MAX_CACHE_SIZE = "10MB";
export const URL_ENCODE = true;

export const REQUEST_TIME = 20 * 60 * 1000;
export const REQUEST_LIMIT = 1000;

export const MAX_JSON_SIZE = "10MB";
```

## API Endpoints

### User Authentication

| Method | Endpoint          | Description                         |
| ------ | ----------------- | ----------------------------------- |
| POST   | `/registration`   | Register a new user                 |
| POST   | `/login`          | Log in an existing user             |
| GET    | `/profileDetails` | Get profile details (requires auth) |
| POST   | `/profileUpdate`  | Update user profile (requires auth) |
| GET    | `/emailVerify`    | Verify user email (requires auth)   |
| POST   | `/codeVerify`     | Verify code for email verification  |
| POST   | `/resetPassword`  | Reset the password                  |

### Task Management

| Method | Endpoint                    | Description                         |
| ------ | --------------------------- | ----------------------------------- |
| POST   | `/createTask`               | Create a new task (requires auth)   |
| PUT    | `/updateTaskStatus`         | Update task status (requires auth)  |
| GET    | `/taskListByStatus/:status` | Get tasks by status (requires auth) |
| GET    | `/countTask`                | Get task count (requires auth)      |
| DELETE | `/deleteTask/:id`           | Delete a task by ID (requires auth) |
