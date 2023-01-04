import { GoerliVaultFactory } from './GoerliVaultFactory'
import { ethers } from 'ethers'
import stakePINTArtifacts from './StakePINT.json'
import fakePINTArtifacts from './FakePINT.json'

// -----------------------------------------------------------------------------
// CONSTANTS
// -----------------------------------------------------------------------------

const STAKEPINT_CONTRACT_ADDRESS = '0x9069E0447770E8F18cc97636269e8494CF108d19'
const STAKEPINT_ABI = stakePINTArtifacts.abi
const FAKEPINT_ADDRESS = '0x097E9EeFc58c9648bAc09050b8E12c7F1F522879'
const FAKEPINT_ABI = fakePINTArtifacts.abi

// -----------------------------------------------------------------------------
// UTILS
// -----------------------------------------------------------------------------

const convertPINTForDisplay = x => (Number(x / (10n ** 16n)) / 100).toLocaleString()
const convertDisplayValueToPINTForContract = x => BigInt(x) * 10n ** 18n

// -----------------------------------------------------------------------------
// DATA BACKEND
// -----------------------------------------------------------------------------

const getAmountStaked = async () => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const stakePINTContract = new ethers.Contract(STAKEPINT_CONTRACT_ADDRESS, STAKEPINT_ABI, provider)

    const stakedPINT = await stakePINTContract.getAmountStaked(window.ethereum.selectedAddress)

    return convertPINTForDisplay(stakedPINT.toBigInt())
  } catch (err) {
    console.error(err)
    alert('Sorry there was a problem retrieving the amount of your staked PINT')

    return '0'
  }
}

const getUnclaimedRewards = async () => {
  return '1'
  // try {
  //   return '1'
  // } catch (err) {
  //   console.error(err)
  //   alert('Sorry there was a problem retrieving the amount of your rewards')

  //   return '0'
  // }
}

const stakePINT = async (amount) => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const stakePINTContract = new ethers.Contract(STAKEPINT_CONTRACT_ADDRESS, STAKEPINT_ABI, signer)
    const fakePINTContract = new ethers.Contract(FAKEPINT_ADDRESS, FAKEPINT_ABI, signer)

    alert('first we must approve the transfer')
    await (await fakePINTContract.approve(STAKEPINT_CONTRACT_ADDRESS, convertDisplayValueToPINTForContract(amount))).wait()

    alert('now we can have the staking contract transfer the funds to be staked')
    await stakePINTContract.stake(convertDisplayValueToPINTForContract(amount))
  } catch (err) {
    console.error(err)
    alert('Sorry there was a problem with staking your PINT, please reach out to support to help address your issue.')
  }
}

const unstakePINT = async () => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const stakePINTContract = new ethers.Contract(STAKEPINT_CONTRACT_ADDRESS, STAKEPINT_ABI, signer)

    const stakedPINT = await stakePINTContract.getAmountStaked(window.ethereum.selectedAddress)
    await stakePINTContract.unstake(stakedPINT)
  } catch (err) {
    console.error(err)
    alert('Sorry there was a problem with unstaking your PINT, please reach out to support to help address your issue.')
  }
}

const claimRewards = async () => {
  alert('At this time, please reach out to a PINT admin to claim your rewards via Telegram/Discord... the development team is working on automating this process, but it requires work and an audit by a reputable security firm.')
}

const mintPINT = async () => {
  try {
    const ONE_PINT = 1000000000000000000n

    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const fakePINTContract = new ethers.Contract(FAKEPINT_ADDRESS, FAKEPINT_ABI, signer)

    await fakePINTContract.mint(1000n * ONE_PINT)
  } catch (err) {
    console.error(err)
    alert('Sorry there was a problem with minting some PINT for you')
  }
}

const getPINTBalance = async () => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const fakePINTContract = new ethers.Contract(FAKEPINT_ADDRESS, FAKEPINT_ABI, provider)
    const balance = await fakePINTContract.balanceOf(window.ethereum.selectedAddress)
    console.log({ balance: balance.toString() })
    return convertPINTForDisplay(balance.toBigInt())
  } catch (err) {
    console.error(err)
    alert('Sorry there was a problem getting your PINT balance')
    return '0'
  }
}

const backend = {
  getAmountStaked,
  getUnclaimedRewards,
  stakePINT,
  unstakePINT,
  claimRewards,
  mintPINT,
  getPINTBalance,
}

// -----------------------------------------------------------------------------
// EXPORT
// -----------------------------------------------------------------------------

export const GoerliVault = () => {
  return (
    <GoerliVaultFactory backend={backend} />
  )
}

