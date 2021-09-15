import { Model } from 'sequelize';

module.exports = (sequelize, DataTypes) => {
    /**
     * @class
     * @description
     * @exports Category
     */
    class Category extends Model {
        /**
         * @method associate
         * @description
         * @static
         * @returns {object} JSON response
         * @memberof Category
         */
        static associate({ Question }) {
            // define association here
            this.hasMany(Question, {
                foreignKey: 'categoryId',
                as: 'questions',
                onDelete: 'cascade'
            });
        }

        /**
         * @method toJSON
         * @description
         * @returns {object} JSON response
         * @memberof Category
         */
        toJSON() {
            return { ...this.get() };
        }
    }
    Category.init({
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        category: {
            type: DataTypes.ENUM,
            values: ['technical', 'aptitude', 'logical']
        }
    }, {
        sequelize,
        tableName: 'categories',
        modelName: 'Category'
    });
    return Category;
};
