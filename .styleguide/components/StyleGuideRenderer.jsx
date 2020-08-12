import React from 'react';
import PropTypes from 'prop-types';
import Logo from 'rsg-components/Logo';
import Markdown from 'rsg-components/Markdown';
import Styled from 'rsg-components/Styled';
import cx from 'classnames';
import Ribbon from 'rsg-components/Ribbon';
import _ from 'lodash';
import themeIcon from '!url-loader!./theme.svg';

import Popover from 'src/components/Popover';
import { themeList, themeColor, changeTheme } from './ReactExample';

const xsmall = '@media (max-width: 600px)';

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
        overflow: 'hidden'
    },
    header: {
        color: '#fff',
        backgroundColor: link,
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 100
    },
    bar: {
        display: 'flex',
        alignItems: 'center',
        [xsmall]: {
            flexDirection: 'column',
            alignItems: 'center'
        }
    },
    nav: {
        marginLeft: 'auto',
        marginRight: '-0.5em',
        [xsmall]: {
            margin: [[10, 0, 0]]
        }
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
    themeIcon: {
        width: '2em',
        height: '2em',
        marginLeft: '0.5em',
        verticalAlign: 'middle',
        cursor: 'pointer'
    },
    themeWrap: {
        width: '10em',
        height: '10em',
        background: '#fff',
        border: '1px solid #ccc',
        boxSizing: 'content-box'
    },
    themeButton: {
        display: 'inline-block',
        cursor: 'pointer',
        width: '4em',
        height: '4em',
        borderRadius: '2em',
        margin: '.5em'
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
        top: space[2] * 2 + fontSize.h4 * 2,
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
        paddingTop: space[2] * 2 + fontSize.h4 * 2
    },
    wrapper: {
        position: 'relative',
        height: '100%',
        overflow: 'hidden'
    },
    center: {
        margin: [[0, 'auto']],
        maxWidth
    }
});

export function StyleGuideRenderer({ classes, title, homepageUrl, children, toc, hasSidebar }) {
    return (
        <div className={classes.root}>
            <header className={classes.header}>
                <div className={classes.content}>
                    <div className={classes.bar}>
                        <Logo show>{title}</Logo>
                        <nav className={classes.nav}>
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
                            <Popover
                                popup={
                                    <div className={classes.themeWrap}>
                                        {_.map(themeList, (theme, themeType) => (
                                            <span
                                                key={themeType}
                                                title={themeType}
                                                className={classes.themeButton}
                                                style={{ background: themeColor[themeType] }}
                                                onClick={() => changeTheme(themeType)}
                                            />
                                        ))}
                                    </div>
                                }
                            >
                                <img src={themeIcon} className={cx(classes.themeIcon)} alt="switch theme icon" />
                            </Popover>
                        </nav>
                    </div>
                </div>
            </header>
            <div className={cx(classes.wrapper, hasSidebar && classes.hasSidebar, classes.fixPaddingTop)}>
                {hasSidebar && <div className={cx('sidebar', classes.sidebar)}>{toc}</div>}
                <main className={classes.content}>
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
