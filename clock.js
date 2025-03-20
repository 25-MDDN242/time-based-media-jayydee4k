function setup() {
  createCanvas(960, 500);
  angleMode(DEGREES);
  fill(firePalette[floor(random(4))]);
}

let buildingFall = 0;
let firePalette = ['#FF4500', '#FFA500', '#FFD700', '#8B0000'];
let alarmActive = false;
let fallSpeed = 0;
let debris = [];

function draw() {
  let now = new Date();
  let obj = {
    hours: now.getHours(),
    minutes: now.getMinutes(),
    seconds: now.getSeconds(),
    millis: now.getMilliseconds(),
    seconds_until_alarm: -1 // 0 to test alarm
  };
  draw_clock(obj);
}

function draw_clock(obj) {
  // alarm
  if(obj.seconds_until_alarm === 0 && !alarmActive) {
    alarmActive = true;
    buildingFall = 0;
    fallSpeed = 0.5;
    debris = [];
    for(let i = 0; i < 100; i++) {
      debris.push({
        x: 480 + random(-80, 80),
        y: 150 + random(-20, 300),
        speedX: random(-5, 5),
        speedY: random(-10, -5),
        size: random(5, 15),
        life: 255
      });
    }
    if(alarmActive) {
      //particles
      debris.push({
        x: 480 + random(-50, 50),
        y: 300 + buildingFall * 50,
        speedX: random(-0.5, 0.5),
        speedY: random(-2, -4),
        size: random(10, 20),
        life: 150
      });
    
      // Fire
      fill(255, 140, 0, 100);
      ellipse(480, 300 + buildingFall * 50, 100, 150);
    }
  } else if(obj.seconds_until_alarm !== 0) {
    alarmActive = false;
    buildingFall = 0;
  }

  // Background effects
  if(alarmActive) {
    let flashAlpha = map(sin(frameCount * 10), -1, 1, 50, 150);
    let flashColor = frameCount % 10 < 5 ? color(255, 0, 0, flashAlpha) : color(255, 165, 0, flashAlpha);
    background(flashColor);
  } else {
    let gradient = drawingContext.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, '#0F1A30');
    gradient.addColorStop(1, '#080E1A');
    drawingContext.fillStyle = gradient;
    drawingContext.fillRect(0, 0, width, height);
  }

  // Moon
  let angle = (obj.minutes + obj.seconds / 60) * (PI / -60);
  let centerX = 480;
  let centerY = 360;
  let radius = 300;
  
  let moonX = centerX + radius * cos(angle);
  let moonY = centerY + radius * sin(angle);
  
  for (let i = 0; i < 5; i++) {
    fill(255, 255, 150, 50 - i * 10);
    ellipse(moonX, moonY, 100 - i * 30);
  }
  fill(255, 255, 150);
  ellipse(moonX, moonY, 60);

  // Draw buildings
  function drawBuilding(x, y, w, h) {
    fill(40);
    rect(x, y, w, h);
    rect(x - 5, y - 10, w + 10, 10);
  }

  // Background buildings
  fill(40);
  rect(0, 370, 960, 80);

  // Left buildings
  drawBuilding(100, 300, 80, 200);
  drawBuilding(180, 320, 60, 180);
  drawBuilding(240, 310, 70, 190);
  drawBuilding(300, 250, 70, 300);

  // Right buildings
  drawBuilding(680, 330, 75, 170);
  drawBuilding(755, 315, 65, 185);
  drawBuilding(820, 340, 70, 160);

  // Falling Main Building
  push();
  if(alarmActive) {
    buildingFall += fallSpeed;
    fallSpeed *= 1.05;
    translate(480, 150);
    rotate(buildingFall);
    translate(-480, -150);
  }
  
  fill(alarmActive ? color(150, 0, 0) : 70);
  rect(400, 150, 160, 350);
  quad(400, 150, 560, 150, 520, 120, 440, 120);
  pop();

  // Hour windows
  if(!alarmActive) {
    let currentHour = obj.hours;
    for(let col = 0; col < 6; col++) {
      for(let row = 0; row < 9; row++) {
        let windowIndex = row * 6 + col;
        let x = 410 + col * 25;
        let y = 170 + row * 35;
        fill(windowIndex < currentHour ? color(255, 255, 150, 200 + 55 * sin((obj.millis + windowIndex * 100) * 0.01)) : 0);
        rect(x, y, 15, 25);
      }
    }
  }

  // Debris particles
  if(alarmActive) {
    for(let i = debris.length - 1; i >= 0; i--) {
      let d = debris[i];
      fill(200, d.life);
      ellipse(d.x, d.y, d.size);
      d.x += d.speedX;
      d.y += d.speedY;
      d.speedY += 0.2;
      d.life -= 3;
      
      if(d.life < 0) debris.splice(i, 1);
    }
  }

  // Front buildings 
  fill(85);
  rect(538, 350, 220, 400);
  rect(530, 345, 240, 15); //top

  fill(100);
  rect(535, 275, 100, 400);
  rect(525, 275, 120, 15); //top

  fill(120);
  rect(350, 310, 100, 400);
  rect(340, 310, 120, 15); //top

  fill(100);
  rect(50, 350, 200, 400);
  rect(35, 340, 230, 15); //top

  // Road
  fill(30);
  rect(0, height - 50, width, 50);

  // Dashed center line
  fill(255, 255, 40);
  let dashWidth = 40;
  let gap = 20;
  for (let x = 0; x < width; x += dashWidth + gap) {
    rect(x, height - 25, dashWidth, 5);
  }

  // Seconds car
  let exactSeconds = obj.seconds + obj.millis/1000;
  let carX = map(exactSeconds, 0, 60, -280, width + 280);
  
  // Car body
  fill(59, 76, 102);
  rect(carX, height - 75, 105, 33, 15);
  
  // Car top
  ellipse(carX + 48, height - 80, 60, 60);
  fill(137, 201, 198);
  ellipse(carX + 48, height - 80, 40, 40);
  fill(59, 76, 102);
  rect(carX + 43, height - 100, 8, 50);
  
  // Wheels
  fill(0);
  ellipse(carX + 20, height - 50, 30, 30);
  ellipse(carX + 85, height - 50, 30, 30);

  // Text
  let textX = carX - 240;
  textSize(65);
  textFont("Roboto");
  let flicker = alarmActive ? random(0.5, 1.5) : 1;
  
  // Glow effect
  noFill();
  for(let i = 0; i < 8; i++) {
    stroke(255, 0, 0, (40 - i*5) * flicker);
    strokeWeight(15 + random(-1.5, 1.5));
    text("CLOCK", textX, 440);
  }

  // Main text
  noStroke();
  fill(255, 0, 0, map(flicker, 0.5, 1.5, 150, 255));
  text("CLOCK", textX, 440);

  // Trailer
  fill(59, 76, 102);
  rect(textX - 15, 434, 235, 16);
  fill(0);
  ellipse(textX + 10, height - 50, 30, 30);
  ellipse(textX + 235, height - 50, 30, 30);
}