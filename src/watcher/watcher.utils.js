import { watcherType } from "../utils/constants.js";
import { DirectiveWatcher } from "./watcher.directive.js";
import { LiteralWatcher } from "./watcher.literal.js";

const watchLiterals = (literals, proxy) => literals.map(literal => ({
    type: watcherType.LITERAL,
    watcher: new LiteralWatcher(literal, proxy)
}));

const watchDirectives = (directive, proxy) => directive.map(directive => ({
    type: watcherType.DIRECTIVE,
    watcher: new DirectiveWatcher(directive, proxy)
}));

export {
    watchLiterals,
    watchDirectives
};