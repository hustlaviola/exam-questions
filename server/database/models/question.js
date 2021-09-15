import { Model } from 'sequelize';

module.exports = (sequelize, DataTypes) => {
    /**
     * @class
     * @description
     * @exports Question
     */
    class Question extends Model {
        /**
         * @method associate
         * @description
         * @static
         * @returns {object} JSON response
         * @memberof Question
         */
        static associate({ Category, Option }) {
            // define association here
            this.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });
            this.hasMany(Option, { foreignKey: 'questionId', as: 'options' });
        }

        /**
         * @method toJSON
         * @description
         * @returns {object} JSON response
         * @memberof Question
         */
        toJSON() {
            return { ...this.get() };
        }
    }
    Question.init({
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        question: {
            type: DataTypes.STRING
        }
    }, {
        sequelize,
        tableName: 'questions',
        modelName: 'Question'
    });
    return Question;
};
