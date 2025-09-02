import React from 'react'

// React.ReactNode - next + typescript type that represent anything react render in JSX.
const AuthLayout = ({ children }: {children: React.ReactNode}) => {
  return (
    <div className='flex items-center justify-center h-full'>
      {children}
    </div>
  )
}

export default AuthLayout
