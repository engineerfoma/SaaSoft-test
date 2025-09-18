import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from '@/app/router'
import * as UIkit from 'uikit'
import Icons from 'uikit/dist/js/uikit-icons'

import 'uikit/dist/css/uikit.css'

UIkit.use(Icons)

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
