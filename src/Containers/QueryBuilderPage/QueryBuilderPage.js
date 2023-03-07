import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import ReactJson from 'react-json-view';
import { getUserQueries, getMovies, createQuery, updateQuery } from '../../store/actions';
import QueryBuilder from "../../Components/QueryBuilder/QueryBuilder";
import QueryExecutor from "../../Components/QueryExecutor/QueryExecutor";
import QueryStringParser from "../../services/QueryStringParser";
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
      queryList: [
        {
        id: 'n3l2nl41',
          name: 'Get Movie Titles',
          description: 'getting all movie titles from the DB.',
          model: 'movies',
          jsonQuery: '',
          sqlQuery: '',
          response: {
            command: 'SELECT',
            rowCount: 18,
            rows: [
              { title: 'Star Wars' },
              { title: 'Finding Nemo' },
              { title: 'Forrest Gump' },
              { title: 'American Beauty' },
              { title: 'Raiders of the Lost Ark' },
              { title: 'Indiana Jones and the Temple of Doom' },
              { title: 'Indiana Jones and the Last Crusade' },
              { title: 'Beverly Hills Cop' },
              { title: 'Armageddon' },
              { title: 'Beverly Hills Cop II' },
              { title: 'Gladiator' },
              { title: 'Back to the Future' },
              { title: 'Predator' },
              { title: 'The Untouchables' },
              { title: 'Charlie and the Chocolate Factory' },
              { title: 'The Lord of the Rings: The Fellowship of the Ring' },
              { title: 'The Lord of the Rings: The Two Towers' },
              { title: 'The Lord of the Rings: The Return of the King' }
            ]
          }
        },
      ],
      payload: null,
      dataParser: null,
      newQuery: {
        model: 'movie'
      },
      isOutputVisible: false,
    };
  }

  async componentDidMount() {
    try {
      const data = await this.props.getUserQueries();
      this.setState({ queryList: data });
      console.log('componentDidMount: ', data)
    } catch (e) {
      console.log('handle error');
    }
  }

  handleQueryResult(query) {
    const dataParser = QueryStringParser(query[0]);
    this.state.newQuery.payload = query;
    this.setState({ dataParser, isOutputVisible: true})
  }

  async handleCreateQuery() {
    try {
      if (this.state.newQuery.title || this.state.newQuery.payload ) {
        const data = await this.props.createQuery(this.state.newQuery);
        console.log('handleCreateQuery: ', data);
      }
      console.log('no title || no payload');
    } catch (e) {
      console.log('handle error');
    }
  }

  async handleUpdateQuery() {
    try {
      const data = await this.props.getUserQueries();
      console.log('handleUpdateQuery: ', data);
    } catch (e) {
      console.log('handle error');
    }
  }

  handleQueryInput(query) {
    this.setState({ newQuery: query });
  }

  handleModelChanged(val) {
    console.log('handleModelChanged val: ', val)
    this.setState((prevState) => ({ newQuery: { ...prevState.newQuery, model: val } }))
  }

  handleInputChanged(key, val) {
    console.log('handleInputChanged val: ', val)
    this.state.newQuery[key] = val;
  }

  renderQueryModelHeader() {
    return (
      <div className="flex-100 layout-row layout-wrap layout-align-start">
        <div className="flex-25 layout-row layout-wrap layout-align-start">
          <div className="field-name flex-100 layout-row layout-wrap layout-align-start-start">
            <div className="id-wrap flex-100 layout-row layout-wrap layout-align-start-start">
              <p className="small-title">Select Model</p>
              <Select onChange={(val) => this.handleModelChanged(val)} className="select flex-100" value={this.state.newQuery.model}>
                { models && models.map(model => (<Option key={`${model.name}_${model.id}`} value={model.value}>{model.name}</Option>)) }
              </Select>
            </div>
          </div>
        </div>
        <div className="flex-25 layout-row layout-wrap layout-align-start side-padd-5px">
          <p className="small-title">Query Title*</p>
          <Input type="text" className="flex-100" onChange={(e) => this.handleInputChanged('title', e.target.value)} defaultValue={this.state.newQuery.title}/>
        </div>
        <div className="flex-50 layout-row layout-wrap layout-align-start">
          <p className="small-title">Query Description</p>
          <Input type="text" className="flex-100" onChange={(e) => this.handleInputChanged('description', e.target.value)} defaultValue={this.state.newQuery.description}/>
        </div>
      </div>
    )
  }

  render() {
    const { queryList, newQuery, isOutputVisible } = this.state;
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
          <QueryBuilder handleChange={(query) => {this.handleQueryResult(query)}} queryInput={this.state.queryInput}/>
          <div className="flex-100 layout-row layout-wrap layout-align-center query-action-btns">
            { this.state.newQuery && this.state.newQuery.id ? (
              <Button type="primary font16" onClick={() => this.handleUpdateQuery()}>Update Query</Button> ) : (
              <Button type="primary font16" onClick={() => this.handleCreateQuery()}>Create Query</Button>
            )}
          </div>
            { isOutputVisible && (
              <div className="flex-100 layout-row layout-wrap layout-align-start-start">
                <div className="flex-100 layout-row layout-wrap layout-align-start-start">
                  <h2>Query Output</h2>
                </div>
                <ReactJson src={newQuery.payload} name="where" theme="twilight" enableClipboard={false} displayObjectSize={false}/>
              </div>
            )}
        </div>
        <div className="flex-100 layout-row layout-wrap layout-align-start-start padd15">
          <div className="flex-100 layout-row layout-wrap layout-align-start-start">
            <h2>Your Queries</h2>
          </div>
          { queryList && queryList.length > 0 && queryList.map((query) => (
          <QueryExecutor key={query.id} query={query} handleUpdateQuery={(query) => this.handleQueryInput(query)}/>
        ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.userR.userInfo,
  queryList: state.queryR.queryList
});

const mapDispatchToProps = dispatch => ({
  getUserQueries: () => dispatch(getUserQueries()),
  getMovies: () => dispatch(getMovies()),
  createQuery: (body) => dispatch(createQuery(body)),
  updateQuery: () => dispatch(updateQuery()),
});

export default connect(mapStateToProps, mapDispatchToProps)(QueryBuilderPage);
