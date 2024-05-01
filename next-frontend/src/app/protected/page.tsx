import { getServerSession } from 'next-auth'
import React from 'react'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'

export default async function ProtectedRoute() {
  const session = await getServerSession(authOptions)

  if (!session || !session.user) {
    redirect('/api/auth/signin')
  }
  return (
    <div>
      This is a protected route, you can see it if you are authenticated
    </div>
  )
}
