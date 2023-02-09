import "./tailwind.css";
import Layout from "./layout/main";


const app = document.createElement('div');
app.id = 'app';
app.className = 'flex items-center justify-center h-screen';
document.body.appendChild(app);

Layout.append(app);