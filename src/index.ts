import App from "./Todo/app";

const app: App = new App();

document.addEventListener('DOMContentLoaded', (): void => app.init())