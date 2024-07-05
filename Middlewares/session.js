const session = require('express-session');
require("dotenv").config();

module.exports = (app) => {
    // Ensure a secret is provided for session security
    if (!process.env.SECRET) {
      throw new Error('Missing environment variable: SECRET. Please set a secret for session security.');
    }
  
    // Configure session middleware with security best practices
    app.use(session({
      secret: process.env.SECRET,
      resave: false,
      saveUninitialized: true,
      cookie: { secure: true, httpOnly: true }, // HTTPS-only, prevent client-side scripts from accessing cookies
    }));
  
    // Middleware to handle session messages
    app.use((req, res, next) => {
      // Retrieve message from session (if present)
      res.locals.message = req.session.message;
  
      // Clear message from session after retrieval
      delete req.session.message;
  
      next();
    });
  };