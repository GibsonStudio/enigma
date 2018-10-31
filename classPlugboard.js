function Plugboard (args) {

  var args = args || {};
  var letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  this.letters = [];

  for (var i = 0; i < letters.length; i++) {
    var l = letters.charAt(i);
    this.letters[l] = l;
  }


  this.connectSockets = function (l1, l2) {

    this.removeSocket(l1);
    this.removeSocket(l2);
    this.letters[l1] = l2;
    this.letters[l2] = l1;

  }


  this.removeSocket = function (l1) {
    var l2 = this.letters[l1];
    this.letters[l1] = l1;
    this.letters[l2] = l2;
  }



  this.passThrough = function (l1) {
    return this.letters[l1];
  }


  this.passBack = function (l2) {

    for (var key in this.letters) {
      if (this.letters[key] == l2) { return key; }
    }

    return l1;
  }


}
