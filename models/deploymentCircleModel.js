const mongoose = require('mongoose');

const deploymentCircleSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // Name of the deployment circle
    projectName: { type: String, required: true, ref: 'Deployment' }, // Reference to Deployment
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('DeploymentCircle', deploymentCircleSchema);
