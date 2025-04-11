# MCP System

## Overview
MCP System is a web-based dashboard for managing orders, partners, and wallet transactions. It provides insights into order statuses, partner performance, and financial transactions in an intuitive UI.

## Features
- **Dashboard Overview**: Displays key metrics such as wallet balance, total orders, and partner statistics.
- **Order Management**: Track order statuses (Completed, In Progress, Pending).
- **Partner Management**: View active partners and their performance.
- **Wallet Transactions**: Manage and track financial transactions.
- **Reports & Analytics**: Gain insights into order completion rates and trends.

## Tech Stack
- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js (for API integration)
- **Database**: MongoDB (via MongoDB Atlas)
- **State Management**: React Context API 

## Installation & Setup

### Prerequisites
Ensure you have the following installed:
- Node.js & npm
- Git

### Clone the Repository
```sh
git clone https://github.com/yourusername/MCP-System.git
cd MCP-System
```

### Install Dependencies
```sh
npm install
```

### Run the Development Server
```sh
npm run dev
```

### Environment Variables
Create a `.env` file and configure:
```
VITE_API_BASE_URL=http://localhost:5000/api
```

## Deployment
To deploy the application, you can use **Vercel** or **Netlify**:
```sh
vercel deploy
```

## Contributing
1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m "Added new feature"`
4. Push to the branch: `git push origin feature-name`
5. Submit a Pull Request


---


