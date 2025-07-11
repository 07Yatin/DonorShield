import abi from '../artifacts/contracts/CrowdFunding.sol/CrowdFunding.json'
import address from '../artifacts/contractAddress.json'
import { getGlobalState, setGlobalState } from '../store'
import { ethers } from 'ethers'

const { ethereum } = window
const contractAddress = address.address
const contractAbi = abi.abi
var acc = localStorage.getItem("accounts")
let connectedAccount

let tx

// Define the local Ethereum RPC provider
const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545");

const connectWallet = async () => {
  try {
    if (!ethereum) {
      alert('Please install MetaMask!')
      return
    }

    // Request account access
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
    
    // Check if we're on the correct network (Ganache - Chain ID 1337)
    const chainId = await ethereum.request({ method: 'eth_chainId' })
    if (chainId !== '0x539') { // 1337 in hex
      try {
        await ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x539' }],
        })
      } catch (switchError) {
        // This error code indicates that the chain has not been added to MetaMask
        if (switchError.code === 4902) {
          try {
            await ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [{
                chainId: '0x539',
                chainName: 'Ganache',
                nativeCurrency: {
                  name: 'ETH',
                  symbol: 'ETH',
                  decimals: 18
                },
                rpcUrls: ['http://127.0.0.1:8545'],
              }],
            })
          } catch (addError) {
            console.error('Error adding network:', addError)
          }
        }
      }
    }

    acc = localStorage.setItem("accounts", accounts[0])
    setGlobalState('connectedAccount', accounts[0]?.toLowerCase())
    
    // Listen for account changes
    ethereum.on('accountsChanged', (accounts) => {
      acc = localStorage.setItem("accounts", accounts[0])
      setGlobalState('connectedAccount', accounts[0]?.toLowerCase())
    })

    // Listen for chain changes
    ethereum.on('chainChanged', (chainId) => {
      window.location.reload()
    })

  } catch (error) {
    console.error('Error connecting wallet:', error)
    alert('Error connecting wallet: ' + error.message)
  }
}

const isWallectConnected = async () => {
  try {
    if (!ethereum) {
      alert('Please install MetaMask!')
      return false
    }

    const accounts = await ethereum.request({ method: 'eth_accounts' })
    if (accounts.length > 0) {
      acc = localStorage.setItem("accounts", accounts[0])
      setGlobalState('connectedAccount', accounts[0]?.toLowerCase())
      return true
    }
    return false
  } catch (error) {
    console.error('Error checking wallet connection:', error)
    return false
  }
}

// Get Ethereum contract using the local provider
const getEtheriumContract = async () => {
  connectedAccount = getGlobalState('connectedAccount')
  connectedAccount = window.localStorage.getItem("accounts")
  if (connectedAccount) {
    // Use local provider (Ganache) for network interactions
    const signer = provider.getSigner(); // Signer for transaction signing
    const contract = new ethers.Contract(contractAddress, contractAbi, signer)
    return contract
  } else {
    console.log("here")
    return getGlobalState('contract')
  }
}

const createProject = async ({
    title,
    description,
    imageURL,
    amount,
    expiresAt,
  }) => {
    try {
      if (!ethereum) return alert('Please install Metamask')
  
      const contract = await getEtheriumContract()
      amount = ethers.utils.parseEther(amount)
      tx = await contract.createProject(title, description, imageURL, amount, expiresAt)
      await tx.wait()
      await loadProjects()
    } catch (error) {
      reportError(error)
    }
  }

const loadProjects = async () => {
    try {
      if (!ethereum) return alert('Please install Metamask')
  
      const contract = await getEtheriumContract()
      const projects = await contract.getProjects()
      const stats = await contract.stats()
  
      setGlobalState('stats', structureStats(stats))
      setGlobalState('projects', structuredProjects(projects))
      console.log(projects)
  
    } catch (error) {
      reportError(error)
    }
}

const loadProject = async (id) => {
  try {
    if (!ethereum) return alert('Please install Metamask')
    const contract = await getEtheriumContract()
    const project = await contract.getProject(id)

    setGlobalState('project', structuredProjects([project])[0])
  } catch (error) {
    alert(JSON.stringify(error.message))
    reportError(error)
  }
}

const backProject = async (id, amount) => {
    try {
      if (!ethereum) return alert('Please install Metamask')
      const connectedAccount = getGlobalState('connectedAccount')
      const contract = await getEtheriumContract()
      amount = ethers.utils.parseEther(amount)

      tx = await contract.backProject(id, {
        from: connectedAccount,
        value: amount._hex,
      })

      await tx.wait()
      await getBackers(id)
    } catch (error) {
      reportError(error)
    }
}

const getBackers = async (id) => {
    try {
      if (!ethereum) return alert('Please install Metamask')
      const contract = await getEtheriumContract()
      let backers = await contract.getBackers(id)

      setGlobalState('backers', structuredBackers(backers))
    } catch (error) {
      reportError(error)
    }
}

const structuredBackers = (backers) =>
  backers
    .map((backer) => ({
      owner: backer.owner.toLowerCase(),
      refunded: backer.refunded,
      timestamp: new Date(backer.timestamp.toNumber() * 1000).toJSON(),
      contribution: parseInt(backer.contribution._hex) / 10 ** 18,
      title: backer.title
    }))
    .reverse()

const structuredProjects = (projects) =>
  projects
    .map((project) => ({
      id: project.id.toNumber(),
      owner: project.owner.toLowerCase(),
      title: project.title,
      description: project.description,
      timestamp: new Date(project.timestamp.toNumber()).getTime(),
      expiresAt: new Date(project.expiresAt.toNumber()).getTime(),
      date: toDate(project.expiresAt.toNumber() * 1000),
      imageURL: project.imageURL,
      raised: parseInt(project.raised._hex) / 10 ** 18,
      amount: parseInt(project.amount._hex) / 10 ** 18,
      backers: project.backers.toNumber(),
      status: project.status,
    }))
    .reverse()

const toDate = (timestamp) => {
  const date = new Date(timestamp)
  const dd = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`
  const mm =
    date.getMonth() + 1 > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`
  const yyyy = date.getFullYear()
  return `${yyyy}-${mm}-${dd}`
}

const structureStats = (stats) => ({
  totalProjects: stats.totalProjects.toNumber(),
  totalBacking: stats.totalBacking.toNumber(),
  totalDonations: parseInt(stats.totalDonations._hex) / 10 ** 18,
})

const reportError = (error) => {
  console.log(error.message)
  throw new Error('No ethereum object.')
}

export{
    connectWallet, isWallectConnected, createProject, loadProjects, getEtheriumContract, tx, ethereum,
    structuredProjects, structureStats, loadProject, acc, backProject, structuredBackers, getBackers
}
