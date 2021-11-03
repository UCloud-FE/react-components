import React from 'react';
import PropTypes from 'prop-types';

import LocaleProvider from 'src/components/LocaleProvider';

// demo start
const { useLocale } = LocaleProvider;
// 使用 useLocale 使自己的组件拥有多语言切换的能力。
// 第一个参数为该组件的默认语言 map
// 第二个参数为该组件的语言 map 名称，用作全局提供语言文件到 LocaleProvider 时从中获取对应的语言
// 第三个参数为该组件本身接收的 props 语言参数，可不提供

const defaultLocale = { LOCALE_KEY: 'locale' };
const customLocale = { LOCALE_KEY: 'custom locale' };
const localeName = 'MY_CUSTOM_COMPONENT';
const CustomLocaleComponent = ({ locale }) => {
    const finalLocale = useLocale(defaultLocale, localeName, locale);
    return <div>{finalLocale.LOCALE_KEY}</div>;
};
CustomLocaleComponent.propTypes = {
    locale: PropTypes.object
};

const localeConsumerDecorator = ({ defaultLocale = {}, localeName }) => Child => {
    // eslint-disable-next-line react/display-name
    const LocalConsumerWrappedComponent = React.forwardRef(({ locale, ...rest }, ref) => {
        const finalLocale = useLocale(defaultLocale, localeName, locale);
        return <Child {...rest} locale={finalLocale} ref={ref} />;
    });
    LocalConsumerWrappedComponent.propTypes = {
        locale: PropTypes.object
    };
    return LocalConsumerWrappedComponent;
};

const A = ({ locale }) => {
    return <div>{locale.LOCALE_KEY}</div>;
};
A.propTypes = {
    locale: PropTypes.object.isRequired
};
const AWithLocale = localeConsumerDecorator({
    defaultLocale,
    localeName
})(A);

// or use as decorator
// @localeConsumerDecorator({ defaultLocale, localeName })
// class BWithLocale extends React.Component {
//     render() {
//         return <div>{this.props.locale.LOCALE_KEY}</div>;
//     }
// }
// BWithLocale.propTypes = {
//     locale: PropTypes.object.isRequired
// };

const Demo = () => {
    return (
        <div>
            <CustomLocaleComponent />
            <CustomLocaleComponent locale={customLocale} />
            <AWithLocale />
            <AWithLocale locale={customLocale} />
        </div>
    );
};
// demo end

export default Demo;
