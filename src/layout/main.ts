import PageConfig from '@src/page/Main';
import { AddCustomElement, CElement, TCElement } from '@src/util/Element';


const LayoutConfig: TCElement = {
    name: 'layout-element',
    render: () => {
        return `
            <p>Layout wtf</p>
            <slot name='page'></slot>
        `;
    },
    slots: [
        [ 'page', AddCustomElement(PageConfig) ],
    ],
};


export default LayoutConfig;