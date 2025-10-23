// UserGrid.jsx
import React, { useMemo, useRef } from "react";
import JqxGrid, { jqx } from "jqwidgets-scripts/jqwidgets-react-tsx/jqxgrid";
import "jqwidgets-scripts/jqwidgets/styles/jqx.base.css";
import "jqwidgets-scripts/jqwidgets/jqxcore";
import "jqwidgets-scripts/jqwidgets/jqxdata";
import "jqwidgets-scripts/jqwidgets/jqxbuttons";
import "jqwidgets-scripts/jqwidgets/jqxscrollbar";
import "jqwidgets-scripts/jqwidgets/jqxmenu";
import "jqwidgets-scripts/jqwidgets/jqxgrid.selection";
import "jqwidgets-scripts/jqwidgets/jqxgrid.filter";
import "jqwidgets-scripts/jqwidgets/jqxgrid.sort";
import "jqwidgets-scripts/jqwidgets/jqxgrid.columnsresize";
import "jqwidgets-scripts/jqwidgets/jqxgrid.edit";

export default function UserGrid({ data, selectedRowId, onRowSelect }) {
  const gridRef = useRef(null);

  // Define columns
 const columns = useMemo(() => {
  const colDefs = [
    {
      text: 'User Group Name',
      datafield: 'groupName',
      columntype: 'textbox',
      filtercondition: 'CONTAINS',
      filterable: true,
      autoshowfiltericon: true,
      cellsrenderer: (row, column, value, defaultHtml, columnSettings, rowData) => {
        const isSelected = selectedRowId === rowData.id;
        return `<div class="content-l" style="
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          padding-left: 8px;
        ">${value}</div>`;
      }
    },
    {
      text: 'Status',
      datafield: 'status',
      columntype: 'textbox',
      filtercondition: 'CONTAINS',
      filterable: true,
      autoshowfiltericon: true,
      cellsrenderer: (row, column, value, defaultHtml, columnSettings, rowData) => {
        const isSelected = selectedRowId === rowData.id;
        return `<div class="content-r" style="
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          padding-left: 8px;
          color: ${(value === 'Active' ? 'green' : 'red')};
          font-weight: bold;
        ">${value}</div>`;
      }
    }
  ];

  const equalWidth = 100 / colDefs.length + '%';
  return colDefs.map(col => ({ ...col, width: equalWidth }));
}, [data, selectedRowId]);

  const source = useMemo(
    () =>
      new jqx.dataAdapter({
        localdata: data,
        datatype: "array",
        datafields: [
          { name: "id", type: "number" },
          { name: "groupName", type: "string" },
          { name: "status", type: "string" },
        ],
      }),
    [data]
  );

  return (
    <JqxGrid
      ref={gridRef}
      width={"100%"}
      height={450}
      source={source}
      columns={columns}
      selectionmode="singlerow"
      sortable
      filterable
      showfilterrow
      autoshowfiltericon
      filterdelay={300}
      columnsresize
      autoshowcolumnsmenu
      onrowselect={onRowSelect}
    />
  );
}
