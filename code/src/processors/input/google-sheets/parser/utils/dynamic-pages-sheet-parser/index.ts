import getCellName from './../get-cell-name';


export default facade => {
  const COLUMNS = [
    'layout',
    'data',
    'output_name_key'
  ];

  const data = [];

  // parse table
  for (let currentTableRow = 2, isWholeRowEmpty = false; !isWholeRowEmpty; currentTableRow++) {
    const tableRow = {};
    isWholeRowEmpty = true;

    // parse table row
    for (let i = 0; i <= 2; i++) {
      const rowItem = facade.worksheet[getCellName(i+1, currentTableRow)];

      if (rowItem) isWholeRowEmpty = false;

      tableRow[COLUMNS[i]] = rowItem ? rowItem.v : '';
    }

    if (!isWholeRowEmpty) data.push(tableRow);
  }

  facade.dataTree.dynamicPages = data;
};
