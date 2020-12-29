import React from 'react';

import Link from 'src/components/Link';

// demo start
const Demo = () => (
    <>
        <Link.Button href="https://google.com" target="_blank">
            Link to Google
        </Link.Button>
        <Link.Button href="https://google.com" target="_blank" styleType="primary">
            Link to Google
        </Link.Button>
        <Link.Button href="https://google.com" target="_blank" size="lg">
            Link to Google
        </Link.Button>
        <Link.Button href="https://google.com" target="_blank" shape="circle" icon="plus"></Link.Button>
    </>
);
// demo end

export default Demo;
