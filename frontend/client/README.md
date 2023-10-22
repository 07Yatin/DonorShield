# Getting Started with Create React App

## 📃 Description

* We have created a Solidity Smart Contract for this cause and we have used web3, ganache-cli, mocha, to test out our contract.
* In the contracts folder, you will find a final solidity contract and the individual modules inside contracts_classified directory.
* On the Frontend Part we have html,css,javascript and full UI of Genuine Charity App along with Admin Panel in the website folder.
* Included a test directory with a test file to test all the functions used in the contract by deploying it on ganache and using web3 to utilize the ABI.
* Included a sample React Template so that the frontend can be used to include the website along with the test code to make a production app.
* Included code to compile the contract and to deploy the contract on the Rinkeby Test Network using the Infuria node module.

## 🛠Technology stack
Tools and technologies that we learnt and used in the project.
1. Solidity
2. HTML,CSS,JS,React
3. Node JS
4. web3,ganache-cli,mocha,solc node modules

## 🚀 Instructions to run the application (DEVELOPMENT)

1. Clone the Repository
```bash
git clone https://github.com/sushily7397/charityDonation.git
```
2. Create a Node app and install dependencies
```bash
npm init
```

after following the steps run 
```
npm install web3@1.0.0-beta.26
npm install mocha@8.2.1
npm install solc@0.4.17
npm install truffle-hdwallet-provider
npm install ganache-cli@6.12.2
```
3. Refer to the package.json file for full details on the installed packages.


4. Project Implementation Steps
This guide provides a step-by-step process to implement the project. Please follow the instructions carefully.

Frontend Implementation
Go to directory
### `cd client`

Start a local development Ethereum network using Hardhat by running the following command:
### 'npx hardhat node'

Once the local network is up and running, deploy your contracts by executing the following command:
### `npx hardhat run --network localhost scripts/deploy.js`

After the contracts are deployed successfully, start the frontend development server by running:
### `npm start`

The application should now be accessible in your web browser at the specified address.

# Backend Implementation
Open your terminal or command prompt and navigate to the root directory of your project.

Start the backend server using nodemon by running the following command:
### 'nodemon index.js'
The backend server should now be running and ready to handle requests.


## 🎨Screenshots
https://drive.google.com/open?id=1xdKTv1uotHUzQV-rxvWkvbxzP133DTA4&usp=drive_copy

https://drive.google.com/open?id=1laOfYON8VueF8dd1BjxDxG-C0s1rLR2o&usp=drive_copy

https://drive.google.com/open?id=1q-XAZexO_TbwE-IFB02ZNv22e4vCedbm&usp=drive_copy

https://drive.google.com/open?id=1CrRpEq7G5pSgsscP24d0VdV4aU-RJ66k&usp=drive_copy

https://drive.google.com/open?id=1zwaffEQnEPAhkIW-FhTRWqf_0-ToedSs&usp=drive_copy

https://drive.google.com/open?id=1Y00XxIGAqNJvG0omluJNxgwm2FTmBHVH&usp=drive_copy

https://drive.google.com/open?id=1IdcKfl9YrHg-xDEdU_G2FkqWK-VfpktP&usp=drive_copy
