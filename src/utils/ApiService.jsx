import axios from "axios";

const ApiService=axios.create(
    {
        baseURL:`http://localhost:8000/api/v1/check-auth/login`,
        headers:{
            'Content-Type':"application/json"
        }
    }
 )

 ApiService.interceptors.request.use((config)=>{
   const token= localStorage.getItem('jwt');
   if(token){
     config.headers.Authorization=`Bearer ${token}`
   }

    return config
 })
 export default ApiService