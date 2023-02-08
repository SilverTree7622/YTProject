import "./tailwind.css";
import Layout from "./layout/main";


const app = document.createElement('div');
app.id = 'app';
document.body.appendChild(app);

Layout.append(app);

setTimeout(() => {
    console.log('Layout.getParentElement(): ', Layout.getParentElement());
    Layout.setState({
        title: '변경된 레이아웃'
    });
}, 1000);