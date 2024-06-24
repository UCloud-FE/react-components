import React, { useEffect } from 'react';
import Item from './Item';
import {
  StyledOuterWrapper,
  StyledWrapper,
  configInfoWrapperCls,
  itemWrapperCls,
  itemWrapperInnerCls,
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

  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      [class^='uc-fe-card'] {
        .pro-config-info-item-wrapper-last-line {
          border-bottom: 0;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []); // 传入空数组，使副作用只执行一次
  if (col > 1) {
    const groupedData = [];
    const lineNum = Math.ceil(len / col);
    for (let i = 0; i < lineNum; i++) {
      groupedData.push(dataSource.slice(i * col, i * col + col));
    }
    const groupedDataLen = groupedData.length;
    
    return (
      <StyledOuterWrapper className={configInfoWrapperCls} {...others}>
        <StyledWrapper col={col}>
          {groupedData.map((items, i) => (
            <div className={itemWrapperInnerCls} key={i}>
              {items.map((item, j) => (
                <div className={`${itemWrapperCls}`} key={j}>
                  <Item
                    {...item}
                    customTitleWidth={customTitleWidth}
                    styleType={styleType}
                    aligin={aligin}
                    noBorder={noBorder}
                    isLastLine={i + 1 === groupedDataLen ? false : true}
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
    <div {...others}>
      {dataSource.map((item, i) => (
        <Item
          styleType={styleType}
          aligin={aligin}
          noBorder={noBorder}
          key={i}
          {...item}
          customTitleWidth={customTitleWidth}
          isLastLine={i + 1 === len ? false : true}
        />
      ))}
    </div>
  );
};

export default ConfigInfo;
