export const handleSubmit = async (event, children, func) => {
  event.preventDefault();
  const formData = {};
  children.forEach((elem) => {
    formData[elem.props.name] = event.target[elem.props.name].value;
  });
  return await func(formData);
};
