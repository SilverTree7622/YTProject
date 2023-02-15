import { v1 } from 'uuid';


class CElement extends HTMLElement {
    private _id: string = '';
    private _html: string = '';
    cName: string = '';
    cPath: string = '';

    constructor(name: string, path: string) {
        super();
        if (!name.includes('-')) {
            console.log('name: ', name);
            throw new Error('name must include a dash');
        }
        if (path === '') {
            console.log('path: ', path);
            throw new Error('path must required');
        }
        this._id = v1();
        this.cName = name;
        this.cPath = path;
        this.fetchHtml(this.cPath);
    }
    async fetchHtml(path: string) {
        var link = document.createElement('link');
        link.rel = 'import';
        link.href = path;
        link.onload = function(e) { console.log('onload'); };
        link.onerror = function(e) { console.log('onerror'); };
        const resp = await fetch(path);
        this._html = await resp.text();
        console.log('link: ', link, link.outerHTML);
        console.dir(link);
        console.log('resp: ', resp);
        console.log('this._html: ', this._html);
    }
    connectedCallback() {
        if (this._html === '') {
            console.warn('html not fetched');
            return;
        }
        const shadow = this.attachShadow({ mode: 'open' });
        shadow.innerHTML = this._html;
        console.log('connectedCallback');
    }
    getId() {
        return this._id;
    }
    getName() {
        return this.cName;
    }
}

const AddCustomElement = <T> (
    args: {
        name: string;
        path: string;
        theActualClass: { new (...args: any[]): any }
        append?: HTMLElement
    }
): T => {
    window.customElements.define(args.name, args.theActualClass);
    const ele = new args.theActualClass(args.name, args.path);
    if (args.append) {
        args.append.appendChild(ele);
    }
    return ele;
}

export {
    CElement,
    AddCustomElement
};