import express from 'express';

const router = express.Router();

// Health check endpoint
router.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'API is running' });
});

// Add your application routes here
// Example:
// router.get('/your-endpoint', yourController.handleRequest);

export default router; 