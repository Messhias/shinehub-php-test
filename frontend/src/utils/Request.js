import Axios from 'axios';


const options = {
    baseURL: '//127.0.0.1',
    timeout: 60000,
};

const instance = Axios.create(options);

instance.parseParams = (params) => {
    return Object.keys(params).map(function(key) {
        return [key, params[key]].map(encodeURIComponent).join("=");
    }).join("&");
};

export default instance;
