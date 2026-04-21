/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { type ReactNode } from 'react'
import { clsx } from 'clsx'
import Title from '@theme/CodeBlock/Title'
import type { Props } from '@theme/CodeBlock/Layout'
import Buttons from '@theme/CodeBlock/Buttons'
import { useCodeBlockContext } from '@docusaurus/theme-common/internal'
import Content from '../Content'
import Container from '../Container'

import styles from './styles.module.css'

export default function CodeBlockLayout ({ className }: Props): ReactNode {
  const { metadata } = useCodeBlockContext()
  return (
    <Container as="div" className={clsx(className, metadata.className)} style={{ marginBottom: 0 }}>
      {metadata.title && (
        <div className={styles.codeBlockTitle}>
          <Title>{metadata.title}</Title>
        </div>
      )}
      <div className={styles.codeBlockContent}>
        <Content />
        <Buttons />
      </div>
    </Container>
  )
}
