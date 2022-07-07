import { ModalProvider, light, dark, MatchBreakpointsProvider } from '@pancakeswap/uikit'
import { Web3ReactProvider } from '@web3-react/core'
import { Provider } from 'react-redux'
import { SWRConfig } from 'swr'
import { ThemeProvider } from 'styled-components'
import { getLibrary } from 'utils/web3React'
import { LanguageProvider } from 'contexts/Localization'
import { ToastsProvider } from 'contexts/ToastsContext'
import { fetchStatusMiddleware } from 'hooks/useSWRContract'
import { Store } from '@reduxjs/toolkit'
import { ThemeProvider as NextThemeProvider, useTheme as useNextTheme } from 'next-themes'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'

const StyledThemeProvider = (props) => {
  return <ThemeProvider theme={dark} {...props} />
}

const Providers: React.FC<{ store: Store }> = ({ children, store }) => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <GoogleReCaptchaProvider
        reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
        scriptProps={{
          async: false,
          defer: false,
          appendTo: 'head',
          nonce: undefined,
        }}
      >
        <Provider store={store}>
          <MatchBreakpointsProvider>
            <ToastsProvider>
              <NextThemeProvider>
                <StyledThemeProvider>
                  <LanguageProvider>
                    <SWRConfig
                      value={{
                        use: [fetchStatusMiddleware],
                      }}
                    >
                      <ModalProvider>{children}</ModalProvider>
                    </SWRConfig>
                  </LanguageProvider>
                </StyledThemeProvider>
              </NextThemeProvider>
            </ToastsProvider>
          </MatchBreakpointsProvider>
        </Provider>
      </GoogleReCaptchaProvider>
    </Web3ReactProvider>
  )
}

export default Providers
