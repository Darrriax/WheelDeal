export default {
    methods: {
        formatDate(dateStr) {
            if (!dateStr){
                return '';
            }
            const parts = dateStr.split('-');
            let date = [];

            if (parts[2]) date.push(parts[2]);
            if (parts[1]) date.push(parts[1]);
            if (parts[0]) date.push(parts[0]);

            return date.join('.');
        }
    }
}
