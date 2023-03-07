import React, {Fragment} from "react";
import {DatePicker, Button, Select, Radio, Input} from 'antd';

const {Option} = Select;
const {RangePicker} = DatePicker;

const ValueField = ({ getOperatorVisible, handleChangedValue, getOperatorType, ruleItem }) => {
  return (
    <Fragment>
      { getOperatorVisible(ruleItem.operator) ?
        <div className="field-value flex-initial layout-row layout-wrap layout-align-start-start">
          <p className="small-title">Value</p>
          { getOperatorType(ruleItem.operator) === 'Date' ? <DatePicker onChange={(val, dateString) => handleChangedValue(ruleItem.key, dateString)}/> : null}
          { getOperatorType(ruleItem.operator) === 'Range' ? <RangePicker onChange={(val, dateString) => handleChangedValue(ruleItem.key, dateString)}/> : null}
          {(getOperatorType(ruleItem.operator) === 'String') || (getOperatorType(ruleItem.operator) === 'Number') ?
            <Input type={getOperatorType(ruleItem.operator)} onChange={(e) => handleChangedValue(ruleItem.key, e.target.value)} defaultValue={ruleItem.value}/> : null}
        </div> : null}
    </Fragment>
  )
}

const RuleList = (props) => {
  return (
    <div className="width100 flex-100 layout-row layout-wrap layout-align-start-end">
    { props.rules.map((item) => (
      <Fragment key={item.key}>
        {item['condition'] ? <div className="rules-wrap flex-100 layout-row layout-wrap layout-align-start padd15">
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
          <div className="rules-body flex-100 layout-row layout-wrap layout-align-start">
            <div key={item.key} className="rules-list flex-100 layout-row layout-wrap layout-align-start">
              {item.rules && item.rules.length > 0 ? item.rules.map(ruleItem => (
                <Fragment key={ruleItem.key}>
                  { !ruleItem["condition"] ? <div className="rule-container flex-100 layout-row layout-wrap layout-align-start-start marginBottom10px">
                    <div className="flex-100 layout-row layout-wrap layout-align-start-end">
                      <div className="field-name flex-initial layout-row layout-wrap layout-align-start-start">
                        <div className="id-wrap">
                          <p className="small-title">Field Name</p>
                          <Select onChange={(val) => props.handleChangedField(ruleItem.key, val)} className="select" value={ruleItem.id}>
                            { props.fields ? props.fields.map(fieldItem => (<Option key={`${fieldItem.name}_${fieldItem.id}`} value={fieldItem.id}>{fieldItem.name}</Option>)) : null}
                          </Select>
                        </div>
                      </div>
                      <div className="field-operator flex-initial layout-row layout-wrap layout-align-start-start side-padd-5">
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
                        <ValueField
                          getOperatorVisible={(id) => props.getOperatorVisible(id)}
                          handleChangedValue={(key, val) => props.handleChangedValue(key, val)}
                          getOperatorType={(id) => props.getOperatorType(id)}
                          ruleItem={ruleItem}
                        /> : null}
                      { item.rules.length > 1 ?
                        <div className="flex-initial layout-row layout-wrap layout-align-end-end side-padd-5">
                          <Button type="danger" onClick={() => props.handleDeleteRule(ruleItem.key)}>Delete</Button>
                        </div> : null
                      }
                    </div>
                  </div> : null
                  }
                </Fragment>
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
      </Fragment>
    ))}
  </div>)
}

export default RuleList;
