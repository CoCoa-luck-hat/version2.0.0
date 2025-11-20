
import dashboard from "@/view/AdminView/page/dashboard.vue"
import users from "@/view/AdminView/page/users.vue"
import reports from "@/view/AdminView/page/reports.vue"

export const AdminRouter = [
    {
        path: '',
        name: 'admin-dashboard',
        component: dashboard,
    },
    {
        path: 'users',
        name: 'admin-users',
        component: users,
    },
    {
        path: 'reports',
        name: 'admin-reports',
        component: reports,
    }
]

export default AdminRouter