
Demo
https://user-images.githubusercontent.com/30088540/129532496-3ca04c30-edc3-4aa6-85d7-5e83677991ee.mp4
# Versions:

1. Node.js version: v14.15.0,
2. lite-server version: 2.3.0,
3. Solidity version: >=0.4.22 <0.8.0, pragma experimental ABIEncoderV2,
4. web3 version: : 1.3.1,
5. Truffle version: : v5.1.52,
6. Ganache version: 2.5.4

Please open a terminal at the folder of this project, make sure you have installed npm, nodejs, truffle, lite-server, Ganache and Metamask.

NodeJS: https://nodejs.org/en/blog/release/v14.15.0/

Ganache 2.5.4 for Win Users: https://www.trufflesuite.com/ganache

Metamask:

Chrome:https://metamask.io/download.html

Fire Fox: https://addons.mozilla.org/en-US/firefox/addon/ether-metamask/

## Setup Ganache and MetaMask

1. Create a Workspace

![Home](https://raw.githubusercontent.com/jackychencw/election/main/imgs/ganache-home-empty.png)

2. Main Interface
   ![Interface](https://raw.githubusercontent.com/jackychencw/election/main/imgs/ganache-accounts.png)

3. Import Project
   Click settings icon on the top right corner
   ![Interface](https://raw.githubusercontent.com/jackychencw/election/main/imgs/settings-icon.png)

   Now select workspace, and click add project
   ![img](https://raw.githubusercontent.com/jackychencw/election/main/imgs/workspaces-pane-tab.png)

   Select **truffle-config.js** in this project's root folder
   ![img](https://raw.githubusercontent.com/jackychencw/election/main/imgs/truffle_config.png)

   Then you should have successfully imported the application contract.

4. Setup MetaMask
   Now you can start setting up MetaMask, instead of create password, click **Import with seed phrase**
   ![Create Account](https://raw.githubusercontent.com/jackychencw/election/main/imgs/metamask-create-password.png)
5. Find MNEMONIC from Ganache
   ![Mnemonic](https://raw.githubusercontent.com/jackychencw/election/main/imgs/mnemonic.png)
6. Use the Mnemonic you just fond as seed phrase
   ![Import](https://raw.githubusercontent.com/jackychencw/election/main/imgs/metamask_import_account.png)
7. Now you should see MetaMask Main page, and you should see Ethereum Mainnet on your top right corner
   ![main](https://raw.githubusercontent.com/jackychencw/election/main/imgs/metamask_main.png)

8. Switch Ethereum Net

   Select **Custom RPC** from top right cornet
   ![img](https://raw.githubusercontent.com/jackychencw/election/main/imgs/custom_rpc_tab.png)

   Enter the info below
   ![img](https://raw.githubusercontent.com/jackychencw/election/main/imgs/network_info.png)

9. After changing Network, you should see 100 ETH appear in you account, this can be used for development purpose
   ![img](https://raw.githubusercontent.com/jackychencw/election/main/imgs/test_eth.png)

Now you have successfully set up Ganache and Metamask

# Setup Server

### Install npm packages

```
npm install
```

### Install Truffle

You will need truffle for this project, Truffle is a famous blockchain framework that uses Ethereum Virtual Machine (EVM)
To install, simply run

```
npm i truffle@5.1.52
```

### Compile and migrate contract

```
truffle compile

truffle migrate
```

# Start app

```
npm run start
```

or

```
yarn start
```

# Use the app

you can go to tab 'Admin' to create a new election to add to the system, or go to tab 'Election' to vote and view results.

Create election

![img](https://raw.githubusercontent.com/jackychencw/election/main/imgs/create_election.png)
