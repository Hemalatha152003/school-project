import p5 from 'p5';

export const thermalExpansionSketch = (p: p5) => {
  let waterLevel = 150;
  let targetLevel = 150;
  let temperature = 20;
  let isHeating = false;

  p.setup = () => {
    // Parent should be the relative div in ActivityViewer
    const container = p.select('canvas')?.elt?.parentElement;
    const width = container?.offsetWidth || 600;
    const height = container?.offsetHeight || 400;
    p.createCanvas(width, height);
  };

  p.draw = () => {
    p.background(255);
    
    // Get options from wrapper if available
    const options = (p as any).customOptions || {};
    isHeating = options.isHeating || false;

    // Update Temperature and Water Level
    if (isHeating) {
      temperature = p.lerp(temperature, 100, 0.01);
    } else {
      temperature = p.lerp(temperature, 20, 0.01);
    }

    // Mapping expansion: 20C -> 150 (bottom), 100C -> 300 (top)
    targetLevel = p.map(temperature, 20, 100, 150, 350);
    waterLevel = p.lerp(waterLevel, targetLevel, 0.05);

    // Draw Flask
    p.push();
    p.translate(p.width / 2, p.height - 100);
    
    // Bottle body
    p.noFill();
    p.stroke(30, 41, 59); // Slate 900
    p.strokeWeight(4);
    p.ellipse(0, 0, 160, 160);
    
    // Coloured Water in Bottle
    p.fill(6, 182, 212, 120);
    p.noStroke();
    p.arc(0, 0, 154, 154, p.PI * 0.1, p.PI * 0.9, p.CHORD);
    
    // Cork
    p.fill(139, 69, 19);
    p.rect(-40, -90, 80, 25, 8);
    
    // Refill tube
    p.stroke(30, 41, 59, 150);
    p.strokeWeight(3);
    p.line(-12, -100, -12, -450);
    p.line(12, -100, 12, -450);
    
    // Water in tube
    p.fill(6, 182, 212);
    p.noStroke();
    const tubeWaterHeight = p.map(waterLevel, 150, 350, 0, 300);
    p.rect(-11, -100 - tubeWaterHeight, 22, tubeWaterHeight, 2);
    
    // Scale
    p.stroke(30, 41, 59, 100);
    p.strokeWeight(1);
    for (let i = 0; i <= 350; i += 30) {
      p.line(20, -100 - i, 35, -100 - i);
    }
    
    p.pop();

    // Heat Source
    if (isHeating) {
      p.push();
      p.translate(p.width / 2, p.height - 40);
      p.noStroke();
      for (let i = 0; i < 12; i++) {
        p.fill(239, 68, 68, p.random(100, 200));
        p.ellipse(p.random(-15, 15), p.random(-15, 15), 25, 25);
      }
      p.pop();
    }

    // UI Text
    p.fill(30, 41, 59);
    p.noStroke();
    p.textFont('Inter');
    p.textStyle(p.BOLD);
    p.textSize(24);
    p.textAlign(p.CENTER);
    p.text(`${p.floor(temperature)}°C`, p.width / 2, p.height - 100);
    
    p.textSize(12);
    p.fill(71, 85, 105);
    p.text('CORE TEMPERATURE', p.width / 2, p.height - 75);
  };

  p.windowResized = () => {
    const container = p.select('canvas')?.elt?.parentElement;
    if (container) {
      p.resizeCanvas(container.offsetWidth, container.offsetHeight);
    }
  };
};
