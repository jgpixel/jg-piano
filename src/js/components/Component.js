export default class Component {
    constructor(props, root) {
        this.props = props;
        this.root = root;
    }

    static setAttributes(attributes, element) {
        for (const key in attributes) {
            element.setAttribute(key, attributes[key]);
        }
    }

    static appendChildren(elements, root) {
        elements.forEach(element => {
            root.appendChild(element);
        });
    }
}