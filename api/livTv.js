import axios from 'axios';
import { BASE_URL } from '../config';

export function getLiveTvAPI() {    
    return new Promise((resolve, reject) => {
        axios.get(`${BASE_URL}/databank/liveTvs`)
        .then((data) => {
            resolve(data);
        })
        .catch((err) => {
            reject(err)
        });
    });
}