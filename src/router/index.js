import {createRouter, createWebHistory} from 'vue-router/dist/vue-router.esm-bundler';
import Registration from "../components/pages/login/Registration.vue";
import Login from "../components/pages/login/Login.vue";
import Profile from "../components/pages/account/Profile.vue";

import AllUsers from "../components/pages/user/AllUsers.vue";
import User from "../components/pages/user/User.vue";

import Cars from '../components/pages/car/Cars.vue';
import Car from "../components/pages/car/Car.vue";
import AddCar from "../components/pages/car/AddCar.vue";

import NotFound from "../components/pages/errors/NotFound.vue";

const routes = [
    {
        path: '/',
        redirect: '/profile',
    },
    {
        path: '/registration',
        component: Registration,
        name: 'registration',
        meta: {
            requiresAuth: false,
            title: 'Реєстрація особистого кабінету',
            metaTags: [
                {
                    name: 'description',
                    content: 'Зареєструйтеся на WheelDeal, щоб почати продавати або купувати автомобіль'
                },
                {
                    name: 'og:title',
                    content: 'Реєстрація особистого кабінету'
                },
                {
                    property: 'og:description',
                    content: 'Зареєструйтеся на WheelDeal, щоб почати продавати або купувати автомобіль'
                }
            ]
        }
    },
    {
        path: '/login',
        component: Login,
        name: 'login',
        meta: {
            requiresAuth: false,
            title: 'Вхід до особистого кабінету',
            metaTags: [
                {
                    name: 'description',
                    content: 'Увійдіть у свій акаунт WheelDeal, щоб продовжити пошуки нового авто, чи продаж свого'
                },
                {
                    name: 'og:title',
                    content: 'Вхід до особистого кабінету'
                },
                {
                    property: 'og:description',
                    content: 'Увійдіть у свій акаунт WheelDeal, щоб продовжити пошуки нового авто, чи продаж свого'
                }
            ]
        }
    },
    {
        path: '/profile',
        component: Profile,
        name: 'profile',
        meta: {
            requiresAuth: true,
            title: 'Особистий кабінет',
            metaTags: [
                {
                    name: 'description',
                    content: 'Відкрийте свій особистий кабінет, щоб додати своє авто на продаж, або знайти потрібне'
                },
                {
                    property: 'og:title',
                    content: 'Особистий кабінет'
                },
                {
                    property: 'og:description',
                    content: 'Відкрийте свій особистий кабінет, щоб додати своє авто на продаж, або знайти потрібне'
                }
            ]
        }
    },
    {
        path: '/user',
        component: AllUsers,
        name: 'allUsers',
        meta: {
            requiresAuth: false,
            title: 'Всі користувачі сайту',
            metaTags: [
                {
                    name: 'description',
                    content: 'На сторінці всіх користувачів Ви можете переглядати користувачів цього сайту, а також їх оголошення або ж переваги в авто'
                },
                {
                    property: 'og:title',
                    content: 'Особистий кабінет'
                },
                {
                    property: 'og:description',
                    content: 'На сторінці всіх користувачів Ви можете переглядати користувачів цього сайту, а також їх оголошення або ж переваги в авто'
                }
            ]
        }
    },
    {
        path: '/user/:id',
        component: User,
        name: 'user',
        meta: {
            requiresAuth: false,
            title: 'Сторінка користувача',
            metaTags: [
                {
                    name: 'description',
                    content: 'На сторінці користувача Ви можете переглядати його оголошення або ж переваги в авто'
                },
                {
                    property: 'og:title',
                    content: 'Особистий кабінет'
                },
                {
                    property: 'og:description',
                    content: 'На сторінці користувача Ви можете переглядати його оголошення або ж переваги в авто'
                }
            ]
        }
    },
    {
        path: '/car',
        component: Cars,
        name: 'cars',
        meta: {
            requiresAuth: false,
            title: 'Cars',
            metaTags: [
                {
                    name: 'description',
                    content: 'Основна сторінка, на якій можна шукати потрібне авто'
                },
                {
                    property: 'og:description',
                    content: 'Основна сторінка, на якій можна шукати потрібне авто'
                }
            ]
        },
    },
    {
        path: '/car/:id',
        component: Car,
        name: 'car',
        meta: {
            requiresAuth: false,
            title: 'Перегляд авто',
            metaTags: [
                {
                    name: 'description',
                    content: 'Перегляньте характеристики обраного авто'
                },
                {
                    property: 'og:description',
                    content: 'Перегляньте характеристики обраного авто'
                }
            ]
        },
    },
    {
        path: '/car/:id/add',
        component: AddCar,
        name: 'addCar',
        meta: {
            requiresAuth: true,
            title: 'Додайте своє авто',
            metaTags: [
                {
                    name: 'description',
                    content: 'Вкажіть характеристики свого авто'
                },
                {
                    property: 'og:description',
                    content: 'Вкажіть характеристики свого авто'
                }
            ]
        },
    },
    {
        path: '/:pathMatch(.*)*',
        component: NotFound,
        name: '404',
        meta: {
            requiresAuth: true,
            title: '404 | Не знайдено',
            metaTags: [
                {
                    name: 'description',
                    content: 'Сторінку не знайдено'
                },
                {
                    name: 'og:title',
                    content: '404 | Не знайдено'
                },
                {
                    property: 'og:description',
                    content: 'Сторінку не знайдено'
                }
            ]
        }
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes
});

const isLoggedIn = () => !!localStorage.getItem('token');
export let previousRoute = null;

router.beforeEach((to, from, next) => {
    // Зберігаємо попередній маршрут, якщо він існує
    if (from.name) {
        previousRoute = from.fullPath;
    }

    // Встановлення заголовків сторінки
    document.title = to.meta.title || 'Default Title';
    Array.from(document.querySelectorAll('[data-vue-router-controlled]'))
        .map(el => el.parentNode.removeChild(el));

    to.meta.metaTags?.map(tagDef => {
        const tag = document.createElement('meta');
        Object.keys(tagDef).forEach(key => tag.setAttribute(key, tagDef[key]));
        tag.setAttribute('data-vue-router-controlled', '');
        return tag;
    }).forEach(tag => document.head.appendChild(tag));

    next();
});

// router.beforeEach((to, from, next) => {
//     if (to.fullPath === '/policy') {
//         next()
//     } else if (to.matched.some(route => route.meta.requiresAuth)) {
//         if (!isLoggedIn()) {
//             next('/login');
//         } else {
//             next();
//         }
//     } else {
//         if (!isLoggedIn()) {
//             next();
//         } else {
//             next('/profile');
//         }
//     }
// });

export default router;