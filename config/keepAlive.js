const Agent = require("agentkeepalive");
const axios = require("axios");
const maxConnectionPoolSize = require("../helpers/maxConnectionPoolSize");

// Create a reusable connection instance that can be passed around to different controllers
const keepAliveAgent = new Agent({
  // Divides 128(128 SNAT ports per Azure VM) by the number of cores on the current machine
  maxSockets: maxConnectionPoolSize(128),
  maxFreeSockets: 10,
  timeout: 60000, // active socket keepalive for 60 seconds
  freeSocketTimeout: 30000, // free socket keepalive for 30 seconds
});

const axiosInstance = axios.create({ httpAgent: keepAliveAgent });

module.exports = axiosInstance;
