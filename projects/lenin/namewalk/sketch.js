function setup() {
  // document styling
  document.body.style.margin = 0;
  document.body.style.fontFamily = 'arial';

  createCanvas(windowWidth, windowHeight);
  xPos = width / 2;
  yPos = height / 2;
  stepSize = min(width, height) / 50;
  paperColor = color('white');
  inkColor = color('black');
  bgColor = color('silver');
  bgColor.setAlpha(18);

  frameRate(5);

  nameInput = createInput();
  nameInput.position(10, 10);
  nameInput.changed(() => {
    currentName = nameInput.value();
  });
  currentName = '';
}

function draw() {
  background(bgColor);
  fill(inkColor);
  circle(width / 2, height / 2, 8);
  drawNextLetter();
}

function drawNextLetter() {
  if (!currentName) return;
  let str = nameInput.value();
  if (str.length > 0) {
    let char = str[0].toUpperCase();
    let ang = getAngleFromChar(char);
    let len = stepSize * str.length;
    let xNew = xPos + len * cos(ang);
    let yNew = yPos + len * sin(ang);

    fill(inkColor);
    stroke(inkColor);
    line(xPos, yPos, xNew, yNew);
    circle(xNew, yNew, 15);

    fill(paperColor);
    textAlign(CENTER, CENTER);
    text(char, xNew, yNew);

    xPos = xNew;
    yPos = yNew;
    nameInput.value(str.substr(1));
  } else {
    let p = createP("• " + currentName);
    p.position(xPos - 2, yPos - 25);
    xPos = width / 2;
    yPos = height / 2;
    currentName = '';
  }
  console.log(xPos);
}

// gets a letter (char) and returns an angle, where: A = 0, and Z = 2*PI
function getAngleFromChar(char) {
  char = char.toUpperCase();
  return map(char.charCodeAt(0), 'A'.charCodeAt(0), 'Z'.charCodeAt(0) + 1, 0, 2 * PI);
}