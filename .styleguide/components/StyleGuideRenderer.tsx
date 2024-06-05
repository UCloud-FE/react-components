import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Logo from 'rsg-components/Logo';
import Markdown from 'rsg-components/Markdown';
import Styled from 'rsg-components/Styled';
import cx from 'classnames';
import Ribbon from 'rsg-components/Ribbon';
import _ from 'lodash';
// import { toggleDarkTheme, isDarkTheme, toggleLocale, isEN } from './ReactExample';
import { toggleTheme, themeType, toggleLocale, isEN } from './ReactExample';
import Switch from 'src/components/Switch';
import Select from 'src/components/Select';
import Combine from 'src/components/Combine';

export const DarkThemeContext = React.createContext();

const styles = ({
    color,
    fontFamily,
    fontSize,
    sidebarWidth,
    mq,
    space,
    maxWidth,
    link,
    font,
    base,
    light,
    baseBackground
}) => ({
    root: {
        backgroundColor: color.baseBackground,
        height: '100%',
        overflow: 'hidden',
        [mq.small]: {
            overflow: 'auto'
        }
    },
    header: {
        color: '#fff',
        backgroundColor: link,
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        padding: [[space[1], space[2]]],
        zIndex: 100
    },
    bar: {
        display: 'flex',
        alignItems: 'center'
    },
    nav: {
        marginLeft: 'auto'
    },
    headerLink: {
        '&, &:link, &:visited': {
            padding: '.5em 0',
            marginLeft: '0.5em',
            marginRight: '0.5em',
            fontFamily: font,
            color: '#efefef'
        },
        '&:hover, &:active': {
            color: '#fff',
            cursor: 'pointer'
        }
    },
    darkLabel: {
        display: 'inline-block',
        padding: '.5em 0',
        marginLeft: '2em',
        marginRight: '.5em'
    },
    hasSidebar: {
        paddingLeft: sidebarWidth,
        [mq.small]: {
            paddingLeft: 0
        }
    },
    content: {
        padding: [[space[2], space[4]]],
        margin: [[0, 'auto']],
        [mq.small]: {
            padding: space[2]
        },
        display: 'block',
        overflow: 'auto',
        height: '100%'
    },
    sidebar: {
        backgroundColor: color.sidebarBackground,
        border: [[color.border, 'solid']],
        borderWidth: [[0, 1, 0, 0]],
        position: 'absolute',
        top: space[1] * 2 + fontSize.h4 * 2,
        left: 0,
        bottom: 0,
        width: sidebarWidth,
        overflow: 'auto',
        '-webkit-overflow-scrolling': 'touch',
        [mq.small]: {
            position: 'static',
            width: 'auto',
            borderWidth: [[1, 0, 0, 0]],
            paddingBottom: space[0]
        }
    },
    logo: {
        padding: space[2],
        borderBottom: [[1, color.border, 'solid']]
    },
    footer: {
        display: 'block',
        color: color.light,
        fontFamily: fontFamily.base,
        fontSize: fontSize.small
    },
    fixPaddingTop: {
        paddingTop: space[1] * 2 + fontSize.h4 * 2
    },
    wrapper: {
        position: 'relative',
        height: '100%',
        overflow: 'hidden',
        [mq.small]: {
            overflow: 'auto'
        }
    },
    center: {
        maxWidth
    }
});

const createIssueManually = location.hostname === 'localhost';
export function StyleGuideRenderer({ classes, title, homepageUrl, children, toc, hasSidebar }) {
    // const [darkTheme, setDarkTheme] = useState(isDarkTheme);
    const [theme, setTheme] = useState(themeType);
    const [enLocale, setEnLocale] = useState(isEN);
    const ComponentName =
        location.hash.indexOf('%E2%9D%96%20%20') >= 0
            ? location.hash
                  ?.replace(/\?.*/, '')
                  ?.replace(/.*\/%E2%9D%96%20%20/, '')
                  ?.replace(/\/.*$/, '')
            : 'common';
    const [componentId, setComponentId] = useState(ComponentName);
    useEffect(() => {
        setComponentId(ComponentName);
        return () => {};
    }, [ComponentName]);
    return (
        <DarkThemeContext.Provider value={theme  === 'dark'}>
            <div className={classes.root}>
                <header className={classes.header}>
                    <div className={classes.bar}>
                        <Logo show>{title}</Logo>
                        <Combine className={classes.nav}>
                            <a
                                className={classes.headerLink}
                                target="_blank"
                                href="https://github.com/UCloud-FE/react-components"
                            >
                                GitHub
                            </a>
                            <a
                                className={classes.headerLink}
                                target="_blank"
                                href="https://github.com/UCloud-FE/react-components/issues"
                            >
                                Issues
                            </a>
                            <a
                                className={classes.headerLink}
                                target="_blank"
                                href="https://www.npmjs.com/package/@ucloud-fe/react-components"
                            >
                                NPM
                            </a>
                            <Switch
                                value={enLocale}
                                onChange={v => {
                                    setEnLocale(v);
                                    toggleLocale(v);
                                }}
                                offText="CN"
                                onText="EN"
                            />
                            {/* <Switch
                                value={darkTheme}
                                offText="NOR"
                                onText="DARK"
                                onChange={v => {
                                    setDarkTheme(v);
                                    toggleDarkTheme(v);
                                }}
                            /> */}
                            <Select  value={themeType} onChange={v => {
                                setTheme(v);
                                toggleTheme(v);
                            }}>
                                <Select.Option value="default">default</Select.Option>
                                <Select.Option value="dark">dark</Select.Option>
                                <Select.Option value="private">private</Select.Option>
                            </Select>
                        </Combine>
                    </div>
                </header>
                <div className={cx(classes.wrapper, hasSidebar && classes.hasSidebar, classes.fixPaddingTop)}>
                    {hasSidebar && <div className={cx('sidebar', classes.sidebar)}>{toc}</div>}
                    <main className={classes.content} id="main-container">
                        <div className={classes.center}>
                            {children}
                            <footer className={classes.footer}>
                                <Markdown text={`Generated with [React Styleguidist](${homepageUrl})`} />
                            </footer>
                        </div>
                    </main>
                    <Ribbon />
                </div>
            </div>
        </DarkThemeContext.Provider>
    );
}

StyleGuideRenderer.propTypes = {
    classes: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    homepageUrl: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    toc: PropTypes.node.isRequired,
    hasSidebar: PropTypes.bool
};

export default Styled(styles)(StyleGuideRenderer);
