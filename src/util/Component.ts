

class Component {
    static element: HTMLElement;
    static state = {};

    static create(parentElement: string = 'div') {
        this.element = document.createElement(parentElement);
        this.render();
        return this;
    }

    static append(target) {
        this.element || this.create();
        target.appendChild(this.element);
        return this;
    }

    static setState(newState) {
        this.state = {
            ...this.state, ...newState
        };
        this.render();
        return this;
    }

    static getParentElement() {
        return this.element;
    }

    static template() {
        return ``;
    }

    static render() {
        if (!this.element) {
            this.create();
        }
        this.element.innerHTML = this.template();
        return this;
    }
}


export default Component;