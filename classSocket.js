function Socket (args) {

  var args = args || {};
  this.letter = args.letter || 'A';
  this.row = args.row || 0;
  this.col = args.col || 0;

  // constants
  this.iniX = 40;
  this.iniY = 34;
  this.rowInc = 44;
  this.colInc = 84;

  // calculated values
  this.x = this.iniX + (this.col * this.colInc);
  this.y = this.iniY + (this.row * this.rowInc);

  if (this.row % 2 == 1) { this.x += (this.colInc / 2); }




  this.draw = function () {

    var c = plugBoardCanvas;

    c.text(this.x, this.y - 14, this.letter, { fontSize:14, fillStyle:'#FFFFFF' });
    c.circle(this.x, this.y, 10, { lineWidth:2, strokeStyle:'#d2d2d2', fillStyle:'#333333' });

  }



}
