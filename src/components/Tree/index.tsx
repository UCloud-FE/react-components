import Tree from './Tree';

type TExportTree = typeof Tree;

const ExportTree: TExportTree = Tree as TExportTree;

export default ExportTree;
