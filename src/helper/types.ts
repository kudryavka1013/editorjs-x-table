/* 表格数据 */
export interface TableDataSchema {
  content: string[][];
  colWidth?: number[];
  mergeData: MergeDataSchema[][];
  styleData: StyleDataSchema[][];
}

/* 合并单元格数据 */
export interface MergeDataSchema {
  target: number[]; // 指向的主单元格坐标 x,y
  colspan: number;
  rowspan: number;
}

/* 样式数据 */
export interface StyleDataSchema {
  align?: TextAlign;
  bgColor?: string;
}

export enum TextAlign {
  left = 'left',
  center = 'center',
  right = 'right',
}
