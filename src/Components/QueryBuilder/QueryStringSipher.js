
const operatorsMap = [];


const ruleLogic = (rule) => {

}

const conditionLogic = (condition) => {
  const filter = {};
  filter[condition.condition] = [];
  for (let j = 0; j < filter.rules; j++) {
    if (filter.rules[j].condition && filter.rules[j].rules && filter.rules[j].rules.length > 0) {
      conditionLogic(filter.rules[j]);
    } else {
      ruleLogic(filter.rules[j]);
    }
  }
}

const queryStringCipher = (arrayInput) => {
  let sequelizeString = {};
  for(let i = 0; i < arrayInput.length; i++) {
    const condition = arrayInput[i];
    conditionLogic(condition);
  }
  return sequelizeString
}

export default queryStringCipher;
