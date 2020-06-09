const Oracle = artifacts.require('Oracle');
const Resolver = artifacts.require('Resolver');
const Example = artifacts.require('Example');

// If you want to use await / async syntax in Truffle migrations,
// see https://github.com/trufflesuite/truffle/issues/501
module.exports = (deployer, network) => {
  if (network === 'development') {
    deployer.then(async () => {
      await deployer.deploy(Oracle);
      // set the Oracle contract address via the Resolver contract
      await deployer.deploy(Resolver, Oracle.address);
      await deployer.deploy(Example, Resolver.address);
    });
  }

  // Live networks
  if (network === "ropsten") {
    const resolverAddress = "0xa5478ae39ac43347f04ef6889ee73b8083b01814";
    deployer.deploy(Example, resolverAddress);
  }

};
