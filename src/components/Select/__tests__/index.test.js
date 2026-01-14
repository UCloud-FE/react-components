import { fireEvent, render, waitFor } from '@testing-library/react';
import React from 'react';
import Select from 'src/components/Select';

jest.unmock('rc-trigger');

describe('Select', () => {
    test('autoClearSearchValue - 多选搜索时点击选项后清除搜索值', async () => {
        const onChange = jest.fn();
        const onSearchValueChange = jest.fn();

        const { Option } = Select;

        class Demo extends React.Component {
            constructor(props) {
                super(props);
                this.state = {
                    value: [],
                    searchValue: ''
                };
            }
            render() {
                return (
                    <div>
                        <div className="demo-wrap">
                            <Select
                                value={this.state.value}
                                multiple
                                search={{
                                    onSearchValueChange: v => {
                                        this.setState({ searchValue: v });
                                        onSearchValueChange(v);
                                    },
                                    searchValue: this.state.searchValue
                                }}
                                autoClearSearchValue
                                onChange={v => {
                                    onChange(v);
                                    this.setState({ value: v });
                                }}
                            >
                                <Option value={1}>test option 1</Option>
                                <Option value={2}>test option 2</Option>
                                <Option value={3}>test option 3</Option>
                                <Option value={4}>test option 4</Option>
                                <Option value={5}>test option 5</Option>
                            </Select>
                        </div>
                    </div>
                );
            }
        }

        const { container } = render(<Demo />);

        // 等待组件完全渲染
        await waitFor(() => {
            const selector = container.querySelector('.uc-fe-input');
            expect(selector).toBeTruthy();
        });

        // 获取选择器中的 input（多选模式下选择器本身有搜索功能）
        const selector = container.querySelector('.uc-fe-input');
        const selectorInput = selector.querySelector('input');
        expect(selectorInput).toBeTruthy();

        // 先打开下拉框
        fireEvent.focus(selectorInput);
        fireEvent.click(selector);

        // 等待弹出层打开 - 等待菜单项出现
        await waitFor(
            () => {
                const menuItem = document.querySelector('.uc-fe-menu-item');
                expect(menuItem).toBeTruthy();
            },
            { timeout: 3000 }
        );

        // 现在输入搜索值（通过选择器中的 input）
        // 这会触发 onSearchValueChange 回调
        fireEvent.change(selectorInput, { target: { value: 'test' } });

        // 验证搜索值已设置
        await waitFor(() => {
            expect(onSearchValueChange).toHaveBeenCalledWith('test');
        });

        // 点击第一个选项
        const menuItems = document.querySelectorAll('.uc-fe-menu-item');
        expect(menuItems.length).toBeGreaterThan(0);
        fireEvent.click(menuItems[0]);

        // 验证 onChange 被调用
        await waitFor(() => {
            expect(onChange).toHaveBeenCalled();
        });

        // 验证搜索值被清除
        await waitFor(() => {
            expect(onSearchValueChange).toHaveBeenLastCalledWith('');
        });

        // 验证选择器中的 input 值也被清除（因为 searchValue 是受控的）
        await waitFor(() => {
            expect(selectorInput.value).toBe('');
        });
    });

    test('PopupV1 handleChange - 单选模式下选择后关闭下拉框', async () => {
        const onChange = jest.fn();
        const onVisibleChange = jest.fn();
        const { Option } = Select;

        class Demo extends React.Component {
            constructor(props) {
                super(props);
                this.state = {
                    value: undefined
                };
            }
            render() {
                return (
                    <div>
                        <div className="demo-wrap">
                            <Select
                                value={this.state.value}
                                onChange={v => {
                                    onChange(v);
                                    this.setState({ value: v });
                                }}
                                onVisibleChange={onVisibleChange}
                            >
                                <Option value={1}>option 1</Option>
                                <Option value={2}>option 2</Option>
                                <Option value={3}>option 3</Option>
                            </Select>
                        </div>
                    </div>
                );
            }
        }

        const { container } = render(<Demo />);

        // 等待组件完全渲染
        await waitFor(() => {
            const selector = container.querySelector('.uc-fe-input');
            expect(selector).toBeTruthy();
        });

        // 打开下拉框
        const selector = container.querySelector('.uc-fe-input');
        const selectorInput = selector.querySelector('input');

        // 如果有 input，先 focus；否则直接 click
        if (selectorInput) {
            fireEvent.focus(selectorInput);
        }
        fireEvent.click(selector);

        // 等待弹出层打开
        await waitFor(
            () => {
                const menuItem = document.querySelector('.uc-fe-menu-item');
                expect(menuItem).toBeTruthy();
            },
            { timeout: 3000 }
        );

        // 点击第一个选项
        const menuItems = document.querySelectorAll('.uc-fe-menu-item');
        fireEvent.click(menuItems[0]);

        // 验证 onChange 被调用，传入单个值
        await waitFor(() => {
            expect(onChange).toHaveBeenCalledWith(1);
        });

        // 验证下拉框被关闭（单选模式下会自动关闭）
        await waitFor(
            () => {
                expect(onVisibleChange).toHaveBeenLastCalledWith(false);
            },
            { timeout: 1000 }
        );
    });

    test('PopupV2 handleChange - 多选模式下选择后不关闭下拉框', async () => {
        const onChange = jest.fn();
        const onVisibleChange = jest.fn();
        const { Option } = Select;

        class Demo extends React.Component {
            constructor(props) {
                super(props);
                this.state = {
                    value: []
                };
            }
            render() {
                return (
                    <div>
                        <div className="demo-wrap">
                            <Select
                                value={this.state.value}
                                multiple
                                onChange={v => {
                                    onChange(v);
                                    this.setState({ value: v });
                                }}
                                onVisibleChange={onVisibleChange}
                            >
                                <Option value={1}>option 1</Option>
                                <Option value={2}>option 2</Option>
                                <Option value={3}>option 3</Option>
                            </Select>
                        </div>
                    </div>
                );
            }
        }

        const { container } = render(<Demo />);

        // 等待组件完全渲染
        await waitFor(() => {
            const selector = container.querySelector('.uc-fe-input');
            expect(selector).toBeTruthy();
        });

        // 打开下拉框
        const selector = container.querySelector('.uc-fe-input');
        const selectorInput = selector.querySelector('input');

        // 如果有 input，先 focus；否则直接 click
        if (selectorInput) {
            fireEvent.focus(selectorInput);
        }
        fireEvent.click(selector);

        // 等待弹出层打开
        await waitFor(
            () => {
                const menuItem = document.querySelector('.uc-fe-menu-item');
                expect(menuItem).toBeTruthy();
            },
            { timeout: 3000 }
        );

        // 点击第一个选项
        const menuItems = document.querySelectorAll('.uc-fe-menu-item');
        fireEvent.click(menuItems[0]);

        // 验证 onChange 被调用，传入数组
        await waitFor(() => {
            expect(onChange).toHaveBeenCalledWith([1]);
        });

        // 验证下拉框没有关闭（多选模式下不会自动关闭）
        // onVisibleChange 不应该被调用为 false
        expect(onVisibleChange).not.toHaveBeenLastCalledWith(false);
    });

    test('全选按钮显示搜索值 - 有搜索值时显示搜索值', async () => {
        const onChange = jest.fn();
        const onSearchValueChange = jest.fn();
        const { Option } = Select;

        class Demo extends React.Component {
            constructor(props) {
                super(props);
                this.state = {
                    value: [],
                    searchValue: 'test'
                };
            }
            render() {
                return (
                    <div>
                        <div className="demo-wrap">
                            <Select
                                value={this.state.value}
                                multiple
                                showSelectAll
                                search={{
                                    onSearchValueChange: v => {
                                        this.setState({ searchValue: v });
                                        onSearchValueChange(v);
                                    },
                                    searchValue: this.state.searchValue
                                }}
                                onChange={v => {
                                    onChange(v);
                                    this.setState({ value: v });
                                }}
                            >
                                <Option value={1}>test option 1</Option>
                                <Option value={2}>test option 2</Option>
                                <Option value={3}>option 3</Option>
                            </Select>
                        </div>
                    </div>
                );
            }
        }

        const { container } = render(<Demo />);

        // 等待组件完全渲染
        await waitFor(() => {
            const selector = container.querySelector('.uc-fe-input');
            expect(selector).toBeTruthy();
        });

        // 打开下拉框
        const selector = container.querySelector('.uc-fe-input');
        const selectorInput = selector.querySelector('input');

        // 如果有 input，先 focus；否则直接 click
        if (selectorInput) {
            fireEvent.focus(selectorInput);
        }
        fireEvent.click(selector);

        // 等待弹出层打开
        await waitFor(
            () => {
                const menuItem = document.querySelector('.uc-fe-menu-item');
                expect(menuItem).toBeTruthy();
            },
            { timeout: 3000 }
        );

        // 查找全选按钮
        await waitFor(() => {
            const selectAllBtn = document.querySelector('.uc-fe-select-select-all-btn-wrap');
            expect(selectAllBtn).toBeTruthy();
            // 验证全选按钮文本包含搜索值
            expect(selectAllBtn.textContent).toContain('test');
        });
    });

    test('CustomPopup autoClearSearchValue - 自定义渲染弹层时传递 autoClearSearchValue', async () => {
        const onChange = jest.fn();
        const onSearchValueChange = jest.fn();
        const renderPopup = jest.fn(({ onChange: popupOnChange, autoClearSearchValue: popupAutoClear }) => {
            // 验证 autoClearSearchValue 被传递
            expect(popupAutoClear).toBe(true);
            return (
                <div className="custom-popup">
                    <div className="custom-option" onClick={() => popupOnChange([1])}>
                        Custom Option 1
                    </div>
                </div>
            );
        });
        const { Option } = Select;

        class Demo extends React.Component {
            constructor(props) {
                super(props);
                this.state = {
                    value: [],
                    searchValue: 'test'
                };
            }
            render() {
                return (
                    <div>
                        <div className="demo-wrap">
                            <Select
                                value={this.state.value}
                                multiple
                                search={{
                                    onSearchValueChange: v => {
                                        this.setState({ searchValue: v });
                                        onSearchValueChange(v);
                                    },
                                    searchValue: this.state.searchValue
                                }}
                                autoClearSearchValue
                                renderPopup={renderPopup}
                                onChange={v => {
                                    onChange(v);
                                    this.setState({ value: v });
                                }}
                            >
                                <Option value={1}>option 1</Option>
                                <Option value={2}>option 2</Option>
                            </Select>
                        </div>
                    </div>
                );
            }
        }

        const { container } = render(<Demo />);

        // 等待组件完全渲染
        await waitFor(() => {
            const selector = container.querySelector('.uc-fe-input');
            expect(selector).toBeTruthy();
        });

        // 打开下拉框
        const selector = container.querySelector('.uc-fe-input');
        const selectorInput = selector.querySelector('input');

        // 如果有 input，先 focus；否则直接 click
        if (selectorInput) {
            fireEvent.focus(selectorInput);
        }
        fireEvent.click(selector);

        // 等待自定义弹层渲染
        await waitFor(
            () => {
                const customPopup = document.querySelector('.custom-popup');
                expect(customPopup).toBeTruthy();
            },
            { timeout: 3000 }
        );

        // 验证 renderPopup 被调用，并且 autoClearSearchValue 被传递
        expect(renderPopup).toHaveBeenCalled();
        const lastCall = renderPopup.mock.calls[renderPopup.mock.calls.length - 1];
        expect(lastCall[0].autoClearSearchValue).toBe(true);

        // 点击自定义选项
        const customOption = document.querySelector('.custom-option');
        fireEvent.click(customOption);

        // 验证 onChange 被调用
        await waitFor(() => {
            expect(onChange).toHaveBeenCalledWith([1]);
        });

        // 验证搜索值被清除（因为 autoClearSearchValue 为 true）
        await waitFor(() => {
            expect(onSearchValueChange).toHaveBeenLastCalledWith('');
        });
    });
});
