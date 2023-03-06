import React, {useState} from 'react'
import {Collapse} from 'react-collapse';
import './QueryExecutor.css';
import {Button} from "antd";

const QueryExecutor = (props) => {
  const [isCollapseOpen, setCollapseOpen ] = useState(false);
  const { query, handleExecuteQuery, handleUpdateQuery, handleDeleteQuery } = props;


  return (
    <div className="QueryExecutor flex-100 layout-row layout-align-start-start">
      <div className="cardContainer flex-100 layout-row layout-wrap layout-align-start-start padd10">
        <div className="flex-100 layout-row layout-wrap layout-align-start-start padd10">
          <div className="flex-100 layout-row layout-align-end-end">
            <div className="flex-66 layout-row layout-wrap layout-align-end-end">
              <p className="queryTitle flex-100 font16">{ query.name }</p>
              { query.description && <p className="queryDesc flex-100 font14 padd10px">{ query.description }</p> }
            </div>
            <div className="queryAction flex-33 layout-row layout-wrap layout-align-end-end">
              <Button type="primary" onClick={() => setCollapseOpen(!isCollapseOpen)}>Execute Query</Button>
              <Button type="primary" className="sideMargin5px" onClick={() => handleUpdateQuery(query)}>Update Query</Button>
              <Button type="danger" onClick={() => handleDeleteQuery(query)}>Delete</Button>
            </div>
          </div>
        </div>
        <div className="collapse-container flex-100 layout-row layout-align-start-start">
          <Collapse isOpened={isCollapseOpen} className="width100">
            <div className="flex-100 layout-row layout-align-start-start responseObj padd15">
              { query.response && <pre>{JSON.stringify(query.response,null,2)}</pre>}
            </div>
          </Collapse>
        </div>
      </div>
    </div>
  )
}

export default QueryExecutor;
