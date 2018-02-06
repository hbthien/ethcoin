var base58 = require('bs58');
var bitcoin = require('bitcoinjs-lib');
var ecurve = require('ecurve');
var BigInteger = require('bigi');
var Buffer = require('buffer');
var triplesec = require('triplesec');



function generate(pinCode) {
  var keyPair = bitcoin.ECPair.makeRandom()
  var address = keyPair.getAddress()

  triplesec.encrypt ({
    data: new triplesec.Buffer(keyPair.toWIF()),
    key: new triplesec.Buffer(pinCode)
  }, function(err, buff) {
    if (err) {
	console.log(err);     
	// do something when encryption failed
    } else {
      var ciphertext = buff.toString('hex');
	print(ciphertext);
      // do something with the address and the encrypted private key
  
    }
  });
}

//Sending Bitcoin to Another Address

function sendmoney(amountSatoshis, address, privatekey, pinCode, receiver) {
  triplesec.decrypt ({
    data: new triplesec.Buffer(privatekey, "hex"),
    key: new triplesec.Buffer(pinCode)
  }, function (err, buff) {
    if (err) {
      // ... do something when decryption failed (invalid pin code)
      return console.log(err);
    }

    var keyPair = bitcoin.ECPair.fromWIF(buff.toString());

    $.ajax({
      // using Blockchain.info API to get unspent outputs
      url: 'https://blockchain.info/de/unspent?cors=true&active=' + address,
      type: 'GET'
      }).done(function(data) {

        var tx = new bitcoin.TransactionBuilder()
        var txfeemin = 1000;

        var balance = 0;
        var inputCount = 0;
        data.unspent_outputs.forEach(function(uo) {
          tx.addInput(uo.tx_hash_big_endian, uo.tx_output_n);
          balance += uo.value;
          inputCount++;
        });
        
        var txfee = txfeemin;
        //Estimate transaction size in bytes
        var txSize = inputCount * 180 + 2 * 34 + 10 + inputCount;
        //Blockchain: Minimum fee is 1.5 satoshi / Byte
        if (txSize * 2 > txfeemin)
          txfee = txSize * 2;

        tx.addOutput(receiver, amountSatoshis - txfee);
        tx.addOutput(address, balance - amountSatoshis);

        for (var i = 0; i < inputCount; i++)
          tx.sign(i, keyPair);

        var txHex = tx.build().toHex();
        
        // pushing raw transaction to Blockchain.info API
        $.ajax({
          url: 'https://blockchain.info/pushtx?cors=true',
          type: 'POST',
          data: 'tx=' + txHex
          }).done(function(data) {

            // transaction successful

          }).fail(function(err) {
            // push transaction to Blockchain failed
          });

      }).fail(function(err) {
        // most likely no unspent output (no balance)
      });
  });

}
