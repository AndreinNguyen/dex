import { BigNumber as BigNumberEther } from '@ethersproject/bignumber'
import { formatEther, parseEther } from '@ethersproject/units'
import { Button, CardBody, Flex, useModal } from '@pancakeswap/uikit'
import { Sync } from '@styled-icons/material/Sync'
import { AppBody } from 'components/App'
import { HeaderBridge } from 'components/Bridge'
import { ChainId, networkSupportBridge } from 'components/Bridge/bridgeConfig'
import PendingApproveModal from 'components/Bridge/PendingApproveModal'
import ReceivingAddressInput from 'components/Bridge/ReceivingAddressInput'
import SelectTokenInput from 'components/Bridge/SelectTokenInput'
import TotalAmountBridge from 'components/Bridge/TotalAmountBridge'
import ConnectWalletButton from 'components/ConnectWalletButton'
import Divider from 'components/Divider'
import Page from 'components/Layout/Page'
import { SVC_FOR_BRIDGE } from 'config/constants/tokens'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useBridgeContract, useBridgePolygonContract, useTokenContract } from 'hooks/useContract'
import { useSwitchNetwork } from 'hooks/useSwitchNetwork'
import { useGetCakeBalance } from 'hooks/useTokenBalance'
import { useCallback, useEffect, useState } from 'react'
import { getBridgeAddress, getSVCPolygonAddress } from 'utils/addressHelpers'

export enum ApproveModalStatus {
  PENDING = 1,
  REJECT,
  CONFIRMED,
  APPROVE_COMPLETED,
  SWAP_COMPLETED,
}

const Bridge = () => {
  const { account, chainId } = useActiveWeb3React()
  const [fromToken, setFromToken] = useState(networkSupportBridge[chainId])
  const [toToken, setToToken] = useState()
  const [receivingAddress, setReceivingAddress] = useState('')
  const [totalAmount, setTotalAmount] = useState('')
  const [totalAmountFormatted, setTotalAmountFormatted] = useState<BigNumberEther>()
  const [allowanceAmount, setAllowanceAmount] = useState('0')

  const bridgeAddress = getBridgeAddress()
  const bridgeContract = useBridgeContract(bridgeAddress)
  const bridgePolygonContract = useBridgePolygonContract(getSVCPolygonAddress())
  const svcContract = useTokenContract(SVC_FOR_BRIDGE[chainId].address)
  const { balance: maxBalanceToken } = useGetCakeBalance()
  const [transactionInfo, setTransactionInfo] = useState()
  const [approveModalStatus, setApproveModalStatus] = useState<ApproveModalStatus>(ApproveModalStatus.PENDING)
  const { switchNetwork } = useSwitchNetwork()

  const reverseNetwork = () => {
    if (fromToken || toToken) {
      const from = fromToken
      const to = toToken
      setFromToken(to)
      setToToken(from)
    }
  }

  const [onPressApproveModal] = useModal(
    <PendingApproveModal approveStatus={approveModalStatus} transactionInfo={transactionInfo} />,
    true,
    true,
    'approveBridgeModal',
  )

  useEffect(() => {
    if (fromToken && fromToken.chainId !== chainId) {
      switchNetwork(fromToken.chainId)
    }
  }, [chainId, fromToken, switchNetwork])

  useEffect(() => {
    if (totalAmount) {
      setTotalAmountFormatted(parseEther(totalAmount.toString()))
    }
  }, [totalAmount])

  useEffect(() => {
    setFromToken(networkSupportBridge[chainId])
  }, [chainId])

  const checkAllowance = useCallback(async () => {
    if (svcContract) {
      const allowance = await svcContract.allowance(account, bridgeAddress)
      const amount = formatEther(allowance)
      setAllowanceAmount(amount)
      return amount
    }
    return 0
  }, [account, bridgeAddress, svcContract])

  useEffect(() => {
    if (account) {
      checkAllowance()
    }
  }, [account, checkAllowance])

  const onLockToken = async () => {
    if (receivingAddress) {
      try {
        let response
        if (chainId === ChainId.MUMBAI) {
          response = await bridgePolygonContract.depositPolygon(receivingAddress, totalAmountFormatted)
        }
        if (chainId === ChainId.TESTNET) {
          response = await bridgeContract.lock(receivingAddress, totalAmountFormatted)
        }
        setTransactionInfo(response)
        setApproveModalStatus(ApproveModalStatus.SWAP_COMPLETED)
      } catch (error) {
        if (error?.code === 4001) {
          setApproveModalStatus(ApproveModalStatus.REJECT)
        }
        console.error(error)
      }
    }
  }

  const handleSwap = async () => {
    if (Number(allowanceAmount) < Number(formatEther(totalAmountFormatted))) {
      setApproveModalStatus(ApproveModalStatus.PENDING)
      onPressApproveModal()
      try {
        const confirm = await svcContract.approve(bridgeAddress, maxBalanceToken)
        setApproveModalStatus(ApproveModalStatus.CONFIRMED)
        await confirm.wait()
        setApproveModalStatus(ApproveModalStatus.CONFIRMED)
        onLockToken()
      } catch (error) {
        console.error(error)
        if (error?.code === 4001) {
          setApproveModalStatus(ApproveModalStatus.REJECT)
        }
      }
    } else {
      // open confirm swap modal
      setApproveModalStatus(ApproveModalStatus.APPROVE_COMPLETED)
      onPressApproveModal()
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
        {Number(allowanceAmount) < Number(totalAmount) ? 'Approve' : 'Swap'}
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
            <SelectTokenInput label="From" data={fromToken} disableSelect setDataToken={setFromToken} />
            <Flex justifyContent="center" paddingTop="18px">
              <Sync color="#fff" onClick={reverseNetwork} size={24} cursor="pointer" />
            </Flex>
            <SelectTokenInput label="To" data={toToken} setDataToken={setToToken} />

            <Flex mt="12px" flexDirection="column">
              <ReceivingAddressInput value={receivingAddress} onChange={setReceivingAddress} />
            </Flex>

            <Flex mt="12px">
              <TotalAmountBridge value={totalAmount} setTotalAmount={setTotalAmount} maxBalance={maxBalanceToken} />
            </Flex>

            <Flex mt="30px">{generateButton()}</Flex>
          </CardBody>
        </AppBody>
      </Flex>
    </Page>
  )
}

export default Bridge
