import Component from '@util/Component';
import PageMain from '@src/page/Main';


class Layout extends Component {
    static state = {
        title: '메인 레이아웃',
    };

    static init() {
        this.setRootClass('container');
        return `
            ${PageMain.render(this)}
        `;
    }
}


export default Layout;