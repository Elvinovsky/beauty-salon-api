import {
    body,
} from "express-validator";

export const postRecordsValidation = [
    body('serviceTitle')
        .trim()
        .isLength({min: 3, max: 40})
        .withMessage("Длина строки должна быть от 3 до 20 символов")
        .bail()
        .isString()
        .withMessage("это не строка"),

    body('dateMeeting').isISO8601().withMessage("Это не дата"),

    body('userName')
        .trim()
        .isLength({min: 3, max: 15})
        .withMessage("Длина строки должна быть от 3 до 20 символов")
        .bail()
        .isString()
        .withMessage("это не строка"),

    body('phoneNumber')
        .isMobilePhone("ru-RU")
        .withMessage('Введен некоректный номер телефона'),

    body('instagram')
        .optional()
        .isURL()
        .withMessage("Введена некоректная ссылка инстаграма")
]

export const putRecordsValidation = [
    body('serviceTitle')
        .optional()
        .trim()
        .isLength({min: 3, max: 40})
        .withMessage("Длина строки должна быть от 3 до 20 символов")
        .bail()
        .isString()
        .withMessage("это не строка"),

    body('dateMeeting').optional().isISO8601().withMessage("Это не дата"),

    body('userName').optional()
        .trim()
        .isLength({min: 3, max: 15})
        .withMessage("Длина строки должна быть от 3 до 20 символов")
        .bail()
        .isString()
        .withMessage("это не строка"),

    body('instagram')
        .optional()
        .isURL()
        .withMessage("Введена некоректная ссылка инстаграма")
]