import p5 from 'p5';

export const factoryTankSketch = (p: p5) => {
  let waterLevel = 0;
  let temp = 25;
  let isHeating = false;
  let steam: {x: number, y: number, opacity: number, size: number}[] = [];
  let refractionOffset = 0;

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
    isHeating = options.isHeating || false;

    // --- PHYSICS & LOGIC ---
    if (isHeating) {
      temp = p.lerp(temp, 98, 0.005);
      waterLevel = p.lerp(waterLevel, p.height * 0.45, 0.015);
      
      // Fine vapor particulates
      if (p.frameCount % 8 === 0 && temp > 65) {
        steam.push({
          x: p.width/2 + p.random(-25, 25),
          y: p.height/2 - 100,
          opacity: 100,
          size: p.random(2, 6)
        });
      }
    } else {
      temp = p.lerp(temp, 22, 0.008);
      waterLevel = p.lerp(waterLevel, 0, 0.01);
    }

    // Refraction shimmer at high temperatures
    refractionOffset = p.sin(p.frameCount * 0.1) * p.map(temp, 25, 100, 0, 2);

    // Filter dead particles
    steam = steam.filter(s => s.opacity > 0);
    p.noStroke();
    steam.forEach(s => {
      s.y -= 1.2;
      s.x += p.sin(p.frameCount * 0.05 + s.y) * 0.4;
      s.opacity -= 0.8;
      p.fill(148, 163, 184, s.opacity);
      p.circle(s.x, s.y, s.size);
    });

    // --- RENDERING ---
    
    // 1. Technical Workbench Grid
    p.stroke(226, 232, 240);
    p.strokeWeight(1);
    for(let i = 0; i < p.width; i += 40) p.line(i, 0, i, p.height);
    for(let i = 0; i < p.height; i += 40) p.line(0, i, p.width, i);

    // 2. Structural Floor/Base
    p.stroke(30, 41, 59);
    p.strokeWeight(2);
    p.line(0, p.height - 40, p.width, p.height - 40);

    // 3. Laboratory Setup
    p.push();
    p.translate(p.width / 2, p.height - 120);
    
    // Industrial Heating Element (Base)
    p.stroke(15, 23, 42);
    p.strokeWeight(3);
    p.fill(30, 41, 59);
    p.rect(-60, 0, 120, 25, 2);
    
    // Heat Coil Visuals
    if (isHeating) {
      const glowStr = p.map(temp, 25, 100, 50, 255);
      p.stroke(244, 63, 94, glowStr);
      for(let i = -40; i <= 40; i += 10) {
        p.line(i, 4, i, 10);
      }
    }

    // Support Rods
    p.stroke(100, 116, 139);
    p.strokeWeight(4);
    p.line(-100, 0, -100, -300);
    p.strokeWeight(2);
    p.line(-100, -280, -20, -280); // Top clamp
    p.line(-100, -120, -70, -120); // Mid steady

    // 4. THE TANK (Glass Cylinder Style)
    p.translate(0, -5);
    
    // Container Shadow
    p.noStroke();
    p.fill(0, 5);
    p.ellipse(0, 5, 130, 15);

    // Glass Boundaries
    p.stroke(15, 23, 42);
    p.strokeWeight(2);
    p.fill(255, 255, 255, 60);
    const tWidth = 120;
    const tHeight = 240;
    p.rect(-tWidth/2, -tHeight, tWidth, tHeight, 2);
    
    // Volumetric Scale (Etched)
    p.stroke(15, 23, 42, 100);
    p.strokeWeight(1);
    for(let i = 0; i <= tHeight; i += 20) {
      const w = i % 100 === 0 ? 15 : 8;
      p.line(-tWidth/2, -i, -tWidth/2 + w, -i);
    }

    // 5. LIQUID (Thermal Simulation)
    p.noStroke();
    const liquidCol = p.lerpColor(p.color(14, 165, 233), p.color(56, 189, 248), p.map(temp, 25, 100, 0, 1));
    const lr = p.red(liquidCol);
    const lg = p.green(liquidCol);
    const lb = p.blue(liquidCol);
    p.fill(lr, lg, lb, 140);
    
    const baseLiquidHeight = tHeight * 0.75;
    const thermalExp = p.map(temp, 25, 100, 0, 30);
    const currentLiquidHeight = baseLiquidHeight + thermalExp;
    
    p.rect(-tWidth/2 + 2, -currentLiquidHeight, tWidth - 4, currentLiquidHeight - 2, 0, 0, 2, 2);
    
    // Surface tension reflection
    p.fill(255, 100);
    p.rect(-tWidth/2 + 2, -currentLiquidHeight, tWidth - 4, 3);

    // 6. EXPANSION PROBE (Precision tube)
    p.stroke(15, 23, 42);
    p.strokeWeight(3);
    const pWidth = 14;
    const pHeight = 350;
    p.noFill();
    p.rect(-pWidth/2, -tHeight - (pHeight - tHeight), pWidth, pHeight - tHeight + 10);
    
    // Expanded fluid in probe
    p.noStroke();
    p.fill(14, 165, 233);
    p.rect(-pWidth/2 + 2, -tHeight - waterLevel, pWidth - 4, waterLevel);
    
    p.pop();

    // 7. DATA ACQUISITION TERMINAL
    const dbX = 40, dbY = 40;
    p.fill(30, 41, 59, 240);
    p.noStroke();
    p.rect(dbX, dbY, 240, 160, 2);
    
    p.fill(56, 189, 248);
    p.textStyle(p.BOLD);
    p.textSize(9);
    p.text('VOLUMETRIC THERMAL ANALYSIS', dbX + 20, dbY + 25);
    
    p.fill(255);
    p.textSize(32);
    p.text(`${p.nf(temp, 1, 1)}°C`, dbX + 20, dbY + 65);
    
    // Volumetric Delta Readout
    const vDelta = p.map(waterLevel, 0, p.height*0.45, 0, 45.2);
    p.textSize(10);
    p.fill(148, 163, 184);
    p.text('EXPANSION DELTA:', dbX + 20, dbY + 95);
    p.fill(255);
    p.text(`+ ${p.nf(vDelta, 1, 2)} mm³`, dbX + 20, dbY + 110);

    // Status Indicator
    const heatColor = isHeating ? p.color(244, 63, 94) : p.color(148, 163, 184);
    const hr = p.red(heatColor);
    const hg = p.green(heatColor);
    const hb = p.blue(heatColor);
    p.fill(hr, hg, hb);
    p.stroke(hr, hg, hb, 100);
    p.strokeWeight(4);
    p.noFill();
    p.circle(dbX + 20, dbY + 135, 6);
    p.noStroke();
    p.fill(255, 180);
    p.text(isHeating ? 'THERMAL ENERGY ACTIVE' : 'EQUILIBRIUM STATE', dbX + 35, dbY + 139);
  };

  p.windowResized = () => {
    const container = p.select('canvas')?.elt?.parentElement;
    if (container) {
      p.resizeCanvas(container.offsetWidth, container.offsetHeight);
    }
  };
};
