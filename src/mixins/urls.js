export default {
    methods: {
        getUrlParam(name) {
            let queryString = window.location.search;
            let urlParams = new URLSearchParams(queryString);
            return urlParams.get(name) ? urlParams.get(name) : null
        },
        insertUrlParam(key, value) {
            key = encodeURIComponent(key);
            value = encodeURIComponent(value);

            let kvp = window.location.search.substr(1).split('&');
            if (kvp[0] === '') {
                const path = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + key + '=' + value;
                window.history.pushState({path: path}, '', path);

            } else {
                let i = kvp.length;
                let x;
                while (i--) {
                    x = kvp[i].split('=');

                    if (x[0] === key) {
                        x[1] = value;
                        kvp[i] = x.join('=');
                        break;
                    }
                }

                if (i < 0) {
                    kvp[kvp.length] = [key, value].join('=');
                }

                const refresh = window.location.protocol + "//" + window.location.host + window.location.pathname + '?' + kvp.join('&');
                window.history.pushState({path: refresh}, '', refresh);
            }
        },
        deleteUrlParam(parameter) {
            let url = window.location.href;
            let urlparts = url.split('?');
            if (urlparts.length >= 2) {

                let prefix = encodeURIComponent(parameter) + '=';
                let pars = urlparts[1].split(/[&;]/g);
                for (let i = pars.length; i-- > 0;) {
                    //idiom for string.startsWith
                    if (pars[i].lastIndexOf(prefix, 0) !== -1) {
                        pars.splice(i, 1);
                    }
                }

                let path = urlparts[0] + (pars.length > 0 ? '?' + pars.join('&') : '')
                return window.history.pushState({path: path}, '', path);
            }
            return url;
        },
    }
}
