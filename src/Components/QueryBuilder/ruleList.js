import React from "react";
import {DatePicker, Button, Select, Radio, Rate, Input} from 'antd';

const {Option} = Select;
const {RangePicker} = DatePicker;

const RuleList = (props) => {
  return <React.Fragment>
    {props.rules.map((item) => (
      <React.Fragment key={item.key}>
        {item['condition'] ? <div className="rules-wrap padd15">
          <div className="rules-header flex-100 layout-row layout-wrap layout-align-start-start">
            <div className="flex-100 layout-row layout-wrap layout-align-start-start">
              <div className="flex-50 layout-row layout-wrap layout-align-start-start">
                <Radio.Group onChange={() => props.handleCondition(item.id)} value={item['condition']}
                             optionType="button" buttonStyle="solid">
                  <Radio value="and">AND</Radio>
                  <Radio value="or">OR</Radio>
                </Radio.Group>
              </div>
              <div className="flex-50 layout-row layout-wrap layout-align-end-start">
                <div className="ctl-wrap createGroupRule">
                  <Button type="primary" onClick={() => props.handleAddRule(item.id)}>Add Rule</Button>
                  <Button type="primary" onClick={() => props.handleAddGroup(item.id)}>Add Group</Button>
                  {item.id !== 0 ?
                    <Button type="danger" onClick={() => props.handleDeleteGroup(item.id)}>Delete</Button> : null}
                </div>
              </div>
            </div>
          </div>
          <div className="rules-body">
            <div key={item.key} className="rules-list">
              {item.rules ? item.rules.map(ruleItem => (
                <React.Fragment key={ruleItem.key}>
                  { !ruleItem["condition"] ? <div className="rule-container flex-100 layout-row layout-wrap layout-align-start-start marginBottom10px">
                    <div className="flex-100 layout-row layout-wrap layout-align-start-end">
                      <div className="flex-initial layout-row layout-wrap layout-align-start-start">
                        <div className="id-wrap">
                          <p className="small-title">Field Name</p>
                          <Select onChange={(val) => props.handleChangedField(ruleItem.key, val)} className="select" value={ruleItem.id}>
                            { props.fields ? props.fields.map(fieldItem => (<Option key={`${fieldItem.name}_${fieldItem.id}`} value={fieldItem.id}>{fieldItem.name}</Option>)) : null}
                          </Select>
                        </div>
                      </div>
                      <div className="flex-initial layout-row layout-wrap layout-align-start-start sidePadd5px">
                        <div className="operator-wrap">
                          <p className="small-title">Operator</p>
                          { props.operators && props.operators.length > 0 && (
                            <Select onChange={(val) => props.handleChangedOperator(ruleItem.key, val)} className="select" value={ruleItem.operator}>
                              { props.operators.map(operatorItem => (
                                <Option key={`${operatorItem.symbol}_${operatorItem.id}`} value={operatorItem.symbol}>{operatorItem.name}</Option>
                              ))}
                            </Select>
                          )}
                        </div>
                      </div>
                      { props.getOperatorVisible(ruleItem.operator) ?
                        <div className="flex-initial layout-row layout-wrap layout-align-start-start">
                          <p className="small-title">Value</p>
                          { props.getOperatorType(ruleItem.operator) === 'Date' ? <DatePicker onChange={(val, dateString) => props.handleChangedValue(ruleItem.key, dateString)}/> : null}
                          { props.getOperatorType(ruleItem.operator) === 'Range' ? <RangePicker onChange={(val, dateString) => props.handleChangedValue(ruleItem.key, dateString)}/> : null}
                        {/*  { props.getOperatorType(ruleItem.operator) === 'Category' ?
                            <div className="value-select-wrap"><Select className="select" onChange={(val) => props.handleChangedValue(ruleItem.key, val)}>
                              {ruleItem.categoryList ? ruleItem.categoryList.map(categoryItem => (<Option key={categoryItem.id} value={categoryItem.id}>{categoryItem.name}</Option>)) : null}
                            </Select></div> : null}*/}
                          {(props.getOperatorType(ruleItem.operator) === 'String') || (props.getOperatorType(ruleItem.operator) === 'Number') ? <Input type={props.getOperatorType(ruleItem.operator)} onChange={(e) => props.handleChangedValue(ruleItem.key, e.target.value)} defaultValue={ruleItem.value}/> : null}
                        </div> : null}
                      {item.rules.length > 1 ?
                        <div className="flex-initial layout-row layout-wrap layout-align-end-end sidePadd5px">
                          <Button type="danger" onClick={() => props.handleDeleteRule(ruleItem.key)}>Delete</Button>
                        </div> : null
                      }
                    </div>
                  </div> : null
                  }
                </React.Fragment>
              )) : null}
              {item.rules ?
                <RuleList
                  rules={item.rules}
                  fields={props.fields}
                  operators={props.operators}
                  handleCondition={props.handleCondition}
                  handleAddRule={props.handleAddRule}
                  handleAddGroup={props.handleAddGroup}
                  handleDeleteGroup={props.handleDeleteGroup}
                  handleChangedField={props.handleChangedField}
                  handleChangedOperator={props.handleChangedOperator}
                  handleChangedValue={props.handleChangedValue}
                  getOperatorVisible={props.getOperatorVisible}
                  getFieldsType={props.getFieldsType}
                  getOperatorType={props.getOperatorType}
                  handleDeleteRule={props.handleDeleteRule}
                /> : null}
            </div>
          </div>
        </div> : null}
      </React.Fragment>
    ))}
  </React.Fragment>;
}

export default RuleList;
