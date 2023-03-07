import React, {Fragment, useState} from 'react';
import { Collapse } from 'react-collapse';
import { apiMethods } from "../../services/apiService";
import { buildQuery } from "../../services/utilsService";
import { Button } from "antd";
import './QueryExecutor.css';

const QueryExecutor = (props) => {
  const [ isCollapseOpen, setCollapseOpen ] = useState(false);
  const [ queryResponse, setQueryResponse ] = useState(null);
  const { query, handleUpdateQuery } = props;

  const handleDeleteQuery = async () => {
    try {
      const response = await apiMethods.queries.remove();
    } catch (e) {
      console.log('handle error: ', e);
    }
  }

  const executeQuery = async (queryObj) => {
    try {
      const query = buildQuery({ id: queryObj.id });
      const response = await apiMethods.queries.executeQuery(query);
      setQueryResponse(response);
      setCollapseOpen(true);
    } catch (e) {
      console.log('handle error: ', e);
    }
  }

  return (
    <div className="QueryExecutor flex-100 layout-row layout-align-start-start">
      <div className="cardContainer flex-100 layout-row layout-wrap layout-align-start-start padd10">
        <div className="flex-100 layout-row layout-wrap layout-align-start-start padd10">
          <div className="flex-100 layout-row layout-align-end-end">
            <div className="flex-66 layout-row layout-wrap layout-align-start-start">
              <label className="queryTitle flex-100 font16">{ query.title }</label>
              { query.description && <p className="queryDesc flex-100 font14 padd10px">{ query.description }</p> }
            </div>
            <div className="queryAction flex-33 layout-row layout-wrap layout-align-end-end">
              <Button type="primary" className="margin5" onClick={() => executeQuery(query)}>Execute Query</Button>
              <Button type="primary" className="margin5" onClick={() => handleUpdateQuery(query)}>Update Query</Button>
              <Button type="danger" className="margin5" onClick={() => handleDeleteQuery(query)}>Delete</Button>
            </div>
          </div>
        </div>
        <div className="collapse-container flex-100 layout-row layout-wrap layout-align-start-start">
          <Collapse isOpened={isCollapseOpen} className="width100">
            <div className="flex-100 layout-row layout-wrap layout-align-start-start padd15">
              <div className="flex-100 layout-row layout-align-start-start">
                {queryResponse && queryResponse.length > 0 &&
                <div className="flex-initial layout-row layout-align-start-start marginBottom10px">
                  <label className="font14">{`Data Length: ${queryResponse && queryResponse.length} `}</label>
                  <label className="font14 sidePadd15px">{`Model: ${query && query.model.toUpperCase()} `}</label>
                </div>
                }
              </div>
              <div className="flex-100 layout-row layout-wrap layout-align-start-start responseObj">
                { queryResponse && queryResponse.length > 0 &&
                <pre>{JSON.stringify(queryResponse,null,2)}</pre>
                }
              </div>
            </div>
          </Collapse>
        </div>
      </div>
    </div>
  )
}

export default QueryExecutor;
