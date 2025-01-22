/* 表格数据 */
export interface XTableDataSchema {
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

export type TextAlign = "left" | "center" | "right";
