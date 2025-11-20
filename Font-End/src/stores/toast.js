import { defineStore } from 'pinia'

export const useToastStore = defineStore('toast',{
    state:()=>({
        toasts:[]
    }),
    actions:{
        pushToast(message,type){
            const id = Date.now().toString(36) + Math.random().toString(36).slice(2,8)
            const toast = {
                id:id,
                message:message,
                type:type
            }
            this.toasts.push(toast)

            setTimeout(()=>{
                this.removeToast(id)
            },3000)
        },
        removeToast(id){
            const index = this.toasts.findIndex((t)=>t.id===id)
            this.toasts.splice(index,1)
        }
    }

})
