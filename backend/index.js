const cookieParser = require("cookie-parser");
const express = require("express");
const dotenv = require("dotenv");
const db = require("./db/db.js");
const app = express();
const cors = require("cors");
const path = require("path");
const url = require("url");
const helmet = require("helmet");
const morgan = require("morgan");
const fileURLToPath = url.fileURLToPath;

// importing routes
const typesRoutes = require("./src/routes/types.js");
const projectRoutes = require("./src/routes/projectsRoutes.js");
const ContactRoute = require("./src/routes/contactRoutes.js");
const CareerRoute = require("./src/routes/CareerRoute.js");
const CareerPageRoute = require("./src/routes/careerPageRoute.js");
const employeeRoutes = require("./src/routes/employeRoute.js");
const helpDeskRoutes = require("./src/routes/helpdesk.js");
const teamRoutes = require("./src/routes/teams.js");
const getInTouchRoutes = require("./src/routes/GetInTouch.js");
const headquarteraddress = require("./src/routes/headquarter.js");
const branchesaddress = require("./src/routes/branchesRoute.js");
const AuthenticationRoute = require("./src/routes/auth.js");
const BlogRoute = require("./src/routes/blog.js");
const tagRoute = require("./src/routes/tagsRoutes.js");
const pagesRoute = require("./src/routes/pages.js");
const mainTagRoute = require('./src/routes/mainTagRoute.js')
const AboutPageRoute = require("./src/routes/aboutPageRoute.js");
const HomePageRoute = require("./src/routes/homePageRoute.js");
const BlogPageRoute = require('./src/routes/blogPageRoute.js')
const ClientTelle = require("./src/routes/ClientelleRoute.js");
const ValuesProvidedRoute = require('./src/routes/valuesProvidedRoute.js')
const klimARTRoute = require('./src/routes/klimARTRoute.js')
const currentVacancies = require('./src/routes/currentVacanciesRoute.js')


// middlewares
app.use(cookieParser()); // for parsing cookies
dotenv.config();
app.use(helmet());
app.use(morgan("combined"));
app.use(express.json());
app.use("/public", express.static(path.join(__dirname, "/uploads")));

app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? {
            origin: [
              "https://klimart.netlify.app/",
            
              "https://klimart-admin-panel.netlify.app/",
              "http://127.0.0.1:5173",
              "http://localhost:5173",
            ],
            credentials: true,
          }
        : { origin: ["http://127.0.0.1:5173" ,"http://localhost:5173"] },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "x-csrf-token"],
    credentials: true,
    maxAge: 600,
    exposedHeaders: ["*", "Authorization"],
  })
);
app.use(express.urlencoded({ extended: true }));

//routes section
const versionOne = (routeName) => {
  return `/api/v1/${routeName}`;
};
app.use(versionOne("getInTouch"), getInTouchRoutes);
app.use(versionOne("types"), typesRoutes);
app.use(versionOne("projects"), projectRoutes);
app.use(versionOne("employee"), employeeRoutes);
app.use(versionOne("team"), teamRoutes);
app.use(versionOne("helpdesk"), helpDeskRoutes);
app.use(versionOne("headqaurter"), headquarteraddress);
app.use(versionOne("branch"), branchesaddress);
app.use(versionOne("contact"), ContactRoute);
app.use(versionOne("career"), CareerRoute);
app.use(versionOne("careerpage"), CareerPageRoute);
app.use(versionOne("auth"), AuthenticationRoute);
app.use(versionOne("blog"), BlogRoute);
app.use(versionOne("tag"), tagRoute);
app.use(versionOne("pages"), pagesRoute);
app.use(versionOne("mainTag"), mainTagRoute);
app.use(versionOne("aboutpage"), AboutPageRoute);
app.use(versionOne("homepage"), HomePageRoute);
app.use(versionOne("blogpage"),BlogPageRoute);
app.use(versionOne("clientelle"),ClientTelle);
app.use(versionOne("valuesProvided") , ValuesProvidedRoute)
app.use(versionOne("klimART") , klimARTRoute)
app.use(versionOne("currentVacancies") , currentVacancies)
// app.use("/api/v1", );

// mongodb connection
app.listen(process.env.PORT, async () => {
  try {
    await db.connection;
    console.log(`server is running on ${process.env.PORT}`);
  } catch (error) {
    console.log(error);
  }
});
