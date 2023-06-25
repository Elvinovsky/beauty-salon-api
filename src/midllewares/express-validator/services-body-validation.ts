import { body } from "express-validator";
import { ServicesRepo } from "../../repositories/services-repo";
import { container } from "../../inversify";

export const servicesValidation = [
    body('title')
        .trim()
        .isLength({min: 3, max: 40})
        .withMessage("Длина строки должна быть от 3 до 20 символов")
        .bail()
        .isString()
        .withMessage("это не строка")
        .custom(async (title: string) => {
        const validationTitle = await container.get(ServicesRepo).getServiceByTitle(title)
        if (validationTitle) {
            throw new Error("Название услуги не должно повторятся");
        }
    }),
    body('price')
        .isInt()
        .withMessage("Цена должна указываться в числовом значении")
]