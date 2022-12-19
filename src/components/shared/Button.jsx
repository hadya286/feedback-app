import PropTypes from 'prop-types'

// custom button that could be used anywhere all around the app
// passed certain props for styling
// {children}, because we are going to be wrapping the component around whatever text for the button
// version: primary, secondary => pertain to a certain class
//  type: submit button or just a regular button

function Button({children, version, type, isDisabled}) {
  return (
    <button type={type} disabled={isDisabled} className={`btn btn-${version}`}>
      {children}
    </button>
  )
}

Button.defaultProps = {
  version: 'primary',
  type: 'button',
  isDisabled: false,
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  version: PropTypes.string,
  type: PropTypes.string,
  isDisabled: PropTypes.bool,
}

export default Button
