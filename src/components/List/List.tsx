import React from 'react';
import Box from 'src/components/Box';
import { ListStyledOuterWrapper, ListWrapper, listWrapperCls, listWrapperInnerCls } from './style';
import { ConfigInfoProps, ListProps } from './typings';
import ConfigInfo from './ConfigInfo';

const List = ({ styleType = 'list', dataSource = [], col = 3, spacing = [20, 0], className }: ListProps) => {
    const finalCol = styleType === 'list' ? dataSource.length : col;
    const  _width = Math.round((100 / col) * 100) / 100;
    const boxStyle = {
        display: 'grid',
        gridTemplateColumns: `repeat(auto-fill, minmax(${_width}%, 1fr))`,
      };
    return styleType === 'list' ? (
        <ListStyledOuterWrapper spacing={spacing}>
            <ListWrapper col={finalCol} spacing={spacing}>
                <div className={listWrapperInnerCls}>
                    {dataSource.map((item, i) => {
                        if (React.isValidElement(item)) {
                            return (
                                <div className={`${listWrapperCls}`} key={i}>
                                    {item as React.ReactNode}
                                </div>
                            );
                        }
                        const finalItem = { ...(item as ConfigInfoProps) };
                        return (
                            <div className={`${listWrapperCls}`} key={i}>
                                <ConfigInfo
                                    dataSource={finalItem.dataSource}
                                    noBorder
                                    col={1}
                                    className={`${className}`}
                                />
                            </div>
                        );
                    })}
                </div>
            </ListWrapper>
        </ListStyledOuterWrapper>
    ) : (
        <Box container wrap="wrap" spacing={spacing} style={boxStyle}>
            {dataSource.map((item, index) => (
                <Box key={index as React.Key} style={{ height: '100%' }} >
                    {item}
                </Box>
            ))}
        </Box>
    );
};

export default List;
