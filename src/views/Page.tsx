import { Flex } from '@pancakeswap/uikit'
import { PageMeta } from 'components/Layout/Page'
import { EXCHANGE_DOCS_URLS } from 'config/constants'
import styled from 'styled-components'

const StyledPage = styled.div<{ $removePadding: boolean; $noMinHeight }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background: ${({ theme }) => theme.colors.backgroundAlt};
  margin: auto;
  margin-top: 85px;
  padding-top: 20px;
  padding-bottom: 50px;
  min-height: 400px;

  ${({ theme }) => theme.mediaQueries.xs} {
    background-size: auto;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    padding-top: 80px;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    min-height: ${({ $noMinHeight }) => ($noMinHeight ? 'initial' : 'calc(100vh - 100px)')};
    max-width: 1216px;
  }
`

const Page: React.FC<
  React.HTMLAttributes<HTMLDivElement> & {
    removePadding?: boolean
    hideFooterOnDesktop?: boolean
    noMinHeight?: boolean
    helpUrl?: string
  }
> = ({
  children,
  removePadding = false,
  hideFooterOnDesktop = false,
  noMinHeight = false,
  helpUrl = EXCHANGE_DOCS_URLS,
  ...props
}) => {
  return (
    <>
      <PageMeta />
      <StyledPage $removePadding={removePadding} $noMinHeight={noMinHeight} {...props}>
        {children}
        <Flex flexGrow={1} />
      </StyledPage>
    </>
  )
}

export default Page
