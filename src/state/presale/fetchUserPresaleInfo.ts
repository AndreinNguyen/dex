import axios from 'axios'
import camelcaseKeys from 'camelcase-keys'
import { ApiEndpoints } from 'config/constants/endpoints'
import { ResPartner } from 'state/types'
import { ChainId } from '@savvydex/sdk'

const fetchUserPresaleInfo = async (account: string, chainId: ChainId): Promise<ResPartner> => {
  if (!account) throw new Error()

  const response = await axios.get(`${ApiEndpoints[chainId]}/partners`, {
    params: {
      wallet_address: account,
    },
  })

  return camelcaseKeys(response.data.data.data[0], { deep: true })
}

export default fetchUserPresaleInfo
