import React from 'react'
import Portfolio from './Portfolio'
import { Toaster } from 'sonner'

const App = () => {
  return (
    <div className="">
      <Portfolio />
      <Toaster 
        position="top-center"
        richColors
        closeButton
        expand={true}
      />
    </div>
  )
}

export default App