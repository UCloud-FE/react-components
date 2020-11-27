let supportSticky = null;

const checkStickySupport = () => {
    const testDOM = document.createElement('div');
    const style = testDOM.style;
    const prefix = ['', '-o-', '-webkit-', '-moz-', '-ms-'];

    for (let i = 0; i < prefix.length; i += 1) {
        style.position = `${prefix[i]}sticky`;
    }

    return style.position === 'sticky' ? true : false;
};

export default () => {
    return supportSticky === null ? (supportSticky = checkStickySupport()) : supportSticky;
};
