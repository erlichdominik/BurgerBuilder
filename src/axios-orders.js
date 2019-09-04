import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-42f62.firebaseio.com/'
})

export default instance;