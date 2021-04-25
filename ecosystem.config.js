module.exports = {
  apps: [
    {
      name: "ExpressAPI",
      script: "/app/server.js",
      // 0 sets node to spawn on all available CPU cores
      instances: 0,
      autorestart: true,
      max_memory_restart: "1G",
    },
  ],
};
