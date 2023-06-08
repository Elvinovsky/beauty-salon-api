import { body } from "express-validator";
import { servicesRepo } from "../../repositories/services-repo";

export const recordsValidation = [
    body('serviceTitle')
        .trim()
        .isLength({min: 3, max: 40})
        .withMessage("Длина строки должна быть от 3 до 20 символов")
        .bail()
        .isString()
        .withMessage("это не строка")
        .custom(async (serviceTitle: string) => {
            const validationTitle = await servicesRepo.getServiceByTitle(serviceTitle)
            if (!validationTitle) {
                throw new Error("Услуга не найдена");
            }
        }),

    body('dateMeeting').isISO8601().withMessage("Это не дата"),

    body('userName')
        .trim()
        .isLength({min: 3, max: 15})
        .withMessage("Длина строки должна быть от 3 до 20 символов")
        .bail()
        .isString()
        .withMessage("это не строка"),

    body('phoneNumber')
        .isMobilePhone("ru-RU"),
        //.withMessage('Введен некоректный номер телефона'),

    body('instagram')
        .optional()
        .isURL()
        .withMessage("Введена некоректная ссылка инстаграма")
]