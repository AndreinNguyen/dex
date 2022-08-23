import axios from 'axios'
import camelcaseKeys from 'camelcase-keys'
import { SAVVYDEX_API } from 'config/constants/endpoints'
import { ResPartner } from 'state/types'

const fetchUserPresaleInfo = async (account: string): Promise<ResPartner> => {
  if (!account) throw new Error()

  const response = await axios.get(`${SAVVYDEX_API}/partners`, {
    params: {
      wallet_address: account,
    },
  })

  return camelcaseKeys(response.data.data.data[0], { deep: true })
}

export default fetchUserPresaleInfo
