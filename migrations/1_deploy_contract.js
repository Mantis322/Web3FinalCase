const fs = require('fs')

const FinalCase = artifacts.require("FinalCase");

let finalcaseaddress = ""

module.exports = async function (deployer) {
    await deployer.deploy(FinalCase);
    const instance = await FinalCase.deployed();
    finalcaseaddress = await instance.address;
    console.log("contract addresi eşittir= ", finalcaseaddress)

    let config = `export const finalcaseaddress = "${finalcaseaddress}"`

    let data = JSON.stringify(config)
    await fs.writeFileSync('config.js', JSON.parse(data))
};