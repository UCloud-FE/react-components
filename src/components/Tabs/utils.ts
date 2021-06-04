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
