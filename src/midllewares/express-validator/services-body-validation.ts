import { body } from "express-validator";
import { servicesRepo } from "../../repositories/services-repo";

export const servicesValidation = [
    body('title')
        .trim()
        .isLength({min: 3, max: 40})
        .withMessage("Длина строки должна быть от 3 до 20 символов")
        .bail()
        .isString()
        .withMessage("это не строка")
        .custom(async (title: string) => {
        const validationTitle = await servicesRepo.getServiceByTitle(title)
        if (validationTitle) {
            throw new Error("Название услуги не должно повторятся");
        }
    }),
    body('price')
        .isInt()
        .withMessage("Цена должна указываться в числовом значении")
]