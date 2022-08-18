import axios from 'axios'
import camelcaseKeys from 'camelcase-keys'
import { SAVVYDEX_API } from 'config/constants/endpoints'
import { ResPartner } from 'state/types'

const fetchUserPresaleInfo = async (acount: string): Promise<ResPartner> => {
  const response = await axios.get(`${SAVVYDEX_API}/partners`, {
    headers: {
      wallet_address: acount,
    },
  })

  return camelcaseKeys(response.data.data.data[0], { deep: true })
}

export default fetchUserPresaleInfo
