import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import { Circle as RCCircle } from 'rc-progress';
import useDesignTokens from 'src/components/ThemeProvider/useDesignTokens';
import Tooltip from 'src/components/Tooltip';
import { CircleWrapper, CircleText } from './style';

const CircleProgress = ({ format, percent, strokeWidth = 10, color, style = {}, ...rest }) => {
    const DT = useDesignTokens();
    const circleWrapperRef = useRef(null);
    const [width, setWidth] = React.useState();

    const getStrokeColor = useCallback(
        color => {
            switch (color) {
                case 'success':
                    return DT.T_COLOR_BG_SUCCESS_DARK;
                case 'warn':
                    return DT.T_COLOR_BG_WARNING_DARK;
                case 'error':
                    return DT.T_COLOR_BG_ERROR_DARK;
                case 'default':
                    return DT.T_COLOR_BG_PRIMARY_1;
                default:
                    return color || DT.T_COLOR_BG_PRIMARY_1;
            }
        },
        [DT]
    );

    useEffect(() => {
        const circleWrapper = circleWrapperRef.current;
        if (circleWrapper) {
            setWidth(circleWrapper.clientWidth);
        }
    }, [circleWrapperRef]);

    const _strokeWidth = useMemo(() => {
        // rc-progress 环形进度条的 strokeWidth 是相对于环形的宽度的，想要任意 width 的环形进度条都是同样的粗细，需要计算出相对于 100px 宽度的 strokeWidth
        return width ? strokeWidth * (100 / width) : strokeWidth;
    }, [strokeWidth, width]);

    const circleContent = (
        <RCCircle
            percent={percent}
            strokeWidth={_strokeWidth}
            trailWidth={_strokeWidth}
            strokeColor={getStrokeColor(color)}
            trailColor={DT.T_PROGRESS_COLOR_BG_DEFAULT}
        />
    );

    const FormatInfo = () => {
        return format !== null && <CircleText>{format(percent)}</CircleText>;
    };

    return (
        <CircleWrapper ref={circleWrapperRef} style={{ ...style, height: width }} {...rest}>
            {width <= 36 ? (
                format ? (
                    <Tooltip popup={<FormatInfo />}>
                        <span>{circleContent}</span>
                    </Tooltip>
                ) : (
                    circleContent
                )
            ) : (
                <>
                    {circleContent}
                    {<FormatInfo />}
                </>
            )}
        </CircleWrapper>
    );
};

CircleProgress.propTypes = {
    /** 当前百分比 */
    percent: PropTypes.number,
    /** 进度条颜色，内置 success、warn、error */
    color: PropTypes.oneOfType([PropTypes.oneOf(['success', 'warn', 'error']), PropTypes.string]),
    /**
     * 展示文字的格式化，为 null 时隐藏文字
     * @argument percent - 格式化的百分比
     */
    format: PropTypes.func,
    /**
     * 进度条粗度
     */
    strokeWidth: PropTypes.number,
    /**
     * @ignore 样式
     */
    style: PropTypes.object
};

export default CircleProgress;
