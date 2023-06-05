import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const AppointmentForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);
    const [service, setService] = useState('');
    const [price, setPrice] = useState('');

    const handleFormSubmit = (e) => {
        e.preventDefault();

        // Создание объекта с данными клиента
        const newCustomer = {
            name,
            email,
            date: selectedDate,
            service,
            price
        };

        // Отправка запроса на сервер
        fetch('/customers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newCustomer)
        })
            .then(response => {
                if (response.ok) {
                    console.log('Клиент успешно сохранен');
                    // Дополнительная логика или обновление состояния при успешном сохранении клиента
                } else {
                    console.error('Ошибка при сохранении клиента');
                }
            })
            .catch(error => {
                console.error('Ошибка при отправке запроса:', error);
            });
    };

    return (
        <div>
            <h2>Запись на прием</h2>
            <form onSubmit={handleFormSubmit}>
                <div>
                    <label htmlFor="name">Имя:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="date">Дата:</label>
                    <DatePicker
                        id="date"
                        selected={selectedDate}
                        onChange={date => setSelectedDate(date)}
                        dateFormat="dd.MM.yyyy"
                        placeholderText="Выберите дату"
                    />
                </div>
                <div>
                    <label htmlFor="service">Услуга:</label>
                    <input
                        type="text"
                        id="service"
                        value={service}
                        onChange={e => setService(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="price">Цена:</label>
                    <input
                        type="text"
                        id="price"
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                    />
                </div>
                <button type="submit">Записаться</button>
            </form>
        </div>
    );
};

export default AppointmentForm;
