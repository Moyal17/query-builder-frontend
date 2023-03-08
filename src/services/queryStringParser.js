
const conditionOp = {
  and: '[Op.and]',
  or: '[Op.or]'
};

const operators = {
  equal: '[Op.eq]',
  notEqual: '[Op.ne]',
  greater: '[Op.gt]',
  greaterEqual: '[Op.gte]',
  less: '[Op.lt]',
  lessEqual: '[Op.lte]',
  between: '[Op.between]',        // [Op.between]: [6, 10]
  notBetween: '[Op.notBetween]',  // [Op.notBetween]: [11, 15]
  isNotNull: '[Op.ne]',           // [Op.ne]: null,
  isNull: '[Op.eq]',              // [Op.eq]: null,
  in: '[Op.in]',                  // [Op.in]: [1, 2]
  notIn: '[Op.notIn]',            // [Op.notIn]: [1, 2]
};

const complicatedOpMap = ['between', 'notBetween', 'in', 'notIn'];
const nullOp = ['isNull', 'isNotNull'];

const ruleLogic = (arr, rule) => {
  if (complicatedOpMap.indexOf(rule.operator) !== -1){
    arr.push({[rule.fieldName]: { [operators[rule.operator]]: [rule.value]}})
  } else if (nullOp.indexOf(rule.operator) !== -1) {
    arr.push({[rule.fieldName]: { [operators[rule.operator]]: null}})
  } else {
    arr.push({[rule.fieldName]: { [operators[rule.operator]]: rule.value}})
  }
}

const conditionLogic = (body, condition) => {
  if (condition.rules && condition.rules.length > 0) {
    for (let j = 0; j < condition.rules.length ; j++) {
      if (condition.rules[j].condition && condition.rules[j].rules && condition.rules[j].rules.length > 0) {
        const newCondition = condition.rules[j].condition;
        const keyOp = conditionOp[newCondition];
        body.push({[keyOp]: []})
        conditionLogic(body[body.length - 1][keyOp], condition.rules[j]);
      } else {
        ruleLogic(body, condition.rules[j]);
      }
    }
  }
}

const queryStringParser = (condition) => {
  let root = {};
  const keyOp = conditionOp[condition.condition];
  root[keyOp] = [];
  conditionLogic(root[keyOp], condition);
  return root;
}

export default queryStringParser;
