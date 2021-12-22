import React from 'react';
import { Breadcrumb, Box, Icon } from '@ucloud-fe/react-components';

const Demo = () => {
    return (
        <Box container direction="column" spacing="lg">
            {Breadcrumb.StyleType.map((styleType, i) => (
                <div key={i}>
                    <Breadcrumb styleType={styleType}>
                        <Breadcrumb.BackButton type="left" onClick={() => window.history.back()} />
                        <Breadcrumb.Item noAction>
                            <Icon type="home" />
                        </Breadcrumb.Item>
                        <Breadcrumb.Item onClick={() => window.location.reload()}>
                            <Icon type="plus" />
                        </Breadcrumb.Item>
                        <Breadcrumb.Item href="https://www.google.com" target="_blank">
                            google
                        </Breadcrumb.Item>
                        <Breadcrumb.Item onClick={() => window.location.reload()}>reload</Breadcrumb.Item>
                        <Breadcrumb.Item current>current</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
            ))}
        </Box>
    );
};

export default React.memo(Demo);
