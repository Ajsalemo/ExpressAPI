const Agent = require("agentkeepalive");
const axios = require("axios");

// Create a reusable connection instance that can be passed around to different controllers
const keepAliveAgent = new Agent({
  // 128 per VM on Azure
  maxSockets: 128,
  maxFreeSockets: 10,
  timeout: 60000, // active socket keepalive for 60 seconds
  freeSocketTimeout: 30000, // free socket keepalive for 30 seconds
});

const axiosInstance = axios.create({ httpAgent: keepAliveAgent });

module.exports = axiosInstance;
