import {mapGetters} from "vuex";
import AppLoader from "../components/UI/AnimatedLoaders/AppLoader.vue";

const isLoading = {
    components: {
        AppLoader
    },
    computed: {
        ...mapGetters('loading', {
            loadingStatus: "isLoading"
        }),
    },
};

export default isLoading;