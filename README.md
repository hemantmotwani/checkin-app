# Check-in App

A QR code based check-in system for nonprofit organizations.

## Features

- QR code generation and scanning
- Real-time check-in tracking
- User management
- Event management
- Analytics dashboard

## Tech Stack

- Frontend: React + Vite
- Backend: Node.js + Express
- Database: PostgreSQL
- Authentication: JWT
- QR Code: qrcode.js

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/checkin-app.git
cd checkin-app
```

2. Install dependencies:
```bash
npm install
cd ui && npm install
cd ../service && npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Set up the database:
```bash
# Create database and run migrations
```

## Development

Run the development server:

```bash
# Start both frontend and backend
npm run dev

# Or start them separately
npm run dev:ui
npm run dev:service
```

The frontend will be available at `http://localhost:5173` and the backend at `http://localhost:3000`.

## Building for Production

```bash
# Build the frontend
cd ui && npm run build

# Start the production server
npm start
```

## Project Structure

```
checkin-app/
├── ui/                 # Frontend React application
├── service/           # Backend Node.js service
├── server.js          # Main server entry point
├── package.json       # Root package.json
└── README.md         # This file
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License - see the LICENSE file for details.
