#! /bin/bash

component_name=$1
base_path="src/components/"
component_path="${base_path}${component_name}"

# make components dir
mkdir $component_path
mkdir "${component_path}/__tests__"
mkdir "${component_path}/__demo__"
mkdir "${component_path}/style"

# create components file
touch "${component_path}/index.jsx"
touch "${component_path}/${component_name}.jsx"
touch "${component_path}/${component_name}.md"
touch "${component_path}/__demo__/base.jsx"
touch "${component_path}/style/index.js"

# write default file content to components file
echo "import ${component_name} from './${component_name}';
export default ${component_name};
" > "${component_path}/index.jsx"

echo "import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class ${component_name} extends Component {
    render() {
        return <div>This is component - ${component_name}</div>;
    }
}

export default ${component_name};
" > "${component_path}/${component_name}.jsx"

echo "### 说明

*   这是${component_name}组件

### 演示

*   普通使用

\`\`\`js {\"codepath\": \"base.jsx\"}
\`\`\`
" > "${component_path}/${component_name}.md"

echo "import React from 'react';
import ${component_name} from 'components/${component_name}';

// demo start
const Demo = () => (
    <${component_name}/>
);
// demo end

export default Demo;
" > "${component_path}/__demo__/base.jsx"

component_name_lowercase=`echo $component_name | tr 'A-Z' 'a-z'`;

# add to document
components_config=`cat "./.styleguide/components.json"`
echo "${components_config%%
            \}
        \]
    \}
\]}
            },
            {
                \"name\": \"${component_name}\"
            }
        ]
    }
]" > "./.styleguide/components.json"

npm run restart
