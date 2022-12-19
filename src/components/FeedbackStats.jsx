import {useContext} from 'react'
import FeedbackContext from '../context/FeedbackContext'
function FeedbackStats() {
  const {feedback} = useContext(FeedbackContext)
  // calculate ratings average
  // use reduce bcz we wanna loop through all the ratings, and add all the ratings together
  let average =
    feedback.reduce((acc, cur) => {
      return acc + cur.rating
    }, 0) / feedback.length

  // limit the decimal number to 1 digit
  //   replace: remove any trailing zeros
  average = average.toFixed(1).replace(/[.,]0$/, '')

  return (
    <div className='feedback-stats'>
      <h4>{feedback.length} Reviews</h4>
      <h4>Average Rating: {isNaN(average) ? 0 : average}</h4>
    </div>
  )
}

export default FeedbackStats
