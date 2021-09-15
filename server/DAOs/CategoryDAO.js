import db from '../database/models';

/**
 * @class
 * @description
 * @exports CategoryDAO
 */
export default class CategoryDAO {
    /**
     * @method add
     * @description
     * @static
     * @param {object} category
     * @returns {object} JSON response
     * @memberof CategoryDAO
     */
    static async add(category) {
        return db.Category.create(category);
    }

    /**
     * @method categoryExists
     * @description
     * @static
     * @param {string} id
     * @returns {object} JSON response
     * @memberof CategoryDAO
     */
    static async categoryExists(id) {
        return (await db.Category.findByPk(id, { attributes: ['uuid'] })) !== null;
    }

    /**
     * @method getAll
     * @description
     * @static
     * @returns {object} JSON response
     * @memberof CategoryDAO
     */
    static async getAll() {
        return db.Category.findAll();
    }
}
