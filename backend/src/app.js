import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();

// const corsConfig = {
//     credentials: true,
//     origin: process.env.CORS_ORIGIN,
// };
var allowlist = [process.env.CORS_ORIGIN_DEV, process.env.CORS_ORIGIN_PROD];
const corsOptions = {
    credentials: true,
    optionsSuccessStatus: 200,
    origin: function (origin, callback) {
        // Check if the origin is allowed
        if (allowlist.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
};
app.options("*", cors(corsOptions));
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

// T E S T I N G    R O U T E
app.get("/", (_, res) => res.send(`Hello World ! by dlrc : 1st Feb 2024  `));

// U S E R    R O U T E S
import { router } from "./routes/student.routes.js";
app.use("/api/v1/student", router);

// A D M I N    R O U T E S
import { adminRouter } from "./routes/admin.routes.js";
app.use("/api/v1/admin", adminRouter);

//F I L E      R O U T E S
import { fileRouter } from "./routes/file.routes.js";
app.use("/api/v1/file", fileRouter);

export default app;
