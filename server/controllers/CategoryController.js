import { httpStatus } from '../config/packages';
import CategoryService from '../services/CategoryService';
import ApiError from '../utils/error/ApiError';
import successResponse from '../utils/successResponse';

/**
 * @class
 * @description
 * @exports CategoryController
 */
export default class CategoryController {
    /**
     * @method getCategories
     * @description
     * @static
     * @param {object} req - Request object
     * @param {object} res - Response object
     * @param {object} next
     * @returns {object} JSON response
     * @memberof CategoryController
     */
    static async getCategories(req, res, next) {
        const rsp = await CategoryService.getCategories();
        if (!rsp.isSuccessful) {
            return next(new ApiError(rsp.message, rsp.status, rsp.isPublic));
        }
        successResponse(res, httpStatus.OK, rsp.message, rsp.data);
    }
}
