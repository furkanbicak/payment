import axios from "axios"

export default {
    postSignup(data) {
        return axios.post('https://62f9ee323c4f110faa8ed350.mockapi.io/api/signup', data)
    }
}