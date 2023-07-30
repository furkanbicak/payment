import axios from "axios"

export default {
    getPackages() {
        return axios.get("https://62f9ee323c4f110faa8ed350.mockapi.io/api/packages", {
            headers: { "Content-Type": "application/json" },
        })
    }
}