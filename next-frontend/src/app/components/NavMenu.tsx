'use client'
import { signIn, signOut, useSession } from 'next-auth/react'

function AuthBtn() {
  const { data: session } = useSession()

  if (!session) {
    return (
      <>
        <p>Not signed in</p>
        <button onClick={() => signIn()}>Sign in</button>
      </>
    )
  }
  return (
    <>
      <p>{session.user?.name}</p>
      <button onClick={() => signOut()}>Sign out</button>
    </>
  )
}

export default function NavMenu() {
  return (
    <div>
      <AuthBtn />
    </div>
  )
}
