import { GoerliVaultFactory } from './GoerliVaultFactory'
import { ethers } from 'ethers'
import stakePINTArtifacts from './StakePINT.json'
import fakePINTArtifacts from './FakePINT.json'

// -----------------------------------------------------------------------------
// CONSTANTS
// -----------------------------------------------------------------------------

const STAKEPINT_CONTRACT_ADDRESS = '0xcdf50e498Cd40cB146d4502B811095FbEfB4052F'
const STAKEPINT_ABI = stakePINTArtifacts.abi
const FAKEPINT_ADDRESS = '0x097E9EeFc58c9648bAc09050b8E12c7F1F522879'
const FAKEPINT_ABI = fakePINTArtifacts.abi

// -----------------------------------------------------------------------------
// UTILS
// -----------------------------------------------------------------------------

const convertPINTForDisplay = x => (Number(x / (10n ** 16n)) / 100).toString()
const convertDisplayValueToPINTForContract = x => BigInt(x) * 10n ** 18n

// -----------------------------------------------------------------------------
// DATA BACKEND
// -----------------------------------------------------------------------------

const getAmountStaked = async () => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const stakePINTContract = new ethers.Contract(STAKEPINT_CONTRACT_ADDRESS, STAKEPINT_ABI, provider)

    const userInfo = await stakePINTContract.users(window.ethereum.selectedAddress)

    return convertPINTForDisplay(userInfo.amount.toBigInt())
  } catch (err) {
    console.error(err)
    // alert('Sorry there was a problem retrieving the amount of your staked PINT')

    return '0'
  }
}

const getUnclaimedRewards = async () => {
  try {
    const url = `https://testing.wenrug.com/rewards/stakers/${window.ethereum.selectedAddress}`
    const response = await fetch(url).then(x => x.text())

    console.log({ response })

    // TODO: check value is converted correctly
    return response
  } catch (err) {
    console.error(err)
    // alert('Sorry there was a problem retrieving the amount of your rewards')

    return '0'
  }
}

const approveToStake = async (amount) => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const fakePINTContract = new ethers.Contract(FAKEPINT_ADDRESS, FAKEPINT_ABI, signer)

    await (await fakePINTContract.approve(STAKEPINT_CONTRACT_ADDRESS, convertDisplayValueToPINTForContract(amount))).wait()
  } catch (err) {
    console.error(err)
    alert('Sorry there was a problem with approving your PINT to stake, please reach out to support to help address your issue.')
  }
}

const stakePINT = async (amount) => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const stakePINTContract = new ethers.Contract(STAKEPINT_CONTRACT_ADDRESS, STAKEPINT_ABI, signer)

    await stakePINTContract.stake(convertDisplayValueToPINTForContract(amount))
  } catch (err) {
    console.error(err)
    alert('Sorry there was a problem with staking your PINT, please reach out to support to help address your issue.')
  }
}

const unstakePINT = async (amount) => {
  if (amount === '' || amount === '0') return alert('please provide an amount to unstake')

  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const stakePINTContract = new ethers.Contract(STAKEPINT_CONTRACT_ADDRESS, STAKEPINT_ABI, signer)

    await stakePINTContract.unstake(convertDisplayValueToPINTForContract(amount))
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
    return convertPINTForDisplay(balance.toBigInt())
  } catch (err) {
    console.error(err)
    alert('Sorry there was a problem getting your PINT balance')
    return '0'
  }
}

const getAmountApproved = async () => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const fakePINTContract = new ethers.Contract(FAKEPINT_ADDRESS, FAKEPINT_ABI, provider)

    const amount = await fakePINTContract.allowance(window.ethereum.selectedAddress, STAKEPINT_CONTRACT_ADDRESS)
    return convertPINTForDisplay(amount.toBigInt())
  } catch (err) {
    console.error(err)
    alert('Sorry there was a problem getting how much PINT you have approved to be staked')
    return '0'
  }
}

const claimVePint = async () => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const stakePINTContract = new ethers.Contract(STAKEPINT_CONTRACT_ADDRESS, STAKEPINT_ABI, provider)

    await stakePINTContract.claim()
  } catch (err) {
    console.error(err)
    alert('Sorry there was a problem claiming your vePINT')
    return '0'
  }
}

const getUnclaimedVePint = async () => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const stakePINTContract = new ethers.Contract(STAKEPINT_CONTRACT_ADDRESS, STAKEPINT_ABI, provider)

    const amount = await stakePINTContract.amountClaimable(window.ethereum.selectedAddress)
    return convertPINTForDisplay(amount.toBigInt())
  } catch (err) {
    console.error(err)
    // alert('Sorry there was a problem getting your unclaimed vePINT')
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
  getAmountApproved,
  approveToStake,
  claimVePint,
  getUnclaimedVePint,
}

// -----------------------------------------------------------------------------
// EXPORT
// -----------------------------------------------------------------------------

export const GoerliVault = () => {
  return (
    <GoerliVaultFactory backend={backend} />
  )
}

