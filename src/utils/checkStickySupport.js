let supportSticky = null;

const checkStickySupport = () => {
    const testDOM = document.createElement('div');
    const style = testDOM.style;
    const prefix = ['', '-o-', '-webkit-', '-moz-', '-ms-'];

    let support = false;
    for (let i = 0; i < prefix.length; i += 1) {
        const stickyName = `${prefix[i]}sticky`;
        style.position = stickyName;
        if (style.position === stickyName) support = true;
        break;
    }

    return support;
};

export default () => {
    return supportSticky === null ? (supportSticky = checkStickySupport()) : supportSticky;
};
