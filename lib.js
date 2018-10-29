
var keys = [];
var keyDown = false;
var rotors = [];
var reflector = false;
var plugBoard = []; // mapping used in encryption
var plugs = []; // array of plugs in plugBoard
var socketsCanvas;
var plugsCanvas;
var workingCanvas;
var WIDTH = 768;
var HEIGHT = 140;
var sockets = [];
var mouse = {};
mouse.x = 0;
mouse.y = 0;

var plug = {};
plug.socketClicked = false;

document.addEventListener('mousemove', function (e) { move(e); });
document.addEventListener('mousedown', function (e) { down(e); });
document.addEventListener('mouseup', function (e) { mouseUp(e); } );
document.addEventListener('keydown', function (e) { eKeyDown(e); } );
document.addEventListener('keyup', function (e) { mouseUp(); } );




function iniMe ()
{
  socketsCanvas = new Canvas({ id:'socketsCanvas', width:WIDTH, height:HEIGHT, autoDrawCanvas:false });
  plugsCanvas = new Canvas({ id:'plugsCanvas', width:WIDTH, height:HEIGHT, autoDrawCanvas:false });
  workingCanvas = new Canvas({ id:'workingCanvas', width:WIDTH, height:HEIGHT, autoDrawCanvas:false });
  iniKeys();
  drawKeys();
  keysAddEvents();
  drawLights();
  iniRotors();
  drawRotors();
  iniSockets();
  drawSockets();
}






function move (e)
{
  mouse.x = e.pageX - $('#plugBoardContainer').offset().left;
  mouse.y = e.pageY - $('#plugBoardContainer').offset().top;

  if (plug.socketClicked) {
    workingCanvas.clear();
    workingCanvas.line(plug.socketClicked.x, plug.socketClicked.y, mouse.x, mouse.y, { strokeStyle:'#e2e2e2' });
  }

}


function down (e)
{

  for (var i = 0; i < sockets.length; i++) {

    var d = Math.sqrt( Math.pow( (mouse.x - sockets[i].x), 2) + Math.pow( (mouse.y - sockets[i].y), 2) );

    if (d <= sockets[i].size) {
      plug.socketClicked = sockets[i];
      break;
    }

  }

}




function eKeyDown (e)
{
  var myKey = e.key.toUpperCase();
  var alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (alphabet.indexOf(myKey) >= 0) {
    var id = 'key' + myKey;
    keyPressed(id);
  } else if (e.key == "Backspace") {
    deleteChar();
  }

}


function deleteChar ()
{

  // delete text
  var h = $('#output').html();
  if (h.length <= 0) { return false; }
  
  h = h.slice(0, -1).trim();
  $('#output').html(h);

  // wind rotors back
  var click = true;
  for (var i = 0; i < rotors.length; i++) {
    click = rotors[i].clickMeBack();
    if (!click) { break; }
  }


}




function drawKeys ()
{

  var html = '';

  for (var i = 0; i < keys.length; i++) {
    html += keys[i].html();
  }

  $('#keys').html(html);

}



function keysAddEvents ()
{
  for (var i = 0; i < keys.length; i++) {
     keys[i].addEvents();
  }
}



function drawLights ()
{

  var html = '';

  for (var i = 0; i < keys.length; i++) {

    var key = keys[i];
    html += key.getLightHTML();

  }

  $('#lights').html(html);

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



function mouseUp ()
{

  if (plug.socketClicked) {

    workingCanvas.clear();

    var socketDropped = false;

    for (var i = 0; i < sockets.length; i++) {

      var d = Math.sqrt( Math.pow( (mouse.x - sockets[i].x), 2) + Math.pow( (mouse.y - sockets[i].y), 2) );

      if (d <= sockets[i].size) {

        if (sockets[i] != plug.socketClicked) {
          socketDropped = sockets[i];
        }

        break;
      }

    }

    if (socketDropped) {
      addPlug(plug.socketClicked, socketDropped);
    } else {
      removePlug(plug.socketClicked.letter);
    }

    plug.socketClicked = false;


  }



  if (keyDown) {
    $('.light').removeClass('lightON');
    $('.key').removeClass('keyDown');
    keyDown = false;
  }
}




function addPlug (socket1, socket2)
{
  removePlug(socket1.letter);
  removePlug(socket2.letter);
  plugBoardWire(socket1.letter, socket2.letter, 'add');
  plugs.push([socket1, socket2]);
  drawPlugs();
}


function removePlug (letter)
{

  for (var i = 0; i < plugs.length; i++) {
    if (plugs[i][0].letter == letter || plugs[i][1].letter == letter) {
      plugBoardWire(plugs[i][0].letter, plugs[0][1].letter, 'remove');
      plugs.splice(i,1);
      break;
    }
  }

  drawPlugs();

}



function drawPlugs ()
{

  plugsCanvas.clear();

  for (var i = 0; i < plugs.length; i++) {
    var socket1 = plugs[i][0];
    var socket2 = plugs[i][1];
    plugsCanvas.line(socket1.x, socket1.y, socket2.x, socket2.y, { lineWidth:4, strokeStyle:'#aaaaaa' } );
    plugsCanvas.circle(socket1.x, socket1.y, 10, { fillStyle:'#333333' });
    plugsCanvas.circle(socket2.x, socket2.y, 10, { fillStyle:'#333333' });
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

  var click = true;

  for (var i = 0; i < rotors.length; i++) {
    click = rotors[i].clickMe();
    if (!click) { break; }
  }

}




function encodeLetter (l)
{

  l = plugBoard.passThrough(l);

  for (var i = 0; i < rotors.length; i++) {
    l = rotors[i].passThrough(l);
  }

  l = reflector.passThrough(l);

  for (var i = rotors.length - 1; i >= 0; i--) {
    l = rotors[i].passBack(l);
  }

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

  rotors[0] = new Rotor({ inputDial:'EKMFLGDQVZNTOWYHXUSPAIBRCJ', outputDial:'AJDKSIRUXBLHWTMCQGZNPYFVOE', position:23 });
  rotors[1] = new Rotor({ inputDial:'BDFHJLCPRTXVZNYEIWGAKMUSQO', outputDial:'ESOVPZJAYQUIRHXLNFTGKDCMWB', position:25 });
  rotors[2] = new Rotor({ inputDial:'VZBRGITYUPSDNHLXAWMJQOFECK', outputDial:'JPGVOUMFYQBENHZRDKASXLICTW', position:1 });
  rotors[3] = new Rotor({ inputDial:'VZBRGITYUPSDNHLXAWMJQOFECK', outputDial:'BDFHJLCPRTXVZNYEIWGAKMUSQO', position:2 });
  reflector = new Rotor({ inputDial:'ABCDEFGHIJKLMNOPQRSTUVWXYZ', outputDial:'ZYXWVUTSRQPONMLKJIHGFEDCBA' });
  plugBoard = new Rotor({ inputDial:'ABCDEFGHIJKLMNOPQRSTUVWXYZ', outputDial: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' });

}


function drawRotors ()
{

  var html = '';

  for (var i = 0; i < rotors.length; i++) {
    var left = ((rotors.length - 1) - i) * 120;
    html += rotors[i].getHTML(left);
  }

  $('#rotors-container').html(html);

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




function rotorClicked (id, clickBack)
{

  for (var i = 0; i < rotors.length; i++) {
    if (rotors[i].id == id) {
      if (clickBack) {
        rotors[i].clickMeBack();
      } else {
        rotors[i].clickMe();
      }
      break;
    }
  }

}



function iniSockets ()
{
  sockets = [];

  // 1st row
  sockets.push(new Socket({ letter:'Q' }));
  sockets.push(new Socket({ letter:'W', col:1 }));
  sockets.push(new Socket({ letter:'E', col:2 }));
  sockets.push(new Socket({ letter:'R', col:3 }));
  sockets.push(new Socket({ letter:'T', col:4 }));
  sockets.push(new Socket({ letter:'Z', col:5 }));
  sockets.push(new Socket({ letter:'U', col:6 }));
  sockets.push(new Socket({ letter:'I', col:7 }));
  sockets.push(new Socket({ letter:'O', col:8 }));

  // 2nd row
  sockets.push(new Socket({ letter:'A', row:1 }));
  sockets.push(new Socket({ letter:'S', row:1, col:1 }));
  sockets.push(new Socket({ letter:'D', row:1, col:2 }));
  sockets.push(new Socket({ letter:'F', row:1, col:3 }));
  sockets.push(new Socket({ letter:'G', row:1, col:4 }));
  sockets.push(new Socket({ letter:'H', row:1, col:5 }));
  sockets.push(new Socket({ letter:'J', row:1, col:6 }));
  sockets.push(new Socket({ letter:'K', row:1, col:7 }));

  // 3rd row
  sockets.push(new Socket({ letter:'P', row:2 }));
  sockets.push(new Socket({ letter:'Y', row:2, col:1 }));
  sockets.push(new Socket({ letter:'X', row:2, col:2 }));
  sockets.push(new Socket({ letter:'C', row:2, col:3 }));
  sockets.push(new Socket({ letter:'V', row:2, col:4 }));
  sockets.push(new Socket({ letter:'B', row:2, col:5 }));
  sockets.push(new Socket({ letter:'N', row:2, col:6 }));
  sockets.push(new Socket({ letter:'M', row:2, col:7 }));
  sockets.push(new Socket({ letter:'L', row:2, col:8 }));

}



function drawSockets ()
{

  for (var i = 0; i < sockets.length; i++) {

    sockets[i].draw();

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
