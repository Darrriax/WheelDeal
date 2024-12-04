import axios from "axios";
import login from "@/components/pages/login/Login.vue";
import {buildQueryParams} from "@/utils/utils.js";

const tokenData = localStorage.getItem('token');

let token = '';

export function setToken(newToken) {
    token = newToken;
}

const urls = {
    auth: {
        login: 'auth/login',
        logout: 'auth/logout',
        register: 'auth/register',
    },
    account: {
        profile: 'users/profile',
        email: 'users/email',
        phone: 'users/phone',
        user: 'users',
    },
    car: {
        cars: 'cars',
        search: 'cars/search',
        views: 'admin/car-view'
    },
    photo: {
        photos: 'api/photos',
    }
};

const defaultConfig = {
    baseURL: import.meta.env.VITE_APP_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    }
};

const defaultKafkaConfig = {
    baseURL: import.meta.env.VITE_APP_KAFKA_URL,
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
export const KafkaApiInstance = axios.create(defaultKafkaConfig);

export const FormDataApiInstance = axios.create(formDataConfig);

DefaultApiInstance.interceptors.request.use(function (config) {
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    } else {
        config.headers.Authorization = `Bearer ${tokenData}`;
    }
    return config;
});

KafkaApiInstance.interceptors.request.use(function (config) {
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
    register(name, surname, fatherName, password, email, phoneNumber, age, gender, additionalInfo) {
        const url = urls.auth.register;
        const data = {name, surname, fatherName, password, email, phoneNumber, age, gender, additionalInfo};
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
    // Отримуємо дані акаунту (name, surname, fatherName, password, email, phoneNumber, age, gender,
    // additionalInfo), а також дані про усі автівки цього продавця display_name, seller_id, car_type,
    // price, manufacturer, vin_code, price_currency, was_in_accident, is_trade, is_available, mileage,
    // technical_condition)
    getAccountData() {
        const url = urls.account.profile;
        return DefaultApiInstance.get(url);
    },
    // Тут оновлюємо суто дані користувача, якщо він щось не так ввів
    updateData(name, surname, fatherName, password, phoneNumber, age, gender, additionalInfo) {
        const url = urls.account.profile;

        // Перевірка поля password
        password = password && password.trim() ? password : null;

        const data = {
            name,
            surname,
            fatherName,
            password,
            phoneNumber,
            age,
            gender,
            additionalInfo
        };

        console.log(data); // Для перевірки даних перед відправкою
        return DefaultApiInstance.put(url, data);
    },
    // Тут оновлюємо email користувача і сетимо новий token
    updateEmail(newEmail) {
        const url = urls.account.email;
        const data = {newEmail};
        return DefaultApiInstance.put(url, data);
    },
    // Для отримання телефону користувача по його ID
    getPhone({userId}) {
        const url = urls.account.phone;
        const data = {userId};
        return DefaultApiInstance.post(url, data);
    },
    // Для отримання даних користувача по його ID
    getUserData(userId) {
        const url = `${urls.account.user}/${userId}`;
        return DefaultApiInstance.get(url);
    },
};

export const CarApi = {
    // Отримуємо дані авто display_name, seller_id, car_type, price, manufacturer, vin_code, price_currency,
    // was_in_accident, is_trade, is_available, mileage, technical_condition по його ID
    getCarDataById({car_id}) {
        const url = `${urls.car.cars}/${car_id}`;
        return DefaultApiInstance.get(url);
    },
    // Отримуємо всі автомобілі, які є у системі, відповідно до пошуку
    cars({manufacturer, bodyType, priceFrom, priceTo, mileageFrom, mileageTo, displayName, page, size}) {
        const query = buildQueryParams({
            manufacturer,
            bodyType,
            priceFrom,
            priceTo,
            mileageFrom,
            mileageTo,
            displayName,
            page,
            size
        });
        const url = query ? `${urls.car.search}?${query}` : urls.car.search;
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
    //Отримати кількість переглядів
    getCarViews({carId}) {
        const url = `${urls.car.views}/${carId}`;
        return KafkaApiInstance.get(url);
    }
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