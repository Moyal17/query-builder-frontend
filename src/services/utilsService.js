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
