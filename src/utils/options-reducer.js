const reduceOptions = (options, label, value) => {
  if(!Array.isArray(options)) {
    return options;
  }

  return options.map(option => {
    return {
      label: option[label],
      value: option[value],
    };
  });
}

export default reduceOptions;