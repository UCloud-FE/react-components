import React from 'react';
import { mount } from 'enzyme';
import Typography from 'src/components/Typography';
import SvgIcon from 'src/components/SvgIcon';

const { useCopy } = Typography;

describe('Typography', () => {
    test('check withCopy', () => {
        const onChange = jest.fn();
        function MyComponent() {
            const copy = useCopy();
            return (
                <SvgIcon
                    type="copy"
                    onClick={() => {
                        copy('test');
                        onChange();
                    }}
                />
            );
        }
        const wrapper = mount(<MyComponent />);
        wrapper.simulate('click');
        expect(onChange).toHaveBeenCalledTimes(1);
    });
});
