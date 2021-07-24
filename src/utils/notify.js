const notify = (name) => {
  return {
    reset: {
      type: '',
      message: ''
    },
    success: {
      add: {
        type: 'success',
        message: `${name} successfully added!`
      },
      update: {
        type: 'success',
        message: `${name} successfully updated!`
      },
      remove: {
  
      },
    },
    error: {
      add: {
  
      },
      update: {
        type: 'error',
        message: `Update failed. ${name} is no longer in the phonebook`
      },
      remove: {
  
      }
    }
  }
}
  

export default notify;