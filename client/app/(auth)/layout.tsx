import React from 'react'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className="flex min-h-svh flex-col justify-center bg-background">
        <div className="mx-auto w-full max-w-sm px-4">
          {children}
        </div>
      </div>
    </div>
  )
}

export default AuthLayout