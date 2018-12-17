const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
require("dotenv").config({ path: "variables.env" });

const createServer = require("./createServer");
const db = require("./db");

const server = createServer();

// Use express middleware to handle cookies (JWT)
server.express.use(cookieParser());

// decode the JWT so we can get the user ID on each request
server.express.use((req, res, next) => {
  // Grab the token from the client directly from the cookies
  // With localStorage, we would have to send it explicitly over each request
  const { token } = req.cookies;
  if (token) {
    // take the userId
    const { userId } = jwt.verify(token, process.env.APP_SECRET); // APP_SECRET will make sure no one has addev values to the token
    // put the userId onto the req for future requests to access
    req.userId = userId;
  }

  // Will pass along the request
  next();
});

// Create a middleware that populates the user on each request
server.express.use(async (req, res, next) => {
  // if they aren't logged in, skip this
  if (!req.userId) return next();
  const user = await db.query.user(
    { where: { id: req.userId } },
    '{ id, permissions, email, name }'
  );
  req.user = user;
  next();
});

server.start(
  {
    // Let only the approved URLs access the server
    cors: {
      credentials: true,
      origin: process.env.FRONTEND_URL
    }
  },
  deets => {
    console.log(`Server is now running on port: ${deets.port}`);
  }
);
