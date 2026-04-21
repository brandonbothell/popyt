/// <reference types="../../types.d.ts" />
import React, { JSX, type ReactNode } from 'react'
import CodeBlock from '@theme-original/CodeBlock'
import type CodeBlockType from '@theme/CodeBlock'
import Svg from '@site/static/img/codesandbox_logo.svg'
import type { WrapperProps } from '@docusaurus/types'

type Props = WrapperProps<typeof CodeBlockType>

export default function CodeSandboxBlock (props: Props & { url?: string }): ReactNode {
  return (
    <div>
      <CodeBlock {...props} />
      <div style={{
        display: props.url ? 'none' : 'block',
        marginBottom: '24px' }} />
      <div style={{
        display: props.url ? 'block' : 'none',
        textAlign: 'start',
        marginBottom: '16px'
      }}><text fontSize="2.75"><b><a href={props.url} target='_blank'> Try this on <CodeSandboxText /></a></b></text></div>
    </div>
  )
}

export function CodeSandboxText (): JSX.Element {
  return (
    <text><Svg role="img" width={15} height={15} style={{
      verticalAlign: '-.1em',
      marginRight: '2px',
      marginLeft: '1px'
    }} />CodeSandbox</text>
  )
}
