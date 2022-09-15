import { Button, CardBody, Flex, useModal } from '@pancakeswap/uikit'
import { Sync } from '@styled-icons/material/Sync'
import BigNumber from 'bignumber.js'
import { BigNumber as BigNumberEther } from '@ethersproject/bignumber'
import { AppBody } from 'components/App'
import { HeaderBridge } from 'components/Bridge'
import ReceivingAddressInput from 'components/Bridge/ReceivingAddressInput'
import SelectTokenInput from 'components/Bridge/SelectTokenInput'
import TotalAmountBridge from 'components/Bridge/TotalAmountBridge'
import Divider from 'components/Divider'
import Page from 'components/Layout/Page'
import { useTranslation } from 'contexts/Localization'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useEffect, useState } from 'react'
import { getProviderOrSigner } from 'utils'
import { getBridgeAddress } from 'utils/addressHelpers'
import { getBridgeContract, getSVCContract } from 'utils/contractHelpers'
import { formatEther, parseEther } from '@ethersproject/units'
import { useApproveCallback } from 'hooks/useApproveCallback'
import { CurrencyAmount } from '@savvydex/sdk'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { toNumber } from 'lodash'
import ApproveTokenModal from 'components/Bridge/ApproveTokenModal'

type Props = {
  data?: any
}

const Bridge = (props: Props) => {
  const [fromToken, setFromToken] = useState(null)
  const [toToken, setToToken] = useState(null)
  const [receivingAddress, setReceivingAddress] = useState('')
  const [totalAmount, setTotalAmount] = useState('')
  const [totalAmountFormatted, setTotalAmountFormatted] = useState<BigNumberEther>()

  const reverseNetwork = () => {
    if (fromToken || toToken) {
      const from = fromToken
      const to = toToken
      setFromToken(to)
      setToToken(from)
    }
  }

  useEffect(() => {
    if (totalAmount) {
      setTotalAmountFormatted(parseEther(totalAmount.toString()))
    }
  }, [totalAmount])

  const { account, library } = useActiveWeb3React()
  const bridgeContract = getBridgeContract(getProviderOrSigner(library, account))
  const svcContract = getSVCContract(getProviderOrSigner(library, account))
  const bridgeAddress = getBridgeAddress()

  const checkAllowance = async () => {
    const allowance = await svcContract.allowance(account, bridgeAddress)
    const amount = formatEther(allowance)
    return amount
  }

  const approveToken = async (amount) => {
    if (!totalAmount) return
    svcContract.approve(bridgeAddress, amount)
  }

  const [openApproveTokenModal] = useModal(<ApproveTokenModal data={null} />)

  const onLockToken = async () => {
    if (receivingAddress) {
      try {
        const res = await bridgeContract.lock(receivingAddress, totalAmountFormatted)
      } catch (error) {
        console.log('error', error)
      }
    }
    if (receivingAddress) {
      try {
        const res = await bridgeContract.lock(receivingAddress, totalAmountFormatted)
      } catch (error) {
        console.log('error', error)
      }
    }
  }

  const handleSwap = async () => {
    const allowanceAmount = await checkAllowance()

    console.log('allowanceAmount :>> ', allowanceAmount)

    if (toNumber(allowanceAmount) < toNumber(formatEther(totalAmountFormatted))) {
      // openApproveTokenModal()
      const amountToApprove = toNumber(formatEther(totalAmountFormatted)) - toNumber(allowanceAmount)
      const res = await svcContract.approve(bridgeAddress, amountToApprove.toString())
      onLockToken()
      return
    }

    onLockToken()
  }

  const generateButton = () => {
    if (!account) {
      return <ConnectWalletButton width="100%" />
    }

    if (!fromToken || !toToken) {
      return (
        <Button width="100%" disabled>
          Select Network
        </Button>
      )
    }

    if (!receivingAddress) {
      return (
        <Button width="100%" disabled>
          Enter Receive Address
        </Button>
      )
    }

    if (!totalAmount) {
      return (
        <Button width="100%" disabled>
          Enter Amount
        </Button>
      )
    }

    return (
      <Button width="100%" onClick={handleSwap}>
        Swap
      </Button>
    )
  }

  return (
    <Page>
      <Flex width="100%" justifyContent="center" position="relative">
        <AppBody>
          <HeaderBridge />
          <Divider />

          <CardBody>
            <SelectTokenInput label="From" data={fromToken} setDataToken={setFromToken} setData={setFromToken} />
            <Flex justifyContent="center" paddingTop="18px">
              <Sync color="#fff" onClick={reverseNetwork} size={24} cursor="pointer" />
            </Flex>
            <SelectTokenInput label="To" data={toToken} setDataToken={setToToken} setData={setToToken} />

            <Flex mt="12px" flexDirection="column">
              <ReceivingAddressInput value={receivingAddress} onChange={setReceivingAddress} />
            </Flex>

            <Flex mt="12px">
              <TotalAmountBridge value={totalAmount} setTotalAmount={setTotalAmount} />
            </Flex>

            <Flex mt="30px">{generateButton()}</Flex>
          </CardBody>
        </AppBody>
      </Flex>
    </Page>
  )
}

export default Bridge
