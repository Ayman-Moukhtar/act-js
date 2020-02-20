class VmProxy {
    subscribers = {};
    original;
    vm;
    proxy;

    constructor(vm) {
        this.original = vm;
        this.vm = vm;
        this.proxify();
    }

    get(key) {
        return this.proxy[key];
    }

    set(key, value) {
        this.proxy[key] = value;
    }

    proxify() {
        const that = this;
        this.proxy = new Proxy(
            this.vm,
            {
                set(target, key, value)  {
                    target[key] = value;
                    const subsribers = that.subscribers[key] || [];
                    subsribers.forEach(({ fn }) => fn(key, value));
                    return true;
                }
            }
        );
    
        this.vm = this.proxy;
    }

    subscribe(key, fn) {
        this.subscribers[key] = this.subscribers[key] || [];
        this.subscribers[key].push({ fn });
    }
}

export {
    VmProxy
};