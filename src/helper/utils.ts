/* DOM base action utils */
const make = <T extends keyof HTMLElementTagNameMap>(
  tagName: T,
  className?: string | string[]
) => {
  const elem = document.createElement(tagName);
  if (className) addClass(elem, className);
  return elem as HTMLElementTagNameMap[T];
};

const batchAppend = (
  wrapper: HTMLElement,
  elem: HTMLElement | HTMLElement[]
) => {
  Array.isArray(elem)
    ? elem.forEach((i) => wrapper.append(i))
    : wrapper.append(elem);
};

const linkAppend = (...elems: HTMLElement[]) => {
  elems.reduce((p, c) => p.appendChild(c));
};

const addClass = (elem: HTMLElement, className: string | string[]) => {
  Array.isArray(className)
    ? elem.classList.add(...className)
    : elem.classList.add(className);
};


/* table action utils */
/**
 * @description: Create and compose base table elements
 * @return {*} table，colgroup，tbody，wrapper div
 */
export const createTableElements = () => {
  const wrapper = make("div", "rs-table-wrapper");
  const scrollableWrapper = make("div", "rs-table-scrollable-wrapper");
  const scrollableContainer = make("div", "rs-table-scrollable-container");
  const table = make("table", "rs-table");
  const colgroup = make("colgroup", "rs-table-colgroup");
  const tbody = make("tbody", "rs-table-tbody");

  batchAppend(table, [colgroup, tbody]);
  linkAppend(wrapper, scrollableWrapper, scrollableContainer, table);

  return { wrapper, table, colgroup, tbody };
};

/**
 * @description: create tr and fill cells
 * @return {HTMLTableRowElement} return tr element
 */
export const createRow = (numberOfColumns: number) => {
  const rowElem = make("tr", "rs-table-row");
  for (let i = 1; i <= numberOfColumns; i++) {
    batchAppend(rowElem, createCell());
  }
  return rowElem;
};

/**
 * @description: create table cell
 * @return {HTMLTableCellElement} return td element
 */
export const createCell = () => {
  const td = make("td", "rs-cell");
  const contentWrapper = make("div", "rs-cell-content-wrapper");
  const safeArea = make("div", "rs-cell-safe-area");
  const contentBlock = make("div", "rs-cell-content-block");
  contentBlock.setAttribute("contentEditable", "true");
  /* compose element */
  linkAppend(td, contentWrapper, safeArea, contentBlock);

  return td;
};

export const createTableOperationBar = (rows: number, cols: number) => {
  console.log(rows, cols);
  /* operation bar */
  const operationBar = make("div");
  const headerBarCol = make("div");
  const headerBarRow = make("div");
  const insertBarCol = make("div");
  const insertBarRow = make("div");
  return {
    operationBar,
    headerBarCol,
    headerBarRow,
    insertBarCol,
    insertBarRow,
  };
};
