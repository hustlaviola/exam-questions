import { httpStatus, debug } from '../config/packages';
import messages from '../utils/messages';
import CategoryDAO from '../DAOs/CategoryDAO';

const log = debug('app:catgory-service');

/**
 * @class
 * @description
 * @exports CategoryService
 */
export default class CategoryService {
    /**
     * @method getCategories
     * @description
     * @static
     * @returns {object} JSON response
     * @memberof CategoryService
     */
    static async getCategories() {
        try {
            const categories = await CategoryDAO.getAll();

            return {
                isSuccessful: true,
                message: messages.categoriesRetrieved,
                data: { categories }
            };
        } catch (error) {
            log('An error occurred while retrieving categories', error);

            return {
                isSuccessful: false,
                status: httpStatus.INTERNAL_SERVER_ERROR,
                message: error,
                isPublic: false
            };
        }
    }
}
