import axios from 'axios'
import queryString from 'query-string'
import apiConfig from './apiconfig';

const axiosClient = axios.create({
     baseURL: apiConfig.baseURL,
     headers: {
         'Content-Type': 'application/json'
     },
     paramsSerializer: params => queryString.stringify({...params,api_key: apiConfig.apiKey})
});

axiosClient.interceptors.request.use(async (config) => config);
axiosClient.interceptors.response.use((response)=>{
    if (response && response.data){
        return response.data
    }
    return response
}, (error)=>{
    throw error
});

export default axiosClient;
//tạo axios client (tất cả các request sẽ đi qua axios client). Ở đây dùng phg thức create để tạo
//ra 1 object duy nhất sử dụng chung cho toàn bộ application. Sử dụng tv quresy-string để tự động path params.
//tất cả các request nếu có respone.data thì trả về res.data