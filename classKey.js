function Key (args) {

  var args = args || {};
  this.letter = args.letter || "A";
  this.row = args.row || 0;
  this.col = args.col || 0;
  this.id = args.id || 'key' + this.letter;
  this.lightID = args.lightID || 'light' + this.letter;

  // constants
  this.iniTop = 10;
  this.iniLeft = 30;
  this.rowInc = 54;
  this.colInc = 80;
  this.rowOffset = 40;




  this.html = function () {

    var top = this.iniTop + (this.row * this.rowInc);
    var left = this.iniLeft + (this.col * this.colInc);
    if (this.row % 2 == 1) { left += this.rowOffset; }

    var h = '<div class="key no-select" id="' + this.id + '"';
    h += ' style="top:' + top + 'px;left:' + left + 'px;">' + this.letter + '</div>';

    return h;

  }



  this.addEvents = function () {
    var el = document.getElementById(this.id);
    var id = this.id;
    el.addEventListener('mousedown', function(e) { keyPressed(id); } );
  }



  this.getLightHTML = function () {
    var top = this.iniTop + (this.row * this.rowInc);
    var left = this.iniLeft + (this.col * this.colInc);
    if (this.row % 2 == 1) { left += this.rowOffset; }

    var h = '<div class="light" id="' + this.lightID + '"';
    h += ' style="top:' + top + 'px;left:' + left + 'px;">' + this.letter + '</div>';

    return h;
  }


}
