import { v1 } from 'uuid';


type ComponentElement = HTMLElement & {
    component: Component;
    name: string;
};

class Components {
    static components: {
        component: Component;
        id: string;
        name: string;
        elements: HTMLElement[];
    }[] = [];

    static add(component) {
        const elements = component.element.children;
        this.components.push({
            component, id: component.getId(), name: component.getName(), elements
        });
        if (component.name === 'Layout') return;
        this._addComponent2Children(component, component.element);
        console.log('this.components: ', component.name, this.components);
        return this;
    }

    static find(id: string) {
        
        return this;
    }
    
    private static _addComponent2Children(component: Component, element: ComponentElement) {
        // add component to each children
        if (element.children.length === 0) return this;

        const addComponentLoop = (component: Component, element: ComponentElement) => {
            if (element.children.length === 0) return;
            
            for (let i=0; i<element.children.length; i++) {
                const ele = element.children[i] as ComponentElement;
                if (ele.component) {
                    console.log('nested component');
                    continue;
                }
                ele.component = component;
                console.log('i, ele: ', i, ele);
                addComponentLoop(component, ele);
            }
        };
        addComponentLoop(component, element);
    }
}

class Component {
    private static _id: string = '';
    private static _name: string = '';
    private static _template: string = ``;
    private static _evts = {};
    private static _parent: Component;
    private static _children: Component;
    static element: ComponentElement;
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
        Components.add(this);
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

    static getName(): string {
        return this._name;
    }

    static setName(name: string): typeof Component {
        this._name = name;
        return this;
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

    
    private static _addComponent2Children() {
        // add component to each children
        if (this.element.childNodes.length === 0) return this;
        const addComponentLoop = (element: typeof this.element) => {
            if (element.children.length === 0) return;
            for (let i=0; i<element.children.length; i++) {
                const ele = element.children[i] as typeof this.element;
                if (ele.component) {
                    console.log('nested component');
                    // const id = (ele.component as typeof Component).getId();
                    // if (id === this.getId()) continue;
                }
                ele.component = this;
                console.log('this._name, i: ', this._name, i);
                addComponentLoop(ele);
            }
        };
        addComponentLoop(this.element);
    }

    static render(parent?: Component, state?) {
        if (!this.element) this.create();
        if (parent) this.setParent(parent);
        if (state !== undefined) {
            this.setState(state);
        } else {
            this.element.innerHTML = this._template;
        }
        // this.element.component = this;
        console.log('render this.element: ', this._name, this.element.outerHTML);

        return this.element.outerHTML;
    }
}


export default Component;
export {
    Components
};