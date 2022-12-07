import PropTypes from 'prop-types'
import FeedbackItem from './FeedbackItem'
function FeedbackList({feedback}) {
  if (!feedback || feedback.length === 0) {
    return <p>No Feedback Yet</p>
  }

  return (
    <div className='feedback-list'>
      {/* feedbackItem takes prop: item, item maps through each dataItem at a time in the feedbackData 
        ==> we are putting each dataItem in a FeedbackItem */}
      {feedback.map((item) => (
        <FeedbackItem key={item.id} item={item} />
      ))}
    </div>
  )
}

FeedbackList.propTypes = {
  feedback: PropTypes.array,
}

export default FeedbackList
