
var keys = [];
var keyDown = false;
var rotorR = false;
var reflector = false;

document.addEventListener('mouseup', function (e) { resetKeyPressed(e); } );

iniKeys();
iniRotors();

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
  //$('#' + keyDown.lightID).addClass('lightON');

  clickRotors();
  var outputLetter = encodeLetter(keyDown.letter);
  $('#light' + outputLetter).addClass('lightON');
  console.log(outputLetter);

}



function resetKeyPressed ()
{
  if (keyDown) {
    $('.light').removeClass('lightON');
    keyDown = false;
    console.log('turn dial');
    console.log(keyDown);
  }
}




function getKeyById (keyID)
{
  for (var i = 0; i < keys.length; i++) {
    if (keys[i].id == keyID) { return keys[i]; }
  }
  return false;
}




function clickRotors ()
{
}


function encodeLetter (l)
{

  var l = rotorR.passThrough(l);
  l = rotorR.passThrough(l);
  //l = reflector.passThrough(l);
  //l = reflector.passBack(l);
  l = rotorR.passBack(l);
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

  rotorR = new Rotor({ inputDial:'EKMFLGDQVZNTOWYHXUSPAIBRCJ', outputDial:'AJDKSIRUXBLHWTMCQGZNPYFVOE' });
  reflector = new Rotor({ inputDial:'LEYJVCNIXWPBQMDRTAKZGFUHOS', outputDial:'FSOKANUERHMBTIYCWLQPZXVGJD' });

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
