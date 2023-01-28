import { storeToRefs } from "pinia"
import { createWebHashHistory, createRouter } from "vue-router"
import Main from "../pages/Main.vue"
import Settler from "../pages/Settler.vue"
import getStore from "../pinia/TaskStore"

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
            beforeEnter: (to, from) => {
                let store = getStore()
                let { tasks } = storeToRefs(store)
                if (Object.keys(tasks.value).length === 0) {
                    alert("结算区什么都没有")
                    return false
                }
            }
        },
        {
            path: "/:catchAll(.*)",
            redirect: "/home"
        },
    ]
})