
import dashboard from "@/view/UserView/page/dashboard.vue"
import report from "@/view/UserView/page/report.vue"


export const UserRouter = [
    {
        path: '',
        name: 'user-dashboard',
        component: dashboard,
    },
    {
        path: 'report',
        name: 'user-report',
        component: report,
    }
]

export default UserRouter