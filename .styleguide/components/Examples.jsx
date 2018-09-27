import React from 'react';
import PropTypes from 'prop-types';
import Playground from 'rsg-components/Playground';
import Markdown from 'rsg-components/Markdown';
import ExamplesRenderer from './ExamplesRenderer';

import path from 'path';

const demoPath = '__demo__';

export default function Examples({ examples, name, filepath, exampleMode }, { codeRevision }) {
    return (
        <ExamplesRenderer>
            {examples.map((example, index) => {
                switch (example.type) {
                    case 'code':
                        let code = example.content,
                            { codepath } = example.settings;
                        if (codepath && filepath) {
                            if (window.navigator.userAgent.indexOf('Windows')) {
                                filepath = filepath.replace(/\\/g, '/');
                            }
                            const parentComponentName = filepath.match(new RegExp(`.*\/(\\w*)\/${name}\.jsx?`))[1];
                            code = require(`!raw-loader!../../src/components/${parentComponentName}/${demoPath}/${
                                example.settings.codepath
                            }`);
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
                                settings={example.settings}
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
Examples.contextTypes = {
    codeRevision: PropTypes.number.isRequired
};
