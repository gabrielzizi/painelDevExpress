import axios from 'axios'

class ApiIntegration {
    url = process.env.REACT_APP_API_URL

    getActions = async () => {
        console.log('dsdasdsadsa',this.url)
        const res = await axios.get(`${this.url}/readActions`, { headers: { "ngrok-skip-browser-warning": "69420" }})
        return res.data
    }

    createAction = async (data: any) => {
        return await axios.post(`${this.url}/createAction`, {...data},
            { headers: {
                "ngrok-skip-browser-warning": "69420",
                "Access-Control-Allow-Origin": '*'
            }})
    }

    updateActions = async (data: any) => {
        const { values, key } = data
        return await axios.put(`${this.url}/updateActions`, { values, key },
            { headers: {
                "ngrok-skip-browser-warning": "69420",
                "Access-Control-Allow-Origin": '*'
            }})
    }

    deleteActions = async (key: any) => {
        return await axios.delete(`${this.url}/deleteActions`,
            { headers: {
                "ngrok-skip-browser-warning": "69420",
                "Access-Control-Allow-Origin": '*'
            },
            data: {
                key
            }})
    }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new ApiIntegration()