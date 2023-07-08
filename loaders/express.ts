import dotenv from "dotenv";
import express, { Request, Response, NextFunction } from "express";
import { Application } from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import { IPAddressMiddleware, HeadersMiddleware } from "../middlewares";
import { AuthenticationModule, FileModule } from "../modules";
import { BadRequestParameterError } from "../lib/errors";

dotenv.config();

const app: Application = express();

app.use(cors());
app.use(morgan("tiny"));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: false }));
app.disable('x-powered-by')
app.use(helmet())

app.use(IPAddressMiddleware);
app.use(HeadersMiddleware);
app.disable("etag")

app.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.json({
            data: {
                message: "You have reached HouseHub API Services",
                version: "1.0.0"
            }
        });
    } catch (error) {
        next(error);
    }
});

app.use("/auth", AuthenticationModule.route);

// app.use("/file",
//     // UserMiddleware.authenticate,
//     FileModule.route
// );

// app.use("/user",
//     // UserMiddleware.authenticate,
//     // UserModule.route
// );


app.use("/throwError", (req: Request, res: Response, next: NextFunction) => {
    try {
        throw new BadRequestParameterError("This is a test error");
    } catch (e) {
        next(e);
    }
});

// catch 404 and forward to error handler
app.use(function (req: Request, res: Response) {
    res.status(404).json("Resource not found");
});

app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
    console.log(err);
    if (err.code) {
        res.status(err.code).json({
            name: err.name,
            message: err.message,
        });
    } else {
        res.status(500).json({
            name: "SOMETHING_WENT_WRONG",
            message: "Something went wrong at server side while handling request.",
        });
    }
});

export default app;