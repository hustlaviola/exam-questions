import { body, param } from 'express-validator';

const validator = method => {
    switch (method) {
    case 'add_question':
        return [
            body('categoryId')
                .exists()
                .withMessage('categoryId is required')
                .isInt()
                .withMessage('categoryId must be a non decimal number'),
            body('question')
                .exists()
                .withMessage('question is required')
                .isLength({ min: 2, max: 1000 })
                .withMessage('question must be in the range of 2 to 1000 characters')
        ];
    case 'update_question':
        return [
            param('id')
                .exists()
                .withMessage('id is required')
                .isInt()
                .withMessage('id must be a non decimal number'),
            body('categoryId')
                .optional()
                .isInt()
                .withMessage('categoryId must be a non decimal number'),
            body('question')
                .optional()
                .isLength({ min: 2, max: 1000 })
                .withMessage('question must be in the range of 2 to 1000 characters')
        ];
    case 'id':
        return [
            param('id')
                .exists()
                .withMessage('id is required')
                .isInt()
                .withMessage('id must be a non decimal number')
        ];
    default:
        break;
    }
};

export default validator;
