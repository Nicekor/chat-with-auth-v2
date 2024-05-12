'use client'
import { Spinner, Switch } from '@nextui-org/react'
import { RiMoonLine, RiSunLine } from '@remixicon/react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { ClientOnly } from './ClientOnly'

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()

  const onThemeChange = (selected: boolean) => {
    setTheme(selected ? 'dark' : 'light')
  }

  return (
    <ClientOnly fallback={<Spinner />}>
      <Switch
        isSelected={theme === 'dark'}
        onValueChange={onThemeChange}
        startContent={<RiSunLine />}
        endContent={<RiMoonLine />}
      />
    </ClientOnly>
  )
}
