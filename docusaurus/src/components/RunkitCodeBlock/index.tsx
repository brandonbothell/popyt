/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { isValidElement, type ReactNode } from 'react'
import useIsBrowser from '@docusaurus/useIsBrowser'
import ElementContent from './Content/Element'
import StringContent from './/Content/String'
import type { Props } from '@theme/CodeBlock'
import Svg from '@site/static/img/runkit_logo.svg'

/**
 * Best attempt to make the children a plain string so it is copyable. If there
 * are react elements, we will not be able to copy the content, and it will
 * return `children` as-is; otherwise, it concatenates the string children
 * together.
 */
function maybeStringifyChildren (children: ReactNode): ReactNode {
  if (React.Children.toArray(children).some((el) => isValidElement(el))) {
    return children
  }
  // The children is now guaranteed to be one/more plain strings
  return Array.isArray(children) ? children.join('') : (children as string)
}

export default function CodeBlock ({
  children: rawChildren,
  runkitUrl,
  ...props
}: Props & { runkitUrl: string }): JSX.Element {
  // The Prism theme on SSR is always the default theme but the site theme can
  // be in a different mode. React hydration doesn't update DOM styles that come
  // from SSR. Hence force a re-render after mounting to apply the current
  // relevant styles.
  const isBrowser = useIsBrowser()
  const children = maybeStringifyChildren(rawChildren)
  const CODEBLOCKCOMP =
    typeof children === 'string' ? StringContent : ElementContent
  return (
    <div>
      <CODEBLOCKCOMP key={String(isBrowser)} {...props}>
        {children as string}
      </CODEBLOCKCOMP>
      <div style={{
        textAlign: 'start',
        marginBottom: '16px'
      }}><text fontSize="2.75"><b><a href={runkitUrl} target='_blank'> Try this on <Svg role="img" style={{
          width: '15',
          height: '15',
          verticalAlign: 'middle',
          marginRight: '1px'
        }} />RunKit</a></b></text></div>
    </div>
  )
}
