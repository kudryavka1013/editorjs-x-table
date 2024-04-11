/* DOM base operation utils */
const make = <T extends keyof HTMLElementTagNameMap>(
  tagName: T,
  className?: string | string[]
) => {
  const elem = document.createElement(tagName);
  if (className) addClass(elem, className);
  return elem as HTMLElementTagNameMap[T];
};

export const append = <T extends HTMLElement | DocumentFragment>(
  wrapper: T,
  elem: HTMLElement | HTMLElement[]
) => {
  Array.isArray(elem)
    ? elem.forEach((i) => wrapper.append(i))
    : wrapper.append(elem);
  return wrapper;
};

export const batchAppend = (
  wrapper: HTMLElement | DocumentFragment,
  elem: () => HTMLElement | HTMLElement[],
  count = 1
) => {
  for (let c = 0; c < count; c++) {
    append(wrapper, elem());
  }
};

const linkAppend = (...elems: HTMLElement[]) => {
  elems.reduce((p, c) => p.appendChild(c));
};

const addClass = (elem: HTMLElement, className: string | string[]) => {
  Array.isArray(className)
    ? elem.classList.add(...className)
    : elem.classList.add(className);
};
/* DOM base operation utils */
/*          - End -         */

const ClassNames = {
  wrapper: "rs-table-wrapper",
  scrollableWrapper: "rs-table-scrollable-wrapper",
  scrollableContainer: "rs-table-scrollable-container",
  table: "rs-table",
  tableFixed: "rs-table--fixed",
  colgroup: "rs-table-colgroup",
  tbody: "rs-table-tbody",
  row: "rs-table-row",
  td: "rs-table-cell",
  cellContentWrapper: "rs-cell-content-wrapper",
  cellSafeArea: "rs-cell-safe-area",
  cellContentBlock: "rs-cell-content-block",
  operationBar: "rs-table-operation-bar",
  headerBar: "rs-table-operation-header-bar",
  headerBarCol: "rs-table-operation-header-bar-col",
  headerBarRow: "rs-table-operation-header-bar-row",
  insertBar: "rs-table-insert-bar",
  insertBarCol: "rs-table-insert-bar-col",
  insertBarRow: "rs-table-insert-bar-row",
  insertZone: "rs-table-insert-zone",
  insertPoint: "rs-table-insert-point",
  header: "rs-table-header",
  toolbox: "rs-table-toolbox",
};

/**
 * @description: Create and compose base table elements
 */
export const createBaseTableElements = () => {
  const wrapper = make("div", ClassNames.wrapper);
  const scrollableWrapper = make("div", ClassNames.scrollableWrapper);
  const scrollableContainer = make("div", ClassNames.scrollableContainer);
  const table = make("table", [ClassNames.table, ClassNames.tableFixed]);
  const colgroup = make("colgroup", ClassNames.colgroup);
  const tbody = make("tbody", ClassNames.tbody);
  const {
    operationBar,
    headerBarCol,
    headerBarRow,
    insertBarCol,
    insertBarRow,
  } = createOperationBar();
  linkAppend(
    wrapper,
    scrollableWrapper,
    append(scrollableContainer, [
      append(table, [colgroup, tbody]),
      operationBar,
    ])
  );

  return {
    wrapper,
    table,
    colgroup,
    tbody,
    operationBar: { headerBarCol, headerBarRow, insertBarCol, insertBarRow },
  };
};

/**
 * @description: Create tr and fill cells
 */
export const createRow = (numberOfColumns: number): HTMLTableRowElement => {
  const row = make("tr", ClassNames.row);
  batchAppend(row, createCell, numberOfColumns);
  return row;
};

/**
 * @description: Create table cell, including td and some containers
 */
const createCell = (): HTMLTableCellElement => {
  const td = make("td", ClassNames.td);
  const contentWrapper = make("div", ClassNames.cellContentWrapper);
  const safeArea = make("div", ClassNames.cellSafeArea);
  const contentBlock = make("div", ClassNames.cellContentBlock);
  contentBlock.setAttribute("contentEditable", "true");
  /* compose element */
  linkAppend(td, contentWrapper, safeArea, contentBlock);

  return td;
};

/**
 * @description: Create operation bar header
 */
export const createHeader = (): HTMLDivElement =>
  make("div", ClassNames.header);

/**
 * @description: Create operation bar insert zone
 */
export const createInsertZone = (): HTMLDivElement =>
  append(
    make("div", ClassNames.insertZone),
    make("div", ClassNames.insertPoint)
  );

/**
 * @description: Create operation bar
 */
export const createOperationBar = () => {
  const operationBar = make("div", ClassNames.operationBar);
  const headerBarCol = make("div", [
    ClassNames.headerBar,
    ClassNames.headerBarCol,
  ]);
  const headerBarRow = make("div", [
    ClassNames.headerBar,
    ClassNames.headerBarRow,
  ]);
  const insertBarCol = make("div", [
    ClassNames.insertBar,
    ClassNames.insertBarCol,
  ]);
  const insertBarRow = make("div", [
    ClassNames.insertBar,
    ClassNames.insertBarRow,
  ]);
  // batchAppend(headerBarCol, createHeader, cols);
  // batchAppend(insertBarCol, createInsertZone, cols);
  // batchAppend(headerBarRow, createHeader, rows);
  // batchAppend(insertBarRow, createInsertZone, rows);

  append(operationBar, [
    headerBarCol,
    headerBarRow,
    insertBarCol,
    insertBarRow,
  ]);
  return {
    operationBar,
    headerBarCol,
    headerBarRow,
    insertBarCol,
    insertBarRow,
  };
};

/**
 * @description: Create toolbox
 */
export const createToolbox = () => {
  const toolbox = make("div", ClassNames.toolbox);
  return toolbox;
};
