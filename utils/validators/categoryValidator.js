const { check } = require('express-validator');
const validatorMiddleware = require('./../../middlewares/validatorMiddleware');

exports.getCategoryValidator = [
    check('id').isMongoId().withMessage('Invalid Category Id Format'),
    validatorMiddleware
];

exports.createCategoryValidator = [
    check('name')
        .notEmpty().withMessage('Category name is required')
        .isLength({min : 3}).withMessage('Too short category name')
        .isLength({max : 32}).withMessage('Too Long category name'),
        validatorMiddleware,
];

exports.updateCategoryValidator = [
    check('id').isMongoId().withMessage('Invalid Category Id Format'),
    validatorMiddleware
];

exports.deleteCategoryValidator = [
    check('id').isMongoId().withMessage('Invalid Category Id Format'),
    validatorMiddleware
];