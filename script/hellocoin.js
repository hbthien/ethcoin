var supply = 10000 ;
personal.unlockAccount(web3.eth.accounts[0], "12345678")

var tokenContract = web3.eth.contract([{"constant":false,"inputs":[{"name":"receiver","type":"address"},{"name":"amount","type":"uint256"}],"name":"sendCoin","outputs":[{"name":"sufficient","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"coinBalanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"inputs":[{"name":"supply","type":"uint256"}],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"sender","type":"address"},{"indexed":false,"name":"receiver","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"CoinTransfer","type":"event"}]);
var token = tokenContract.new(
   supply,
   {
     from: web3.eth.accounts[0], 
     data: '0x6060604052341561000f57600080fd5b604051602080610348833981016040528080519060200190919050505b806000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055505b505b6102c7806100816000396000f30060606040526000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806390b98a1114610049578063bbd39ac0146100a3575b600080fd5b341561005457600080fd5b610089600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919080359060200190919050506100f0565b604051808215151515815260200191505060405180910390f35b34156100ae57600080fd5b6100da600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610283565b6040518082815260200191505060405180910390f35b6000816000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020541015610141576000905061027d565b816000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282540392505081905550816000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055507f16cdf1707799c6655baac6e210f52b94b7cec08adcaf9ede7dfe8649da926146338484604051808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001828152602001935050505060405180910390a1600190505b92915050565b600060205280600052604060002060009150905054815600a165627a7a72305820ef15cbfc775209da6f69528166f11e0a9419d608e9fc22fac1ac4833f8fe98450029', 
     gas: '300000'
   }, function (e, contract){
    console.log(e, contract);
    if (typeof contract.address !== 'undefined') {
         console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
    }
 })
/*
var event = token.CoinTransfer({}, '', function(error, result){
  if (!error)
    console.log("Coin transfer: " + result.args.amount + 
        " tokens were sent. Balances now are as following: \n Sender:\t" + 
	result.args.sender + " \t" + token.coinBalanceOf.call(result.args.sender) + 
	" tokens \n Receiver:\t" + result.args.receiver + " \t" + 
	token.coinBalanceOf.call(result.args.receiver) + " tokens" 
    )
});

var tokenName = "MyFirstCoin"
*/



