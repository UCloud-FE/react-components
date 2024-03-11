import { Box, Calendar, Form } from '@ucloud-fe/react-components';
import React from 'react';

const Demo = () => {
    return (
        <Box container direction="column" spacing="lg">
            <Form.Group title="默认">
                <Calendar />
            </Form.Group>
            <Form.Group title="区间禁用">
                <Calendar
                    rules={{ range: [Date.now() - 7 * 24 * 60 * 60 * 1000, Date.now() + 7 * 24 * 60 * 60 * 1000] }}
                />
            </Form.Group>
            <Form.Group title="区间范围">
                <Calendar
                    value={null}
                    rangeValue={[
                        new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
                        new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
                    ]}
                />
            </Form.Group>
            <Form.Group title="month - 月历">
                <Calendar
                    type="month"
                    rules={{
                        range: [Date.now() - 3 * 30 * 24 * 60 * 60 * 1000, Date.now() + 3 * 30 * 24 * 60 * 60 * 1000]
                    }}
                />
            </Form.Group>
            <Form.Group title="组合">
                <Calendar.TwoSide
                    rules={{
                        range: [Date.now() - 3 * 30 * 24 * 60 * 60 * 1000, Date.now() + 3 * 30 * 24 * 60 * 60 * 1000]
                    }}
                />
            </Form.Group>
        </Box>
    );
};

export default React.memo(Demo);
