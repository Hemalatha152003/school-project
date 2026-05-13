import p5 from 'p5';

export const speedVsVelocitySketch = (p: p5) => {
  let pos = { x: 100, y: 100 };
  let path: {x: number, y: number}[] = [];
  let isMoving = false;

  p.setup = () => {
    const container = p.select('canvas')?.elt?.parentElement;
    const width = container?.offsetWidth || 600;
    const height = container?.offsetHeight || 400;
    p.createCanvas(width, height);
  };

  p.draw = () => {
    p.background(255);
    
    const options = (p as any).customOptions || {};
    isMoving = options.isHeating || false;

    // Grid
    p.stroke(240);
    for(let i=0; i<p.width; i+=40) p.line(i, 0, i, p.height);
    for(let i=0; i<p.height; i+=40) p.line(0, i, p.width, i);

    if (isMoving) {
      const angle = p.frameCount * 0.02;
      pos.x = p.width/2 + p.cos(angle) * 150 + p.sin(angle * 3) * 20;
      pos.y = p.height/2 + p.sin(angle) * 100;
      path.push({ ...pos });
      if (path.length > 200) path.shift();
    } else {
      path = [];
      pos = { x: p.width/2 - 150, y: p.height/2 };
    }

    // Draw Path (Distance)
    p.noFill();
    p.stroke(6, 182, 212, 100);
    p.strokeWeight(4);
    p.beginShape();
    path.forEach(pt => p.vertex(pt.x, pt.y));
    p.endShape();

    // Draw Displacement (Straight Line)
    if (path.length > 0) {
      p.stroke(244, 63, 94, 150);
      p.strokeWeight(2);
      if ((p as any).drawingContext?.setLineDash) {
        (p as any).drawingContext.setLineDash([5, 5]);
      }
      p.line(p.width/2 - 150, p.height/2, pos.x, pos.y);
      if ((p as any).drawingContext?.setLineDash) {
        (p as any).drawingContext.setLineDash([]);
      }
    }

    // Object
    p.fill(30, 41, 59);
    p.noStroke();
    p.circle(pos.x, pos.y, 20);

    // Label
    p.fill(30, 41, 59);
    p.textSize(12);
    p.textAlign(p.CENTER);
    p.text('DYNAMIC VECTOR TRACKER', p.width/2, 30);
  };
};
