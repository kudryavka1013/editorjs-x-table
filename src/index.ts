import { MergeDataSchema, StyleDataSchema } from "./helper/types";
import Table from "./table";
import './styles/table.css';
export default class XTable {
  /**
   * Table data structure
   */
  data?: {
    content: string[][];
    colWidth?: number[];
    mergeData: MergeDataSchema[][];
    styleData: StyleDataSchema[][];
  };
  api: any;
  config: {
    accessCallerList?: number[];
    maxCount?: number;
  };
  table: any;

  constructor({ data, config, api }: any) {
    this.data = data;
    this.api = api;
    this.config = config;
    this.table = null;
  }

  /**
   * Plugin Configs
   */
  static get enableLineBreaks() {
    return true;
  }

  static get toolbox() {
    return {
      title: "表格(XTable)",
      icon: '<svg width="18" height="14" viewBox="0 0 18 14"><path d="M2.833 8v1.95a1.7 1.7 0 0 0 1.7 1.7h3.45V8h-5.15zm0-2h5.15V2.35h-3.45a1.7 1.7 0 0 0-1.7 1.7V6zm12.3 2h-5.15v3.65h3.45a1.7 1.7 0 0 0 1.7-1.7V8zm0-2V4.05a1.7 1.7 0 0 0-1.7-1.7h-3.45V6h5.15zM4.533.1h8.9a3.95 3.95 0 0 1 3.95 3.95v5.9a3.95 3.95 0 0 1-3.95 3.95h-8.9a3.95 3.95 0 0 1-3.95-3.95v-5.9A3.95 3.95 0 0 1 4.533.1z"></path></svg>',
    };
  }

  static get sanitize() {
    return {
      br: true,
      span: true,
      font: true,
      a: true,
      b: true,
      i: true,
      u: true,
      del: true,
      div: true,
      img: true,
    };
  }

  /**
   * onChange Event Callback
   */
  onChange(
    tableData: string[][],
    tableColWidth: number[],
    tableMergeData: MergeDataSchema[][],
    tableStyleData: StyleDataSchema[][]
  ) {
    this.data = {
      content: tableData,
      colWidth: tableColWidth,
      mergeData: tableMergeData,
      styleData: tableStyleData,
    };
  }

  /**
   * Return Tool's view
   */
  render() {
    /** Create table instance */
    this.table = new Table(this.data);
    return this.table.getWrapper();
  }

  /**
   * Return Block's data
   */
  save() {
    const tableData = this.table.getData();

    return tableData;
    // {
    //   content: this.data?.content || [],
    //   colWidth: this.data?.colWidth || [],
    //   mergeData: this.data?.mergeData || [],
    //   styleData: this.data?.styleData || [],
    // }
  }
}
