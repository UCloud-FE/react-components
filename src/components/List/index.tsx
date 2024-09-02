

import BaseList from './List'
import BaseActionIcon from './ActionIcon';
import BaseConfigInfo from './ConfigInfo';
import BaseContent from './Content';
import BaseHovertip from './Hovertip';
import BaseIcontip from './Icontip';

const List = BaseList as typeof BaseList & {
  ActionIcon: typeof BaseActionIcon;
  Content: typeof BaseContent;
  ConfigInfo: typeof BaseConfigInfo;
  Hovertip: typeof BaseHovertip;
  Icontip: typeof BaseIcontip;
};

List.ActionIcon = BaseActionIcon;
List.Content = BaseContent;
List.ConfigInfo = BaseConfigInfo;
List.Hovertip = BaseHovertip;
List.Icontip = BaseIcontip;


export default BaseList