function Rotor (args) {

  var args = args || {};
  this.id = args.id || 'rotor';
  this.inputDial = args.inputDial || '';
  this.outputDial = args.outputDial || '';
  this.position = args.position || 0;
  this.offset = args.offset || 0;
  this.left = args.left || 0;
  this.letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";


  this.passThrough = function (letter) {

    var index = this.inputDial.indexOf(letter.toUpperCase()) + this.position;
    return this.outputDial.charAt(index % this.inputDial.length);

  }



  this.passBack = function (letter) {

    var index = this.outputDial.indexOf(letter.toUpperCase()) - this.position;
    if (index < 0) { index += this.inputDial.length; }
    return this.inputDial.charAt((index) % this.inputDial.length);

  }



  this.clickPosition = function () {
    this.position++;
    if (this.position >= this.inputDial.length) {
      this.position = 0;
      $('#' + this.id).val(this.position);
      return true;
    }
    $('#' + this.id).val(this.position);
    return false;
  }



  this.getHTML = function (left) {

    var letter = this.letters.charAt(this.position);
    var left = left || 0;
    var h = '<div id="' + this.id + '" class="rotor no-select" style="left:' + left + 'px;">';
    h += '<div id="' + this.id + '-letter" class="rotor-letter">' + letter + '</div>';
    h += '<div class="rotor-button-top" onClick="rotorClicked(\'' + this.id + '\', false)"></div>';
    h += '<div class="rotor-button-bottom" onClick="rotorClicked(\'' + this.id + '\', true)"></div>';
    h += '</div>';
    return h;

  }


  this.updateLetter = function () {
    $('#' + this.id + '-letter').html(this.letters.charAt(this.position));
  }


  this.clickMe = function () {
    this.position++;
    if (this.position >= this.inputDial.length) { this.position = 0; this.updateLetter(); return true; }
    this.updateLetter();
    return false;
  }


  this.clickMeBack = function () {
    console.log("BACK");
  }






}
