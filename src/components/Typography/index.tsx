import Count from './Count';
import Copy from './Copy';
import createHeader from './Header';
import Link from './Link';
import Paragraph from './Paragraph';
import Remark from './Remark';
import SubTitle from './SubTitle';
import Text from './Text';
import _Typography from './Typography';
import LineEllipsis from './LineEllipsis';
import TextEllipsis from './TextEllipsis';
import { TextProps } from './interface';
import { ExportComponent } from 'src/type';
import useCopy from './useCopy';

const Typography = _Typography as typeof _Typography & {
  SubTitle: typeof SubTitle;
  Paragraph: typeof Paragraph;
  Remark: typeof Remark;
  Text: typeof Text;
  Count: typeof Count;
  Copy: typeof Copy;
  Link: typeof Link;
  LineEllipsis: typeof LineEllipsis;
  TextEllipsis: typeof TextEllipsis;
  H1: typeof Text;
  H2: typeof Text;
  H3: typeof Text;
  H4: typeof Text;
  H5: typeof Text;
  useCopy: typeof useCopy;
};
const H1 = createHeader('h1');
const H2 = createHeader('h2');
const H3 = createHeader('h3');
const H4 = createHeader('h4');
const H5 = createHeader('h5');



const ExportTypography = ExportComponent<
    typeof Typography,
    {
      SubTitle: typeof SubTitle;
      Paragraph: typeof Paragraph;
      Remark: typeof Remark;
      Text: typeof Text;
      Count: typeof Count;
      Copy: typeof Copy;
      Link: typeof Link;
      LineEllipsis: typeof LineEllipsis;
      TextEllipsis: typeof TextEllipsis;
      H1: typeof Text;
      H2: typeof Text;
      H3: typeof Text;
      H4: typeof Text;
      H5: typeof Text;
      useCopy: typeof useCopy;
    }
>(Typography, {
    Count,
    H1,
    H2,
    H3,
    H4,
    H5,
    Link,
    LineEllipsis,
    TextEllipsis,
    Paragraph,
    Remark,
    SubTitle,
    Text,
    Copy,
    useCopy
});

export default ExportTypography;
export type { TextProps };