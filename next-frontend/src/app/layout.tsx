import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'
import SessionProvider from './components/SessionProvider'
import NavMenu from './components/NavMenu'
import { ApolloWrapper } from './ApolloWrapper'
import { cookies } from 'next/headers'
import { NextUIProvider } from '@nextui-org/react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await getServerSession(authOptions)
  const token = cookies().get('next-auth.session-token')?.value

  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <ApolloWrapper token={token}>
            <NextUIProvider>
              <NextThemesProvider attribute="class" enableSystem>
                <Toaster
                  toastOptions={{
                    className: '!text-default-foreground !bg-default',
                    success: {
                      className: '!text-success-foreground !bg-success',
                    },
                    error: {
                      className: '!text-danger-foreground !bg-danger',
                    },
                  }}
                />
                <main>
                  <NavMenu />
                  {children}
                </main>
              </NextThemesProvider>
            </NextUIProvider>
          </ApolloWrapper>
        </SessionProvider>
      </body>
    </html>
  )
}
