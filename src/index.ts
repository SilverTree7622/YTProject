import LayoutConfig from "./layout/main";
import "./tailwind.css";
import { AddCustomElement } from "./util/Element";


const app = document.createElement('div');
app.id = 'app';
app.className = 'flex items-center justify-center h-screen bg-grey';
document.body.appendChild(app);

AddCustomElement({
    ...LayoutConfig,
    appendTarget: app,
});