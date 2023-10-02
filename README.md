# Wizeprompt - A simple and fast prompt for AI generators

**Wizeprompt** is a simple and fast prompt for AI generators. It is designed to be easy to use and to be used with any AI generator for Wizeline enterprise.

## Why Wizeprompt?

Wizeprompt is **easy**, **fast** and **secure**. With Wizeprompt you can:
- Ask to any AI generator any question you want.
- Consult the history of your prompts.

## Stack

This app is built with several technologies, including:

For the `frontend`:
- [Next.js](https://nextjs.org/): React framework for production
- [React](https://reactjs.org/): JavaScript library for building user interfaces
- [Tailwind CSS](https://tailwindcss.com/): A utility-first CSS framework for rapidly building custom designs
- [TypeScript](https://www.typescriptlang.org/): A typed superset of JavaScript that compiles to plain JavaScript

For the `backend`:
- [PostgreSQL](https://www.postgresql.org/): A powerful, open source object-relational database system
- [Kysely](https://kysely.dev/): A SQL query builder for TypeScript
- [Express](https://expressjs.com/): Fast, unopinionated, minimalist web framework for Node.js
- [Node.js](https://nodejs.org/en/): A JavaScript runtime built on Chrome's V8 JavaScript engine

**Note**: *We are considering taking advantage of Next.js capabilities to use it to built the frontend and backend as well.*

## How it works? ⚙️

1. The app are going to be connected to the AI generator (like Chatgpt or Bard) through an API. 

2. The API is going to be connected to a PostgreSQL database to store the prompts and the responses. 

3. Then, the frontend is going to be connected to the API to send the prompts and receive the responses.

## Deployment 🚀

For the **frontend** 2e plan to deploy this app to [AWS](https://aws.amazon.com/) using [Amplify](https://aws.amazon.com/amplify/) or to [Vercel](https://vercel.com/) and [Elastic Beanstalk](https://aws.amazon.com/) for the backend.

## Getting Started:

To get started with Wizeprompt, follow these steps:

### 1. **Clone the Repository**:

```bash
git clone [repository-url]
```
Replace `[repository-url]` with the actual URL of the this repository (https://github.com/wizelineacademy/itesm-socioformador-ago-dec-2023-team-03.git).

### 2. **Navigate to the Project Directory**:

```bash
cd itesm-socioformador-ago-dec-2023-team-03
```

### 3. **Install Dependencies**:
Make sure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed. Run the following command to install the required packages:

```bash
npm install
```

### 4. **Start the Development Server**:
After installing the dependencies, start the local development server with:

```bash
npm run dev
```
This command will start the server and open the application in your default browser. By default, it should run on `http://localhost:3000/`, unless you've configured it differently.

### 5. **Build for Production** (Optional):
If you want to generate a production-ready build, execute:

```bash
npm run build
```
This will create an optimized version of the app in the `build` directory.

