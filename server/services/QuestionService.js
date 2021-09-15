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
     * @param {object} questionObj
     * @returns {object} JSON response
     * @memberof QuestionService
     */
    static async addQuestion(questionObj) {
        try {
            const { categoryId, question, options } = questionObj;
            const categoryExists = await CategoryDAO.categoryExists(categoryId);

            if (!categoryExists) {
                return {
                    isSuccessful: false,
                    status: httpStatus.NOT_FOUND,
                    message: messages.categoryNotFound,
                    isPublic: true
                };
            }

            const category = await QuestionDAO.add({
                categoryId,
                question,
                options
            });

            log(category);
            return {
                isSuccessful: true,
                message: messages.questionAdded,
                data: { category }
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
            const categories = await QuestionDAO.getAll();

            return {
                isSuccessful: true,
                message: messages.questionsRetrieved,
                data: { categories }
            };
        } catch (error) {
            log('An error occurred while retrieving questions', error);

            return {
                isSuccessful: false,
                status: httpStatus.INTERNAL_SERVER_ERROR,
                message: error,
                isPublic: false
            };
        }
    }

    /**
     * @method deleteQuestion
     * @description
     * @static
     * @param {number} id
     * @returns {object} JSON response
     * @memberof QuestionService
     */
    static async deleteQuestion(id) {
        try {
            const res = await QuestionDAO.deleteQuestion(id);

            if (!res) {
                return {
                    isSuccessful: false,
                    status: httpStatus.NOT_FOUND,
                    message: messages.questionNotFound,
                    isPublic: true
                };
            }

            return {
                isSuccessful: true,
                message: messages.questionDeleted
            };
        } catch (error) {
            log('An error occurred while deleting question', error);

            return {
                isSuccessful: false,
                status: httpStatus.INTERNAL_SERVER_ERROR,
                message: error,
                isPublic: false
            };
        }
    }
}
