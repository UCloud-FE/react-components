export const attrs = (attributes: { [key: string]: null | void | string | boolean }) => {
    const newAttrsMap: typeof attributes = {};
    for (const key in attributes) {
        if (Object.prototype.hasOwnProperty.call(attributes, key)) {
            const v = attributes[key];
            switch (v) {
                case false:
                case null:
                case undefined:
                    break;
                case true:
                default:
                    newAttrsMap[key] = v;
                    break;
            }
        }
    }
    return newAttrsMap;
};
