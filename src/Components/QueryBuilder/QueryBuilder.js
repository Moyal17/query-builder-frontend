import React, { Component } from "react";
import {connect} from "react-redux";
import actionTypes from "../../store/actions/actionTypes";
import { randomizeId } from '../../services/utilsService';
import RuleList from './ruleList.js';
import './QueryBuilder.css'

const fields = [
  { id: 1, name: "Movie Id", fieldName: 'movie_id'},
  { id: 2, name: "Title", fieldName: 'title' },
  { id: 3, name: "Budget",fieldName: 'budget' },
  { id: 4, name: "Overview", fieldName: 'overview' },
  { id: 5, name: "Release Date", fieldName: 'release_date' },
  { id: 6, name: "Revenue", fieldName: 'revenue' },
  { id: 8, name: "Runtime", fieldName: 'runtime' },
  { id: 9, name: "popularity", fieldName: 'popularity' },
  { id: 10, name: "Release Range", fieldName: 'release_date'}
];

const operators = [
  { id: 1, name: 'equal', symbol: 'equal', type: 'String' },
  { id: 2, name: 'not equal', symbol: 'notEqual', type: 'String' },
  { id: 3, name: 'is not null', value: 'disabled', symbol: 'isNotNull' },
  { id: 4, name: 'is null', value: 'disabled', symbol: 'isNull' },
  { id: 7, name: 'less', symbol: 'less', type: 'Number' },
  { id: 8, name: 'less or equal', symbol: 'lessEqual', type: 'Number' },
  { id: 9, name: 'greater', symbol: 'greater', type: 'Number' },
  { id: 10, name: 'greater or equal', symbol: 'greaterEqual', type: 'Number' },
  { id: 11, name: 'between', symbol: 'between', type: "Range" },
  { id: 12, name: 'not between', symbol: 'notBetween', type: "Range" }
];

class QueryBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rules: this.props.jsonQuery
    }
  }

  componentDidMount() {

  }

  getOperatorVisible (id) {
    const arr = [...operators].filter(item => item.value === 'disabled').map(item => item.symbol)
    return !arr.includes(id)
  }

  getOperatorType (operator) {
    const obj = [...operators].find(item => item.symbol === operator);
    return obj['type'] ? obj['type'] : ''
  }

  getFieldsType (id) {
    const obj = [...fields].find(item => item.id === id);
    return obj['type'] ? obj['type'] : ''
  }

  updateRules (queryObj) {
    this.props.setQueryRules(queryObj);
    this.props.onChange();
  }

  findRulesById (rules, id, callback) {
    rules.forEach((item, index) => {
      if (item.id === id) callback(item, rules, index)
      if (item.rules) this.findRulesById(item.rules, id, callback)
    })
  }

  findRulesByKey (rules, key, callback) {
    rules.forEach((item, index) => {
      if (item.key === key) callback(item, rules, index)
      if (item.rules) this.findRulesByKey(item.rules, key, callback)
    })
  }

  handleCondition (id) {
    const queryObj = [...this.props.jsonQuery];
    this.findRulesById(queryObj, id, (item) => {
      item.condition = item.condition === "and" ? "or" : "and";
    })
    this.updateRules(queryObj);
  }

  handleAddRule (id, jsonQuery) {
    const queryObj = [...jsonQuery];
    this.findRulesById(queryObj, id, (item) => {
      item.rules.push({
        id: [...fields][0].id,
        operator: [...operators][0].symbol,
        fieldName: [...fields][0].fieldName,
        value: '',
        key: randomizeId()
      })
    })
    this.updateRules(queryObj);
  }

  handleDeleteRule (key, jsonQuery) {
    const queryObj = [...jsonQuery];
    this.findRulesByKey(queryObj, key, (item, itemRules, itemIndex) => {
      itemRules.splice(itemIndex, 1)
    })
    this.updateRules(queryObj);
  }

  handleAddGroup (id, jsonQuery) {
    const queryObj = [...jsonQuery];
    this.findRulesById(queryObj, id, (item) => {
      item.rules.push({
        condition: 'or',
        groupLvl: item.rules.length + 1,
        id: Number.parseInt(Math.random() * 10000),
        key: randomizeId(),
        rules: [{
          id: [...fields][0].id,
          key: randomizeId(),
          fieldName: [...fields][0].fieldName,
          operator: [...operators][0].symbol,
          value: ''
        }]
      })
    })
    this.updateRules(queryObj);
  }

  handleDeleteGroup (id, jsonQuery) {
    const queryObj = [...jsonQuery];
    this.findRulesById(queryObj, id, (item, itemRules, itemIndex) => {
      itemRules.splice(itemIndex, 1)
    })
    this.updateRules(queryObj);
  }

  handleChangedField (key, id) {
    const queryObj = [...this.props.jsonQuery];
    this.findRulesByKey(queryObj, key, (currentItem) => {
      currentItem.id = id;
      const obj = [...fields].find(fieldItem => fieldItem.id === currentItem.id);
      currentItem.fieldName = obj.fieldName;
      if (obj) currentItem.categoryList = obj.categoryList;
    })
    this.updateRules(queryObj);
  }

  handleChangedOperator (key, val) {
    const queryObj = [...this.props.jsonQuery];
    this.findRulesByKey(queryObj, key, (item) => {
      item.operator = val;
    })
    this.updateRules(queryObj);
  }

  handleChangedValue (key, val) {
    const queryObj = [...this.props.jsonQuery];
    this.findRulesByKey(queryObj, key, (item) => {
      if (Number(val)) item.value = Number(val);
      else item.value = val;
    })
    this.updateRules(queryObj);
  }

  render() {
    const { jsonQuery } = this.props;
    return <div className="QueryBuilder flex-100 layout-row layout-wrap layout-align-start">
      <RuleList
        rules={jsonQuery}
        fields={[...fields]}
        operators={[...operators]}
        getOperatorVisible={(id) => this.getOperatorVisible(id)}
        handleCondition={(id) => this.handleCondition(id)}
        handleAddRule={(id) => this.handleAddRule(id, jsonQuery)}
        handleAddGroup={(id) => this.handleAddGroup(id, jsonQuery)}
        handleDeleteGroup={(id) => this.handleDeleteGroup(id, jsonQuery)}
        handleChangedField={(key, id) => this.handleChangedField(key, id)}
        handleChangedOperator={(key, val) => this.handleChangedOperator(key, val)}
        handleChangedValue={(key, val) => this.handleChangedValue(key, val)}
        getFieldsType={(id) => this.getFieldsType(id)}
        getOperatorType={(id) => this.getOperatorType(id)}
        handleDeleteRule={(id) => this.handleDeleteRule(id, jsonQuery)}
      />
      <div className="flex-100 layout-row layout-wrap layout-align-start-start padd-10 jsonStringContainer" style={{display: 'none'}}>
        <div className="flex-100 layout-row layout-wrap layout-align-start-start">
          <h3>Builder Output</h3>
        </div>
         <pre>{JSON.stringify(jsonQuery,null,2)}</pre>
      </div>
    </div>;
  }
}


const mapStateToProps = state => ({
  jsonQuery: state.queryR.jsonQuery
});

const mapDispatchToProps = dispatch => ({
  setQueryRules: (query) => dispatch({ type: actionTypes.SET_QUERY_RULES, payload: query  }),
});

export default connect(mapStateToProps, mapDispatchToProps)(QueryBuilder);
