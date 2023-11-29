# Wizeprompt: Revolutionizing AI Conversations in Wizeline

## Introduction
**Wizeprompt** is a groundbreaking platform tailored for the Wizeline enterprise, designed to seamlessly integrate generative AI into your workflow. Our focus is on providing an interface that is intuitive, quick, and secure, facilitating effortless access to the world of AI-powered conversations.

## Core Advantages of Wizeprompt

### Simplicity and Efficiency
- **User-Friendly Design**: Intuitive interface ensuring ease of use for all skill levels.
- **Quick Setup and Response**: Optimized for rapid deployment and interaction with AI models.

### Enhanced Security
- **Data Privacy**: Strict protocols to safeguard your confidential conversations.
- **Controlled Access**: Comprehensive user management to ensure secure access and budget limited usage.

### Versatility and Scalability
- **Multiple AI Integration**: Compatible with a range of Large Language Models (LLMs) like ChatGPT, Bard, etc.
- **Customizable to Business Needs**: Flexible to adapt to various organizational requirements and scales.

## Technical Composition

### Frontend Architecture
- **[Next.js](https://nextjs.org/)**: Enhanced React framework offering server-side rendering for improved performance.
- **[React](https://reactjs.org/)**: Robust library for building dynamic, responsive user interfaces.
- **[Tailwind CSS](https://tailwindcss.com/)**: Modular CSS framework for quick and maintainable design customization.

### Backend Infrastructure
- **[PostgreSQL](https://www.postgresql.org/)**: Reliable, feature-rich open-source database for secure data management.
- **[Sequelize](https://sequelize.org/)**: A modern TypeScript and Node.js ORM for Oracle, Postgres, MySQL, MariaDB, SQLite and SQL Server, and more.
- **[Express](https://expressjs.com/)**: Agile web framework for Node.js, ensuring fast and efficient server-side logic.
- **[Node.js](https://nodejs.org/en/)**: Versatile JavaScript runtime, ideal for scalable network applications.


## System Workflow ⚙️

1. **API Connectivity**: Seamless connection to various LLMs for diverse conversational capabilities.
2. **Data Storage**: Robust PostgreSQL database integration for prompt and response archiving.
3. **Interactive Frontend**: Dynamic user interface for prompt management and response visualization.
4. **Administrative Oversight**: Detailed monitoring tools for user activity, usage metrics, and access control.

## Deployment and Operations 🚀

- **Frontend Deployment**: Currently hosted with [AWS Lightsail](https://aws.amazon.com/lightsail/) at 23.23.104.122
- **Backend Deployment**: Running in [AWS Lightsail](https://aws.amazon.com/lightsail/) at 23.23.104.122:8080
- **Continuous Integration/Continuous Deployment (CI/CD)**: Commits on main get dedployed via GitHub Actions

## Getting Started

### Setting Up Your Environment
1. **Clone the Repository**:
    ```bash
    git clone https://github.com/wizelineacademy/itesm-socioformador-ago-dec-2023-team-03.git
    ```
2. **Enter Project Directory**:
    ```bash
    cd itesm-socioformador-ago-dec-2023-team-03
    ```
3. **Install Dependencies**:
    Ensure [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) are installed, then run:
    ```bash
    cd ./frontend
    npm install

    cd ../backend
    npm install
    ```

4. **Add the .env files**:
    Ask for the content and location of the .env files and add them to the proyect.

### Development and Production
5. **Launch Development Server**:
    Start the client:
    ```bash
    cd ./frontend
    npm run dev
    ```
    Start the backend
    ```bash
    cd ./frontend
    npm run dev
    ```

    Access the app typically at `http://localhost:3000/`.
6. **Production Build** (Optional):
    For deployment-ready builds:
    ```bash
    npm run build
    ```
    Optimizes the app for production in the `build` directory.

## Conclusion

Wizeprompt is not just a tool; it's a transformative platform enhancing the way Wizeline interacts with AI. By combining the latest in web technology and AI integration, Wizeprompt stands as a testament to innovation and efficiency in the digital age.
