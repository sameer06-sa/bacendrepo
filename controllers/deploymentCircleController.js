const DeploymentCircle = require('../models/deploymentCircleModel');
const Deployment = require('../models/deploymentModel');

// Get all deployment circles
const getDeploymentCircles = async (req, res) => {
  try {
    const deploymentCircles = await DeploymentCircle.find();
    res.status(200).json(deploymentCircles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all project names for the dropdown
const getDeploymentProjects = async (req, res) => {
  try {
    const deployments = await Deployment.find();
    const projectNames = deployments.map((deployment) => deployment.projectName);
    res.status(200).json(projectNames);  // Return only project names
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new deployment circle linked to a deployment project
const createDeploymentCircle = async (req, res) => {
  const { name, projectName, startDate, endDate } = req.body;

  // Validate required fields
  if (!name || !projectName || !startDate || !endDate) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    // Check if the project exists in Deployment model
    const existingDeployment = await Deployment.findOne({ projectName });

    if (!existingDeployment) {
      return res.status(404).json({ message: 'Deployment project not found.' });
    }

    const newDeploymentCircle = new DeploymentCircle({
      name,
      projectName: existingDeployment.projectName,  // Use the existing project name
      startDate,
      endDate,
    });

    await newDeploymentCircle.save();
    res.status(201).json(newDeploymentCircle);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getDeploymentCircles, createDeploymentCircle, getDeploymentProjects };
