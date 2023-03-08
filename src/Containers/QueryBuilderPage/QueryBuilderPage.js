import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import ReactJson from 'react-json-view';
import { getUserQueries, getMovies, createQuery, updateQuery, removeQuery } from '../../store/actions';
import actionTypes from '../../store/actions/actionTypes';
import QueryBuilder from "../../Components/QueryBuilder/QueryBuilder";
import QueryExecutor from "../../Components/QueryExecutor/QueryExecutor";
import queryStringParser from "../../services/queryStringParser";
import { generateKey } from "../../services/utilsService";
import './QueryBuilderPage.css';
import {Input, Select, Button} from "antd";
const { Option } = Select;

const models = [
  { id: 1, name: "Movies", value: 'movie' },
  { id: 2, name: "Actors", value: 'actor' },
];

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
      else console.log('no title || no jsonQuery');
    } catch (e) {
      console.log('handle error');
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
      console.log('handle error');
    }
  }

  handleRemoveQuery = async (query) => {
    try {
      await this.props.removeQuery(query);
    } catch (e) {
      console.log('handleRemoveQuery handle error: ', e);
    }
  }

  handleQueryInput(query) {
    const queryInput = generateKey([...query.jsonQuery]);
    this.props.setQueryDetails(query); // set title desc model
    this.props.setQueryRules(queryInput); // set jsonQuery
  }

  handleModelChanged(val) {
    console.log('handleModelChanged val: ', val)
    const query = {...this.props.queryDetails, model: val};
    this.props.setQueryDetails(query);
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
                { models && models.map(model => (<Option key={`${model.name}_${model.id}`} value={model.value}>{model.name}</Option>)) }
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
          <Link to={'/'}>Home</Link>
        </div>
        <div className="card-container flex-100 layout-row layout-wrap layout-align-start-start padd15">
          <div className="flex-100 layout-row layout-wrap layout-align-start-start">
            <h2>Create a Query</h2>
          </div>
          <div className="flex-100 layout-row layout-wrap layout-align-start">
            { this.renderQueryModelHeader() }
          </div>
          <QueryBuilder onChange={(queryObj) => {this.handleQueryResult(queryObj)}} />
          <div className="flex-100 layout-row layout-wrap layout-align-center query-action-btns">
            { queryDetails && queryDetails.id ? (
              <Button type="primary font16" onClick={() => this.handleUpdateQuery()}>Update Query</Button> ) : (
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
  getMovies: () => dispatch(getMovies()),
  createQuery: (body) => dispatch(createQuery(body)),
  updateQuery: (body) => dispatch(updateQuery(body)),
  removeQuery: (body) => dispatch(removeQuery(body)),
  setQueryDetails: (query) => dispatch({ type: actionTypes.SET_QUERY_DETAILS, payload: query  }),
  setQueryRules: (query) => dispatch({ type: actionTypes.SET_QUERY_RULES, payload: query  }),
  clearQueryRules: () => dispatch({ type: actionTypes.CLEAR_QUERY_RULES }),
  clearQueryDetails: () => dispatch({ type: actionTypes.CLEAR_QUERY_DATA }),
});

export default connect(mapStateToProps, mapDispatchToProps)(QueryBuilderPage);
