module.exports = {
    up: async (queryInterface, DataTypes) => {
        await queryInterface.createTable('options', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            questionId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
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
            },
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE
            },
            updatedAt: {
                allowNull: false,
                type: DataTypes.DATE
            }
        });
    },
    down: async queryInterface => {
        await queryInterface.dropTable('options');
    }
};
