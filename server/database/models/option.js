import { Model } from 'sequelize';

module.exports = (sequelize, DataTypes) => {
    /**
     * @class
     * @description
     * @exports Option
     */
    class Option extends Model {
        /**
         * @method associate
         * @description
         * @static
         * @returns {object} JSON response
         * @memberof Option
         */
        static associate({ Question }) {
            // define association here
            this.belongsTo(Question, { foreignKey: 'questionId', as: 'question' });
        }

        /**
         * @method toJSON
         * @description
         * @returns {object} JSON response
         * @memberof Option
         */
        toJSON() {
            return { ...this.get() };
        }
    }
    Option.init({
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        option: {
            type: DataTypes.STRING
        }
    }, {
        sequelize,
        tableName: 'options',
        modelName: 'Option'
    });
    return Option;
};
