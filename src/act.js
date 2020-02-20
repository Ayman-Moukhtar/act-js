import { getTemplate } from './dom/dom.utils.js';
import { parse } from './parser/template-parser.js';
import { watchDirectives, watchLiterals } from './watcher/watcher.utils.js';
import { VmProxy } from './vm-proxy/vm-proxy.js';

const Act = ({ selector, vm }) => {
    const { rootNode } = getTemplate(selector);
    const { literals, directives } = parse(rootNode);

    const vmProxy = new VmProxy(vm);

    watchLiterals(literals, vmProxy);
    watchDirectives(directives, vmProxy);
};

export {
    Act
};