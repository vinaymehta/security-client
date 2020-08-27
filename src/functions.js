module.exports = {
  hexEncode: function (data) {
    var hex, i;
    var result = "";
    for (i=0; i<data.length; i++) {
      hex = data.charCodeAt(i).toString(16);
      result += ("000"+hex).slice(-4);
    }
    return result
  },
  hexDecode: function (data) {
    var j;
    var hexes = data.match(/.{1,4}/g) || [];
    var back = "";
    for(j = 0; j<hexes.length; j++) {
      back += String.fromCharCode(parseInt(hexes[j], 16));
    }
    return back;
  },

  ab2str: function(buf){
    return String.fromCharCode.apply(null, new Uint16Array(buf));
  },

  str2ab: function(str){
    var buf = new ArrayBuffer(str.length*2); // 2 bytes for each char
    var bufView = new Uint16Array(buf);
    for (var i=0, strLen=str.length; i < strLen; i++) {
      bufView[i] = str.charCodeAt(i);
    }
    return buf;
  }
};
