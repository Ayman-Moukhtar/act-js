import { getChildNodes } from "../dom/dom.utils.js";

const ACT_BIND_ATTRIBUTE = 'act-bind';
const NodeType = {
    ELEMENT: 1,
    TEXT: 3
};

const isLiteralExpression = (text) => /{([^}]+)?}/g.test(text);
const getLiteralExpressions = (text) => {
    const result = [];
    let regex = /{([^}]+)?}/g;
    let match;
    while (match = regex.exec(text.trim())) {
        result.push({ expression: match[0], property: match[1] });
    }
    return result;
};

const hasDirective = (node) => node.attributes.length && node.attributes[ACT_BIND_ATTRIBUTE];

const parse = (rootNode) => {
    const nodes = getChildNodes([rootNode]);
    const literals = [];
    const directives = [];

    for (let i = 0; i < nodes.length; i += 1) {
        const node = nodes[i];
        const { nodeType, textContent } = node;

        if (nodeType === NodeType.TEXT && isLiteralExpression(textContent)) {
            const expressions = getLiteralExpressions(node.textContent);
            literals.push({
                node,
                expressions
            });
            continue;
        }

        if (nodeType === NodeType.ELEMENT && hasDirective(node)) {
            directives.push({
                element: node,
                property: node.attributes[ACT_BIND_ATTRIBUTE].value
            });
        }
    }

    return { literals, directives };
};

export {
    parse
};