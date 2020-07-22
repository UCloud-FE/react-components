import React from 'react';

import PopConfirm from 'src/components/PopConfirm';
import Button from 'src/components/Button';
import Combine from 'src/components/Combine';

// demo start
const Demo = () => (
    <div>
        <Combine>
            <PopConfirm
                popup="一点文字一点文字"
                onConfirm={() => console.log('onConfirm')}
                onCancel={() => console.log('onCancel')}
            >
                <Button styleType="primary">一点文字</Button>
            </PopConfirm>
            <PopConfirm
                popup="一些文字一些文字一些文字一些文字一些文字"
                onConfirm={() => console.log('onConfirm')}
                onCancel={() => console.log('onCancel')}
            >
                <Button styleType="primary">一些文字</Button>
            </PopConfirm>
            <PopConfirm
                popup="比较多的文字比较多的文字比较多的文字比较多的文字比较多的文字比较多的文字比较多的文字比较多的文字"
                onConfirm={() => console.log('onConfirm')}
                onCancel={() => console.log('onCancel')}
            >
                <Button styleType="primary">比较多的文字</Button>
            </PopConfirm>
            <PopConfirm
                popup="很多的文字很多的文字很多的文字很多的文字很多的文字很多的文字很多的文字很多的文字很多的文字很多的文字很多的文字很多的文字很多的文字很多的文字很多的文字很多的文字很多的文字很多的文字很多的文字很多的文字很多的文字很多的文字很多的文字很多的文字很多的文字很多的文字很多的文字很多的文字很多的文字很多的文字很多的文字很多的文字很多的文字很多的文字很多的文字很多的文字"
                onConfirm={() => console.log('onConfirm')}
                onCancel={() => console.log('onCancel')}
            >
                <Button styleType="primary">很多的文字</Button>
            </PopConfirm>
        </Combine>
    </div>
);
// demo end

export default Demo;
