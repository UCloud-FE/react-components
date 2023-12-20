import { ExportComponent } from 'src/type';

import Layout from './Layout';
import Header from './Header';
import Sider from './Sider';
import Content from './Content';
import Footer from './Footer';

const ExportLayout = ExportComponent(Layout, {
    Header,
    Sider,
    Content,
    Footer
});

export default ExportLayout;
