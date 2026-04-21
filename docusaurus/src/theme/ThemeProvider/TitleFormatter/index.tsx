/// <reference types="../../../types.d.ts" />
import { type ComponentProps, type ReactNode } from 'react'
import type { Props } from '@theme/ThemeProvider/TitleFormatter'
import { TitleFormatterProvider } from '@docusaurus/theme-common/internal'

type FormatterProp = ComponentProps<typeof TitleFormatterProvider>['formatter']

const formatter: FormatterProp = (params) => {
  // Add your own title formatting logic here!
  return params.title === 'Hello from Popyt' ? 'Popyt Home' : params.defaultFormatter(params)
}

export default function ThemeProviderTitleFormatter ({
  children
}: Props): ReactNode {
  return (
    <TitleFormatterProvider formatter={formatter}>
      {children}
    </TitleFormatterProvider>
  )
}
