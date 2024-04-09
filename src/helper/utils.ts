/**
 * @description: 创建TABLE，以及内部的COLGROUP，TBODY
 * @return {*} 返回 table，colgroup，tbody，外层div
 */
export const createTableElems = () => {
  const wrapper = document.createElement("div");
  const table = document.createElement("table");
  table.classList.add("editable-table");
  const colgroup = document.createElement("colgroup");
  const tbody = document.createElement("tbody");
  table.appendChild(colgroup);
  table.appendChild(tbody);
  wrapper.appendChild(table);
  return { wrapper, table, colgroup, tbody };
};

/**
 * @description: 创建TR
 * @return {HTMLTableRowElement} 返回一个TR元素
 */
export const createTableRow = () => {
  const tr = document.createElement("tr");
  return tr;
};

/**
 * @description: 创建CELL，包括TD以及内部的DIV
 * @return {HTMLTableCellElement} 返回一个TD元素
 */
export const createCell = () => {
  /* td */
  const td = document.createElement("td");
  td.classList.add("editable-table-cell");
  /* content-wrapper */
  const contentWrapper = document.createElement("div");
  contentWrapper.classList.add("content-wrapper");
  /* safe-area */
  const safeArea = document.createElement("div");
  safeArea.classList.add("safe-area");
  /* content-block */
  const contentBlock = document.createElement("div");
  contentBlock.classList.add("content-block");
  contentBlock.setAttribute("contentEditable", "true");
  /* 拼装 */
  safeArea.appendChild(contentBlock);
  contentWrapper.appendChild(safeArea);
  td.appendChild(contentWrapper);

  return td;
};

export const createTableOperationBar = (rows: number, cols: number) => {
  console.log(rows, cols);
  /* operation bar */
  const operationBar = document.createElement("div");
  const headerBarCol = document.createElement("div");
  const headerBarRow = document.createElement("div");
  const insertBarCol = document.createElement("div");
  const insertBarRow = document.createElement("div");
  return {
    operationBar,
    headerBarCol,
    headerBarRow,
    insertBarCol,
    insertBarRow,
  };
};
