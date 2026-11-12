const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;

let frame = 0;

function rect(x,y,w,h,color) {
  ctx.fillStyle = color;
  ctx.fillRect(Math.round(x),Math.round(y),w,h);
}

function penguin(x,y,scale=1) {
  ctx.save();
  ctx.translate(x,y);
  ctx.scale(scale,scale);
  // Corpo
  rect(4,4,24,30,'#202b40');
  rect(0,10,32,20,'#202b40');
  rect(8,12,16,18,'#fff8ed');
  rect(10,30,6,4,'#f5a623');
  rect(22,30,6,4,'#f5a623');
  // Olhos e bico
  rect(8,10,4,4,'white');
  rect(20,10,4,4,'white');
  rect(10,11,2,2,'#202b40');
  rect(22,11,2,2,'#202b40');
  rect(14,16,6,3,'#ffb52e');
  ctx.restore();
}

function flower(x,y) {
  rect(x+4,y+8,3,12,'#388e55');
  rect(x+1,y+13,5,3,'#388e55');
  rect(x+2,y+3,4,4,'#ff5d91');
  rect(x+7,y+3,4,4,'#ff5d91');
  rect(x+4,y,4,4,'#ff8eb0');
  rect(x+4,y+5,4,4,'#ff8eb0');
  rect(x+4,y+4,3,3,'#ffdc58');
}

function heart(x,y) {
  rect(x+2,y,3,3,'#ff5b83');
  rect(x+8,y,3,3,'#ff5b83');
  rect(x,y+3,13,4,'#ff5b83');
  rect(x+3,y+7,7,3,'#ff5b83');
  rect(x+5,y+10,3,2,'#ff5b83');
}

function draw() {
  frame++;
  ctx.clearRect(0,0,320,180);
  // Céu e neve
  rect(0,0,320,180,'#bce8fa');
  rect(0,125,320,55,'#f8fbff');
  // Flocos de neve
  for(let i=0;i<18;i++) {
    const x=(i*47+frame*.25)%320;
    const y=(i*29+frame*.4)%120;
    rect(x,y,2,2,'white');
  }
  // Chão
  rect(0,145,320,35,'#e7f4ff');
  // Pinguim da esquerda caminhando
  const progress=Math.min(frame/160,1);
  const x1=35+progress*83;
  const bounce=frame<160 ? Math.sin(frame*.2)*2 : 0;
  penguin(x1,108+bounce);
  // Pinguim que recebe a flor
  penguin(215,108);
  // Flor aparece na mão do primeiro quando se aproxima
  if(frame>105) {
    flower(165,111);
    rect(143,120,22,3,'#202b40');
  }
  // Corações quando a entrega acontece
  if(frame>160) {
    heart(174,75+Math.sin(frame*.08)*5);
    heart(205,59+Math.sin(frame*.1)*4);
    heart(245,78+Math.sin(frame*.07)*5);
    // Flor entre os pinguins
    flower(197,111);
  }
  // Mensagem final
  if(frame>190) {
    ctx.fillStyle='#a64d79';
    ctx.font='8px monospace';
    ctx.fillText('Feito com carinho!',112,35);
  }
  requestAnimationFrame(draw);
}

draw();