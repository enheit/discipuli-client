const reduceOptions = (options, label, value) => {
  if (!Array.isArray(options)) {
    return options;
  }

  return options.map(option => ({
    label: option[label],
    value: option[value],
  }));
};

export default reduceOptions;
