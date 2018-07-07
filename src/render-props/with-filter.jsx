import PropTypes from 'prop-types';

const WithFilter = props => props.render(props.list.filter(props.filter));

WithFilter.propTypes = {
  render: PropTypes.func.isRequired,
  filter: PropTypes.func.isRequired,
  list: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default WithFilter;
