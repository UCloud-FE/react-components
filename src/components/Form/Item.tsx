import React, { InputHTMLAttributes, ReactNode, useContext, useMemo } from 'react';

import Tooltip from 'src/components/Tooltip';

import ItemContext from './ItemContext';
import ControllerContext from './ControllerContext';
import {
    ItemWrap,
    LabelWrap,
    ControllerWrap,
    tipIconCls,
    tipContentCls,
    StatusIcon,
    Tip,
    RequiredLabel,
    HelpIcon,
    GridLabelWrap,
    GridItemWrap,
    GridControllerWrap,
    CommentWrap
} from './style';

const HelpWithoutMemo = ({ help }: { help: ReactNode }) => {
    return help ? (
        <Tooltip
            popup={help}
            align={{
                points: ['bl', 'tl'],
                overflow: { adjustX: 1, adjustY: 1 },
                offset: [-10, -10],
                targetOffset: [0, 0]
            }}
        >
            <HelpIcon type="question-circle" size="14px" />
        </Tooltip>
    ) : null;
};
const Help = React.memo(HelpWithoutMemo);

interface ColShape {
    /** 栅格占位格数 */
    span?: number;
    /** 栅格向右偏移格数，偏移占位 */
    offset?: number;
    /** 栅格向左偏移格数，偏移不占位 */
    pull?: number;
    /** 栅格向右偏移格数，偏移不占位 */
    push?: number;
}

export interface DefinedItemProps {
    /** 表单项标签 */
    label: ReactNode;
    /** 标签的col配置 */
    labelCol?: ColShape;
    /** 控件的col配置 */
    controllerCol?: ColShape;
    /** 表单项的提示描述 */
    help?: ReactNode;
    /** 表单项是否为必填/必选，仅影响 UI，逻辑必须请看 ZForm rules 的 required */
    required?: boolean;
    /** 影响提示的状态/类型、包裹的控件的状态 */
    status?: 'default' | 'success' | 'warning' | 'error' | 'loading';
    /** 是否将状态传递给 item 下的表单控件（目前仅 Input 支持部分状态） */
    shareStatus?: boolean;
    /** 提示信息 */
    tip?:
        | {
              /** 自定义提示图标 */
              icon?: ReactNode;
              /** 提示内容 */
              content?: ReactNode;
          }
        | ReactNode;
}

export type ItemProps = DefinedItemProps & Omit<InputHTMLAttributes<HTMLDivElement>, keyof DefinedItemProps>;

const formatTip = (
    tip: DefinedItemProps['tip']
): {
    icon?: ReactNode;
    content?: ReactNode;
} => {
    if (typeof tip === 'string' || React.isValidElement(tip)) return { content: tip };
    return tip as {
        icon?: ReactNode;
        content?: ReactNode;
    };
};

const RenderTip = ({ tip, status }: Pick<ItemProps, 'tip'> & Required<Pick<ItemProps, 'status'>>) => {
    const finalTip = useMemo(() => formatTip(tip), [tip]);
    return finalTip ? (
        <Tip spacing="sm" status={status}>
            {finalTip.icon === false ? null : (
                <div className={tipIconCls}>
                    {finalTip.icon || finalTip.icon === null || finalTip.icon === false ? (
                        finalTip.icon
                    ) : (
                        <StatusIcon status={status} spin={status === 'loading'} />
                    )}
                </div>
            )}
            <div className={tipContentCls}>{finalTip.content}</div>
        </Tip>
    ) : null;
};

const GridItem = (props: ItemProps) => {
    const {
        label,
        required,
        children,
        labelCol,
        controllerCol,
        status = 'default',
        tip,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        shareStatus,
        help,
        ...rest
    } = props;

    const item = (
        <GridItemWrap {...rest}>
            <GridLabelWrap {...labelCol}>
                {label}
                {required && <RequiredLabel>*</RequiredLabel>}
                <Help help={help} />
            </GridLabelWrap>
            <GridControllerWrap {...controllerCol}>
                {children}
                <RenderTip tip={tip} status={status} />
            </GridControllerWrap>
        </GridItemWrap>
    );
    return item;
};

const UnGridItem = (props: ItemProps) => {
    const {
        label,
        required,
        children,
        labelCol,
        controllerCol,
        status = 'default',
        tip,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        shareStatus,
        help,
        ...rest
    } = props;

    return (
        <ItemWrap {...rest}>
            <LabelWrap {...labelCol}>
                {label}
                {required && <RequiredLabel>*</RequiredLabel>}
                {help && <CommentWrap>{help}</CommentWrap>}
            </LabelWrap>
            <ControllerWrap {...controllerCol}>
                {children}
                <RenderTip tip={tip} status={status} />
            </ControllerWrap>
        </ItemWrap>
    );
};

const Item = (props: ItemProps) => {
    const itemContext = useContext(ItemContext);
    const fullProps = {
        ...itemContext,
        ...props
    };
    const { labelCol, controllerCol, status = 'default', shareStatus } = fullProps;
    const notGrid = useMemo(() => !(controllerCol || labelCol), [controllerCol, labelCol]);

    const item = notGrid ? <UnGridItem {...fullProps} /> : <GridItem {...fullProps} />;
    if (shareStatus) {
        return <ControllerContext.Provider value={{ status }}>{item}</ControllerContext.Provider>;
    }
    return item;
};

export default React.memo(Item);
