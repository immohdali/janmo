import { AsyncStorage } from 'react-native';
import axios from 'axios';

/*export function fetchapi(data){
    return axios.post('http://bhajiwala.com/mobile/api3.php', JSON.stringify(data));
}*/


export function fetchapi(data){
    return axios({
            method:'post',
            url:'https://7janmokabandhan.com/mobile/api.php',
            headers: {'X-Requested-With': 'XMLHttpRequest'},
            auth: {
                username: 'janmo.',
                password: 'janmo$$##1234.'
            },
            responseType: 'json',
            data: JSON.stringify(data)
        })
}