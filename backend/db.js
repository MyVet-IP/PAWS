// Re-export the shared database instance from storage/db.js
// All storage files in backend/storage/ use require('../db') — this ensures
// they all share the same Pool instance initialized at startup.
module.exports = require('./storage/db');
