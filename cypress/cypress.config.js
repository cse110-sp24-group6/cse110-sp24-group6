const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    viewportWidth: 1920,
    viewportHeight: 1080,
    defaultCommandTimeout: 6000,
    pageLoadTimeout: 60000,
    supportFile: false  // Disable support file if not needed
  }
});
