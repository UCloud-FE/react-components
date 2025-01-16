import { fireEvent, render, screen } from '@testing-library/react';
import { mount } from 'enzyme';
import React from 'react';
import Cascader from 'src/components/Cascader';

jest.unmock('rc-trigger');
const dataSource = [
    {
        key: 'root-0-item',
        title: ' ✨ root-0-item',
        disabled: false,
        children: [
            {
                key: 'root-0-item-0-item',
                title: ' ✨ root-0-item-0-item',
                disabled: false,
                children: [
                    {
                        key: 'root-0-item-0-item-0-item',
                        title: ' ✨ root-0-item-0-item-0-item',
                        disabled: false
                    },
                    {
                        key: 'root-0-item-0-item-1-item',
                        title: ' ✨ root-0-item-0-item-1-item',
                        disabled: true
                    },
                    {
                        key: 'root-0-item-0-item-2-item',
                        title: ' ✨ root-0-item-0-item-2-item',
                        disabled: false
                    },
                    {
                        key: 'root-0-item-0-item-3-item',
                        title: ' ✨ root-0-item-0-item-3-item',
                        disabled: true
                    }
                ]
            }
        ]
    },
    {
        key: 'root-1-item',
        title: ' ✨ root-1-item',
        disabled: false,
        children: [
            {
                key: 'root-1-item-0-item',
                title: ' ✨ root-1-item-0-item',
                disabled: false,
                children: [
                    {
                        key: 'root-1-item-0-item-0-item',
                        title: ' ✨ root-1-item-0-item-0-item',
                        disabled: false
                    },
                    {
                        key: 'root-1-item-0-item-1-item',
                        title: ' ✨ root-1-item-0-item-1-item',
                        disabled: false
                    },
                    {
                        key: 'root-1-item-0-item-2-item',
                        title: ' ✨ root-1-item-0-item-2-item',
                        disabled: false
                    },
                    {
                        key: 'root-1-item-0-item-3-item',
                        title: ' ✨ root-1-item-0-item-3-item',
                        disabled: true
                    },
                    {
                        key: 'root-1-item-0-item-4-item',
                        title: ' ✨ root-1-item-0-item-4-item',
                        disabled: false
                    }
                ]
            },
            {
                key: 'root-1-item-1-item',
                title: ' ✨ root-1-item-1-item',
                disabled: false,
                children: [
                    {
                        key: 'root-1-item-1-item-0-item',
                        title: ' ✨ root-1-item-1-item-0-item',
                        disabled: false
                    },
                    {
                        key: 'root-1-item-1-item-1-item',
                        title: ' ✨ root-1-item-1-item-1-item',
                        disabled: true
                    }
                ]
            },
            {
                key: 'root-1-item-2-item',
                title: ' ✨ root-1-item-2-item',
                disabled: false
            }
        ]
    }
];
describe('Cascader', () => {
    test('topExtra call', () => {
        const topExtraRenderMock = jest.fn(() => 'Extra Content');
        render(<Cascader dataSource={dataSource} topExtraRender={topExtraRenderMock} />);
        const input = screen.getByPlaceholderText('请选择');
        fireEvent.click(input);
        expect(topExtraRenderMock).toHaveBeenCalled();
    });
    test('topExtra render', () => {
        const wrapper = mount(
            <Cascader
                dataSource={dataSource}
                topExtraRender={({ index, items, parents }) => {
                    return <div className="topExtraRender">{index}</div>;
                }}
            />
        );
        const input = wrapper.find('input');
        input.simulate('click');
        expect(wrapper.find('.topExtraRender').length).toBe(1);
    });
});
