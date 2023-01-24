import {createWebHashHistory,createRouter} from "vue-router"
import Main from "../pages/Main.vue"
import Settler from "../pages/Settler.vue"

export default createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: "/home",
            component: Main
        },
        {
            path: "/settler",
            component: Settler,
        },
        {
            path: "/:catchAll(.*)",
            redirect: "/home"
        },
    ]
})