import useActiveWeb3React from 'hooks/useActiveWeb3React'
import fetchUserPresaleInfo from 'state/presale/fetchUserPresaleInfo'
import useSWR from 'swr'

const useFetchUserPresaleInfo = () => {
  const { account } = useActiveWeb3React()
  const { data: userPresaleInfo } = useSWR(['FetchUserPresaleInfo'], async () => fetchUserPresaleInfo())
  console.log({ userPresaleInfo })
}

export default useFetchUserPresaleInfo
