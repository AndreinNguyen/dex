import { Button, CardBody, Flex, useModal } from '@pancakeswap/uikit'
import { Sync } from '@styled-icons/material/Sync'
import { AppBody } from 'components/App'
import { HeaderBridge } from 'components/Bridge'
import ListTokenModal from 'components/Bridge/ListTokenModal'
import SelectTokenInput from 'components/Bridge/SelectTokenInput'
import TotalAmountBridge from 'components/Bridge/TotalAmountBridge'
import Divider from 'components/Divider'
import Page from 'components/Layout/Page'
import { useTranslation } from 'contexts/Localization'
import { useState } from 'react'

type Props = {
  data?: any
}

const Bridge = (props: Props) => {
  const [fromToken, setFromToken] = useState({})
  const [toToken, setToToken] = useState({})

  const { t } = useTranslation()
  const [onOpenListTokenModal] = useModal(<ListTokenModal />)

  const onInputAmount = () => {
    console.log('ere :>> ')
  }

  return (
    <Page>
      <Flex width="100%" justifyContent="center" position="relative">
        <AppBody>
          <HeaderBridge />
          <Divider />

          <CardBody>
            <SelectTokenInput
              label="From"
              data={fromToken}
              setDataToken={setFromToken}
              openModal={onOpenListTokenModal}
            />
            <Flex justifyContent="center" paddingTop="18px">
              <Sync color="#fff" size={24} cursor="pointer" />
            </Flex>
            <SelectTokenInput label="To" data={toToken} setDataToken={setToToken} openModal={onOpenListTokenModal} />

            <Flex mt="12px">
              <TotalAmountBridge />
            </Flex>

            <Flex mt="30px">
              <Button width="100%">Swap</Button>
            </Flex>
          </CardBody>
        </AppBody>
      </Flex>
    </Page>
  )
}

export default Bridge
