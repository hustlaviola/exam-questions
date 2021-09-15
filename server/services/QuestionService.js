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

            if (options.length !== 4) {
                return {
                    isSuccessful: false,
                    status: httpStatus.BAD_REQUEST,
                    message: messages.optionsLength4,
                    isPublic: true
                };
            }

            const categoryExists = await CategoryDAO.categoryExists(categoryId);

            if (!categoryExists) {
                return {
                    isSuccessful: false,
                    status: httpStatus.NOT_FOUND,
                    message: messages.categoryNotFound,
                    isPublic: true
                };
            }

            await QuestionDAO.add({
                categoryId,
                question,
                options
            });

            return {
                isSuccessful: true,
                message: messages.questionAdded
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
     * @method getQuestions
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
     * @method getQuestion
     * @description
     * @static
     * @param {number} id
     * @returns {object} JSON response
     * @memberof QuestionService
     */
    static async getQuestion(id) {
        try {
            const question = await QuestionDAO.getOne(id);

            if (!question) {
                return {
                    isSuccessful: false,
                    status: httpStatus.NOT_FOUND,
                    message: messages.questionNotFound,
                    isPublic: true
                };
            }

            return {
                isSuccessful: true,
                message: messages.questionRetrieved,
                data: { question }
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

    /**
     * @method updateQuestion
     * @description
     * @static
     * @param {number} id
     * @param {object} data
     * @returns {object} JSON response
     * @memberof QuestionService
     */
    static async updateQuestion(id, data) {
        try {
            if (data.categoryId) {
                const categoryExists = await CategoryDAO.categoryExists(data.categoryId);

                if (!categoryExists) {
                    return {
                        isSuccessful: false,
                        status: httpStatus.NOT_FOUND,
                        message: messages.categoryNotFound,
                        isPublic: true
                    };
                }
            }

            const result = await QuestionDAO.update(id, data);

            if (!result[0]) {
                return {
                    isSuccessful: false,
                    status: httpStatus.NOT_FOUND,
                    message: messages.questionNotFound,
                    isPublic: true
                };
            }

            return {
                isSuccessful: true,
                message: messages.questionUpdated
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
            const result = await QuestionDAO.delete(id);

            if (!result) {
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
