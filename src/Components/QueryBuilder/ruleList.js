import React from "react";
import { DatePicker, Button, Row, Col, Select, Radio, Rate, Input } from 'antd';

const { Option } = Select;
const { RangePicker } = DatePicker;

const RuleList = (props) => {
    return <React.Fragment>
      { props.rules.map((item) => (
        <React.Fragment key={item.key}>
          { item['condition'] ? <div className="rules-wrap">
            <div className="rules-header">
              <Row>
                <Col span={12}>
                  <Radio.Group onChange={() => props.handleCondition(item.id)} value={item['condition']} optionType="button" buttonStyle="solid">
                    <Radio value="AND">AND</Radio>
                    <Radio value="OR">OR</Radio>
                  </Radio.Group>
                </Col>
                <Col span={12}>
                  <div className="ctl-wrap createGroupRule">
                    <Button type="primary" onClick={() => props.handleAddRule(item.id)}>Add Rule</Button>
                    <Button type="primary" onClick={() => props.handleAddGroup(item.id)}>Add Group</Button>
                    { item.id !== 0 ? <Button type="danger" onClick={() => props.handleDeleteGroup(item.id)}>Delete</Button> : null }
                  </div>
                </Col>
              </Row>
            </div>
            <div className="rules-body">
              <div key={item.key} className="rules-list">
                {item.rules ? item.rules.map(ruleItem => (
                  <React.Fragment key={ruleItem.key}>
                    { !ruleItem["condition"] ? <div className="rule-container">
                        <Row gutter={8}>
                          <Col>
                            <div className="id-wrap">
                                <p className="small-title">Field Name</p>
                                <Select onChange={(val) => props.handleChangedField(ruleItem.key, val)} className="select" value={ruleItem.id}>
                                    { props.fields ? props.fields.map(fieldItem => (<Option key={fieldItem.id} value={fieldItem.id}>{ fieldItem.name }</Option> )) : null }
                                </Select>
                            </div>
                          </Col>
                          <Col>
                            <div className="operator-wrap">
                                <p className="small-title">Operator</p>
                                <Select onChange={(val) => props.handleChangedOperator(ruleItem.key, val)} className="select" value={ruleItem.operator}>
                                {
                                  props.operators ? props.operators.map(operatorItem => (
                                    <Option key={operatorItem.id} value={operatorItem.symbol}>{ operatorItem.name }</Option>
                                  )) : null
                                }
                              </Select>
                            </div>
                          </Col>
                          {props.getOperatorVisible(ruleItem.operator) ? <Col>
                              <p className="small-title">Value</p>
                              {props.getFieldsType(ruleItem.id) === 'Date' ? <DatePicker onChange={(val, dateString) => props.handleChangedValue(ruleItem.key, dateString)} /> : null}
                            {props.getFieldsType(ruleItem.id) === 'Range' ? <RangePicker onChange={(val, dateString) => props.handleChangedValue(ruleItem.key, dateString)} /> : null}
                            {props.getFieldsType(ruleItem.id) === 'Category' ? <div className="value-select-wrap"><Select className="select" onChange={(val) => props.handleChangedValue(ruleItem.key, val)}>
                              {ruleItem.categoryList ? ruleItem.categoryList.map(categoryItem => (
                                <Option key={categoryItem.id} value={categoryItem.id}>{ categoryItem.name }</Option>
                              )) : null}
                            </Select></div> : null}
                            {props.getFieldsType(ruleItem.id) === 'Rate' ? <Rate onChange={(val) => props.handleChangedValue(ruleItem.key, val)} /> : null}
                            {(props.getFieldsType(ruleItem.id) === 'String') || (props.getFieldsType(ruleItem.id) === 'Number') ? <Input onChange={(e) => props.handleChangedValue(ruleItem.key, e.target.value)} defaultValue={ruleItem.value} /> : null}
                          </Col> : null}
                          {
                            item.rules.length > 1 ? <Col>
                            <Button type="danger" onClick={() => props.handleDeleteRule(ruleItem.key)}>Delete</Button>
                          </Col> : null
                          }
                        </Row>
                      </div> : null
                    }
                  </React.Fragment>
                )) : null}
                { item.rules ?
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
                    handleDeleteRule={props.handleDeleteRule}
                  /> : null }
              </div>
            </div>
          </div> : null}
        </React.Fragment>
      ))}
    </React.Fragment>;
}

export default RuleList;
