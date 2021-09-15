import db from '../database/models';

/**
 * @class
 * @description
 * @exports QuestionDAO
 */
export default class QuestionDAO {
    /**
     * @method add
     * @description
     * @static
     * @param {object} question
     * @returns {object} JSON response
     * @memberof QuestionDAO
     */
    static async add(question) {
        return db.Question.create(question, {
            include: [{ model: db.Option, as: 'options' }]
        });
    }

    /**
     * @method getAll
     * @description
     * @static
     * @returns {object} JSON response
     * @memberof QuestionDAO
     */
    static async getAll() {
        return db.Category.findAll({
            include: [{
                model: db.Question,
                as: 'questions',
                include: [{
                    model: db.Option,
                    as: 'options'
                }]
            }]
        });
    }

    /**
     * @method getOne
     * @description
     * @static
     * @param {number} id
     * @returns {object} JSON response
     * @memberof QuestionDAO
     */
    static async getOne(id) {
        return db.Question.findOne({
            include: [{
                model: db.Option,
                as: 'options'
            }],
            where: { id }
        });
    }

    /**
     * @method update
     * @description
     * @static
     * @param {number} id
     * @param {object} data
     * @returns {object} JSON response
     * @memberof QuestionDAO
     */
    static async update(id, data) {
        return db.Question.update(data, { where: { id } });
    }

    /**
     * @method delete
     * @description
     * @static
     * @param {number} id
     * @returns {object} JSON response
     * @memberof QuestionDAO
     */
    static async delete(id) {
        return db.Question.destroy({ where: { id } });
    }
}
