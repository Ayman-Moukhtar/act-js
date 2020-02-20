const ACT_VM_ATTRIBUTE = 'act-vm';

const getTemplate = (selector) => {
    const node = document.querySelector(`[${ACT_VM_ATTRIBUTE}=${selector}]`);
    if (!node) {
        throw Error(`No template found with this selector: ${selector}`)
    }

    return { rootNode: node };
};

const getChildNodes = (nodes) => {
    const result = [];
    for (let i = 0; i < nodes.length; i += 1) {
        const current = nodes[i];
        result.push(current);

        if (current.childNodes.length) {
            result.push(...getChildNodes(current.childNodes));
        }
    }
    return result;
};

export {
    getTemplate,
    getChildNodes
};