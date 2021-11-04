import { createApp } from 'vue'

import ElementUI from 'element-plus'
import 'element-plus/theme-chalk/index.css'
import locale from 'element-plus/lib/locale/lang/en' // lang i18n

import App from './App.vue'
import router from '@/routes'

const app = createApp(App)
// set ElementUI lang to EN
app.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明!
app.use(ElementUI)

app.use(router)
app.mount('#app')

