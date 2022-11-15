## Resume3

Resume3 is a web3 based Resume buiding website powered by IPFS / Filecoin, Polygon, Chainlink and Spheron

[Demo link](https://resume3-631701.spheron.app/)

[Demo Video](https://www.youtube.com/watch?v=fdZ_QQeziB0)

### Technologies Used :

#### IPFS :
-> Data was uploaded to IPFS  ([upload code](https://github.com/dinesh11515/resume3/blob/main/pages/create.tsx#L288)) 
([retrieve code](https://github.com/dinesh11515/resume3/blob/main/pages/resume.tsx#L38))

-> Resume3 was deployed on Filecoin using Spheron


#### Polygon :
Smarts contracts are deployed to polygon mumbai testnet ([contract link](https://mumbai.polygonscan.com/address/0xD9cacab5D812cc1Ca347b19D3Cbbb869b814b86e#code))

#### Chainlink Services :
Used Chainlink datafeeds for getting price data of Polygon ([code](https://github.com/dinesh11515/resume3/blob/main/contracts/contracts/Resume3.sol#L20))

## What it does
Resume3 enables users to build their resume by just filling the details and further it uploads the details to IPFS and then adds that ipfs link in smart contract and mints a upgradeable ERC721 NFT for user
* Resume3 uses smart contracts for tracking the resumes of user.

## How we built it
Resume3 was built by using Next and TailwindCSS for frontend
* Solidity for smart contracts and hardhat for testing and deploying the smart contracts to Mumbai testnet
* It uses web3.storage for storing data in IPFS 
* Used wagmi for interaction with smart contract and RainbowKit for wallet connection 
* Resume3 was hosted on Filecoin using Spheron

## What we learned
* Uploading and retrieving the data From IPFS.
* Learnt integration of chianlink data feeds in smart contract
## What's next for Resume3
Right now Resume3 contains only one template need to add more resume templates and improving the UI to give better user experience of resume building
