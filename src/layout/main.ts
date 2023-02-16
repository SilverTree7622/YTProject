import PageConfig from '@src/page/Main';
import { AddCustomElement, CElement, TCElement } from '@src/util/Element';


const LayoutConfig: TCElement = {
    name: 'layout-element',
    inner: `
        <slot name='page'></slot>
        <p>Layout wtf</p>
    `,
    slots: [
        [ 'page', AddCustomElement(PageConfig) ],
    ],
};


export default LayoutConfig;