import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/css/global.css';
import './assets/css/variables.css';
import { Collapse, Select } from 'ant-design-vue';

const app = createApp(App);
app.use(router);

app.use(Collapse);
app.use(Select);

app.mount('#app');

