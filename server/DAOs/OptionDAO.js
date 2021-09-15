import db from '../database/models';

/**
 * @class
 * @description
 * @exports OptionDAO
 */
export default class OptionDAO {
    /**
     * @method add
     * @description
     * @static
     * @param {object} option
     * @returns {object} JSON response
     * @memberof OptionDAO
     */
    static async add(option) {
        return db.Option.create(option);
    }
}
