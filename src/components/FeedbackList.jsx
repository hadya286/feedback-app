import {motion, AnimatePresence} from 'framer-motion'
import {useContext} from 'react'

import FeedbackItem from './FeedbackItem'
import Spinner from './shared/Spinner'
import FeedbackContext from '../context/FeedbackContext'

function FeedbackList() {
  //  extract whatever we want from our context
  const {feedback, isLoading} = useContext(FeedbackContext)

  if (!isLoading && (!feedback || feedback.length === 0)) {
    return <p>No Feedback Yet</p>
  }

  return isLoading ? (
    <Spinner />
  ) : (
    <div className='feedback-list'>
      <AnimatePresence>
        {/* feedbackItem takes prop: item, item maps through each dataItem at a time in the feedbackData
        ==> we are putting each dataItem in a FeedbackItem */}
        {feedback.map((item) => (
          <motion.div
            key={item.id}
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
          >
            <FeedbackItem key={item.id} item={item} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )

  // version without animation
  // return (
  //   <div className='feedback-list'>
  //     {/* feedbackItem takes prop: item, item maps through each dataItem at a time in the feedbackData
  //       ==> we are putting each dataItem in a FeedbackItem */}
  //     {feedback.map((item) => (
  //       <FeedbackItem key={item.id} item={item} handleDelete={handleDelete} />
  //     ))}
  //   </div>
  // )
}

export default FeedbackList
