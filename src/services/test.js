import axios from "axios";

const base = 'http://localhost:3000'

export function test(params, callback) {
    axios.get(`${base}/users`).then((data) => {
        callback(data);
    });
}

