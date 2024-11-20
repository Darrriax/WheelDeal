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
        notification: 'api/email/verification-notification/',
        csrfToken: 'sanctum/csrf-cookie/',
        forgotPassword: 'api/forgot-password/',
        resetPassword: 'api/reset-password/',
    },
    account: {
        profile: 'api/account/profile/',
        update: 'api/account/update/',
        password: 'api/account/password/',
        avatar: 'api/account/avatar/',
        cars: 'api/account/cars/',
    },
    users: {

    },
    cars: {
        cars: 'api/cars/',
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
    sanctum() {
        const url = urls.auth.csrfToken;
        return DefaultApiInstance.get(url);
    },
    register(name, surname, email, phone, gender, birthday, password, password_confirmation) {
        const url = urls.auth.register;
        const data = {name, surname, email, phone, gender, birthday, password, password_confirmation};
        return DefaultApiInstance.post(url, data);
    },
    login(email, password) {
        const url = urls.auth.login;
        const data = {email, password};
        return DefaultApiInstance.post(url, data);
    },
    logout() {
        const url = urls.auth.logout;
        return DefaultApiInstance.post(url);
    },
    notify() {
        const url = urls.auth.notification;
        return DefaultApiInstance.post(url)
    },
    forgotPassword(email) {
        const url = urls.auth.forgotPassword;
        const data = {email};
        return DefaultApiInstance.post(url, data);
    },
    resetPassword(reset_token, email, password, password_confirmation) {
        const url = urls.auth.resetPassword;
        const data = {token: reset_token, email, password, password_confirmation};
        return DefaultApiInstance.post(url, data);
    },
};

export const AccountApi = {
    getAccountData() {
        const url = urls.account.profile;
        return DefaultApiInstance.get(url);
    },
    updateAvatar(avatar) {
        const url = urls.account.avatar;
        return FormDataApiInstance.post(url, avatar);
    },
    loadFiles(files) {
        const url = urls.account.files;
        return FormDataApiInstance.post(url, files);
    },
    updateData(name, surname, patronymic, email, phone, gender, birthday) {
        const url = urls.account.update;
        const data = {name, surname, patronymic, email, phone, gender, birthday};
        return DefaultApiInstance.put(url, data);
    },
    updatePassword(current_password, password, password_confirmation) {
        const url = urls.account.password;
        const data = {current_password, password, password_confirmation};
        return DefaultApiInstance.put(url, data);
    },
};

export const UserApi = {
    getUser(id) {
        const url = urls.users.user + id;
        return DefaultApiInstance.get(url);
    },
    searchUser({text, page, gender, car_id}) {
        const query = buildQueryParams({text, page, gender, car_id});
        const url = query ? `${urls.users.user}?${query}` : urls.users.user;
        return DefaultApiInstance.get(url);
    },
    liveSearchUsers({search, gender, car_id}) {
        const query = buildQueryParams({search, gender, car_id});
        const url = query ? `${urls.users.usersLiveSearch}?${query}` : urls.users.usersLiveSearch;
        return DefaultApiInstance.get(url);
    },
};

export const CarApi = {}

export const PhotosApi = {
    getPhoto(id) {
        const url = urls.photo.photos + id;
        return DefaultApiInstance.get(url);
    },
    createPhoto(formData) {
        const url = urls.photo.photos;
        return FormDataApiInstance.post(url, formData);
    },
    updatePhoto(id, name, date, users, description) {
        const url = urls.photo.photos + id;
        const data = {name, date, users, description};
        return DefaultApiInstance.put(url, data);
    },
    deletePhoto(id) {
        const url = urls.photo.photos + id;
        return DefaultApiInstance.delete(url);
    },
};