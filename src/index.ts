import "./tailwind.css";
import Layout from "./layout/main";


const addFooter = async function () {
    const resp = await fetch("footer.htm");
    const html = await resp.text();
    document.body.insertAdjacentHTML("beforeend", html);
}
console.log('addFooter: ', addFooter);


const app = document.createElement('div');
app.id = 'app';
app.className = 'flex items-center justify-center h-screen';
document.body.appendChild(app);

Layout.append(app);