const fs = require('fs');
const path = require('path');
import React from 'react';
import { generateImage } from 'jsdom-screenshot';
import { render, cleanup } from '@testing-library/react';
import '../imageSetup.js';
/**
 * implement if require.content is not supported
 */
if (typeof require.context === 'undefined') {
    require.context = (base = '.', scanSubDirectories = false, regularExpression = /\.js$/) => {
        const files = {};

        /**
         *
         * @param {directory} directory
         */
        function readDirectory(directory) {
            fs.readdirSync(directory).forEach(file => {
                const fullPath = path.resolve(directory, file);

                if (fs.statSync(fullPath).isDirectory()) {
                    if (scanSubDirectories) readDirectory(fullPath);

                    return;
                }

                if (!regularExpression.test(fullPath)) return;

                files[fullPath] = true;
            });
        }

        readDirectory(path.resolve(__dirname, base));

        /**
         *
         * @param {filename} file
         */
        function Module(file) {
            // eslint-disable-next-line global-require
            return require(file);
        }

        Module.keys = () => Object.keys(files);

        return Module;
    };
}

jest.setTimeout(100000);
const demoTest = () => {
    const componentsName = module.parent.filename.match(/\/src\/components\/(\w*)\/.*/)[1];
    const demoFiles = require.context(`../../src/components/${componentsName}/__demo__`, true, /.*.jsx$/).keys();

    demoFiles.forEach(file => {
        test(`${componentsName} demo -- image snapshot -- ${file.match(/^.*\/([^/]*)\.jsx?$/)[1]}`, async () => {
            const Demo = require(file).default;

            render(<Demo />);

            // Take screenshot with generateImage()
            const screenshot = await generateImage({ waitUntilNetworkIdle: true });
            // and compare it to the previous sceenshot with toMatchImageSnapshot()
            expect(screenshot).toMatchImageSnapshot();
            cleanup();
        });
    });
};

module.exports = demoTest;
