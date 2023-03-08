export const randomizeId = () => {
  const nanoidOption = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let num = '';
  for (let i = 0; i < 15 ; i++) {
    num += nanoidOption[Math.floor(Math.random() * nanoidOption.length)]
  }
  return num;
}

export const getOptionsByArray = (options, appLang) => {
    if (options && options.length > 0) {
      return options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.display}
        </option>
      ));
    }
    return <option />;
  };
export const getOptionsByObject = (options, appLang) => {
  if (options && Object.keys(options).length > 0) {
    return Object.keys(options).map((key, index) => (
      <option key={index} value={options[key]}>
        {key}
      </option>
    ));
  }
  return <option />;
};


export const buildQuery = (queryObj) => {
  if (typeof queryObj === 'object' && queryObj !== null) {
    const apiQuery = { ...queryObj };
    let newQuery = '';
    let firstQuery = true;
    for (const [key, value] of Object.entries(apiQuery)) {
      if (Array.isArray(value)) { // if value is array
        let arrayQuery = '';
        let firstVal = true;
        value.forEach((val) => {
          arrayQuery = `${arrayQuery + (firstVal ? '' : ',') + val}`;
          firstVal = false;
        });
        newQuery += `${(firstQuery ? '?' : '&') + key}=${arrayQuery}`;
        firstQuery = false;
      } else if (value === false) { // if value is boolean false -> skip it
        newQuery += `${(firstQuery ? '?' : '')}`;
        firstQuery = false;
      } else if (value !== '' || value > 0 || value === 0) { // if value is string / number
        newQuery += `${(firstQuery ? '?' : '&') + key}=${value}`;
        firstQuery = false;
      }
    }
    return newQuery;
  }
  return '';
}

export const updateItemInList = (array, updatedItem) => {
  return array.map((item) => {
    if (item.id === updatedItem.id) return updatedItem;
    else return item;
  })
}

export const removeItemFromArray = (array, item) => {
  const index = array.indexOf(item);
  return [...array.slice(0, index), ...array.slice(index + 1)];
}
export const removeItemFromObject = (object, key) => {
  const newObject = { ...object };
  delete newObject[key];
  return newObject;
}

export const generateKey = (queryInput) => {
  return queryInput.map(item => {
    item.key = randomizeId();
    if (item.rules) generateKey(item.rules);
    return item;
  });
}

