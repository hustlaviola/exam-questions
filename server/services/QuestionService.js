import { httpStatus, debug } from '../config/packages';
import messages from '../utils/messages';
import CategoryDAO from '../DAOs/CategoryDAO';
import QuestionDAO from '../DAOs/QuestionDAO';

const log = debug('app:question-service');
/**
 * @class
 * @description
 * @exports QuestionService
 */
export default class QuestionService {
    /**
     * @method addQuestion
     * @description
     * @static
     * @param {object} question
     * @returns {object} JSON response
     * @memberof QuestionService
     */
    static async addQuestion(question) {
        try {
            const categoryExists = await CategoryDAO.categoryExists(question.categoryId);
            if (!categoryExists) {
                return {
                    isSuccessful: false,
                    status: httpStatus.NOT_FOUND,
                    message: messages.categoryNotFound,
                    isPublic: true
                };
            }
            const res = await QuestionDAO.add({
                categoryId: question.categoryId,
                body: question.body,
                Options: question.options
            });
            log(res.dataValues);
            return {
                isSuccessful: true
            };
        } catch (error) {
            log('An error occurred while adding question', error);
            return {
                isSuccessful: false,
                status: httpStatus.INTERNAL_SERVER_ERROR,
                message: error,
                isPublic: false
            };
        }
    }

    /**
     * @method getQuestion
     * @description
     * @static
     * @returns {object} JSON response
     * @memberof QuestionService
     */
    static async getQuestions() {
        try {
            const questions = await QuestionDAO.getAll();
            log(questions);
            return {
                isSuccessful: true,
                data: { questions }
            };
        } catch (error) {
            log('An error occurred while adding question', error);
            return {
                isSuccessful: false,
                status: httpStatus.INTERNAL_SERVER_ERROR,
                message: error,
                isPublic: false
            };
        }
    }
}
