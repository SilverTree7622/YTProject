import { v1 } from 'uuid';


type TCElement = {
    name: string;
    render: (classEle: CElement) => string;
    appendTarget?: HTMLElement;
    isOnlyDefine?: boolean;
    onCreate?: (classEle: CElement) => void;
    attrList?: [ key: string, value: any ][];
    onAttrChanged?: (attr, oldValue, newValue) => void;
    slots?: [ key: string, element: any ][];
};

class CElement extends HTMLElement {
    private _id: string = '';
    config: TCElement = {} as TCElement;
    cName: string = '';
    render: TCElement['render'] = () => '';
    cInner: string = '';
    cAttrList: string[] = [];
    slots: [ key: string, element: any ][] = [];

    constructor(config: TCElement, name: string, render: TCElement['render']) {
        super();
        if (!name.includes('-')) {
            console.log('name: ', name);
            throw new Error('name must include a dash');
        }
        if (!render) {
            console.warn(`${name} inner is empty`);
        }
        this._id = v1();
        this.config = config;
        this.cName = name;
        this.render = render;
    }
    connectedCallback() {
        this.cInner = this.render(this);
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
    getAttrList(): any {
        return this.cAttrList.map( attr => JSON.parse(this.getAttribute(attr)) );
    }
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
        render,
        appendTarget,
        isOnlyDefine = false,
        onCreate,
        attrList = [],
        onAttrChanged,
        slots = [],
    } = args;

    console.log('name, args: ', name, args);

    const classEle = class extends CElement {
        static observedAttributes = attrList.length ? attrList.map( ([ key ]) => key ) : [];
        constructor(args, name, render) {
            super(args, name, render);
            if (attrList.length) {
                this.cAttrList = attrList.map( ([ key ]) => key );
                attrList.map(([ key, value ]) => {
                    this.setAttribute(key, JSON.stringify(value));
                });
            }
            if (slots.length) {
                this.slots = slots;
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
    const ele = new classEle(args, name, render);
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