import axios from "axios";
import {decryptData} from "../utils/encryption";
import {buildQueryParams} from "../utils/utils";

const tokenData = decryptData(localStorage.getItem('token'));

let token = '';

export function setToken(newToken) {
    token = newToken;
}

const urls = {
    auth: {
        login: 'api/login/',
        logout: 'api/logout/',
        register: 'api/register/',
    },
    account: {
        profile: 'api/account/profile/',
        update: 'api/account/update/',
    },
    car: {
        cars: 'api/cars/',
        show: 'api/car/',
        create: 'api/car/create',
    },
    photo: {
        photos: 'api/photos/',
    }
};

const defaultConfig = {
    baseURL: import.meta.env.VITE_APP_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    }
};

const formDataConfig = {
    baseURL: import.meta.env.VITE_APP_BASE_URL,
    headers: {
        'Content-Type': 'multipart/form-data',
        'Access-Control-Allow-Origin': '*',
    }
};

export const DefaultApiInstance = axios.create(defaultConfig);

export const FormDataApiInstance = axios.create(formDataConfig);

DefaultApiInstance.interceptors.request.use(function (config) {
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    } else {
        config.headers.Authorization = `Bearer ${tokenData}`;
    }
    return config;
});

FormDataApiInstance.interceptors.request.use(function (config) {
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    } else {
        config.headers.Authorization = `Bearer ${tokenData}`;
    }
    return config;
});

export const AuthApi = {
    // Вказуємо всю необхідну інформацію, щоб зареєструватися і мати доступ до системи
    register(name, surname, father_name, password, email, phone_number, age, gender, additional_info) {
        const url = urls.auth.register;
        const data = {name, surname, father_name, password, email, phone_number, age, gender, additional_info};
        return DefaultApiInstance.post(url, data);
    },
    // Після реєстрації можемо залогінитися на допомогою імейлу та паролю
    login(email, password) {
        const url = urls.auth.login;
        const data = {email, password};
        return DefaultApiInstance.post(url, data);
    },
    // Вийти з системи
    logout() {
        const url = urls.auth.logout;
        return DefaultApiInstance.post(url);
    },
};

export const AccountApi = {
    // Отримуємо дані акаунту (name, surname, father_name, password, email, phone_number, age, gender,
    // additional_info), а також дані про усі автівки цього продавця display_name, seller_id, car_type,
    // price, manufacturer, vin_code, price_currency, was_in_accident, is_trade, is_available, mileage,
    // technical_condition)
    getAccountData() {
        const url = urls.account.profile;
        return DefaultApiInstance.get(url);
    },
    // Тут оновлюємо суто дані користувача, якщо він щось не так ввів
    updateData(name, surname, father_name, email, password, phone_number, age, gender, additional_info) {
        const url = urls.account.update;
        const data = {name, surname, father_name, email, password, phone_number, age, gender, additional_info};
        return FormDataApiInstance.post(url, data);
    },
};

export const CarApi = {
    // Отримуємо всі автомобілі, які є у системі
    cars() {
        const url = urls.car.cars;
        return DefaultApiInstance.get(url);
    },
    // Отримуємо дані авто display_name, seller_id, car_type, price, manufacturer, vin_code, price_currency,
    // was_in_accident, is_trade, is_available, mileage, technical_condition по його ID
    getCarDataById(car_id) {
        const url = urls.car.show + car_id;
        return DefaultApiInstance.get(url);
    },
    // Створюємо авто
    createCar(display_name, seller_id, car_type, price, manufacturer, vin_code, price_currency, was_in_accident, is_trade, is_available, mileage, technical_condition) {
        const url = urls.car.create;
        const data = {
            display_name,
            seller_id,
            car_type,
            price,
            manufacturer,
            is_trade,
            is_available,
            mileage,
            technical_condition
        };
        return DefaultApiInstance.post(url, data);
    },
    // Видаляємо авто по його ID
    removeCar(car_id) {
        const url = urls.car.show + car_id;
        return DefaultApiInstance.delete(url);
    },
    // Для редагування даних про автомобіль
    carForEditById(car_id) {
        const url = urls.car.show + car_id + '/edit';
        return DefaultApiInstance.get(url);
    },
    // Для оновлення даних про авто
    updateCarData(display_name, seller_id, car_type, price, manufacturer, vin_code, price_currency, was_in_accident, is_trade, is_available, mileage, technical_condition) {
        const url = urls.car.show;
        const data = {
            display_name,
            seller_id,
            car_type,
            price,
            manufacturer,
            is_trade,
            is_available,
            mileage,
            technical_condition
        };
        return FormDataApiInstance.post(url, data);
    },
}

export const PhotosApi = {
    // Отримуємо всі завантажені фото автомобіля по його ID, при цьому те фото, що має тег is_main буде головним
    getCarPhotos(car_id) {
        const url = urls.photo.photos + car_id;
        return DefaultApiInstance.get(url);
    },
    // Завантаження фотографій
    createPhoto(car_id, formData) {
        const url = urls.photo.photos + car_id;
        return FormDataApiInstance.post(url, formData);
    },
    // Видалення фотографій
    deletePhoto(car_id, photo_id) {
        const url = urls.photo.photos + car_id + photo_id;
        return DefaultApiInstance.delete(url);
    },
};