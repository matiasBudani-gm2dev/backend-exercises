import {mapError} from "../utils/errorsMapper.js"
import logger from "../winstonLogs.js";

export function errorHandling(err, req, res, next) {

    logger.error(err)

    const mappedError = mapError(err);

    res.status(mappedError.statusCode).json({
        error: {
            type: mappedError.type,
            message: mappedError.message
        }
    })

}

export default {errorHandling};