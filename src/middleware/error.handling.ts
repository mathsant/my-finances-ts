import {NextFunction, Request, Response} from "express";
require("express-async-errors")
function errorHandling(err: Error, request: Request, response: Response, next: NextFunction) {
    if (err instanceof Error) {
        return response.status(400).json({
            message: err.message,
        });
    }

    return response.status(500).json({
        status: "error",
        message: "Internal server error",
    });
}

export { errorHandling }