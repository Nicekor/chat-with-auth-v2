'use client'
import { useApolloClient } from '@apollo/client'
import { signIn, signOut, useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { GetUserNameDocument } from '../../../operations/queries.generated'

function AuthBtn() {
  const { data: session } = useSession()
  const apolloClient = useApolloClient()

  useEffect(() => {
    apolloClient
      .query({
        query: GetUserNameDocument,
        variables: { id: session?.user?.id },
      })
      .then((res) => console.log('from client', res.data))
  }, [apolloClient, session?.user?.id])

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
