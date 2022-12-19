import {createContext, useState, useEffect} from 'react'

const FeedbackContext = createContext()

export const FeedbackProvider = ({children}) => {
  const [isLoading, setIsLoading] = useState(true)
  const [feedback, setFeedback] = useState([])

  // piece of state that holds the object that has the item and the edit
  // provide to our form component
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false,
  })

  useEffect(() => {
    fetchFeedback()
  }, [])

  // fetch feedback
  const fetchFeedback = async () => {
    const response = await fetch(`/feedback?_sort=id$_order=desc`)
    const data = await response.json()
    setFeedback(data)
    setIsLoading(false)
  }

  // add feedback
  const addFeedback = async (newFeedback) => {
    const response = await fetch('/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newFeedback),
    })

    const data = await response.json()

    // since state is immutable, we can't just push onto it, we need to make a copy of it
    setFeedback([data, ...feedback])
  }

  // delete feedback
  const deleteFeedback = async (id) => {
    if (window.confirm('Are you sure you want to delete?')) {
      await fetch(`/feedback/${id}`, {method: 'DELETE'})

      // this feedback filter is gonna return an array minus the one we're deleting
      // then set the modified array in the feedback
      setFeedback(feedback.filter((item) => item.id !== id))
    }
  }

  // update feedback item, needs to be accessed from the form
  const updateFeedback = async (id, updItem) => {
    const response = await fetch(`/feedback/${id}`, {
      // set headers because its a json data
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updItem),
    })
    const data = await response.json()

    setFeedback(
      // for each feedback we're calling item,
      // and for each one we want to run a condition:
      // if item.id = id of passed in element that we want to update, spread accross the current item here and then the updated item
      // else it doesn't match the id so we just want to return the current item
      feedback.map((item) => (item.id === id ? {...item, ...data} : item))
    )
  }

  // set item to be updated
  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true,
    })
  }

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        feedbackEdit,
        isLoading,
        addFeedback,
        deleteFeedback,
        editFeedback,
        updateFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  )
}

export default FeedbackContext
