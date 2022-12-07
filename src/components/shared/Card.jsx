import PropTypes from 'prop-types'

// styled component
// pass in as a prop the 'card children': num-display & text-display
// pass in a prop (reverse) to this component that would reverse our style color
// 2 ways to reverse: conditional class and conditional style

function Card({children, reverse}) {
  return (
    <div
      className='card'
      style={{
        backgroundColor: reverse ? 'rgba(0,0,0,0.4)' : '#fff',
        color: reverse ? '#fff' : '#000',
      }}
    >
      {children}
    </div>
  )
}

Card.defaultProps = {
  reverse: false,
}

Card.propTypes = {
  children: PropTypes.node.isRequired,
  reverse: PropTypes.bool,
}

export default Card
