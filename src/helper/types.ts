/* 表格数据 */
export interface IXTableData {
  content: string[][];
  colWidth?: number[];
  mergeData: IMergeData[][];
}

/* 合并单元格数据 */
export interface IMergeData {
  target: number[]; // 指向的主单元格坐标 x,y
  colspan: number;
  rowspan: number;
}

/* Counter */
export interface ICounter {
  rows: number;
  cols: number;
}
export type TextAlign = "left" | "center" | "right";
