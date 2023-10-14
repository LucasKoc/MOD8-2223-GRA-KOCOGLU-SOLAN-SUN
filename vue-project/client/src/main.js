import './assets/css/App.css'
import axios from 'axios'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

axios.defaults.baseURL = import.meta.env.VITE_API_URL
axios.defaults.withCredentials = true

app.use(router)

app.mount('#app')
