class DirectiveWatcher {
    element;
    property;
    proxy;

    constructor(directive, proxy) {
        this.element = directive.element;
        this.property = directive.property;
        this.proxy = proxy;
        this.update(this.property, proxy.get(this.property) || '');
        this.subscribe();
        this.attachOnChange();
    }

    subscribe() {
        this.proxy.subscribe(this.property, this.update.bind(this));
    }

    attachOnChange() {
        this.element.oninput = (event) =>
            this.proxy.set(this.property, event.target.value);
    }

    update(_, value) {
        this.element.value = value;
    }
}

export {
    DirectiveWatcher
};