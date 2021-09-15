module.exports = {
    up: async queryInterface => {
        await queryInterface.bulkInsert('categories', [{
            uuid: '3ab8ecc2-ae06-477c-acb1-bf712101010c',
            category: 'technical',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            uuid: '45da577e-e9c9-4629-bcaa-54eb5d49b8eb',
            category: 'aptitude',
            createdAt: new Date(),
            updatedAt: new Date()
        }, {
            uuid: '76c02c6a-b8d3-40fc-8cff-c966b3e2fbf2',
            category: 'logical',
            createdAt: new Date(),
            updatedAt: new Date()
        }], {});
    },

    down: async queryInterface => {
        await queryInterface.bulkDelete('categories', null, {});
    }
};
