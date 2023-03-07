import React, { Component } from "react";
import RuleList from './ruleList.js';
import { randomizeId } from '../../services/utilsService';
import './QueryBuilder.css'

const rules = [{
  condition: 'and',
  id: 0,
  rules: [{
    id: 3,
    fieldName: 'budget',
    operator: 'greaterEqual',
    value: 55000000
  }, {
    condition: 'or',
    id: 9,
    rules: [{
      id: 4,
      fieldName: 'popularity',
      operator: 'greater',
      value: 80
    }]
  }]
}];

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
      rules: [...rules]
    };
    this.generateKey([...rules]);
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

  generateKey (rules) {
    rules.forEach(item => {
      item.key = randomizeId()
      if (item.rules) this.generateKey(item.rules)
    })
  }

  updateRules () {
    this.setState({
      rules: this.state.rules
    })
    this.props.handleChange(this.state.rules);
  }

  findRulesById (rules, id, callback) {
    rules.forEach((item, index) => {
      if (item.id === id) {
        callback(item, rules, index)
      }
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
    this.findRulesById(this.state.rules, id, (item) => {
      item.condition = item.condition === "and" ? "or" : "and";
    })
    this.updateRules()
  }

  handleAddRule (id) {
    this.findRulesById(this.state.rules, id, (item) => {
      item.rules.push({
        id: [...fields][0].id,
        operator: [...operators][0].symbol,
        fieldName: [...fields][0].fieldName,
        value: '',
        key: randomizeId()
      })
    })
    this.updateRules()
  }

  handleDeleteRule (key) {
    this.findRulesByKey(this.state.rules, key, (item, itemRules, itemIndex) => {
      itemRules.splice(itemIndex, 1)
    })
    this.updateRules();
  }

  handleAddGroup (id) {
    this.findRulesById(this.state.rules, id, (item) => {
      item.rules.push({
        condition: 'or',
        groupLvl: item.rules.length + 1,
        id: Number.parseInt(Math.random() * 1000),
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
    this.updateRules()
  }

  handleDeleteGroup (id) {
    this.findRulesById(this.state.rules, id, (item, itemRules, itemIndex) => {
      itemRules.splice(itemIndex, 1)
    })
    this.updateRules()
  }

  handleChangedField (key, id) {
    this.findRulesByKey(this.state.rules, key, (currentItem) => {
      currentItem.id = id;
      const obj = [...fields].find(fieldItem => fieldItem.id === currentItem.id);
      currentItem.fieldName = obj.fieldName;
      if (obj) currentItem.categoryList = obj.categoryList;
    })
    this.updateRules();
  }

  handleChangedOperator (key, val) {
    this.findRulesByKey(this.state.rules, key, (item) => {
      item.operator = val;
    })
    this.updateRules();
  }

  handleChangedValue (key, val) {
    this.findRulesByKey(this.state.rules, key, (item) => {
      if (Number(val)) item.value = Number(val);
      else item.value = val;
    })
    this.updateRules();
  }

  render() {
    return <div className="QueryBuilder flex-100 layout-row layout-wrap layout-align-start">
      <RuleList
        rules={this.state.rules}
        fields={[...fields]}
        operators={[...operators]}
        getOperatorVisible={(id) => this.getOperatorVisible(id)}
        handleCondition={(id) => this.handleCondition(id)}
        handleAddRule={(id) => this.handleAddRule(id)}
        handleAddGroup={(id) => this.handleAddGroup(id)}
        handleDeleteGroup={(id) => this.handleDeleteGroup(id)}
        handleChangedField={(key, id) => this.handleChangedField(key, id)}
        handleChangedOperator={(key, val) => this.handleChangedOperator(key, val)}
        handleChangedValue={(key, val) => this.handleChangedValue(key, val)}
        getFieldsType={(id) => this.getFieldsType(id)}
        getOperatorType={(id) => this.getOperatorType(id)}
        handleDeleteRule={(id) => this.handleDeleteRule(id)}
      />
      <div className="flex-100 layout-row layout-wrap layout-align-start-start padd-10 jsonStringContainer" style={{display: 'none'}}>
        <div className="flex-100 layout-row layout-wrap layout-align-start-start">
          <h3>Builder Output</h3>
        </div>
         <pre>{JSON.stringify(this.state.rules,null,2)}</pre>
      </div>
    </div>;
  }
}
export default QueryBuilder;
