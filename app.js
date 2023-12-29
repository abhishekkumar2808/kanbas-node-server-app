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

try{
 await mongoose.connect(CONNECTION_STRING);
}
catch(error){
  console.log("eoorr", error.message)
}






const app = express();

app.use(cors({
    credentials: true,
    origin: ["https://a6--monumental-begonia-f076c4.netlify.app","http://localhost:3000"]
  }
));

app.use(
  session({
    secret: "any string",
    resave: false,
    proxy: true,
    saveUninitialized: false,
    cookie: {
      sameSite: "none",
      secure: true
    }
  })
);
 

app.use(express.json())

app.get('/env', (req, res) => res.send(process.env));

UserRoutes(app);
CourseRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);
Lab5(app);
Hello(app);

app.listen(process.env.PORT || 4000);      

