import {mapGetters} from "vuex";

const isLoggedIn = {
    computed: {
        ...mapGetters('user', {
            isLoggedIn: 'isLoggedIn',
        }),
    },
};

export default isLoggedIn;