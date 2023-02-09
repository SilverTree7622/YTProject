import { v1 } from 'uuid';


class Components {
    static components: Component[] = [];

    static add(component) {
        this.components.push(component);
        return this;
    }

    static find() {

        return this;
    }
}

class Component {
    private static _id: string = '';
    private static _template: string = ``;
    private static _parent: Component;
    private static _children: Component;
    static element: HTMLElement;
    static state = {};

    static init(): string {
        return '';
    }

    static create(parentElement: string = 'div') {
        if (this.element) return;
        this._id = v1();
        this.element = document.createElement(parentElement);
        this.setTemplate(this.init());
        this.render();
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