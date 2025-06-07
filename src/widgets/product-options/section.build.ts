import { ArtlogoVueUIKit } from '@artlogo-co/ui-kit';
import { createPinia } from 'pinia';

import { createApp } from 'vue';

import App from './App.vue';

createApp(App)
  .use(ArtlogoVueUIKit({
    tusEndpoint: 'https://cloud.artlogo.co/filepond/',
  }))
  .use(createPinia())
  .mount('#product-options');
