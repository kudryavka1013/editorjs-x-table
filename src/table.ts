import { StyleDataSchema, RsTableDataSchema } from "./helper/types";
import {
  createCell,
  createTableElements,
  createTableOperationBar,
  createRow,
} from "./helper/utils";

export default class Table {
  data?: RsTableDataSchema;
  // DOM Nodes
  wrapper: HTMLDivElement;
  table: HTMLTableElement;
  colgroup: HTMLTableColElement;
  tbody: HTMLTableSectionElement;
  // Counter
  numberOfRows: number;
  numberOfColumns: number;

  constructor(data: RsTableDataSchema) {
    console.log("constructor");
    // init data
    this.data = {
      content: data.content || [],
      colWidth: data.colWidth || [],
      mergeData: data.mergeData || [],
      styleData: data.styleData || [],
    };
    // init counter
    this.numberOfRows = 0;
    this.numberOfColumns = 0;

    // init base table DOM
    const { wrapper, colgroup, tbody, table } = createTableElements();
    // bind DOM
    this.wrapper = wrapper;
    this.table = table;
    this.colgroup = colgroup;
    this.tbody = tbody;
    // fill table with <col>, <tr> and <td>
    this.fillTable();
    // fill table with data
    this.setData();
    // init operation bar module
    this.initOperationBar();
    // init select module

    // init merge module

    // init resize module
  }

  /**
   * @description: 根据初始数据或默认值返回表格的行列数，default 2 X 3
   */
  getTableSize() {
    const content = this.data && this.data.content;
    const isValidArray = Array.isArray(content) && content.length;
    const contentRows = isValidArray ? content.length : undefined;
    const contentCols = isValidArray ? content[0].length : undefined;

    const defaultRows = 2;
    const defaultCols = 3;
    const rows = contentRows || defaultRows;
    const cols = contentCols || defaultCols;

    return {
      rows,
      cols,
    };
  }

  setColGroup(col: number, colWidth: number[]) {
    const colsFragment = document.createDocumentFragment();
    for (let i = 0; i < col; i++) {
      const colElem = document.createElement("col");
      colElem.setAttribute("width", colWidth[i]?.toString() || "100");
      colsFragment.appendChild(colElem);
    }
    this.colgroup.appendChild(colsFragment);
  }

  /**
   * @description: 初始化表格内部DOM，创建TD，TR
   * @return {*}
   */
  fillTable() {
    const { rows, cols } = this.getTableSize();
    this.numberOfRows = rows;
    this.numberOfColumns = cols;
    this.setColGroup(cols, this.data?.colWidth || []);
    /* 填充行，包括内部TD元素 */
    for (let i = 0; i < rows; i++) {
      this.addRow();
    }
  }

  /**
   * @description: 在TABLE的指定行（index）插一个空行
   * @param {number} index 要插入的行位置, 为 -1 时在结尾插入
   * @param {boolean} setFocus
   * @return {HTMLElement}
   */
  addRow(index = -1) {
    const newRow = createRow(this.numberOfColumns);

    /* 找到index对应的当前行位置，在前面插一个空行 */
    if (index > 0 && index <= this.numberOfRows) {
      let row = this.getRow(index);
      this.tbody.insertBefore(newRow, row);
    } else {
      this.tbody.appendChild(newRow);
    }

    return newRow;
  }

  /**
   * @description: 在TABLE的指定列（index）插一个空列
   * @return {*}
   */
  addColumn(index = -1) {
    console.log(index);
    throw new Error("Method not implemented.");
  }

  /**
   * @description: 通过 index 获取对应行的 TR 元素
   * @param {number} row rowIndex
   * @returns {HTMLElement}
   */
  getRow(row: number) {
    const rowElem = this.tbody.querySelector<HTMLTableRowElement>(`tr:nth-child(${row})`);
    if (rowElem) {
      return rowElem;
    } else {
      throw Error();
    }
  }

  /**
   * Fills the table with data passed to the constructor
   *
   * @returns {void}
   */
  setData() {
    console.log("setData");
    const data = this.data;
    if (data && data.content) {
      for (let i = 0; i < data.content.length; i++) {
        for (let j = 0; j < data.content[i].length; j++) {
          /* 设置内容 */
          this.setCellContent(i + 1, j + 1, data.content[i][j]);
          /* 设置样式 */
          this.setCellStyle(i + 1, j + 1, data.styleData[i][j]);
          /* 设置合并单元格 */
        }
      }
    }
  }

  /**
   * @description: 设置cell的内容
   * @param {number} row 行坐标
   * @param {number} col 列坐标
   * @param {string} content HTML内容
   * @return {*}
   */
  setCellContent(row: number, col: number, content: string) {
    console.log("setCellContent");
    const cell = this.getCell(row, col);
    cell!.querySelector(`div.content-block`)!.innerHTML = content;
  }

  /**
   * @description: 设置cell的样式
   * @param {number} row 行坐标
   * @param {number} col 列坐标
   * @param {StyleDataSchema} style style内容
   * @return {*}
   */
  setCellStyle(row: number, col: number, style: StyleDataSchema) {
    console.log("setCellStyle");
    const cell: HTMLElement = this.getCell(row, col) as HTMLElement;
    if (style.align) {
      cell.style.textAlign = style.align;
    }
    if (style.bgColor) {
      cell.style.backgroundColor = style.bgColor;
    }
  }

  /**
   * @description: 获取对应行列的content-block
   * @param {number} row 行坐标
   * @param {number} col 列坐标
   * @return {HTMLElement} TD DOM节点
   */
  getCell(row: number, col: number) {
    console.log("getCell");
    return this.tbody.querySelector(
      `tr:nth-child(${row}) td:nth-child(${col})`
    )!;
  }

  getData() {
    console.log("getData");
    const data: RsTableDataSchema = {
      content: [],
      colWidth: [],
      mergeData: [],
      styleData: [],
    };

    for (let i = 1; i <= this.numberOfRows; i++) {
      const row = this.getRow(i);
      const cells = Array.from(row.querySelectorAll(`td`));
      console.log(cells);
    }

    return data;
  }

  /* 工具栏相关 */
  initOperationBar() {
    const operationBar = createTableOperationBar(
      this.numberOfRows,
      this.numberOfColumns
    );
    console.log(operationBar);
  }

  getWrapper() {
    return this.wrapper;
  }
}
