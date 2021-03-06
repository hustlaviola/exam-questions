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
            this.belongsTo(Question, {
                foreignKey: {
                    name: 'questionId',
                    allowNull: false
                },
                as: 'question',
                onDelete: 'CASCADE',
                hooks: true
            });
        }

        /**
         * @method toJSON
         * @description
         * @returns {object} JSON response
         * @memberof Option
         */
        toJSON() {
            return { ...this.get(), isCorrect: undefined };
        }
    }
    Option.init({
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        option: {
            type: DataTypes.STRING
        },
        isCorrect: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, {
        sequelize,
        tableName: 'options',
        modelName: 'Option'
    });
    return Option;
};
