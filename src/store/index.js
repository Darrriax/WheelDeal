import {createStore} from "vuex";
import {auth} from './moduls/auth.js';
import {user} from './moduls/user.js';
import {car} from './moduls/car.js';
import {reports} from "./moduls/reports";
import {loading} from "./moduls/loading";
import {photos} from "./moduls/photos";

export default createStore({
    modules: {
        user,
        auth,
        car,
        reports,
        loading,
        photos,
    },
});
