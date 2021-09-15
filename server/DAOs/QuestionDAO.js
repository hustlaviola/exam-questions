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
        return db.Category.findAll({ include: [{ model: db.Question, as: 'questions', include: [{ model: db.Option, as: 'options' }] }] });
    }
}
