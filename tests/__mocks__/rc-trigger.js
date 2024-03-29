import React from 'react';

import Portal from 'rc-util/lib/Portal';

import Trigger from 'src/libs/rc-trigger';

Portal.prototype.render = function () {
    // eslint-disable-line
    return this.props.children;
};

const render = Trigger.prototype.render;

Trigger.prototype.render = function Trigger() {
    // eslint-disable-line
    const tree = render.call(this);

    if (this.state.popupVisible || this._component) {
        return tree;
    }
    if (!this.state.popupVisible) {
        return this.props.children;
    }
    return <div id="TriggerContainer">{tree}</div>;
};

export default Trigger;
