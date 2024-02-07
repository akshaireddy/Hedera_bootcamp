const {
    Client,
    AccountBalanceQuery
} = require("@hashgraph/sdk");

const myAccountId = "0.0.2672189";
const myPrivateKey = "0x34a9c8dc8c7656d376d9c79943a2445eeb1a6be8cc9852ff3e09b20de501e83b";

const otherAccountId = "0.0.2672233";

async function main() {
    // Create our connection to the Hedera network
    // The Hedera JS SDK makes this really easy!
    const client = Client.forTestnet();

    client.setOperator(myAccountId, myPrivateKey);

    // Create the query
    const query = new AccountBalanceQuery()
     .setAccountId(otherAccountId);

    // Sign with the client operator account private key and submit to a Hedera network
    const accountBalance = await query.execute(client);

    if (accountBalance) {
        console.log(`The account balance for someone else's account ${otherAccountId} is ${accountBalance.hbars} HBar`);

        console.log("All account Info for the other account:")
        console.log(JSON.stringify(accountBalance));
    }
    
    process.exit();
}

main();
