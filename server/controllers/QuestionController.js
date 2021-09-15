import { httpStatus } from '../config/packages';
import QuestionService from '../services/QuestionService';
import ApiError from '../utils/error/ApiError';
import successResponse from '../utils/successResponse';
import messages from '../utils/messages';

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
     * @memberof OnboardingController
     */
    static async addQuestion(req, res, next) {
        const rsp = await QuestionService.addQuestion(req.body);
        if (!rsp.isSuccessful) {
            return next(new ApiError(rsp.message, rsp.status, rsp.isPublic));
        }
        successResponse(res, httpStatus.CREATED, messages.questionAdded);
    }

    /**
     * @method getQuestions
     * @description
     * @static
     * @param {object} req - Request object
     * @param {object} res - Response object
     * @param {object} next
     * @returns {object} JSON response
     * @memberof OnboardingController
     */
    static async getQuestions(req, res, next) {
        const rsp = await QuestionService.getQuestions();
        if (!rsp.isSuccessful) {
            return next(new ApiError(rsp.message, rsp.status, rsp.isPublic));
        }
        successResponse(res, httpStatus.OK, messages.questionsRetrieved, rsp.data);
    }
}
