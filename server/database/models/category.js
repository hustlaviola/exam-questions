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
            this.hasMany(Question, { foreignKey: 'categoryId', as: 'questions' });
        }

        /**
         * @method toJSON
         * @description
         * @returns {object} JSON response
         * @memberof Category
         */
        toJSON() {
            return { ...this.get(), id: undefined };
        }
    }
    Category.init({
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        name: {
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
