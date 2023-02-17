import PageConfig from '@src/page/Main';
import { AddCustomElement, TCElement, CElement } from '@src/util/Element';


const LayoutConfig: TCElement = {
    name: 'layout-element',
    render: () => {
        return `
            <slot name='page'></slot>
        `;
    },
    slots: [
        [ 'page', AddCustomElement(PageConfig) ],
    ],
};


export default LayoutConfig;