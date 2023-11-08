import axios from 'axios'
import { ParamHandler } from '../types'
import { useAuth } from '../contexts/auth'

const methods: any = {
    post: axios.post,
    get: axios.get,
    delete: axios.delete,
    put: axios.put
}

class ApiIntegration {
    url = process.env.REACT_APP_API_URL

    createAccount = async (email: string, password: string, name: string) => {
        const res = await axios.post(`${this.url}/createUser`, { email, password, name }, {
            headers: {
                "ngrok-skip-browser-warning": "69420",
                "Access-Control-Allow-Origin": '*'
            }
        }).then(user => {
            return user
        }).catch(err => {
            return err
        })

        if(res?.status === 400 || res.response?.status === 500 || res.response?.status === 400) {
            return res.response
        }

        return res.data
    }

    signIn = async (email: string, password: string) => {
        const res = await axios.post(`${this.url}/userAuthenticate`, { email, password }, {
            headers: {
                "ngrok-skip-browser-warning": "69420",
                "Access-Control-Allow-Origin": '*'
            }
        }).then(user => {
            return user
        }).catch(err => {
            console.log(res)
            err.status = 500;
            err.message = 'Error ao logar'
            if(!res?.data?.err) {
                res.data.err = res.message
            }

            return err
        })

        console.log(res)

        if(res.status === 400 || res.status === 500 || res.response?.status === 500 || res.response?.status === 400) {
            return res.response
        }

        return res.data
    }

    sendEmail = async (email: string, type: string) => {
        const res = await axios.post(`${this.url}/sendEmail?type=${type}`, { email }, {
            headers: {
                "ngrok-skip-browser-warning": "69420",
                "Access-Control-Allow-Origin": '*'
            }
        }).then(user => {
            return user
        }).catch(err => {
            return err
        })

        if(res.status === 400) {
            return res.response
        }

        return res.data
    }

    getUser = async () => {
        try {
            const token: any = localStorage.getItem('token');
            const email = localStorage.getItem('email');

            if (!email && !token) {
                return {
                     isOk: false
                }
            }

            const res = await axios.get(`${this.url}/getUser?email=${email}&token=${token}`, {
                headers: {
                    "ngrok-skip-browser-warning": "69420",
                    "Access-Control-Allow-Origin": '*'
                }
            })
            return {
                email: res.data.email,
                token: token
            }
        } catch (error) {
            console.log(error)
        }
    }

    handleApi = async (params: ParamHandler) => {
        const token = localStorage.getItem('token');
        switch (params.method) {
            case 'get':
                return await methods[params.method](`${this.url}/${params.endpoint}`, {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "ngrok-skip-browser-warning": "69420",
                        "Access-Control-Allow-Origin": '*'
                    }
                });
            case 'put':
            case 'post':
                return await methods[params.method](`${this.url}/${params.endpoint}`, { ...params.data },{
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "ngrok-skip-browser-warning": "69420",
                        "Access-Control-Allow-Origin": '*'
                    }
                })
                .catch((err: any) => {
                    if(err?.response?.data?.message) {
                        throw err.response.data.message;
                    }
                    throw err
                });
            case 'delete':
                return await axios.delete(`${this.url}/${params.endpoint}`, {
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "ngrok-skip-browser-warning": "69420",
                        "Access-Control-Allow-Origin": '*'
                    },
                    data: params.data

                })
            default:
            break;
        }

    }

}

// eslint-disable-next-line import/no-anonymous-default-export
export default new ApiIntegration()