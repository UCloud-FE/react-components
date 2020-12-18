import React from 'react';

const ActualTrigger = jest.requireActual('rc-trigger');
const render = ActualTrigger.prototype.render;

ActualTrigger.prototype.render = function mockRender() {
    const { popupVisible } = this.state;
    let component;

    if (popupVisible || this._component) {
        component = this.getComponent();
    }

    if (!popupVisible) {
        return this.props.children;
    }

    return (
        <div id="TriggerContainer">
            {render.call(this)}
            {component}
        </div>
    );
};
const Trigger = ActualTrigger;

export default Trigger;
