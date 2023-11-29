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



// app.use(cors())

// app.use(cors(
//  {
//     credentials: true,
//     origin: 'https://a6--monumental-begonia-f076c4.netlify.app',
//  }  
// ));



// const sessionOptions = {
//   secret: "any string",
//   resave: false,
//   saveUninitialized: false,
// };

// if (process.env.NODE_ENV !== "development") {
//   sessionOptions.proxy = true;
//   sessionOptions.cookie = {
//     sameSite: "none",
//     secure: true,
//   };
// }
// app.use(session(sessionOptions));

const app = express();
app.use(cors({
    credentials: true,
    origin: ["https://a6--monumental-begonia-f076c4.netlify.app","http://localhost:3000"]
  }
));
app.use(cookieParser());
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
 
// app.use((req, res, next) => {
//   const allowedOrigins = ["https://a6--monumental-begonia-f076c4.netlify.app","http://localhost:3000"];
//   const origin = req.headers.origin;
 

//   res.header("Access-Control-Allow-Origin", origin);
  
 
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, PATCH, OPTIONS");
//   res.header("Access-Control-Allow-Credentials", "true");
//   res.header("Cache-Control", "no-cache, no-store, must-revalidate");
//   next();
// });

app.use(express.json())

app.get('/env', (req, res) => res.send(process.env));

UserRoutes(app);
CourseRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);
Lab5(app);
Hello(app)

app.listen(process.env.PORT || 4000);      

