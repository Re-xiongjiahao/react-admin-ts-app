import React, { FC } from 'react';
import { Space} from 'antd'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

type ExportProps = {};

const Export: FC<ExportProps> = (props) => {
  return (
    <Space direction="vertical" style= {{ width: '100%' }}>
    <ReactHTMLTableToExcel
      id="test-table-xls-button"
      className="download-table-xls-button"
      table="table-to-xls"
      filename="tablexls"
      sheet="tablexls"
      buttonText="导出数据"
         > </ReactHTMLTableToExcel>
      <table id="table-to-xls">
        <thead>
          <tr>
            <th>序号</th>
            <th>姓名</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>吴勋勋</td>
          </tr>
        </tbody>
      </table>
 
  </Space>
  )
}

export default Export;