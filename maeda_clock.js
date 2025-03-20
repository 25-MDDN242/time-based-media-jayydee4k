// Update this function to draw you own maeda clock on a 960x500 canvas
function draw_clock(obj) {

  
  // YOUR MAIN CLOCK CODE GOES HERE
  background(0);

  fill(200); // dark grey
  strokeWeight(0)
  // 1
  rect(100, 100, 55, 250, 20,); //x, y 

  // 0
  rect(200, 145, 55, 150, 20);
  rect(220, 120, 110, 55, 20);
  rect(220, 260, 110, 55, 20);
  rect(300, 145, 55, 150, 20);

  // :
  rect(400, 145, 50, 50, 20);
  rect(400, 250, 50, 50, 20);

  // 0 
  rect(500, 145, 55, 150, 20);
  rect(520, 120, 110, 55, 20);
  rect(520, 260, 110, 55, 20);
  rect(600, 145, 55, 150, 20);

  // 0 
  rect(700, 145, 55, 150, 20);
  rect(720, 120, 110, 55, 20);
  rect(720, 260, 110, 55, 20);
  rect(800, 145, 55, 150, 20);
}
