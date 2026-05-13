import p5 from 'p5';

export const electricCircuitsSketch = (p: p5) => {
  let isOn = false;

  p.setup = () => {
    const container = p.select('canvas')?.elt?.parentElement;
    const width = container?.offsetWidth || 600;
    const height = container?.offsetHeight || 400;
    p.createCanvas(width, height);
  };

  p.draw = () => {
    p.background(255);
    const options = (p as any).customOptions || {};
    isOn = options.isHeating || false;

    p.translate(p.width/2, p.height/2);

    // Wires
    p.noFill();
    p.stroke(30, 41, 59);
    p.strokeWeight(4);
    p.rect(-150, -100, 300, 200, 20);

    // Battery
    p.fill(220);
    p.rect(-180, -30, 60, 60, 5);
    p.fill(30, 41, 59);
    p.rect(-180, -10, 10, 20);
    p.fill(244, 63, 94);
    p.rect(-130, -10, 10, 20);

    // Switch
    p.fill(255);
    p.stroke(30, 41, 59);
    p.rect(140, -30, 20, 60);
    if (!isOn) {
      p.strokeWeight(6);
      p.line(150, -30, 180, -60);
    } else {
      p.strokeWeight(6);
      p.line(150, -30, 150, 30);
    }

    // Bulb
    p.push();
    p.translate(0, -100);
    if (isOn) {
      // Glow
      for (let i = 0; i < 5; i++) {
        p.fill(234, 179, 8, 50 - i * 10);
        p.noStroke();
        p.circle(0, 0, 80 + i * 20);
      }
      p.fill(253, 224, 71);
    } else {
      p.fill(241, 245, 249);
    }
    p.stroke(30, 41, 59);
    p.strokeWeight(3);
    p.ellipse(0, 0, 60, 60);
    p.fill(148, 163, 184);
    p.rect(-15, 25, 30, 20);
    p.pop();

    // Electrons
    if (isOn) {
      const time = p.frameCount * 0.05;
      p.fill(6, 182, 212);
      p.noStroke();
      for (let i = 0; i < 10; i++) {
        const offset = (i / 10 + time) % 1;
        let x, y;
        if (offset < 0.25) {
          x = p.lerp(-150, 150, offset * 4);
          y = -100;
        } else if (offset < 0.5) {
          x = 150;
          y = p.lerp(-100, 100, (offset - 0.25) * 4);
        } else if (offset < 0.75) {
          x = p.lerp(150, -150, (offset - 0.5) * 4);
          y = 100;
        } else {
          x = -150;
          y = p.lerp(100, -100, (offset - 0.75) * 4);
        }
        p.circle(x, y, 8);
      }
    }
  };
};
