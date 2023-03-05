import React, { Component } from 'react';
import { getOptionsByArray, getOptionsByObject } from '../../services/utilsService';

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialValue: null,
      dateToday: new Date(),
    };
  }

  // this is for surveyCreator functionality
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      prevProps.clearOnLangUpdate &&
      prevProps.appLang !== this.props.appLang &&
      (prevProps.elementType === 'input' || prevProps.elementType === 'textarea') &&
      !this.props.initValue
    ) {
      this.state[prevProps.name].value = '';
    } else if (
      prevProps.clearOnLangUpdate &&
      prevProps.appLang !== this.props.appLang &&
      (prevProps.elementType === 'input' || prevProps.elementType === 'textarea') &&
      this.props.initValue
    ) {
      this.state[prevProps.name].value = this.props.initValue;
    }
  }

  textClickable(label, key, group) {
    if (this.props.valueAlwaysTrue) return;
    const element = document.querySelector(
      `input[label="${label || key}"]${group ? `[group=${group}]` : ''}`,
    );
    if (element) {
      const event = {
        type: element.type,
        checked: !element.checked,
        target: {
          type: element.type,
          checked: !element.checked,
        },
      };
      element.checked = !element.checked;
      this.props.handleChange(event, key);
    }
  }

  renderInput(prop, key) {
    const elementType = prop.elementType || 'input';
    const type = prop.type || 'text';
    const config = prop.config || null;
    const validation = prop.validation || null;
    this.state.initialValue = prop.initValue ? prop.initValue : null;
    let appLang = this.props.appLang;
    if (!appLang || (appLang !== 'en' && appLang !== 'he' && appLang !== 'es')) appLang = 'en';
    const placeholder = this.props.placeholderAsIs ? this.props.placeholderAsIs : (prop.placeholder || prop.label || prop.name) ? (prop.placeholder || prop.label || prop.name) : '';
    switch (elementType) {
      case 'input':
        return (
          <input
            id={prop.id || key}
            {...config}
            {...validation}
            label={prop.label || key}
            title={prop.label || key}
            placeholder={placeholder}
            defaultValue={this.state.initialValue}
            type={type}
            ref={(input) => (this.state[key] = input)}
            key={`i_${key}`}
            onChange={(event) => {
              this.props.handleChange(event, key);
            }}
            className={`form-control ${this.props.inputClass}`}
          />
        );
      case 'textarea':
        return (
          <textarea
            {...config}
            {...validation}
            label={prop.label || key}
            title={prop.label || key}
            placeholder={placeholder}
            defaultValue={this.state.initialValue}
            ref={(input) => (this.state[key] = input)}
            key={`i_${key}`}
            onChange={(event) => {
              this.props.handleChange(event, key);
            }}
            className={`form-control ${this.props.inputClass}`}
          />
        );
      case 'checkBox':
        return (
          <div
            key={`i_${key}`}
            className="flex-100 layout-row layout-wrap layout-align-start-center">
            <div className={`flex-100 layout-row layout-align-start-center checkBox ${this.props.children || this.props.text ? 'paddTop5px' : ''}`}>
              <div className="checkbox-container paddEnd10px">
                <input
                  type="checkbox"
                  label={prop.label || key}
                  title={prop.label || key}
                  checked={this.props.initialValue}
                  className={`form-control ${this.props.inputClass}`}
                  ref={(input) => (this.state[key] = input)}
                  {...config}
                  {...validation}
                  onChange={(event) => {
                    this.props.handleChange(event, key);
                  }}
                />
              </div>
              <p
                className={`flex margin0 ${this.props.checkBoxClass || ''}`}
                onClick={(event) => {
                  this.props.clickText && this.textClickable(prop.label, key);
                }}>
                {this.props.children || this.props.text}
              </p>
            </div>
          </div>
        );
      case 'radio':
        return (
          <div
            key={`i_${key}`}
            className="flex-100 layout-row layout-wrap layout-align-start-center">
            <div className="flex-100 layout-row layout-align-start-center checkBox">
              <div className="checkbox-container">
                <input
                  type="radio"
                  name={this.props.group || this.props.name}
                  group={this.props.group}
                  label={prop.label || key}
                  title={prop.label || key}
                  checked={this.props.initialValue}
                  ref={(input) => (this.state[key] = input)}
                  {...config}
                  {...validation}
                  onChange={(event) => {
                    this.props.handleChange(event, key);
                  }}
                />
              </div>
              <p
                className={`flex paddStart10px margin0 ${this.props.checkBoxClass || 'paddStart10px'}`}
                onClick={(event) => { this.props.clickText && this.textClickable(prop.label, key, prop.group);}}>
                {this.props.children || this.props.text}
              </p>
            </div>
          </div>
        );
      case 'select':
        return (
          <div className="flex-100 layout-row layout-align-center-center positionRelative inputSelect selectContainer">
            <select
              className={`form-control minimal ${this.props.inputClass}`}
              id={this.props.id || prop.name}
              {...config}
              {...validation}
              disabled={prop.disabled || this.props.disabled}
              label={prop.label || key}
              title={prop.label || key}
              defaultValue={this.state.initialValue}
              ref={(input) => (this.state[key] = input)}
              key={`i_${key}`}
              onChange={(event) => {
                this.props.handleChange(event, key);
              }}
            >
              { prop.options && Array.isArray(prop.options) ? getOptionsByArray(prop.options, this.props.appLang) : getOptionsByObject(prop.options, this.props.appLang) }
            </select>
            <i className="la la-sort-down" />
          </div>
        );
      case 'datePicker':
        return (
          <div className="datePickerInput flex-100 layout-row layout-wrap layout-align-start-start positionRelative">
            <input
              {...config}
              {...validation}
              label={prop.label || key}
              title={prop.label || key}
              defaultValue={this.state.initialValue || this.state.dateToday}
              type="date"
              min={(validation && validation.min) || this.props.min}
              max={(validation && validation.max) || this.props.max}
              ref={(input) => (this.state[key] = input)}
              key={`i_${key}`}
              onChange={(event) => {
                this.props.handleChange(event, key);
              }}
              className={`form-control ${this.props.inputClass}`}
            />
          </div>
        );
      default:
        return (
          <input
            id={key}
            {...config}
            {...validation}
            label={prop.label || key}
            placeholder={placeholder}
            defaultValue={this.state.initialValue}
            type={type}
            ref={(input) => (this.state[key] = input)}
            key={`i_${key}`}
            onChange={(event) => {
              this.props.handleChange(event, key);
            }}
            className={`form-control ${this.props.inputClass}`}
          />
        );
    }
  }

  render() {
    const { className, initValue, labelClasses, label, name, commentClasses, comment, noLabel, key, error} = this.props;
    return (
      <div
        key={key || name}
        className={`${this.props.classes || ''} InputCmp layout-row layout-wrap layout-align-start-start`}>
        <div className={className}>
          {!noLabel && (
            <label
              id={`${name}_label`}
              className={`formBoxInput text-capitalize valued rendered fontWeight400 ${initValue ? 'valued' : ''} ${error || 'primary'} ${labelClasses}`}
              htmlFor={name}>
              {label || name}
            </label>
          )}
          {this.renderInput(this.props, name)}
        </div>
      </div>
    );
  }
}

export default Input;
