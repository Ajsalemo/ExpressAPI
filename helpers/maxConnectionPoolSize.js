const os = require("os");

// Divides 128(128 SNAT ports per Azure VM) by the number of cores on the current machine
const maxConnectionPoolSize = (max) => {
  return max / os.cpus().length;
};

module.exports = maxConnectionPoolSize;
