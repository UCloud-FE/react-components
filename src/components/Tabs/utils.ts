import { TabBarPosition } from './shared';

export function setTransform(style: CSSStyleDeclaration, v: string) {
    style.transform = v;
    style.webkitTransform = v;
    (<any>style).MozTransform = v;
}

export function isTransform3dSupported(style: CSSStyleDeclaration) {
    return ('transform' in style || 'webkitTransform' in style || 'MozTransform' in style) && window.atob;
}
export const isVertical = (tabBarPosition: TabBarPosition) => tabBarPosition === 'left' || tabBarPosition === 'right';

export function getStyle(el: Element, property: string) {
    return +window.getComputedStyle(el).getPropertyValue(property).replace('px', '');
}

function toNum(style: CSSStyleDeclaration, property: string) {
    return +style.getPropertyValue(property).replace('px', '');
}

function getTypeValue(start: string, current: string, end: string, tabNode: Element, wrapperNode: Element) {
    let total = getStyle(wrapperNode, `padding-${start}`);
    if (!tabNode || !tabNode.parentNode) {
        return total;
    }

    const { childNodes } = tabNode.parentNode;
    Array.prototype.some.call(childNodes, node => {
        const style = window.getComputedStyle(node);

        if (node !== tabNode) {
            total += toNum(style, `margin-${start}`);
            total += node[current];
            total += toNum(style, `margin-${end}`);

            if (style.boxSizing === 'content-box') {
                total += toNum(style, `border-${start}-width`) + toNum(style, `border-${end}-width`);
            }
            return false;
        }

        // We need count current node margin
        // ref: https://github.com/react-component/tabs/pull/139#issuecomment-431005262
        total += toNum(style, `margin-${start}`);

        return true;
    });

    return total;
}

export function getLeft(tabNode: Element, wrapperNode: Element) {
    return getTypeValue('left', 'offsetWidth', 'right', tabNode, wrapperNode);
}

export function getTop(tabNode: Element, wrapperNode: Element) {
    return getTypeValue('top', 'offsetHeight', 'bottom', tabNode, wrapperNode);
}
