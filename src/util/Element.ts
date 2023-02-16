import { v1 } from 'uuid';


type TCElement = {
    name: string;
    inner: string;
    appendTarget?: HTMLElement;
    isOnlyDefine?: boolean;
    onCreate?: (classEle: CElement) => void;
    attrList?: string[];
    onAttrChanged?: (attr, oldValue, newValue) => void;
    slots?: [ key: string, element: any ][];
};

class CElement extends HTMLElement {
    private _id: string = '';
    private static _attrList: string[] = [];
    cName: string = '';
    cInner: string = '';
    cAttrList: string[] = [];
    template: string = '';
    slots: [ key: string, element: string ][] = [];

    constructor(name: string, inner: string) {
        super();
        if (!name.includes('-')) {
            console.log('name: ', name);
            throw new Error('name must include a dash');
        }
        if (inner === '') {
            console.warn(`${name} inner is empty`);
        }
        this._id = v1();
        this.cName = name;
        this.cInner = inner;
        this.template = `
            <template>
                ${inner}
            </template>
        `;
        this.setAttrList();
    }
    connectedCallback() {
        const shadow = this.attachShadow({ mode: 'open' });
        shadow.innerHTML = this.cInner;
        this.setSlots();
    }
    disconnectedCallback() {
        // browser calls this method when the element is removed from the document
        // (can be called many times if an element is repeatedly added/removed)
    }
    getId() {
        return this._id;
    }
    getName() {
        return this.cName;
    }
    html() {
        return this.outerHTML;
    }
    
    // related attribute callbacks
    setAttrList() {
        if (!this.cAttrList.length) return;
        CElement._attrList = this.cAttrList;
        return CElement._attrList.length;
    }
    static get observedAttributes() { return this._attrList; }
    attributeChangedCallback(attr, oldValue, newValue) {
        this.attributeChanged(attr, oldValue, newValue);
    }
    attributeChanged(attr, oldValue, newValue) {}

    // slots
    setSlots() {
        if (!this.slots.length) return;
        this.slots.forEach(([ key, element ]) => {
            const slot = this.shadowRoot.querySelector(`slot[name='${key}']`);
            if (!slot) return;
            slot.replaceWith(element);
        });
    }
}

/**
 * 
 * @param args 
 * @returns 
 */
const AddCustomElement = (
    args: TCElement
) => {
    const {
        name,
        inner,
        appendTarget,
        isOnlyDefine = false,
        onCreate,
        attrList = [],
        onAttrChanged,
        slots = [],
    } = args;

    console.log('args: ', args);

    const classEle = class extends CElement {
        constructor(name, inner) {
            super(name, inner);
            if (attrList.length > 0) {
                this.cAttrList = attrList;
                this.setAttrList();
            }
            if (slots.length > 0) {
                this.slots = slots;
                // this.setSlots();
            }
        }
        attributeChanged(attr, oldValue, newValue) {
            onAttrChanged && onAttrChanged(attr, oldValue, newValue);
        }
    };
    window.customElements.define(name, classEle);
    if (isOnlyDefine) {
        return `<${name}></${name}>`;
    };
    const ele = new classEle(name, inner);
    if (appendTarget) {
        appendTarget.appendChild(ele);
    }
    if (onCreate) {
        onCreate(ele);
    }
    return ele;
}


export {
    TCElement,
    CElement,
    AddCustomElement
};