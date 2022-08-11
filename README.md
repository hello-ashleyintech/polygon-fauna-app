# polygon-fauna-app
👋 Hello! This app is a demo app to show how Polygon, Fauna, and React can work together to help safeguard your dApp data. This example uses the concept of Allowlisting to demonstrate this functionality in a dApp.

View the flow of the app in the diagram below:

<img width="422" alt="New Database" src="https://docs.polygon.technology/assets/images/flow-eea5375e3494321f93be59658f537786.png">

This is what the app looks like in action:

<img width="422" alt="New Database" src="https://docs.polygon.technology/assets/images/polygon-fauna-app-cebad379be3e0f4234e2f5a2681f5ebe.gif">

Visit [here](https://docs.polygon.technology/docs/develop/dapp-fauna-polygon-react/) for the tutorial on Polygon's docs that this repo is linked to.

## Getting Started
To start, clone this repository locally onto your machine or download it as a .ZIP file.

Once you have the repository on your machine, follow the steps below to get started:

### Initial configuration
* Set up your `.env` files - you will need a `.env` file in the root directory (to be used by the backend/Polygon configurations) and a `.env` file in the `client` directory (to be used for Fauna configurations in the frontend).
* For the root directory `.env` file, you'll need a `MNEMONIC` environment variable - this is going to be your Secret Key phrase from your Metamask wallet.
* For the `.env` file in the `client` directory, you'll need a `REACT_APP_FAUNADB_SECRET` - to get this, you'll need to create a database in Fauna, and then generate a Secret Key from that. When you create your database, make sure your configuration looks similar to this (you can choose whatever name you'd like):

<img width="422" alt="New Database" src="https://user-images.githubusercontent.com/12901850/150664291-6078db5c-9ba8-480b-bc95-03ffda81e06e.png">

### Install dependencies
Once your `.env` is set up, install dependencies. You'll need to do the following:
* In the root directory, run `npm install` (installs general product dependencies)
* In the `client` directory, run `npm install` (installs React project dependencies)

### Migrate smart contracts
Once you have the dependencies installed, we'll need to migrate our smart contracts to get them set up on our machine.
* In the root directory, run `npm run migrate` to deploy the smart contracts.

#### Note: if you run into any issues, check the following things:
* Make sure your `MNEMONIC` environment variable is defined in a `.env` file in your root directory.
* If you are running into continuous errors and you’ve checked the above, try other RPC URLs in place of the `[matic-mubai.chainstacklabs.com](http://matic-mubai.chainstacklabs.com)` URL in `truffle-config.js`. A list of additional URLs for the Mumbai-Testnet can be found on [this page](https://docs.polygon.technology/docs/develop/network-details/network/) under the “Mumbai-Testnet” section.

### Run application
To run your application, cd into `client` and run `npm run start`.

### Swap out Fauna dependencies
Until you swap out Fauna dependencies, your form will not submit properly to the database.
For this tutorial, you'll need a [Collection](https://docs.fauna.com/fauna/current/learn/understanding/collections) created. This should be made inside the database you created to generate your Fauna Secret Key for the `.env` file. Your Collection should look like this (although you can name it something different):

<img width="568" alt="New Collection" src="https://user-images.githubusercontent.com/12901850/150664267-fc9f8911-d036-4657-8d66-9d9e71b6f158.png">

Once you make a Collection, you'll need an [Index](https://docs.fauna.com/fauna/current/api/fql/indexes). This will query the documents (entries) in your collection for a matching UUID. You're free to use whatever name you'd like for your Index, but the general config for your Index should look like this:

<img width="577" alt="Create Index" src="https://user-images.githubusercontent.com/12901850/150664253-7b5076db-c3cd-4ac6-aed8-5eecc5d2305b.png">

In `fauna.js`, you'll need to:
* In the function `addDocuments`, update the `"allowlist_members"` string in the query to the name of your newly created Collection.
* In the function `findUUID`, update the `"allowlist_members_by_uuid"` string in the query to the name of your newly created Index.

## Transaction lookup
Included in this repository is a script to decode transaction input data, which can be used to find the `uuid`s stored in the blockchain for transactions from this application. With a `uuid`, you can search for the corresponding data record in Fauna to reveal the actual information (first name, last name, wallet address). 

The script is located in `client/scripts/decode-transaction.js`. In the file, you will need to set `testData` equal to the transaction input data hash you'd like to decode. To run the script, you can run this command from the `client` folder:
`node scripts/decode-transaction.js`
This script can be repurposed to also read transaction data not related to the `Allowlist` smart contract it's currently referencing. You will need to replace the `testABI` variable value with the new contract ABI to be able to read from a different smart contract.
