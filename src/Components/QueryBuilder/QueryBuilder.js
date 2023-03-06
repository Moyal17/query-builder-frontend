import React, { Component } from "react";
import RuleList from './ruleList.js';
import { randomizeId } from '../../services/utilsService';
import './QueryBuilder.css'

const rules = [{
  condition: 'AND',
  id: 0,
  rules: [{
    id: 3,
    field: 'budget',
    operator: '=',
    value: 9
  }, {
    condition: 'OR',
    id: 9,
    rules: [{
      id: 4,
      field: 'overview',
      operator: '>=',
      value: 'JAPAN'
    }]
  }]
}];

const fields = [
  { id: 1, name: "Movie Id", field: 'movie_id', type: 'String' },
  { id: 2, name: "Title", field: 'title' , type: 'String' },
  { id: 3, name: "Budget",field: 'budget' , type: 'Number' },
  { id: 4, name: "Overview", field: 'overview' , type: 'String' },
  { id: 5, name: "Release Date", field: 'release_date', type: "Date" },
  { id: 6, name: "Revenue", field: 'revenue' , type: 'Number' },
  { id: 8, name: "Runtime", field: 'runtime' , type: 'Number' },
  { id: 9, name: "Rate", field: 'movie_id', type: "Rate" },
  { id: 7, name: "Release Range", field: 'release_date', type: "Range" },
  { id: 10, name: "Category", field: 'movie_id', type: "Category",
    categoryList: [{id: 100, name: 'toms', field: 'toms'}, {id: 101, name: 'jerry', field: 'jerry'}]
  },
];

const operators = [
  { id: 1, name: 'equal', symbol: '=' },
  { id: 2, name: 'not equal', symbol: '!=' },
  { id: 3, name: 'is not null', value: 'disabled', symbol: 'is not null' },
  { id: 4, name: 'is null', value: 'disabled', symbol: 'is null' },
  { id: 5, name: 'in', symbol: 'in' },
  { id: 6, name: 'not in', symbol: 'not in' },
  { id: 7, name: 'less', symbol: '>' },
  { id: 8, name: 'less or equal', symbol: '>=' },
  { id: 9, name: 'greater', symbol: '<' },
  { id: 10, name: 'greater or equal', symbol: '<=' },
  { id: 11, name: 'between', symbol: 'between' },
  { id: 12, name: 'not between', symbol: 'not between' }
];

class QueryBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rules: [...rules]
    };
    this.generateKey([...rules]);
  }

  getOperatorVisible (id) {
    const arr = [...operators].filter(item => item.value === 'disabled').map(item => item.symbol)
    return !arr.includes(id)
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
    // this.props.handleChange(this.state.rules);
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
      item.condition = item.condition === "AND" ? "OR" : "AND";
    })
    this.updateRules()
  }

  handleAddRule (id) {
    this.findRulesById(this.state.rules, id, (item) => {
      item.rules.push({
        id: [...fields][0].id,
        operator: [...operators][0].symbol,
        field: [...fields][0].field,
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
        condition: 'OR',
        groupLvl: item.rules.length + 1,
        id: Number.parseInt(Math.random() * 1000),
        key: randomizeId(),
        rules: [{
          id: [...fields][0].id,
          key: randomizeId(),
          field: [...fields][0].field,
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
      currentItem.field = obj.field;
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
      item.value = val;
    })
    this.updateRules();
  }

  render() {
    return <div className="QueryBuilder wrap">
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
        handleDeleteRule={(id) => this.handleDeleteRule(id)}
      />
      <div className="flex-100 layout-row layout-wrap layout-align-start-start padd10 jsonStringContainer">
        <div className="flex-100 layout-row layout-wrap layout-align-start-start">
          <h3>Builder Output</h3>
        </div>
         <pre>{JSON.stringify(this.state.rules,null,2)}</pre>
      </div>
    </div>;
  }
}
export default QueryBuilder;
