import express from 'express'
import Hello from "./hello.js"
import Lab5 from "./Lab5.js";
import CourseRoutes from './courses/routes.js';
import ModuleRoutes from "./modules/routes.js";
import "dotenv/config";
import mongoose from "mongoose";
import cors from "cors";
import AssignmentRoutes from './assignments/routes.js';
import UserRoutes from "./users/routes.js";
import session from "express-session";

const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/kanbas'
mongoose.connect(CONNECTION_STRING);

const app = express()

app.use(cors())

// app.use(cors(
//  {
//     credentials: true,
//     origin: process.env.FRONTEND_URL,
//  }  
// ));



// const sessionOptions = {
//   secret: "any string",
//   resave: false,
//   saveUninitialized: false,
// };

// // if (process.env.NODE_ENV !== "development") {
// //   sessionOptions.proxy = true;
// //   sessionOptions.cookie = {
// //     sameSite: "none",
// //     secure: true,
// //   };
// // }
// app.use(session(sessionOptions));

app.use(express.json())

app.get('/env', (req, res) => res.send(process.env));

UserRoutes(app);
CourseRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);
Lab5(app);
Hello(app);

app.listen(process.env.PORT || 4000);      

