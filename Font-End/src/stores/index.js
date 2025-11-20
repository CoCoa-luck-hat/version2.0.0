import api from '@/api/axios'
import { defineStore } from 'pinia'



export const useIndexStore = defineStore('index',{
    state:()=>({
        user:[]
    }),
    actions:{
        async Register(data){
            const response = await api.post('/register',data)
            
            return response.data
        },
        async Login(data){
            const response = await api.post('/login',data)
            this.user = response.data.user

            localStorage.setItem('token',response.data.token)
            return response.data
        },
        Logout(){
            this.user = []
            localStorage.removeItem('token')
        },
        async CheckProfile(){
            const token = localStorage.getItem('token')
            if(!token){
                this.user = []
                return false
            }
            try{
                const response = await api.get('/profile')

                this.user = response.data.user
                return true                
                
            }catch(error){
                localStorage.removeItem('token')
                this.user = []
                return false
            }
        }
    }
})
