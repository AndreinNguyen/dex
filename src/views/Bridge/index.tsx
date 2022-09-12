import { CardBody, Flex, useModal } from '@pancakeswap/uikit'
import { Sync } from '@styled-icons/material/Sync'
import { AppBody } from 'components/App'
import { HeaderBridge } from 'components/Bridge'
import ListTokenModal from 'components/Bridge/ListTokenModal'
import SelectTokenInput from 'components/Bridge/SelectTokenInput'
import TotalAmountBridge from 'components/Bridge/TotalAmountBridge'
import Divider from 'components/Divider'
import Page from 'components/Layout/Page'
import { useTranslation } from 'contexts/Localization'

type Props = {
  data?: any
}

const Bridge = (props: Props) => {
  const { t } = useTranslation()
  const [onOpenListTokenModal] = useModal(<ListTokenModal />)

  const onInputAmount = () => {}
  return (
    <Page>
      <Flex width="100%" justifyContent="center" position="relative">
        <AppBody>
          <HeaderBridge />
          <Divider />

          <CardBody>
            <SelectTokenInput label="From" />
            <Flex justifyContent="center" paddingTop="18px">
              <Sync color="#fff" size={24} cursor="pointer" />
            </Flex>
            <SelectTokenInput label="To" />

            <Flex mt="12px">
              <TotalAmountBridge />
            </Flex>
          </CardBody>
        </AppBody>
      </Flex>
    </Page>
  )
}

export default Bridge
