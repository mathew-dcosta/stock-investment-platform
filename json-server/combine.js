const fs = require('fs');
const path = require('path');

// Read both JSON files
const pricingData = JSON.parse(fs.readFileSync(path.join(__dirname, 'pricing.json'), 'utf8'));
const detailsData = JSON.parse(fs.readFileSync(path.join(__dirname, 'details.json'), 'utf8'));
const holdingsData = JSON.parse(fs.readFileSync(path.join(__dirname, 'holdings.json'), 'utf8'));

// Combine them
const combinedData = {
  ...pricingData,
  ...detailsData,
  ...holdingsData
};

// Write to a temporary combined file
fs.writeFileSync(path.join(__dirname, 'combined.json'), JSON.stringify(combinedData, null, 2));

console.log('Combined JSON file created successfully!');