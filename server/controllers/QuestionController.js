import { httpStatus } from '../config/packages';
import QuestionService from '../services/QuestionService';
import ApiError from '../utils/error/ApiError';
import successResponse from '../utils/successResponse';

/**
 * @class
 * @description
 * @exports QuestionController
 */
export default class QuestionController {
    /**
     * @method addQuestion
     * @description
     * @static
     * @param {object} req - Request object
     * @param {object} res - Response object
     * @param {object} next
     * @returns {object} JSON response
     * @memberof QuestionController
     */
    static async addQuestion(req, res, next) {
        const rsp = await QuestionService.addQuestion(req.body);
        if (!rsp.isSuccessful) {
            return next(new ApiError(rsp.message, rsp.status, rsp.isPublic));
        }
        successResponse(res, httpStatus.CREATED, rsp.message, rsp.data);
    }

    /**
     * @method getQuestions
     * @description
     * @static
     * @param {object} req - Request object
     * @param {object} res - Response object
     * @param {object} next
     * @returns {object} JSON response
     * @memberof QuestionController
     */
    static async getQuestions(req, res, next) {
        const rsp = await QuestionService.getQuestions();
        if (!rsp.isSuccessful) {
            return next(new ApiError(rsp.message, rsp.status, rsp.isPublic));
        }
        successResponse(res, httpStatus.OK, rsp.message, rsp.data);
    }

    /**
     * @method deleteQuestion
     * @description
     * @static
     * @param {object} req - Request object
     * @param {object} res - Response object
     * @param {object} next
     * @returns {object} JSON response
     * @memberof QuestionController
     */
    static async deleteQuestion(req, res, next) {
        const rsp = await QuestionService.deleteQuestion(req.params.id);
        if (!rsp.isSuccessful) {
            return next(new ApiError(rsp.message, rsp.status, rsp.isPublic));
        }
        successResponse(res, httpStatus.OK, rsp.message, rsp.data);
    }
}
