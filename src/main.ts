import { createApp } from "vue";
import { createPinia } from "pinia";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faRepeat,
  faArrowRotateLeft,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import "./style.css";
import App from "./App.vue";
import router from "./router";

library.add(faRepeat);
library.add(faArrowRotateLeft);
library.add(faArrowLeft);
library.add(faGithub);

createApp(App)
  .component("font-awesome-icon", FontAwesomeIcon)
  .use(router)
  .use(createPinia())
  .mount("#app");
