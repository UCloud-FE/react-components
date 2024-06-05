import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Playground from 'rsg-components/Playground';
import Markdown from 'rsg-components/Markdown';
import ExamplesRenderer from './ExamplesRenderer';
import { useStyleGuideContext } from 'rsg-components/Context';
import classnames from 'classnames';
import _ from 'lodash';

import path from 'path';
import { DarkThemeContext } from './StyleGuideRenderer';

const demoPath = '__demo__';

function Examples({ examples, name, filepath, exampleMode }) {
    const { codeRevision } = useStyleGuideContext();
    const darkTheme = React.useContext(DarkThemeContext);
    return (
        <ExamplesRenderer name={name}>
            {examples.map((example, index) => {
                switch (example.type) {
                    case 'code':
                        let code = example.content,
                            { codepath } = example.settings;

                        if (codepath && filepath) {
                            if (window.navigator.userAgent.indexOf('Windows')) {
                                filepath = filepath.replace(/\\/g, '/');
                            }
                            codepath = codepath.replace(/\.(j|t)sx$/, '');
                            const parentComponentName = filepath.match(
                                new RegExp(`.*\/(\\w*)\/${name}\.(j|t)sx?`)
                            )?.[1];

                            if (!parentComponentName) return null;
                            code = require(`!raw-loader!../../src/components/${parentComponentName}/${demoPath}/${codepath}.jsx`);
                            let demoStartIndex = code.match(/\/\/\s*demo\s*start\s*/);
                            demoStartIndex = demoStartIndex
                                ? demoStartIndex.index + demoStartIndex[0].length
                                : undefined;
                            let demoEndIndex = code.match(/\/\/\s*demo\s*end\s*/);
                            demoEndIndex = demoEndIndex ? demoEndIndex.index : undefined;
                            code =
                                code
                                    .slice(demoStartIndex, demoEndIndex)
                                    .replace(/require\((?:'|")(\..*)(?:'|")\)/g, (match, filePath, offset, string) => {
                                        // replace all required relative file path
                                        filePath = './' + path.join(`./${demoPath}/`, filePath);
                                        return `require('${filePath}')`;
                                    }) + '\n<Demo />;'; // add demo
                        }
                        return (
                            <Playground
                                code={code}
                                evalInContext={example.evalInContext}
                                key={`${codeRevision}/${index}`}
                                name={name}
                                index={index}
                                settings={{
                                    ...example.settings,
                                    props: {
                                        ...example.settings?.props,
                                        className: classnames(
                                            example.settings?.props?.className,
                                            darkTheme && 'rsg--example--dark'
                                        )
                                    }
                                }}
                                exampleMode={exampleMode}
                            />
                        );
                    case 'markdown':
                        return <Markdown text={example.content} key={index} />;
                    default:
                        return null;
                }
            })}
        </ExamplesRenderer>
    );
}
Examples.propTypes = {
    examples: PropTypes.array.isRequired,
    name: PropTypes.string.isRequired,
    filepath: PropTypes.string
};

let clientHeight = window.innerHeight || document.documentElement.clientHeight;
let clientWidth = window.innerWidth || document.documentElement.clientWidth;
function isInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (rect.top > 0 && rect.top < clientHeight - 50) || (rect.bottom > 100 && rect.bottom < clientHeight);
}

class Anchor extends React.PureComponent {
    state = {
        h: []
    };
    updateTree = () => {
        const { target } = this.props;
        const rootDOM = ReactDOM.findDOMNode(target);
        const allH = [...rootDOM.querySelectorAll('h2,h3,h4')];
        const filterH = [...rootDOM.querySelectorAll('.demo h2,.demo h3,.demo h4')];
        const h = allH.filter(h => !filterH.find(_h => _h === h));
        const group = { children: [], level: 0 };
        let pos = group;
        h.forEach(h => {
            const level = h.tagName.replace(/^(H|h)/, '');
            if (level > pos.level) {
                const i = {
                    level,
                    text: h.innerText || h.querySelector('a')?.innerText,
                    children: [],
                    parent: pos,
                    h
                };
                pos.children.push(i);
                pos = i;
            } else {
                const findParent = function (level, pos) {
                    if (pos.level < level) {
                        return pos;
                    }
                    return findParent(level, pos.parent);
                };
                const parent = findParent(level, pos);
                const i = {
                    level,
                    text: h.innerText || h.querySelector('a')?.innerText,
                    children: [],
                    parent,
                    h
                };
                parent.children.push(i);
                pos = i;
            }
        });
        this.setState({ h: group }, () => {
            this.updateActive();
            this.updateAnchorPlace();
        });
    };
    updateActive = _.throttle(() => {
        const { h } = this.state;
        const find = h => {
            let target;
            for (let i = 0; i < h.length; i++) {
                const _h = h[i];
                if (isInViewport(_h.h)) {
                    target = _h;
                    break;
                } else if (_h.children) {
                    target = find(_h.children);
                    if (target) break;
                }
            }
            return target;
        };
        const target = find(h.children);
        this.setState({
            active: target
        });
    }, 100);
    updateAnchorPlace = () => {
        clientHeight = window.innerHeight || document.documentElement.clientHeight;
        clientWidth = window.innerWidth || document.documentElement.clientWidth;
        const rect = document.querySelector('#main-container>div').getBoundingClientRect();
        if (clientWidth - rect.right > 220) {
            this.setState({
                place: 'out'
            });
        } else {
            this.setState({
                place: 'in'
            });
        }
    };
    click = h => {
        h?.scrollIntoView({ behavior: 'smooth' });
    };
    componentDidMount() {
        this.updateTree();
        document.querySelector('#main-container').addEventListener('scroll', this.updateActive);
        window.addEventListener('resize', this.updateAnchorPlace);
    }
    componentWillUnmount() {
        document.querySelector('#main-container').removeEventListener('scroll', this.updateActive);
        window.removeEventListener('resize', this.updateAnchorPlace);
    }
    renderAnchor = () => {
        const { h, active } = this.state;
        const renderItem = ({ text, children, h }, i) => {
            return (
                <div key={i}>
                    <div
                        className={`anchor-title ${active?.h === h ? 'anchor-title-active' : ''}`}
                        title={text}
                        onClick={() => this.click(h)}
                    >
                        {text}
                    </div>
                    {children && children.length ? <div className="anchor-list">{children.map(renderItem)}</div> : null}
                </div>
            );
        };
        return h?.children?.map(renderItem);
    };
    render() {
        return (
            <div style={{ position: 'sticky', height: 0, top: 0, zIndex: 100 }}>
                <div
                    className={`anchor-wrap ${this.state.place === 'out' ? 'anchor-wrap-out' : ''}`}
                    style={{ maxHeight: clientHeight - 200 }}
                >
                    {this.renderAnchor()}
                </div>
            </div>
        );
    }
}

export default class ExamplesT extends React.PureComponent {
    render() {
        return (
            <div style={{ position: 'relative' }}>
                {window.ActiveXObject || 'ActiveXObject' in window ? null : <Anchor target={this} />}
                <Examples {...this.props} />
            </div>
        );
    }
}
