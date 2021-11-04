import { createRouter, createWebHashHistory } from "vue-router";
// 路由规则
const routes = [
    {
        path: "/",
        meta: {
            title: 'Home',
            icon: 'dashboard'
        },
        component: () => import("@/views/Home.vue"),
    },
    {
        path: "/list",
        name: "代办列表",
        component: () => import("@/views/List.vue"),
    },
];
//根据路由规则创建路由
const router = createRouter({
    history: createWebHashHistory(),
    routes,
});
export default router;