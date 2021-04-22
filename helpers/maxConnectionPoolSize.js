const os = require("os");

// Divides 128(128 SNAT ports per Azure VM) by the number of cores on the current machine
const maxConnectionPoolSize = (max) => {
  try {
    if (!max || max < 1 || !os.cpus().length || os.cpus().length === 0) {
      // Return a base of 100 connections to be in the pool if the max parameter isn't provided or CPU cores is 0
      return 100;
    }
    // Since conn may be a float - explicitly parse it into an integer
    // Then round up to the nearest whole number and return this as the connection pool size
    const conn = max / os.cpus().length;
    return Math.ceil(parseInt(conn));
  } catch (error) {
    console.log(
      "An error has occurred while sizing the connection pool: ",
      error
    );
  }
};

module.exports = maxConnectionPoolSize;
