import { createApp } from 'vue';
import App from '@/App';
import router from '@/router/index';
import store from '@/store/index';
import 'element-plus/theme-chalk/index.css';

createApp(App).use(router).use(store).mount('#app');
