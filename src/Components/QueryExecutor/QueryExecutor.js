import React, { useState} from 'react';
import { Collapse } from 'react-collapse';
import { apiMethods } from "../../services/apiService";
import { buildQuery } from "../../services/utilsService";
import { Button, Modal } from "antd";
import './QueryExecutor.css';

const QueryExecutor = (props) => {
  const [ isCollapseOpen, setCollapseOpen ] = useState(false);
  const [ queryResponse, setQueryResponse ] = useState(null);
  const { query, handleUpdateQuery, handleRemoveQuery } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const removeQuery = async () => {
    try {
      handleRemoveQuery(query);
      setIsModalOpen(false);
    } catch (e) {
      console.log('handleRemoveQuery handle error: ', e);
    }
  }

  const executeQuery = async (queryObj) => {
    try {
      const query = buildQuery({ id: queryObj.id });
      const response = await apiMethods.queries.executeQuery(query);
      setQueryResponse(response);
      if (!isCollapseOpen) setCollapseOpen(true);
    } catch (e) {
      console.log('executeQuery handle error: ', e);
    }
  }

  return (
    <div className="QueryExecutor flex-100 layout-row layout-align-start-start">
      <div className="card-container flex-100 layout-row layout-wrap layout-align-start-start padd-10">
        <div className="flex-100 layout-row layout-wrap layout-align-start-start padd-10">
          <div className="flex-100 layout-row layout-align-end-end">
            <div className="flex-66 layout-row layout-wrap layout-align-start-start">
              <label className="queryTitle flex-100 font16">{ query.title }</label>
              { query.description && <p className="queryDesc flex-100 font14 padd-10px">{ query.description }</p> }
            </div>
            <div className="queryAction flex-33 layout-row layout-wrap layout-align-end-end">
              <Button type="primary" className="margin-5" onClick={() => executeQuery(query)}>Execute Query</Button>
              <Button type="primary" className="margin-5" onClick={() => handleUpdateQuery({...query})}>Update Query</Button>
              <Button type="danger" className="margin-5" onClick={() => openModal()}>Delete</Button>
            </div>
          </div>
        </div>
        <div className="collapse-container flex-100 layout-row layout-wrap layout-align-start-start">
          <Collapse isOpened={isCollapseOpen} className="width100">
            <div className="flex-100 layout-row layout-wrap layout-align-start-start padd15">
              <div className="flex-100 layout-row layout-align-start-start">
                {queryResponse && queryResponse.length > 0 &&
                <div className="flex-initial layout-row layout-align-start-start margin-bottom-10px">
                  <Button type="dashed" className="">
                    <b>Data Length:</b><span className="side-padd-5px">{` ${queryResponse && queryResponse.length} `}</span>
                  </Button>
                  <Button type="dashed" className="side-margin-5px">
                    <b>Model:</b><span className="side-padd-5px">{` ${query && query.model.toUpperCase()} `}</span>
                  </Button>
                </div>
                }
                <div className="queryAction flex layout-row layout-wrap layout-align-end-end">
                  <Button type="dashed" className="margin-5" onClick={() => setCollapseOpen(!isCollapseOpen)}>Minimize</Button>
                </div>

                </div>
              <div className="flex-100 layout-row layout-wrap layout-align-start-start responseObj">
                { queryResponse && queryResponse.length > 0 &&
                <pre>{JSON.stringify(queryResponse,null,2)}</pre>
                }
              </div>
            </div>
          </Collapse>
        </div>
        <Modal title="Delete Query" open={isModalOpen} onOk={() => { removeQuery() }} onCancel={handleCancel}>
          <p className="font14">Are you sure you want to remove "{ query.title }" query?</p>
        </Modal>
      </div>
    </div>
  )
}

export default QueryExecutor;
