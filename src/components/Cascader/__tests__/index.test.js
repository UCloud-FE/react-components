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

const findCascaderPopover = wrapper =>
    wrapper.findWhere(node => node.prop('align') && node.prop('popup') && node.prop('showAction')).first();

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
    test('popupPlacement bottomRight aligns popup to trigger right edge', () => {
        const wrapper = mount(<Cascader dataSource={dataSource} popupPlacement="bottomRight" />);
        expect(findCascaderPopover(wrapper).prop('align')).toEqual({
            points: ['tr', 'br'],
            overflow: { adjustX: 0, adjustY: 1 },
            offset: [0, 5],
            targetOffset: [0, 0]
        });
    });
    test('popupMaxWidth passes max width to popup wrapper', () => {
        const wrapper = mount(<Cascader dataSource={dataSource} popupMaxWidth={320} />);
        expect(findCascaderPopover(wrapper).prop('popup').props.popupMaxWidth).toBe(320);
    });
    test('popoverProps align takes precedence over popupPlacement', () => {
        const align = {
            points: ['tl', 'tr'],
            overflow: { adjustX: 1, adjustY: 1 },
            offset: [8, 0],
            targetOffset: [0, 0]
        };
        const wrapper = mount(
            <Cascader dataSource={dataSource} popupPlacement="bottomRight" popoverProps={{ align }} />
        );
        expect(findCascaderPopover(wrapper).prop('align')).toBe(align);
    });
});
