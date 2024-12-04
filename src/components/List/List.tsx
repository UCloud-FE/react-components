import React from 'react';
import Box from 'src/components/Box';
import { ListStyledOuterWrapper, listWrapperCls, listWrapperInnerCls } from './style';
import { ConfigInfoProps, ListProps } from './typings';
import ConfigInfo from './ConfigInfo';


const List = ({ styleType = 'list', items = [],  colWitdh = 300, spacing, className }: ListProps) => {

    const _width = typeof colWitdh === 'number' ? `${colWitdh}px` : colWitdh;
 
    // return <ListStyledOuterWrapper spacing={spacing}>{styleType === 'list' ? (
    return <ListStyledOuterWrapper spacing={spacing} width={_width}>{styleType === 'list' ? (
                <Box container wrap="wrap"  className={`${listWrapperInnerCls} ${className}`}>
                    {items.map((item, i) => {
                        if (React.isValidElement(item)) {
                            return (
                                <div className={`${listWrapperCls}`} key={i}>
                                    {item as React.ReactNode}
                                </div>
                            );
                        }
                        const finalItem = { ...(item as ConfigInfoProps) };
                        return (
                            <Box key={i as React.Key} >
                                <ConfigInfo
                                    dataSource={finalItem.dataSource}
                                    noBorder
                                    col={1}
                                   
                                />
                            </Box>
                        );
                    })}
                </Box>
        
    ) : (
        <Box container wrap="wrap"  className={`${listWrapperInnerCls} ${className}`}>
            {items.map((item, index) => (
                <Box key={index as React.Key} style={{ height: '100%' }} >
                    {item}
                </Box>
            ))}
        </Box>
    )}
    </ListStyledOuterWrapper>
};

export default List;
