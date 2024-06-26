import React from 'react'

const Spinner = () => {
  return (
    <div className='fixed inset-0 bg-black opacity-70 z-[9999] flex justify-center items-center'>
        <div className="border-4 h-10 w-10 border-solid border-white border-t-transparent rounded-full animate-spin"></div>
      
    </div>
  )
}

export default Spinner
