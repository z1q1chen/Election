# Versions:
1. Node.js version: v14.15.0,
2. lite-server version: 2.3.0,
3. Solidity version: >=0.4.22 <0.8.0, pragma experimental ABIEncoderV2,
4. web3 version: : 1.3.1,
5. Truffle version: : v5.1.52,
6. Ganache version: 2.5.4

Please open a terminal at the folder of this project, make sure you have installed npm, nodejs, truffle, lite-server, Ganache and Metamask.

# Setup
### Install npm packages
```
npm install
```
### Compile and migrate contract
```
truffle compile

truffle migrate
```

### Start app
``` 
npm run start
```
or 
``` 
yarn start
```

# Use the app
you can go to tab 'Admin' to create a new election to add to the system, or go to tab 'Election' to vote and view results.