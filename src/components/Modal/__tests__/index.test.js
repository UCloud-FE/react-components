import React from 'react';
import { mount } from 'enzyme';

import Modal from 'src/components/Modal';
import Button from 'src/components/Button';
import sleep from 'tests/shared/sleep';

describe('Modal', () => {
    test('Modal method alert', async () => {
        const wrapper = mount(
            <Button onClick={() => Modal.alert({}, <span className="my-content">Message</span>)}>click to show</Button>
        );
        wrapper.find('button').simulate('click');
        expect(document.querySelectorAll('.uc-fe-modal-wrap').length).toBe(1);
        expect(document.querySelectorAll('.my-content').length).toBe(1);
        expect(document.querySelectorAll('.my-content')[0].textContent).toBe('Message');

        document.querySelector('.uc-fe-modal-close').click();
        await sleep(500);
        expect(document.querySelectorAll('.uc-fe-modal-wrap').length).toBe(0);

        wrapper.find('button').simulate('click');
        expect(document.querySelectorAll('.uc-fe-modal-wrap').length).toBe(1);
        document.querySelector('.uc-fe-modal-wrap button').click();
        await sleep(500);
        expect(document.querySelectorAll('.uc-fe-modal-wrap').length).toBe(0);
    });

    test('Modal method confirm', async () => {
        const onOk = jest.fn();
        const wrapper = mount(
            <Button
                onClick={() =>
                    Modal.confirm(
                        {
                            onOk
                        },
                        <span className="my-content">Message</span>
                    )
                }
            >
                click to show
            </Button>
        );
        wrapper.find('button').simulate('click');
        expect(document.querySelectorAll('.uc-fe-modal-wrap').length).toBe(1);

        document.querySelector('.uc-fe-modal-close').click();
        await sleep(500);
        expect(document.querySelectorAll('.uc-fe-modal-wrap').length).toBe(0);

        wrapper.find('button').simulate('click');
        expect(document.querySelectorAll('.uc-fe-modal-wrap').length).toBe(1);
        document.querySelector('.uc-fe-modal-wrap button').click();
        await sleep(500);
        expect(document.querySelectorAll('.uc-fe-modal-wrap').length).toBe(0);
        expect(onOk).toHaveBeenCalledTimes(0);

        wrapper.find('button').simulate('click');
        expect(document.querySelectorAll('.uc-fe-modal-wrap').length).toBe(1);
        document.querySelectorAll('.uc-fe-modal-wrap button')[1].click();
        await sleep(500);
        expect(document.querySelectorAll('.uc-fe-modal-wrap').length).toBe(0);
        expect(onOk).toHaveBeenCalledTimes(1);
    });
});
