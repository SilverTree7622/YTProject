import Component from '@util/Component';


class Layout extends Component {
    static state = {
        title: '메인 레이아웃',
    };
    static template() {

        return `
            ${this.state.title}
        `;
    }
}


export default Layout;