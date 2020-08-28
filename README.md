CONTENTS OF THIS FILE
---------------------

 * Introduction
 * Installation
 * Usage


INTRODUCTION
------------

The Ubiq Security Node Module provides convenient interaction with the
Ubiq Security Platform API from applications written in the Javascript language.
It includes a pre-defined set of classes that will provide simple interfaces
to encrypt and decrypt data


REQUIREMENTS
------------

This module requires no outside modules. All dependencies are pre-required in the module itself.


INSTALLATION
------------

Install the Security Client module as you would normally install a contributed
Npm module.

```sh
npm install @vinaymehta/security-client
```


USAGE
------------

Require the Security Client module in your JS class.

```javascript
const _ubiq = require('@vinaymehta/security-client')
```

Once required, you can initialise the client using built in Ubiq Class' init function.

```javascript
const ubiq = _ubiq.Ubiq.init({
  papi: 'UBIQ_ACCESS_KEY_ID',
  sapi: 'UBIQ_SECRET_SIGNING_KEY',
  srsa: 'UBIQ_SECRET_CRYPTO_ACCESS_KEY',
  server: 'HOST'
})
```

ENCRYPTION
------------

There are two ways in which you can encrypt your data.

* Simple Encryption
Using the Ubiq simple Encryption API your pain data is loaded and encrypted at once

```javascript
const encrypted_res = await ubiq.encrypt({
  data: 'Plain Data',
  uses: 'Key Uses'
})
```

* PieceWise Encryption
You can encrypt your data in chunks via piecewise API by extending the ubiq encryption class

This method requests new encryption key from the Ubiq server
```javascript
let enc = await new _ubiq.Encryption(ubiq.papi, ubiq.sapi, ubiq.srsa, ubiq.server, uses);
```

Call the begin() method to start the encryption process. This method returns the packed byte string with your encryption key and the initialisation vector
```javascript
Buffer.from(enc.begin())
```

Call the update method as many times as you want with your data chunks. This returns the encrypted version of your plain data
```javascript
Buffer.from(enc.update(chunk))
```

Call the end method to finish the encryption
```javascript
enc.end()
```

Call the close method to clean up memory resources
```javascript
enc.close()
```

DECRYPTION
------------

Much like encryption, there are two ways in which you can decrypt your encrypted data.

* Simple Decryption
Using the Ubiq simple Decryption API your pain data is loaded and encrypted at once

```javascript
const decrypted = await ubiq.decrypt({
  encrypted_data: input_data
})
```

* PieceWise Decryption
You can decrypt your encrypted data in chunks via piecewise API by extending the ubiq decryption class

This initialises the decryption class
```javascript
let dec = new _ubiq.Decryption(ubiq.papi, ubiq.sapi, ubiq.srsa, ubiq.server, uses);
```

Call the begin() method to start the decryption process. This method returns empty string
```javascript
dec.begin()
```

Call the update method as many times as you want with your data chunks. This returns the plain text version of your encrypted data. Here chunk is your chunked encrypted data
```javascript
await dec.update(chunk)
```

Call the end method to finish the decryption process
```javascript
dec.end()
```

Call the close method to clean up memory resources
```javascript
dec.close()
```
