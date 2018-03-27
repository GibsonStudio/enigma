
var keys = [];
var keyDown = false;
var rotors = [];
var reflector = false;
var plugBoard = [];

document.addEventListener('mouseup', function (e) { resetKeyPressed(e); } );
document.addEventListener('keydown', function (e) { eKeyDown(e); } );
document.addEventListener('keyup', function (e) { resetKeyPressed(); } );


iniKeys();
iniRotors();




function eKeyDown (e)
{
  var myKey = e.key.toUpperCase();
  var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (alphabet.indexOf(myKey) >= 0) {
    var id = 'key' + myKey;
    keyPressed(id);
  }
}


function writeKeys ()
{

  for (var i = 0; i < keys.length; i++) {

    var key = keys[i];
    document.write(key.html());
    key.addEvents();

  }

}



function writeLights ()
{

  for (var i = 0; i < keys.length; i++) {

    var key = keys[i];
    document.write(key.getLightHTML());

  }

}




function keyPressed (keyID)
{
  keyDown = getKeyById(keyID);
  clickRotors();
  var outputLetter = encodeLetter(keyDown.letter);
  writeOutput(outputLetter);
  $('#light' + outputLetter).addClass('lightON');
  $('#' + keyID).addClass('keyDown');
}



function resetKeyPressed ()
{
  if (keyDown) {
    $('.light').removeClass('lightON');
    $('.key').removeClass('keyDown');
    keyDown = false;
  }
}




function getKeyById (keyID)
{
  for (var i = 0; i < keys.length; i++) {
    if (keys[i].id == keyID) { return keys[i]; }
  }
  return false;
}



function writeOutput (l)
{
  var html = $('#output').html();
  if (html.length == 5 || html.length % 5 == 0) {
    html += ' ';
  }
  html += l;
  $('#output').html(html);
}




function clickRotors ()
{
  var click = rotors[0].clickPosition();
  if (click) {
    click = rotors[1].clickPosition();
  }
  if (click) {
    click = rotors[2].clickPosition();
  }
}



function encodeLetter (l)
{

  l = plugBoard.passThrough(l);
  l = rotors[0].passThrough(l);
  l = rotors[1].passThrough(l);
  l = rotors[2].passThrough(l);
  l = reflector.passThrough(l);
  l = rotors[2].passBack(l);
  l = rotors[1].passBack(l);
  l = rotors[0].passBack(l);
  l = plugBoard.passBack(l);
  return l;

}






function iniKeys ()
{
  keys = [];

  // 1st row
  keys.push(new Key({ letter:'Q' }));
  keys.push(new Key({ letter:'W', col:1 }));
  keys.push(new Key({ letter:'E', col:2 }));
  keys.push(new Key({ letter:'R', col:3 }));
  keys.push(new Key({ letter:'T', col:4 }));
  keys.push(new Key({ letter:'Z', col:5 }));
  keys.push(new Key({ letter:'U', col:6 }));
  keys.push(new Key({ letter:'I', col:7 }));
  keys.push(new Key({ letter:'O', col:8 }));

  // 2nd row
  keys.push(new Key({ letter:'A', row:1 }));
  keys.push(new Key({ letter:'S', row:1, col:1 }));
  keys.push(new Key({ letter:'D', row:1, col:2 }));
  keys.push(new Key({ letter:'F', row:1, col:3 }));
  keys.push(new Key({ letter:'G', row:1, col:4 }));
  keys.push(new Key({ letter:'H', row:1, col:5 }));
  keys.push(new Key({ letter:'J', row:1, col:6 }));
  keys.push(new Key({ letter:'K', row:1, col:7 }));

  // 3rd row
  keys.push(new Key({ letter:'P', row:2 }));
  keys.push(new Key({ letter:'Y', row:2, col:1 }));
  keys.push(new Key({ letter:'X', row:2, col:2 }));
  keys.push(new Key({ letter:'C', row:2, col:3 }));
  keys.push(new Key({ letter:'V', row:2, col:4 }));
  keys.push(new Key({ letter:'B', row:2, col:5 }));
  keys.push(new Key({ letter:'N', row:2, col:6 }));
  keys.push(new Key({ letter:'M', row:2, col:7 }));
  keys.push(new Key({ letter:'L', row:2, col:8 }));

}




function iniRotors ()
{

  rotors[0] = new Rotor({ id:'rotorR', inputDial:'EKMFLGDQVZNTOWYHXUSPAIBRCJ', outputDial:'AJDKSIRUXBLHWTMCQGZNPYFVOE', position:0 });
  rotors[1] = new Rotor({ id:'rotorM', inputDial:'BDFHJLCPRTXVZNYEIWGAKMUSQO', outputDial:'ESOVPZJAYQUIRHXLNFTGKDCMWB', position:0 });
  rotors[2] = new Rotor({ id:'rotorL', inputDial:'VZBRGITYUPSDNHLXAWMJQOFECK', outputDial:'JPGVOUMFYQBENHZRDKASXLICTW', position:0 });
  reflector = new Rotor({ inputDial:'ABCDEFGHIJKLMNOPQRSTUVWXYZ', outputDial:'ZYXWVUTSRQPONMLKJIHGFEDCBA' });
  plugBoard = new Rotor({ inputDial:'ABCDEFGHIJKLMNOPQRSTUVWXYZ', outputDial: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' });

}



function plugBoardWire (letter1, letter2, operation)
{

  operation = (typeof operation === 'undefined') ? 'add' : operation;

  if (operation == 'add') {

    var index1 = plugBoard.inputDial.indexOf(letter1);
    var index2 = plugBoard.inputDial.indexOf(letter2);
    plugBoard.outputDial = setCharAt(plugBoard.outputDial, index1, letter2);
    plugBoard.outputDial = setCharAt(plugBoard.outputDial, index2, letter1);

  } else {

    var index1 = plugBoard.inputDial.indexOf(letter1);
    var index2 = plugBoard.inputDial.indexOf(letter2);
    plugBoard.outputDial = setCharAt(plugBoard.outputDial, index1, letter1);
    plugBoard.outputDial = setCharAt(plugBoard.outputDial, index2, letter2);

  }

}



function setCharAt(str,index,chr) {
    if(index > str.length-1) return str;
    return str.substr(0,index) + chr + str.substr(index+1);
}




function iniScreen ()
{
  for (var i = 0; i < rotors.length; i++) {
    var r = rotors[i];
    $('#' + r.id).val(r.position);
  }
}




function setRotor (r)
{
  for (var i = 0; i < rotors.length; i++) {
    if (rotors[i].id == r.id) {
      rotors[i].position = parseInt(r.value);
    }
  }
}





/*
Enigma Process
     1. Convert input letter to number - validate!
     2. Rotate wheels
     3. Pass through plugboard
     4. Pass through right-hand wheel
     5. Pass through middle wheel
     6. Pass through left-hand wheel
     7. Pass through reflector
     8. Pass through left-hand wheel
     9. Pass through middle wheel
    10. Pass through right-hand wheel
    11. Pass through plugboard
    12. Convert to output letter

    */

/*
    this.arrRotors[1] = ".EKMFLGDQVZNTOWYHXUSPAIBRCJ"; // Rotor I
        this.arrRotors[2] = ".AJDKSIRUXBLHWTMCQGZNPYFVOE"; // Rotor II
        this.arrRotors[3] = ".BDFHJLCPRTXVZNYEIWGAKMUSQO"; // Rotor III
        this.arrRotors[4] = ".ESOVPZJAYQUIRHXLNFTGKDCMWB"; // Rotor IV
        this.arrRotors[5] = ".VZBRGITYUPSDNHLXAWMJQOFECK"; // Rotor V
        this.arrRotors[6] = ".JPGVOUMFYQBENHZRDKASXLICTW"; // Rotor VI
        this.arrRotors[7] = ".NZJHGRCXMYSWBOUFAIVLPEKQDT"; // Rotor VII
        this.arrRotors[8] = ".FKQHTLXOCBJSPDZRAMEWNIUYGV"; // Rotor VIII
        this.arrRotors["b"] = ".LEYJVCNIXWPBQMDRTAKZGFUHOS"; // M4 Greek Rotor "b" (beta)
        this.arrRotors["g"] = ".FSOKANUERHMBTIYCWLQPZXVGJD"; // M4 Greek Rotor "g" (gama)
        */
