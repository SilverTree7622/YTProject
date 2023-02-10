import { v1 } from 'uuid';


class Components {
    static components: { component: Component; id: string; }[] = [];

    static add(component) {
        this.components.push({
            component, id: component.getId()
        });
        return this;
    }

    static find(id: string) {
        
        return this;
    }
}

class Component {
    private static _id: string = '';
    private static _template: string = ``;
    private static _evts = {};
    private static _parent: Component;
    private static _children: Component;
    static element: HTMLElement & { component: Component };
    static state = {};

    static init(): string {
        return '';
    }

    static create(parentElement: string = 'div') {
        if (this.element) return;
        this._id = v1();
        this.element = document.createElement(parentElement) as typeof this.element;
        this.setTemplate(this.init());
        this.render();
        this.element.component = this;
        // add component to each children
        if (this.element.children.length === 0) return this;
        for (let i=0; i<this.element.children.length; i++) {
            (this.element.children[i] as typeof this.element).component = this;
        }
        console.log('this.element.children: ', this.element.children);
        return this;
    }

    static append(target) {
        this.element || this.create();
        target.appendChild(this.element);
        return this;
    }

    static getId(): string {
        return this._id;
    }

    static setState(newState) {
        this.state = {
            ...this.state, ...newState
        };
        this.render();
        return this;
    }

    static setRootStyle(prop: string, value: string) {
        this.element.style[prop] = value;
        return this;
    }

    static setRootClass(className: string) {
        this.element.className = className;
        return this;
    }

    static setTemplate(template: string) {
        this._template = template;
        return this;
    }

    static setParent(parent: Component) {
        this._parent = parent;
        return this;
    }

    static addEvt(key: string, callback: () => void) {
        if (this._evts[key]) {
            console.warn(`you are override this key: ${key} event`);
        }
        this._evts[key] = callback;
        return this;
    }

    static runEvt(key: string) {
        this._evts[key]();
        return this;
    }

    static getEvt(scope: Component, key: string) {
        return `
            (function () {
                console.log('get evt');
            })();
        `;
    }

    static render(parent?: Component, state?) {
        if (!this.element) this.create();
        if (parent) this.setParent(parent);
        if (state !== undefined) {
            this.setState(state);
        } else {
            this.element.innerHTML = this._template;
        }
        return this.element.outerHTML;
    }
}


export default Component;
export {
    Components
};