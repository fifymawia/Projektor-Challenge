const NodeGeocoder = require('node-geocoder');

const options = {
  provider: 'mapquest',
  httpAdapter: 'https',
  apiKey:'EzGAskhVicGAI6OS5PEQGnOccTeRyotj',
  formatter: null
};

const geocoder = NodeGeocoder(options);

module.exports = geocoder;