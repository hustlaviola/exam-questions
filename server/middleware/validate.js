import { validationResult } from 'express-validator';
import { httpStatus } from '../config/packages';
import ApiError from '../utils/error/ApiError';

const validate = async (req, res, next) => {
    // Finds validation errors in the request and wraps them in an array
    const errors = validationResult(req).array();

    if (errors.length) {
        const extractedErrors = [];
        errors.forEach(error => {
            const findError = extractedErrors.filter(err => err === error.msg);
            if (!findError.length) extractedErrors.push(error.msg);
        });
        const err = new ApiError(
            extractedErrors.length === 1 ? extractedErrors[0] : extractedErrors,
            httpStatus.BAD_REQUEST, true
        );
        return next(err);
    }
    return next();
};

export default validate;
