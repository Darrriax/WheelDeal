//Vue
import {createApp} from 'vue';
import App from './App.vue';
import router from './router';
import store from "./store";

//Css + Bootstrap
import {useBootstrap} from "./plugins/bootstrap";

import './assets/main.css';

//Icons
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';
import {library} from '@fortawesome/fontawesome-svg-core';
import {
    faCalendarDays,
    faBell,
    faImages,
    faMagnifyingGlass,
    faInfo,
    faSchool,
    faChartSimple,
    faBriefcase,
    faBookAtlas,
    faUser,
    faSliders,
    faPen,
    faTrash,
    faQuestion,
    faPersonCane,
    faHeart,
    faBabyCarriage,
    faUsers,
    faPersonArrowUpFromLine,
    faUserPlus,
    faUserMinus,
    faEye,
    faEdit,
    faCircleInfo,
    faClipboardList,
    faFile,
    faCross,
    faCarriageBaby,
    faSignOut,
    faPlusCircle,
    faSave,
    faCertificate,
    faExclamationCircle,
    faTrophy,
    faRotateRight,
    faCamera,
    faGear,
    faRoad,
    faCar,
    faScrewdriverWrench,
    faSquareCheck,
    faCarBurst,
    faHandHoldingDollar,
    faCarSide,
    faThumbsUp,
    faArrowRight,
    faArrowLeft
} from '@fortawesome/free-solid-svg-icons';
import {faFacebook, faGooglePlus, faPagelines} from '@fortawesome/free-brands-svg-icons';
import {faChartBar, faCircleCheck, faCopy, faShareFromSquare} from '@fortawesome/free-regular-svg-icons';

library.add(
    faFile, faBriefcase, faSchool,
    faBookAtlas, faInfo, faUser, faChartBar,
    faMagnifyingGlass, faPagelines, faFacebook,
    faGooglePlus, faCalendarDays, faBell,
    faCircleCheck, faImages, faSliders,
    faChartSimple, faPen, faTrash, faQuestion,
    faPersonCane, faHeart, faBabyCarriage,
    faUsers, faUserPlus, faUserMinus, faPersonArrowUpFromLine,
    faEye, faEdit, faCircleInfo, faClipboardList, faCross, faCarriageBaby, faSignOut,
    faCopy,
    faPlusCircle, faSave, faCertificate, faExclamationCircle, faTrophy,
    faShareFromSquare, faRotateRight, faCamera, faGear,
    faRoad, faCar, faScrewdriverWrench, faSquareCheck, faCarBurst, faHandHoldingDollar, faCarSide, faThumbsUp,
    faArrowRight, faArrowLeft
);

//Plugins
import i18n from "./locales/i18n";

const app = createApp(App);

app.use(router);
app.use(store);
app.use(i18n);
app.use(useBootstrap);
app.component('font-awesome-icon', FontAwesomeIcon);
app.mount('#app');