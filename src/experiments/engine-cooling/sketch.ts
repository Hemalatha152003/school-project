import p5 from 'p5';

export const engineCoolingSketch = (p: p5) => {
  let engineTemp = 25;
  let coolantTemp = 25;
  let ambientTemp = 25;
  let optimalTemp = 95;
  let coolantLevel = 0;
  let isRunning = false;
  let fanAngle = 0;
  let engineVibration = 0;
  
  // Dynamic variables
  let load = 0;
  let fanSpeed = 0;

  p.setup = () => {
    const container = p.select('canvas')?.elt?.parentElement;
    const width = container?.offsetWidth || 600;
    const height = container?.offsetHeight || 400;
    p.createCanvas(width, height);
    p.rectMode(p.CORNER);
  };

  p.draw = () => {
    p.background(248, 250, 252); // Slate 50
    
    const options = (p as any).customOptions || {};
    isRunning = options.isHeating || false;

    // --- PHYSICS ENGINE ---
    if (isRunning) {
      load = p.lerp(load, 0.8, 0.01);
      // Heat generation proportional to load
      engineTemp += (load * 0.2); 
    } else {
      load = p.lerp(load, 0, 0.05);
      // Natural convection cooling
      engineTemp = p.lerp(engineTemp, ambientTemp, 0.002);
    }

    // Cooling Logic
    // Fan starts engaging subtly at 80C, aggressive at 100C
    const targetFanSpeed = p.map(p.constrain(engineTemp, 80, 110), 80, 110, 0, 0.6);
    fanSpeed = p.lerp(fanSpeed, targetFanSpeed, 0.05);
    fanAngle += fanSpeed;

    // Active cooling effect
    const coolingRate = fanSpeed * 0.15 + (load > 0 ? 0.02 : 0.05);
    if (engineTemp > ambientTemp) {
      engineTemp -= coolingRate;
    }

    // Coolant expansion based on pressure/heat
    coolantLevel = p.lerp(coolantLevel, p.map(p.constrain(engineTemp, 25, 120), 25, 120, 5, 95), 0.05);
    
    // Engine vibration based on stress (high temp or high load)
    engineVibration = p.map(p.constrain(engineTemp, 90, 120), 90, 120, 0, 2) * (isRunning ? 1 : 0);

    const centerX = p.width / 2;
    const centerY = p.height / 2;

    // --- RENDERING ---
    
    // 1. Technical Grid (Subtle)
    p.stroke(226, 232, 240); // Slate 200
    p.strokeWeight(1);
    for(let i = 0; i < p.width; i += 40) p.line(i, 0, i, p.height);
    for(let i = 0; i < p.height; i += 40) p.line(0, i, p.width, i);

    // 2. Coolant Circuit Lines
    p.noFill();
    p.stroke(203, 213, 225); // Slate 300
    p.strokeWeight(14);
    p.beginShape();
    p.vertex(centerX - 100, centerY - 40);
    (p as any).bezierVertex(centerX - 20, centerY - 40, centerX + 20, centerY - 40, centerX + 80, centerY - 40);
    p.endShape();
    
    p.beginShape();
    p.vertex(centerX - 100, centerY + 60);
    (p as any).bezierVertex(centerX - 20, centerY + 60, centerX + 20, centerY + 60, centerX + 80, centerY + 60);
    p.endShape();

    // 3. Flow Indicator (Moving heat gradient)
    if (engineTemp > 40) {
      const flowColor = p.lerpColor(p.color(56, 189, 248), p.color(244, 63, 94), p.map(engineTemp, 40, 110, 0, 1));
      const r = p.red(flowColor);
      const g = p.green(flowColor);
      const b = p.blue(flowColor);
      p.stroke(r, g, b, 120);
      p.strokeWeight(8);
      p.line(centerX - 80, centerY - 40, centerX + 60, centerY - 40);
      p.line(centerX - 80, centerY + 60, centerX + 60, centerY + 60);
    }

    // 4. Engine Block
    p.push();
    p.translate(centerX - 200 + p.random(-engineVibration, engineVibration), centerY - 80 + p.random(-engineVibration, engineVibration));
    
    // Industrial Housing
    p.stroke(30, 41, 59); // Slate 900
    p.strokeWeight(3);
    p.fill(241, 245, 249);
    p.rect(0, 0, 180, 150, 4);
    
    // Thermal Stress Indicators
    if (engineTemp > 80) {
      const heatAlpha = p.map(p.constrain(engineTemp, 80, 115), 80, 115, 0, 150);
      p.noStroke();
      p.fill(225, 29, 72, heatAlpha);
      p.rect(10, 10, 160, 130, 2);
    }

    // Technical Markings
    p.stroke(71, 85, 105, 100);
    p.strokeWeight(1);
    for(let i = 20; i < 140; i += 12) p.line(10, i, 30, i);
    p.pop();

    // 5. Radiator Setup
    p.push();
    p.translate(centerX + 80, centerY - 90);
    p.strokeWeight(3);
    p.stroke(30, 41, 59);
    p.fill(51, 65, 85);
    p.rect(0, 0, 100, 170, 2);
    
    // High-density mesh
    p.stroke(15, 23, 42, 120);
    p.strokeWeight(1);
    for(let i = 5; i < 165; i += 4) p.line(5, i, 95, i);

    // Dynamic fan
    p.translate(50, 85);
    p.rotate(fanAngle);
    p.stroke(15, 23, 42);
    p.strokeWeight(10);
    p.fill(30, 41, 59);
    for (let i = 0; i < 6; i++) {
       p.rotate(p.TWO_PI / 6);
       p.line(0, 0, 40, 0);
       p.noStroke();
       p.ellipse(40, 0, 15, 35);
       p.stroke(15, 23, 42);
    }
    p.pop();

    // 6. Expansion Tank (Professional)
    p.push();
    p.translate(centerX + 200, centerY - 120);
    p.stroke(30, 41, 59);
    p.strokeWeight(2);
    p.fill(255, 255, 255, 200);
    p.rect(0, 0, 50, 100, 2);
    
    // Fluid
    p.noStroke();
    const fluidCol = p.lerpColor(p.color(34, 197, 94), p.color(249, 115, 22), p.map(engineTemp, 25, 110, 0, 1));
    const fr = p.red(fluidCol);
    const fg = p.green(fluidCol);
    const fb = p.blue(fluidCol);
    p.fill(fr, fg, fb, 180);
    const h = p.map(coolantLevel, 0, 100, 5, 90);
    p.rect(3, 97 - h, 44, h, 1);
    
    // Markings
    p.stroke(148, 163, 184);
    p.strokeWeight(1);
    p.line(5, 20, 10, 20); // MAX
    p.line(5, 80, 10, 80); // MIN
    p.pop();

    // 7. DASHBOARD TELEMETRY (Technical Overlay)
    const dbX = 40, dbY = 40;
    p.fill(30, 41, 59, 240);
    p.noStroke();
    p.rect(dbX, dbY, 260, 140, 2);
    
    p.fill(255);
    p.textStyle(p.BOLD);
    p.textSize(10);
    p.text('SYSTEM TELEMETRY v2.4', dbX + 20, dbY + 25);
    
    // Digital Readout
    p.textSize(36);
    p.text(`${p.nf(engineTemp, 1, 1)}°C`, dbX + 20, dbY + 65);
    
    // Status Bar
    const isOptimal = engineTemp >= 90 && engineTemp <= 100;
    const statusText = engineTemp > 105 ? 'WARNING: OVERHEAT' : (isOptimal ? 'OPTIMAL' : 'WARMING UP');
    const statusCol = engineTemp > 105 ? p.color(244, 63, 94) : (isOptimal ? p.color(34, 197, 94) : p.color(234, 179, 8));
    
    p.fill(statusCol);
    p.rect(dbX + 20, dbY + 80, 8, 8);
    p.textSize(10);
    p.text(statusText, dbX + 35, dbY + 88);

    // Cooling Load Bar
    p.fill(255, 40);
    p.rect(dbX + 20, dbY + 110, 220, 4);
    p.fill(56, 189, 248);
    p.rect(dbX + 20, dbY + 110, p.map(fanSpeed, 0, 0.6, 0, 220), 4);
    p.fill(255, 150);
    p.text('COOLING SYSTEM TASK LOAD', dbX + 20, dbY + 125);
  };

  p.windowResized = () => {
    const container = p.select('canvas')?.elt?.parentElement;
    if (container) {
      p.resizeCanvas(container.offsetWidth, container.offsetHeight);
    }
  };
};
