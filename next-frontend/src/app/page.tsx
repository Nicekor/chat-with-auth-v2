import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'

export default async function Home() {
  const session = await getServerSession(authOptions)

  return (
    <>
      getServerSession Result{' '}
      {session?.user?.name ? (
        <div>{session.user.name}</div>
      ) : (
        <div>Not logged in</div>
      )}
    </>
  )
}
