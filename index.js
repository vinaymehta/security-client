const Encryption = require('./src/encryption.js')
const Decryption = require('./src/decryption.js')

const Ubiq = {
  init: function(params){
    this.papi = params.papi;
    this.sapi = params.sapi;
    this.srsa = params.srsa;
    this.server = params.server;
    return this
  },

  encrypt: async function(params){
    const enc = await new Encryption(this.papi, this.sapi, this.srsa, this.server, params.uses);

    let result = [enc.begin(), enc.update(params.data), enc.end()]
    result = Buffer.concat(result);
    return result
  },

  decrypt: async function(params){
    const dec = new Decryption(this.papi, this.sapi, this.srsa, this.server)
    let begin_result = dec.begin()
    let update_result = await dec.update(params.encrypted_data)
    let end = dec.end()
    let result = begin_result + update_result + end
    dec.close()
    return result
  }
}

module.exports = {
  Ubiq, Encryption, Decryption    
}
