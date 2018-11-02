### 组件开发

#### 如何创建一个新组件

*   手动创建
    *   在 src/components 中创建组件名称对应的文件夹
    *   文件夹中创建 index.jsx 用于导出组件及子组件等
    *   创建对应的组件文件，主组件文件名与文件夹名相同
    *   创建对应的 md 文件，用作文档编写
    *   创建`__demo__`文件夹用于存放 demo 代码
    *   创建`__tests__`文件夹用于存放测试用例
    *   创建`style`文件夹用于存放样式相关代码
    *   在 .styleguide/components.json 中添加导出文档的配置
    *   重启文档系统来看到新组件
*   或者通过脚本快速创建
    *   执行`npm run component:add ${组件名称}`来快速创建

### 文档系统

*   文档中可使用的全局变量：
    *   所有的主要组件
    *   react -> React, lodash -> \_, prop-types -> PropTypes, moment -> moment
*   不完善的地方
    *   从其它文件中导入的 propType 等类型无法识别

### 开发规范

#### Git Commit 规范

*   commit 格式遵循[AngularJS Git Commit Guidelines](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#commits)
*   Commit 信息格式：

    ```vim
        <type>(<scope>): <subject>
        <BLANK LINE>
        <body>
        <BLANK LINE>
        <footer>
    ```

*   提交时请使用`npm run cm`来替换`git commit`，或者根据`[commitizen 文档](https://github.com/commitizen/cz-cli#conventional-commit-messages-as-a-global-utility)`添加全局命令后使用`git cz`命令

#### API 风格

*   枚举值属性必须在 propTypes 中定义完整可枚举列表，枚举内容需要语义化，便于理解，可枚举列表绑到对应组件下，方便外部获取（参考 Grid justify）
*   组件的组成部分在唯一且结构固定时使用 props 而不是使用 children 查找组合（参考 Card）
*   UI 和功能非耦合的情况下可考虑拆分组件（参考 Form 和 ZForm)
*   非特殊情况，所有组件必须在外层完整继承原生支持的 props，如 className、style、onClick 等（参考 Grid）
*   当某些展示性可自定义的 props ，有默认展示但是支持隐藏时统一使用 null 进行隐藏，（不包括常见的 bool 型定义的 props）（参考 Notice icon）
*   受控非受控属性必须界定完全，非受控属性统一以受控属性前加 default 来命名（参考 Popover visible）
*   注意 defaultProps 和 required props 的互斥
*   样式风格 props 统一命名为 styleType
*   事件触发的回调等统一命名为 onEvent，如 onChange。而处理函数等统一命名为 handleWhat，如 handleSearch
*   表单控件类的需要适配 sm、md、lg 三种尺寸大小

#### DEMO、文档编写

*   每个暴露出去的组件必须编写对应的 demo，方便开发者参考
*   文档名称为`组件名.md`
*   文档顺序为：
    1.  组件说明
    2.  代码样式
        1.  包含所有可控的 props 的完整演示 demo，方便开发者自由搭配查看效果
        2.  单个 props、功能的演示 demo，方便快速查看 props 的效果和快照测试
*   demo 文件统一放在`__demo__`中，命名格式为：
    1.  对于完整演示 demo，命名为`组件名.jsx`
    2.  对于单个 props、功能的样式 demo，命名为`组件名-(props名称|功能名称).jsx`，主组件的组件名可不写
*   demo 中需抛出`Demo`组件，用于文档中展示，import 和 export 等代码写在头尾，主体内容用`// demo start`和`// demo end`包裹

#### 如何发布

*   发布使用`standard-version`，可直接快速执行`npm run publish:version`来快速生成`changelog`，并修改版本号
*   review `changelog`无误后 `git push --follow-tags` 到 github，等待执行测试编译无问题，，等待`ci`自动发布
