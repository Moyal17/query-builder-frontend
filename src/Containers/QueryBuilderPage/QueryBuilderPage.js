import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux';
import ReactJson from 'react-json-view';
import {Input, Select, Button} from "antd";
import { getUserQueries, createQuery, updateQuery, removeQuery } from '../../store/actions';
import actionTypes from '../../store/actions/actionTypes';
import QueryBuilder from "../../Components/QueryBuilder/QueryBuilder";
import QueryExecutor from "../../Components/QueryExecutor/QueryExecutor";
import UserInfo from "../../Components/UserInfo/UserInfo";
import queryStringParser from "../../services/queryStringParser";
import { generateKey } from "../../services/utilsService";
import { modelNames } from "../../constants/constants";
import { toast } from 'react-toastify';
import './QueryBuilderPage.css';
const { Option } = Select;

class QueryBuilderPage extends Component {
  constructor (props) {
    super(props);
    this.state = {
      dataParser: null,
      newQuery: this.props.queryDetails,
      isOutputVisible: false,
    };
  }

  async componentDidMount() {
    try {
      const data = await this.props.getUserQueries();
      console.log('componentDidMount: ', data);
    } catch (e) {
      console.log('handle error');
      toast.error('An error occurred while fetching your Queriesm, please refresh or try again later.', {
        closeOnClick: true,
        pauseOnHover: true
      });
    }
  }

  handleQueryResult() {
    const dataParser = queryStringParser(this.props.jsonQuery[0]);
    this.setState({ dataParser, isOutputVisible: true });
  }

  async handleCreateQuery() {
    try {
      if (this.props.queryDetails.title && this.props.jsonQuery ) {
        const body = {...this.props.queryDetails, jsonQuery: [...this.props.jsonQuery]};
        await this.props.createQuery(body);
        this.props.clearQueryRules()
      }
      else {
        toast.error('Please add a title for your query', {
          closeOnClick: true,
          pauseOnHover: true
        });
      }
    } catch (e) {
      console.log('handle error');
      toast.error('An error occurred while saving your query.', {
        closeOnClick: true,
        pauseOnHover: true
      });
    }
  }

  async handleUpdateQuery() {
    try {
      if (this.props.queryDetails.id && this.props.queryDetails.title && this.props.jsonQuery ) {
        const body = {...this.props.queryDetails, jsonQuery: [...this.props.jsonQuery]};
        await this.props.updateQuery(body);
        this.props.clearQueryRules()
        this.props.clearQueryDetails()
      }
    } catch (e) {
      toast.error('An error occurred while Updating your query.', {
        closeOnClick: true,
        pauseOnHover: true
      });
    }
  }

  cancelUpdateQuery() {
    this.props.clearQueryRules()
    this.props.clearQueryDetails()
    this.setState({ isOutputVisible: false });
  }

  handleRemoveQuery = async (query) => {
    try {
      await this.props.removeQuery(query);
    } catch (e) {
      toast.error('An error occurred while Deleting your query from the DB.', {closeOnClick: true, pauseOnHover: true});
    }
  }

  handleQueryInput(query) {
    window.moveTo(0, 0);
    const queryInput = generateKey([...query.jsonQuery]);
    this.props.setQueryDetails(query); // set title desc model
    this.props.setQueryRules(queryInput); // set jsonQuery
  }

  handleModelChanged(val) {
    this.props.setModelFields(val);
    this.setState({ isOutputVisible: false });
  }

  handleInputChanged(key, val) {
    const query = {...this.props.queryDetails};
    query[key] = val;
    this.props.setQueryDetails(query);
  }

  renderQueryModelHeader() {
    const { queryDetails } = this.props;
    return (
      <div className="flex-100 layout-row layout-wrap layout-align-start">
        <div className="flex-25 layout-row layout-wrap layout-align-start">
          <div className="field-name flex-100 layout-row layout-wrap layout-align-start-start">
            <div className="id-wrap flex-100 layout-row layout-wrap layout-align-start-start">
              <p className="small-title">Select Model</p>
              <Select onChange={(val) => this.handleModelChanged(val)} className="select flex-100" value={queryDetails.model} defaultValue={queryDetails.model}>
                { modelNames && modelNames.map(model => (<Option key={`${model.name}_${model.id}`} value={model.value}>{model.name}</Option>)) }
              </Select>
            </div>
          </div>
        </div>
        <div className="flex-25 layout-row layout-wrap layout-align-start side-padd-5px">
          <p className="small-title">Query Title*</p>
          <Input type="text" className="flex-100"  maxLength="200"
                 onChange={(e) => this.handleInputChanged('title', e.target.value)} value={queryDetails.title}/>
        </div>
        <div className="flex-50 layout-row layout-wrap layout-align-start">
          <p className="small-title">Query Description</p>
          <Input type="text" className="flex-100" maxLength="250"
                 onChange={(e) => this.handleInputChanged('description', e.target.value)} value={queryDetails.description}/>
        </div>
      </div>
    )
  }

  render() {
    const { isOutputVisible } = this.state;
    const { queryList, queryDetails } = this.props;
    return (
      <div className="flex-100 layout-row layout-wrap layout-align-start-start padd15">
        <div className="flex-100 layout-row layout-wrap layout-align-center padd15 text-center">
          <h1 className="flex-100 layout-row layout-align-center">Query Builder Page</h1>
          <UserInfo history={this.props.history}/>
        </div>
        <div className="card-container flex-100 layout-row layout-wrap layout-align-start-start padd15">
          <div className="flex-100 layout-row layout-wrap layout-align-start-start">
            <h2>Create a Query</h2>
          </div>
          <div className="flex-100 layout-row layout-wrap layout-align-start">
            { this.renderQueryModelHeader() }
          </div>
          <QueryBuilder onChange={(queryObj) => {this.handleQueryResult(queryObj)}} />
          <div className="flex-100 layout-row layout-wrap layout-align-center action-btns">
            { queryDetails && queryDetails.id ? (
              <Fragment>
                <Button type="danger font16 side-margin-10px" onClick={() => this.cancelUpdateQuery()}>Cancel Update</Button>
                <Button type="primary font16" onClick={() => this.handleUpdateQuery()}>Update Query</Button>
              </Fragment>
              ) : (
              <Button type="primary font16" onClick={() => this.handleCreateQuery()}>Create Query</Button>
            )}
          </div>
            { isOutputVisible && (
              <div className="flex-100 layout-row layout-wrap layout-align-start-start">
                <div className="flex-100 layout-row layout-wrap layout-align-start-start">
                  <h2>Query Output</h2>
                </div>
                <ReactJson src={this.state.dataParser} name="where" theme="twilight" enableClipboard={false} displayObjectSize={false}/>
              </div>
            )}
        </div>
        <div className="flex-100 layout-row layout-wrap layout-align-start-start padd15">
          <div className="flex-100 layout-row layout-wrap layout-align-start-start">
            <h2>Your Queries</h2>
          </div>
          { queryList && queryList.length > 0 && queryList.map((query) => (
          <QueryExecutor key={query.id} query={query}
                         handleUpdateQuery={(query) => this.handleQueryInput(query)}
                         handleRemoveQuery={(query) => this.handleRemoveQuery(query)}
          />
        ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.userR.userInfo,
  queryList: state.queryR.queryList,
  queryDetails: state.queryR.queryDetails,
  jsonQuery: state.queryR.jsonQuery,
});

const mapDispatchToProps = dispatch => ({
  getUserQueries: () => dispatch(getUserQueries()),
  createQuery: (body) => dispatch(createQuery(body)),
  updateQuery: (body) => dispatch(updateQuery(body)),
  removeQuery: (body) => dispatch(removeQuery(body)),
  setQueryDetails: (query) => dispatch({ type: actionTypes.SET_QUERY_DETAILS, payload: query  }),
  setQueryRules: (query) => dispatch({ type: actionTypes.SET_QUERY_RULES, payload: query  }),
  setModelFields: (modelName) => dispatch({ type: actionTypes.SET_MODEL_FIELDS, payload: modelName  }),
  clearQueryRules: () => dispatch({ type: actionTypes.CLEAR_QUERY_RULES }),
  clearQueryDetails: () => dispatch({ type: actionTypes.CLEAR_QUERY_DATA }),
});

export default connect(mapStateToProps, mapDispatchToProps)(QueryBuilderPage);
