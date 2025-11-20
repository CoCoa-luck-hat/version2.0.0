import { defineStore } from 'pinia'
import api from '@/api/axios'

export const useUserStore = defineStore('user',{
    state:()=>({
        ReportOnDashboard:[],
        AllMyReport:[],
        SelectedReportToEdit:[]
    }),
    actions:{
        async CreateReport(report){
            const response = await api.post('/upload-report',report,{headers:{"Content-Type":"multipart/form-data"}})
            return response.data    
        },
        async LoadReportOnDashboard(){
            const respones = await api.get('/loadReportOnDashboard')
            this.ReportOnDashboard = respones.data.row
        },
        async LoadReportAll(){
            const respones = await api.get('/loadReportAll')
            this.AllMyReport = respones.data.row
        },
        async UpdateReport(form){
            const respones = await api.post('/updateReport',form,{headers:{"Content-Type":"multipart/form-data"}})
            return respones.data
        },
        async DeleteReport(id){
            const respones = await api.delete('/deleteReport',{data:{id}},{headers:{"Content-Type":"application/json"}})
            return respones.data
        }
    }

})
