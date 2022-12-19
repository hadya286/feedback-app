import {useState, useContext, useEffect} from 'react'
import Card from './shared/Card'
import Button from './shared/Button'
import RatingSelect from './RatingSelect'
import FeedbackContext from '../context/FeedbackContext'

function FeedbackForm() {
  const {addFeedback, feedbackEdit, updateFeedback} =
    useContext(FeedbackContext)

  // whenever feedback changes (it changes whenever we click on edit), we want this form to get the text and the rating from the current feedback => an effect => useEffect hook
  // upon clicking the edit button, we need to make changes to the text, rating, and btnDisabled
  useEffect(() => {
    if (feedbackEdit.edit === true) {
      setBtnDisabled(false)
      setText(feedbackEdit.item.text)
      setRating(feedbackEdit.item.rating)
    }
  }, [feedbackEdit])

  // set a piece of state for the text input
  const [text, setText] = useState('')
  // need to connect the input to this piece of state, whatever i type in the placeholder needs to be put in the state ==> add an onChange event in the input

  const [rating, setRating] = useState(10)

  const [btnDisabled, setBtnDisabled] = useState(true)
  const [message, setMessage] = useState('')

  const handleTextChange = (e) => {
    // check if text is empty
    // message shows only if i'm typing and if it's less than 10 characters
    if (text === '') {
      setBtnDisabled(true)
      setMessage(null)
    }

    // check if there's something in the text and if there's 10 or less characters
    else if (text !== '' && text.trim().length <= 10) {
      setMessage('Text must be at least 10 characters')
      setBtnDisabled(true)

      // there's at least 10 characters and there's something typed in
    } else {
      setMessage(null)
      setBtnDisabled(false)
    }
    setText(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (text.trim().length > 10) {
      const newFeedback = {
        text,
        rating,
      }

      if (feedbackEdit.edit === true) {
        updateFeedback(feedbackEdit.item.id, newFeedback)
      } else {
        addFeedback(newFeedback)
      }

      setText('')
    }
  }

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        {/* when you have a form you need to have a piece of state for each input in that form */}
        <h2>How would you rate your service with us?</h2>
        <RatingSelect select={(rating) => setRating(rating)} />
        <div className='input-group'>
          <input
            onChange={handleTextChange}
            type='text'
            placeholder='Write a review'
            value={text}
          />
          <Button type='submit' isDisabled={btnDisabled}>
            Send
          </Button>
        </div>

        {message && <div className='message'>{message}</div>}
      </form>
    </Card>
  )
}

export default FeedbackForm
