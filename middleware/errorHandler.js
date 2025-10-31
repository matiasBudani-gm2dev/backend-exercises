import {mapError} from "../utils/errorsMapper.js"

export function errorHandling(err, req, res, next) {

    console.log(err)

    const mappedError = mapError(err);

    res.status(mappedError.statusCode).json({
        error: {
            type: mappedError.type,
            message: mappedError.message
        }
    });

}

export function notFoundHandler (req, res, next) {
    res.status(404).json({
        error: {
            type: "Not Found",
            message: "The requested route does not exist"
        }
    });
}

export default {errorHandling, notFoundHandler};