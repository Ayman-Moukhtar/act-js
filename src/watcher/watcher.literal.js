class LiteralWatcher {
    expressions;
    node;
    originalContent;
    proxy;

    constructor(literal, proxy) {
        this.expressions = literal.expressions;
        this.node = literal.node;
        this.originalContent = literal.node.textContent;
        this.proxy = proxy;
        this.updateBindings();
        this.subscribe();
    }

    subscribe() {
        this.expressions.forEach(({ expression, property }) => {
            this.proxy.subscribe(property, this.updateBindings.bind(this));
        });
    }

    updateBindings(key, newValue) {
        let template = this.originalContent;

        this.expressions.forEach(({ expression, property }) => {
            const value = key && key === property ? newValue : this.proxy.get(property) || '';
            template = this.updateTemplate(expression, value, template);
        });

        this.node.textContent = template;
    }

    updateTemplate(expression, value, template) {
        template = template.replace(
            expression, value
        );

        return template;
    }
}

export {
    LiteralWatcher
};