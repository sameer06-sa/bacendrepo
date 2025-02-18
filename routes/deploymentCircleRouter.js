const express = require('express');
const { getDeploymentCircles, createDeploymentCircle, getDeploymentProjects } = require('../controllers/deploymentCircleController');

const router = express.Router();

// Routes for deployment circles
router.get('/', getDeploymentCircles);  // Fetch all deployment circles
router.post('/', createDeploymentCircle);  // Create a new deployment circle
router.get('/projects', getDeploymentProjects);  // Fetch all project names for the dropdown

module.exports = router;
