import React from 'react';
import Item from './Item';
import {
  StyledOuterWrapper,
  StyledWrapper,
  configInfoWrapperCls,
  itemWrapperCls,
  itemWrapperInnerCls,
  itemBorderCls,
  StyleSingledWrapper,
  itemWrapperLastLineCls
} from './style';
import { ConfigInfoProps } from './typings';

/**
 * ConfigInfo
 * @description 展示配置信息
 */
const ConfigInfo = ({
  styleType ,
  dataSource = [],
  col = 1,
  customTitleWidth,
  aligin,
  noBorder,
  ...others
}: ConfigInfoProps ) => {
  const len = dataSource.length;


  if (col > 1) {
    const groupedData = [];
    const lineNum = Math.ceil(len / col);
    if(lineNum >= 1 && len >= col ){
      for (let i = 0; i < lineNum; i++) {
        groupedData.push(dataSource.slice(i * col, i * col + col));
      }
    }else{
       const coveringLen = col - len ;
       const covering = new Array(coveringLen).fill({
        isCovering: true,
       });
       groupedData.push([
        ...dataSource,
        ...covering
       ])
    }
    const groupedDataLen = groupedData.length;
    
    return (
      <StyledOuterWrapper className={configInfoWrapperCls} {...others}>
        <StyledWrapper col={col} noBorder={noBorder}>
          {groupedData.map((items, i) => (
            <div className={itemWrapperInnerCls} key={i}>
              {items.map((item, j) => (
                <div className={`${itemWrapperCls} ${item.isCovering ? '':itemBorderCls} ${i + 1 === groupedDataLen ? itemWrapperLastLineCls:'' }`} key={j}>
                  <Item
                    {...item}
                    customTitleWidth={customTitleWidth}
                    styleType={styleType}
                    aligin={aligin}
                    
                  
                  />
                </div>
              ))}
            </div>
          ))}
        </StyledWrapper>
      </StyledOuterWrapper>
    );
  }

  return (
    <StyleSingledWrapper {...others} noBorder={noBorder}>
      {dataSource.map((item, i) => (
        <div className={`${itemBorderCls} ${i + 1 === len ? itemWrapperLastLineCls : '' }`}  key={i}>
              <Item
              styleType={styleType}
              aligin={aligin}
              
              key={i}
              {...item}
              customTitleWidth={customTitleWidth}
            
            />
        </div>
        
      ))}
    </StyleSingledWrapper>
  );
};

export default ConfigInfo;
