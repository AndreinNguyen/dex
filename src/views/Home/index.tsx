import { BottomDrawer, Button, Flex, useMatchBreakpointsContext } from '@pancakeswap/uikit'
import { useWeb3React } from '@web3-react/core'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { PageMeta } from 'components/Layout/Page'
import PageSection from 'components/PageSection'
import ConvertIcon from 'components/Svg/ConvertIcon'
import GridLock from 'components/Svg/GridLock'
import TransparentIcon from 'components/Svg/TransparentIcon'
import { useTranslation } from 'contexts/Localization'
import { useCurrency } from 'hooks/Tokens'
import useTheme from 'hooks/useTheme'
import { useState } from 'react'
import { Field } from 'state/swap/actions'
import { useDerivedSwapInfo, useSingleTokenSwapInfo, useSwapState } from 'state/swap/hooks'
import PriceChartContainer from 'views/Swap/components/Chart/PriceChartContainer'
import FeatureBox from './components/FeatureSection/FeatureBox'
import { BannerBox, ChartInfo, ChartWrapper, FeatureBoxWrapper } from './style'
import { useDefaultsFromURLSearch } from '../../state/swap/hooks'

const Home: React.FC = () => {
  const { theme } = useTheme()
  const { account } = useWeb3React()
  useDefaultsFromURLSearch()

  const HomeSectionContainerStyles = {
    margin: '0',
    width: '100%',
    maxWidth: theme.mediaQueries.lg ? '1216px' : '968px',
    minHeight: '60vh',
    color: '#ffff',
    padding: theme.mediaQueries.lg ? '0 20px' : '0',
  }

  const { t } = useTranslation()
  const featureBoxData = [
    {
      title: 'Transparent',
      description: 'The data is embedded in the network as a block, public.',
      icon: <TransparentIcon />,
      color: '#F6B24F',
    },
    {
      title: 'Convenient',
      description: 'Convert and withdraw cryptocurrencies to your wallet quickly.',
      icon: <ConvertIcon />,
      color: '#00CB65',
    },
    {
      title: 'Security',
      description: 'Distributed and decentralized, data on Savvycoin is highly secure.',
      icon: <GridLock />,
      color: '#ED4B9E',
    },
  ]

  const { isMobile, isTablet, isDesktop } = useMatchBreakpointsContext()
  const [isChartExpanded, setIsChartExpanded] = useState(false)
  const [isChartDisplayed, setIsChartDisplayed] = useState<boolean>(isDesktop || isTablet)

  // swap state & price data
  const {
    independentField,
    typedValue,
    recipient,
    [Field.INPUT]: { currencyId: inputCurrencyId },
    [Field.OUTPUT]: { currencyId: outputCurrencyId },
  } = useSwapState()

  const inputCurrency = useCurrency(inputCurrencyId)
  const outputCurrency = useCurrency(outputCurrencyId)

  const { currencies } = useDerivedSwapInfo(independentField, typedValue, inputCurrency, outputCurrency, recipient)
  const singleTokenPrice = useSingleTokenSwapInfo(inputCurrencyId, inputCurrency, outputCurrencyId, outputCurrency)

  return (
    <>
      <PageMeta />
      <PageSection
        innerProps={{ style: HomeSectionContainerStyles }}
        background="#08121C"
        index={2}
        hasCurvedDivider={false}
        minHeight="90vh"
      >
        <BannerBox>
          <div className="about-box">
            <h1 className="hero-title">Win up to 150% per year with SVC</h1>

            <p className="desc">
              Savvycoin is a crypto token in multiple chains for SAVVY community providing flexible, fast and low
              transaction fees for payments, rewards, and investments.
            </p>

            {!account && <ConnectWalletButton mt="24px" scale="md" maxWidth="176px" />}
          </div>
          {isDesktop && <img src="/images/home/chainBanner.png" alt="chain" className="chainBanner" />}
        </BannerBox>

        <FeatureBoxWrapper justifyContent="space-between">
          {featureBoxData.map((feature, index) => (
            <FeatureBox
              key={`${feature.title}-${feature.color}`}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              color={feature.color}
            />
          ))}
        </FeatureBoxWrapper>

        <ChartWrapper alignItems="center" justifyContent="space-between">
          <ChartInfo>
            <h1 className="title">Real-time chart</h1>
            <p className="description">Review live SVC/USDT today as we update the price in real-time.</p>
          </ChartInfo>

          {isMobile && (
            <Flex>
              <Button onClick={() => setIsChartDisplayed(true)}>Open Chart</Button>
            </Flex>
          )}

          <>
            {!isMobile && (
              <PriceChartContainer
                inputCurrencyId={inputCurrencyId}
                inputCurrency={currencies[Field.INPUT]}
                outputCurrencyId={outputCurrencyId}
                outputCurrency={currencies[Field.OUTPUT]}
                isChartExpanded={isChartExpanded}
                setIsChartExpanded={setIsChartExpanded}
                isChartDisplayed={isChartDisplayed}
                currentSwapPrice={singleTokenPrice}
              />
            )}
            <BottomDrawer
              content={
                <PriceChartContainer
                  inputCurrencyId={inputCurrencyId}
                  inputCurrency={currencies[Field.INPUT]}
                  outputCurrencyId={outputCurrencyId}
                  outputCurrency={currencies[Field.OUTPUT]}
                  isChartExpanded={isChartExpanded}
                  setIsChartExpanded={setIsChartExpanded}
                  isChartDisplayed={isChartDisplayed}
                  currentSwapPrice={singleTokenPrice}
                  isMobile
                />
              }
              isOpen={isChartDisplayed}
              setIsOpen={setIsChartDisplayed}
            />
          </>
        </ChartWrapper>
      </PageSection>
    </>
  )
}

export default Home
