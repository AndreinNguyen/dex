import { BigNumber as BigNumberEther } from '@ethersproject/bignumber'
import { formatEther, parseEther } from '@ethersproject/units'
import { Button, CardBody, Flex, useModal } from '@pancakeswap/uikit'
import { Sync } from '@styled-icons/material/Sync'
import { AppBody } from 'components/App'
import { HeaderBridge } from 'components/Bridge'
import ApproveTokenModal from 'components/Bridge/ApproveTokenModal'
import { ChainId, networkSupportBridge } from 'components/Bridge/bridgeConfig'
import ReceivingAddressInput from 'components/Bridge/ReceivingAddressInput'
import SelectTokenInput from 'components/Bridge/SelectTokenInput'
import TotalAmountBridge from 'components/Bridge/TotalAmountBridge'
import ConnectWalletButton from 'components/ConnectWalletButton'
import Divider from 'components/Divider'
import Page from 'components/Layout/Page'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useGetCakeBalance } from 'hooks/useTokenBalance'
import { toNumber } from 'lodash'
import { useEffect, useState } from 'react'
import { getProviderOrSigner } from 'utils'
import { getBridgeAddress } from 'utils/addressHelpers'
import { getBridgeContract, getSVCContract } from 'utils/contractHelpers'

type Props = {
  data?: any
}

const Bridge = (props: Props) => {
  const [fromToken, setFromToken] = useState(networkSupportBridge[ChainId.TESTNET])
  const [toToken, setToToken] = useState(networkSupportBridge[ChainId.MUMBAI])
  const [receivingAddress, setReceivingAddress] = useState('')
  const [totalAmount, setTotalAmount] = useState('')
  const [totalAmountFormatted, setTotalAmountFormatted] = useState<BigNumberEther>()
  const [allowanceAmount, setAllowanceAmount] = useState('0')
  const { account, library } = useActiveWeb3React()
  const bridgeContract = getBridgeContract(getProviderOrSigner(library, account))
  const svcContract = getSVCContract(getProviderOrSigner(library, account))
  const bridgeAddress = getBridgeAddress()
  const { balance: maxBalanceToken } = useGetCakeBalance()

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

  useEffect(() => {
    if (account) {
      checkAllowance()
    }
  }, [account, library])

  const checkAllowance = async () => {
    const allowance = await svcContract.allowance(account, bridgeAddress)
    const amount = formatEther(allowance)
    setAllowanceAmount(amount)
    return amount
  }

  const [openApproveTokenModal] = useModal(<ApproveTokenModal data={null} />)

  const onLockToken = async () => {
    if (receivingAddress) {
      try {
        await bridgeContract.lock(receivingAddress, totalAmountFormatted)
      } catch (error) {
        console.log('error', error)
      }
    }
    if (receivingAddress) {
      try {
        await bridgeContract.lock(receivingAddress, totalAmountFormatted)
      } catch (error) {
        console.log('error', error)
      }
    }
  }

  const handleSwap = async () => {
    if (toNumber(allowanceAmount) < toNumber(formatEther(totalAmountFormatted))) {
      await (await svcContract.approve(bridgeAddress, maxBalanceToken)).wait()
      onLockToken()
    } else {
      onLockToken()
    }
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
        {allowanceAmount < totalAmount ? 'Approve' : 'Swap'}
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
