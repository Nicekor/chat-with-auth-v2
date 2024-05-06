import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
import { gql } from '@apollo/client'
import { getClient } from './ApolloClient'
import { GetUserNameDocument } from '../../operations/queries.generated'
import { Button } from '@nextui-org/react'

export default async function Home() {
  const session = await getServerSession(authOptions)
  // on sign out throws an error here because the token is not valid anymore
  // a quick hack is to catch the error but we don't wanna catch it everywhere
  // make sure this only happens in this page specifically
  // const { data } = await getClient().query({
  //   query: GetUserNameDocument,
  //   variables: { id: session?.user?.id },
  // })
  // console.log({ data })

  if (!session || !session?.user) {
    redirect('/api/auth/signin')
  }
  return (
    <>
      <div>getServerSession Result {session.user.name}</div>
      <Button>test</Button>
    </>
  )
}
