import BigNumber from 'bignumber.js'
import { DEFAULT_GAS_LIMIT, DEFAULT_TOKEN_DECIMAL } from 'config'
import getGasPrice from 'utils/getGasPrice'

const options = {
  gasLimit: DEFAULT_GAS_LIMIT,
}

export const stakeFarm = async (masterChefContract, pid, amount) => {
  const gasPrice = getGasPrice()
  const value = new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString()

  return masterChefContract.deposit(pid, value, { ...options, gasPrice })
}

export const unstakeFarm = async (masterChefContract, pid, amount) => {
  const gasPrice = getGasPrice()
  const value = new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString()

  return masterChefContract.withdraw(pid, value, { ...options, gasPrice })
}

export const harvestFarm = async (masterChefContract, pid) => {
  const gasPrice = getGasPrice()

  return masterChefContract.deposit(pid, '0', { ...options, gasPrice })
}

// Use for harvest in newpools tab < = > farm[0] in farms constant.
export const harvestFarmSvc = async (masterChefContract) => {
  const gasPrice = getGasPrice()

  return masterChefContract.enterStaking('0', { ...options, gasPrice })
}

// Use for stake in newpools tab < = > farm[0] in farms constant.
export const enterStakingFarmSvc = async (masterChefContract, amount) => {
  const gasPrice = getGasPrice()
  const value = new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString()

  return masterChefContract.enterStaking(value, { ...options, gasPrice })
}

// Use for unstake in newpools tab < = > farm[0] in farms constant.
export const leaveStakingFarmSvc = async (masterChefContract, amount) => {
  const gasPrice = getGasPrice()
  const value = new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString()

  return masterChefContract.leaveStaking(value, { ...options, gasPrice })
}
