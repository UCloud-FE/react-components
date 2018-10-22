import React from 'react';
import { mount } from 'enzyme';
import { renderToJson } from 'enzyme-to-json';

import Tooltip from 'src/components/Tooltip';

jest.unmock('rc-trigger');
describe('Tooltip', () => {
    test('tooltip', () => {
        const Demo = props => (
            <div>
                <Tooltip popup={<div>tooltip</div>} {...props}>
                    <div>content</div>
                </Tooltip>
            </div>
        );
        const wrapper = mount(<Demo />);
        expect(renderToJson(wrapper.render())).toMatchSnapshot();
        wrapper.setProps({
            visible: true
        });
        expect(renderToJson(wrapper.render())).toMatchSnapshot();
    });
});
