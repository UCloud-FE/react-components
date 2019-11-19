/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import ZForm from 'components/ZForm';
import Form from 'components/Form';
import Input from 'components/Input';
import Select from 'components/Select';
import Switch from 'components/Switch';
import Checkbox from 'components/Checkbox';
import Radio from 'components/Radio';
import Button from 'components/Button';

// demo start
const { formDecorator, controllerDecorator, formShape } = ZForm;
const { Item } = Form;
const CheckboxGroup = Checkbox.Group;
const RadioGroup = Radio.Group;

const ZInput = controllerDecorator({
    initialValue: ''
})(Input);

const ZSwitch = controllerDecorator({ initialValue: false, valuePropName: 'checked' })(Switch);

const ZCheckbox = controllerDecorator({
    valuePropName: 'checked'
})(Checkbox);

const ZCheckboxGroup = controllerDecorator({})(CheckboxGroup);

const ZRadio = controllerDecorator({})(Radio);

const ZRadioGroup = controllerDecorator({})(RadioGroup);

const ZSelect = controllerDecorator()(Select);

let regionMap = [
    {
        RegionId: 1,
        RegionName: 'cn-east-01',
        Region: 'cn-zj',
        Zone: 'cn-zj-01'
    },
    {
        RegionId: 1001,
        RegionName: 'cn-north-01',
        Region: 'cn-bj1',
        Zone: 'cn-bj1-01'
    },
    {
        RegionId: 3001,
        RegionName: 'hk-01',
        Region: 'hk',
        Zone: 'hk-01'
    },
    {
        RegionId: 3002,
        RegionName: 'hk-02',
        Region: 'hk',
        Zone: 'hk-02'
    },
    {
        RegionId: 4001,
        RegionName: 'cn-north-02',
        Region: 'cn-bj2',
        Zone: 'cn-bj2-02'
    },
    {
        RegionId: 5001,
        RegionName: 'cn-north-03',
        Region: 'cn-bj2',
        Zone: 'cn-bj2-03'
    },
    {
        RegionId: 6001,
        RegionName: 'us-west-01',
        Region: 'us-ca',
        Zone: 'us-ca-01'
    },
    {
        RegionId: 7001,
        RegionName: 'cn-south-02',
        Region: 'cn-gd',
        Zone: 'cn-gd-02'
    },
    {
        RegionId: 8001,
        RegionName: 'cn-east-02',
        Region: 'cn-sh',
        Zone: 'cn-sh-01'
    },
    {
        RegionId: 8100,
        RegionName: 'cn-east-03',
        Region: 'cn-sh2',
        Zone: 'cn-sh2-01'
    },
    {
        RegionId: 8200,
        RegionName: 'cn-east-04',
        Region: 'cn-sh2',
        Zone: 'cn-sh2-02'
    },
    {
        RegionId: 9001,
        RegionName: 'cn-north-04',
        Region: 'cn-bj2',
        Zone: 'cn-bj2-04'
    },
    {
        RegionId: 9002,
        RegionName: 'cn-north-05',
        Region: 'cn-bj2',
        Zone: 'cn-bj2-05'
    },
    {
        RegionId: 10001,
        RegionName: 'us-ws-01',
        Region: 'us-ws',
        Zone: 'us-ws-01'
    },
    {
        RegionId: 10002,
        RegionName: 'ge-fra-01',
        Region: 'ge-fra',
        Zone: 'ge-fra-01'
    },
    {
        RegionId: 10003,
        RegionName: 'th-bkk-01',
        Region: 'th-bkk',
        Zone: 'th-bkk-01'
    },
    {
        RegionId: 10004,
        RegionName: 'kr-seoul-01',
        Region: 'kr-seoul',
        Zone: 'kr-seoul-01'
    },
    {
        RegionId: 10005,
        RegionName: 'sg-01',
        Region: 'sg',
        Zone: 'sg-01'
    },
    {
        RegionId: 10006,
        RegionName: 'tw-kh-01',
        Region: 'tw-kh',
        Zone: 'tw-kh-01'
    },
    {
        RegionId: 10007,
        RegionName: 'rus-mosc-01',
        Region: 'rus-mosc',
        Zone: 'rus-mosc-01'
    },
    {
        RegionId: 10008,
        RegionName: 'jpn-tky-01',
        Region: 'jpn-tky',
        Zone: 'jpn-tky-01'
    },
    {
        RegionId: 10009,
        RegionName: 'tw-tp-01',
        Region: 'tw-tp',
        Zone: 'tw-tp-01'
    },
    {
        RegionId: 10010,
        RegionName: 'uae-dubai-01',
        Region: 'uae-dubai',
        Zone: 'uae-dubai-01'
    },
    {
        RegionId: 10011,
        RegionName: 'idn-jakarta-01',
        Region: 'idn-jakarta',
        Zone: 'idn-jakarta-01'
    }
];

regionMap = _.groupBy(regionMap, region => {
    return region.Region;
});

const regions = _.map(_.keys(regionMap), region => ({
    value: region
}));

const types = [
    {
        value: '系列1'
    },
    {
        value: '系列2'
    }
];

const imageTypes = [
    {
        value: '标准'
    },
    {
        value: '自制'
    }
];

const imageList = [
    {
        value: 'CentOS 6.5 32Bit'
    },
    {
        value: 'CentOS 6.5 64Bit'
    },
    {
        value: 'CentOS 7.2 32Bit'
    },
    {
        value: 'CentOS 7.2 64Bit'
    }
];

class DemoForm extends React.PureComponent {
    handleSubmit() {
        const form = this.props.form;
        form.validateFields((error, value) => {
            console.log(error, value);
        });
    }
    render() {
        const { form } = this.props;
        const originErrors = form.getFieldsError() || [];

        const errors = [];
        _.each(originErrors, (errs, name) => {
            errs !== undefined &&
                errors.push({
                    name,
                    message: errs.join(', ')
                });
        });
        const itemLayout = {
            labelCol: {
                span: 2
            },
            controllerCol: {
                span: 10
            }
        };
        const defaultRegion = regions[0].value;
        const region = form.getFieldValue('Region') || defaultRegion;
        const zones = regionMap[region].map(zone => ({
            value: zone.Zone
        }));
        const defaultImageType = imageTypes[0].value;
        const imageType = form.getFieldValue('ImageType') || defaultImageType;
        return (
            <ZForm form={form}>
                <Item label="地域" {...itemLayout}>
                    <ZRadioGroup
                        zName="Region"
                        zOptions={{
                            initialValue: defaultRegion
                        }}
                        options={regions}
                        styleType="button"
                        onChange={region => {
                            const zones = regionMap[region].map(zone => ({
                                value: zone.Zone
                            }));
                            form.setFieldsValue({ Zone: zones[0].value });
                        }}
                    />
                </Item>
                <Item label="可用区" {...itemLayout}>
                    <ZRadioGroup
                        zName="Zone"
                        zOptions={{
                            initialValue: zones[0].value
                        }}
                        options={zones}
                        styleType="button"
                    />
                </Item>
                <Item label="系列" {...itemLayout}>
                    <ZRadioGroup
                        zName="Type"
                        zOptions={{
                            initialValue: types[0].value
                        }}
                        options={types}
                        styleType="button"
                    />
                </Item>
                <Item label="网络增强" {...itemLayout}>
                    <ZSwitch zName="NetworkEnhance" />
                </Item>
                <Item label="镜像" {...itemLayout}>
                    <ZRadioGroup
                        zName="ImageType"
                        zOptions={{
                            initialValue: imageTypes[0].value
                        }}
                        options={imageTypes}
                        styleType="button"
                    />
                    {imageType === '标准' ? (
                        <ZSelect
                            zName="ImageId"
                            zOptions={{
                                rules: [{ required: true }]
                            }}
                            options={imageList}
                            search
                        />
                    ) : (
                        <ZInput
                            zName="ImageId"
                            zOptions={{
                                rules: [{ required: true }]
                            }}
                            placeholder="请输入镜像ID"
                        />
                    )}
                </Item>

                <p className="u-red">{errors.map(error => `${error.name}: ${error.message}`).join(', ')}</p>

                <Button styleType="primary" onClick={() => this.handleSubmit()}>
                    submit
                </Button>
            </ZForm>
        );
    }
}
DemoForm.propTypes = {
    form: formShape
};
const Demo = formDecorator()(DemoForm);
// demo end

export default Demo;
