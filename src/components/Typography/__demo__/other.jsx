import React from 'react';

import Typography from 'src/components/Typography';
// demo start
const { Count, H3, Text, Link, Remark, SubTitle } = Typography;

const Demo = () => {
    return (
        <div>
            <div>
                <H3>Text</H3>
                <Text>文本</Text>
                <br />
                <Text disabled>禁用文本</Text>
                <br />
                <Text strong>加粗文本</Text>
                <br />
                <Text deleted>删除线</Text>
                <br />
                <Text isLink color="primary">
                    链接
                </Text>
                <br />
                <Text isCode>等宽字体，常用于显示代码/Monospaced Font</Text>
                <br />
                <Text isNum>展示数字，如价格：100000000000元</Text>
                <br />
            </div>
            <div>
                <H3>Text bright</H3>
                <div
                    style={{
                        padding: '0 10px',
                        background: '#000'
                    }}
                >
                    <Text color="bright" lineHeight="lg">
                        Udesign(bright)
                    </Text>
                </div>

                <br />
            </div>
            <div>
                <H3>Text 字号</H3>
                <Text size="t1">t1号文本：一般用于备注/正文，是浏览器识别的最小字号</Text>
                <br />
                <Text size="t2">t2号文本：一般用于正文或者小标题</Text>
                <br />
                <Text size="t3">t3号文本：一般用于标题</Text>
                <br />
                <Text size="t4">t4号文本：一般用于标题</Text>
                <br />
                <Text size="t5">t5号文本：一般用于标题，或者特殊场景下的文本展示</Text>
                <br />
                <Text size="t6">t6文本：一般用于标题，或者特殊场景下的文本展示</Text>
                <br />
                <Text size="t7">t7文本：一般用于标题，或者特殊场景下的文本展示</Text>
                <br />
                <Text size="t8">t8文本：一般用于标题，或者特殊场景下的文本展示</Text>
            </div>
            <div>
                <h3>Text 行高</h3>
                <Text component="div" lineHeight="sm">
                    密集的行高，字号1.3倍
                </Text>
                <br />
                <Text component="div" lineHeight="md">
                    中等的行高，字号1.5倍
                </Text>
                <br />
                <Text component="div" lineHeight="lg">
                    宽松的行高，字号1.7倍
                </Text>

                <br />
                <Count size="xs" color="dark">
                    1000
                </Count>
                <br />
                <Count size="sm" color="dark">
                    1000
                </Count>
                <br />
                <Count size="md" color="dark">
                    1000
                </Count>
                <br />
                <Count size="lg" color="dark">
                    1000
                </Count>
                <br />
                <Count size="xlg" color="dark">
                    1000
                </Count>
                <br />
                <Count size="xxlg" color="dark">
                    1000
                </Count>
                <br />
                <Count size="xxxlg" color="dark">
                    1000
                </Count>
                <br />
                <Count size="xxxxlg" color="dark">
                    1000
                </Count>
                <br />
                <Link href="https://www.ucloud.cn/" target="_blank" rel="noopener">
                    前往官网
                </Link>
                <br />
                <Link component="span" onClick={console.log}>
                    点击事件
                </Link>
                <br />
                <Remark size="sm">备注文本</Remark>
                <br />
                <SubTitle size="sm">小副标题</SubTitle>
                <SubTitle size="lg">大副标题</SubTitle>
            </div>
        </div>
    );
};
// demo end

export default Demo;
