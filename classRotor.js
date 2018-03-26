function Rotor (args) {

  var args = args || {};
  this.inputDial = args.inputDial || '';
  this.outputDial = args.outputDial || '';
  this.position = args.position || 13;
  this.offset = args.offset || 0;


  this.passThrough = function (letter) {

    var index = this.inputDial.indexOf(letter.toUpperCase());
    return this.outputDial.charAt((index + this.position) % 26);

  }



  this.passBack = function (letter) {

    var index = this.outputDial.indexOf(letter.toUpperCase());
    return this.inputDial.charAt((index + this.position) % 26);

  }


}
