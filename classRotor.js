function Rotor (args) {

  var args = args || {};
  this.inputDial = args.inputDial || '';
  this.outputDial = args.outputDial || '';
  this.position = args.position || 0;
  this.offset = args.offset || 0;


  this.passThrough = function (letter) {

    var index = this.inputDial.indexOf(letter.toUpperCase()) + this.position;
    return this.outputDial.charAt(index % this.inputDial.length);

  }



  this.passBack = function (letter) {

    var index = this.outputDial.indexOf(letter.toUpperCase()) - this.position;
    if (index < 0) { index += this.inputDial.length; }
    return this.inputDial.charAt((index) % this.inputDial.length);

  }


}
