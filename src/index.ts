import "./tailwind.css";
import { CElement, AddCustomElement } from "./util/Element";


const app = document.createElement('div');
app.id = 'app';
app.className = 'flex items-center justify-center h-screen bg-grey';
document.body.appendChild(app);


AddCustomElement({
    name: 'page-main',
    path: 'src/page/page.html',
    append: app,
    theActualClass: class PageMain extends CElement {
        constructor(n, p) {
            super(n, p);
        }
    }
});