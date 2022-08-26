import styled from 'styled-components'
import { Card } from '@pancakeswap/uikit'

export const BodyWrapper = styled(Card)`
  border-radius: 24px;
  width: 100%;
  z-index: 1;
  min-width: 352px;
  max-width: 350px;
  ${({ theme }) => theme.mediaQueries.md} {
    max-width: 436px;
  }
`

/**
 * The styled container element that wraps the content of most pages and the tabs.
 */
export default function AppBody({ children }: { children: React.ReactNode }) {
  return <BodyWrapper>{children}</BodyWrapper>
}
