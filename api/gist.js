import axios from 'axios';
import { BASE_URL } from '../config';

export function getGistAPI() {    
    return new Promise((resolve, reject) => {
        axios.get(`${BASE_URL}/databank/articles`)
        .then((data) => {
            resolve(data);
        })
        .catch((err) => {
            reject(err)
        });
    });
}

export function getLatestGistAPI(date) {    
    return new Promise((resolve, reject) => {
        axios.get(`${BASE_URL}/databank/latestArticle/${date}`)
        .then((data) => {
            resolve(data);
        })
        .catch((err) => {
            reject(err)
        });
    });
}

export function getNumberedGistAPI(number) {    
    return new Promise((resolve, reject) => {
        axios.get(`${BASE_URL}/databank/numberedArticle/${number}`)
        .then((data) => {
            resolve(data);
        })
        .catch((err) => {
            reject(err)
        });
    });
}

export function getGistCategoryAPI() {    
    return new Promise((resolve, reject) => {
        axios.get(`${BASE_URL}/databank/category`)
        .then((data) => {
            resolve(data);
        })
        .catch((err) => {
            console.log('Cat Err: '+err);
            reject(err)
        });
    });
}

export function getGistByCategoryAPI(catName) {    
    return new Promise((resolve, reject) => {
        axios.get(`${BASE_URL}/databank/articlesByCategory/${catName}`)
        .then((data) => {
            resolve(data);
        })
        .catch((err) => {
            reject(err)
        });
    });
}
// export function transferAssetAPI(detail) {    
//     return new Promise((resolve, reject) => {
//         axios.post(`${BASE_URL}/databank/articles`, detail)
//         .then((data) => {
//             resolve(data);
//         })
//         .catch((err) => {
//             reject(err)
//         });
//     });
// }