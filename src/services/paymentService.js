import axios from "axios"

export default {
    postPayment(data) {
        return axios.post('https://62f9ee323c4f110faa8ed350.mockapi.io/api/payment', data)
    }
}