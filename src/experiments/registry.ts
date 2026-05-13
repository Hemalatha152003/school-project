import { Activity } from '../types';

export const activities: Activity[] = [
  {
    id: 'thermal-expansion-liquids',
    title: 'Thermal Expansion of Liquids',
    slug: 'thermal-expansion-liquids',
    classLevel: 'Class 7',
    subject: 'Science',
    chapter: 'Heat and Temperature',
    category: 'Physics',
    thumbnail: 'https://images.unsplash.com/photo-1532187875605-1838d737054a?auto=format&fit=crop&q=80&w=800',
    shortDescription: 'Observe how liquids expand when heated and contract when cooled.',
    aim: 'To demonstrate the expansion of liquid upon heating and its contraction upon cooling.',
    materials: [
      'Small glass bottle',
      'Rubber cork with a hole',
      'Empty refill (transparent tube)',
      'Coloured water',
      'Candle',
      'Fork (to hold bottle)',
      'Paper scale'
    ],
    procedure: [
      'Fill a small glass bottle with coloured water.',
      'Pass the empty refill through the hole in the rubber cork.',
      'Fit the cork into the bottle to make it air-tight.',
      'Observe the initial level of water.',
      'Apply heat and watch the level rise.',
      'Remove heat and watch the level drop.'
    ],
    observation: 'The water level rises in the refill tube when the bottle is heated and falls back down when it cools.',
    results: 'Liquids expand on heating and contract on cooling.',
    difficulty: 'Beginner',
    realWorldApps: [
      'Mercury Thermometers: Used in clinical and industrial temperature monitoring.',
      'Engine Cooling: Overrun tanks in cars account for coolant expansion.',
      'Deep Sea Sensors: Understanding water density changes in oceanography.'
    ],
    quiz: [
      {
        question: 'What is the most common use of thermal expansion in daily life?',
        options: ['Microscopes', 'Thermometers', 'Electric Motors', 'Solar Panels'],
        correctAnswer: 1,
        explanation: 'Thermometers use the expansion of mercury or alcohol to accurately measure temperature.'
      }
    ]
  },
  {
    id: 'factory-tank-expansion',
    title: 'Factory Water Tank Expansion',
    slug: 'factory-tank-expansion',
    classLevel: 'Class 7',
    subject: 'Science',
    chapter: 'Heat and Temperature',
    category: 'Physics',
    thumbnail: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800',
    shortDescription: 'Industrial simulation of water tank expansion and safety vertical pipes.',
    aim: 'To demonstrate how industrial liquid storage systems manage thermal expansion.',
    materials: ['Large Industrial Tank', 'Vertical Safety Pipe', 'Internal Heating Element', 'Temperature Sensor'],
    procedure: [
      'Initialize the factory water storage module.',
      'Engage the internal heating sequence to simulate energy influx.',
      'Monitor the fluid dynamics as temperature increases.',
      'Observe the safety pipe level displacement.',
      'Deactivate heating and initiate cooling cycle.'
    ],
    observation: 'As thermal energy is added, the colored water expands and rises into the vertical pipe. Upon cooling, it retreats back into the main tank reservoir.',
    results: 'Thermal energy increases kinetic movement of water molecules, leading to macro-expansion.',
    difficulty: 'Intermediate',
    realWorldApps: [
      'Industrial Boilers: Preventing pressure buildup through expansion tanks.',
      'Chemical Synthesis: Managing volatile liquid volumes during reaction heat.',
      'Power Plants: Essential safety protocols in hydraulic cooling loops.'
    ],
    quiz: [
      {
        question: 'Why does the water level rise in the vertical pipe during heating?',
        options: ['Gravity decreases', 'Water molecules expand', 'The tank shrinks', 'Steam pushes it up'],
        correctAnswer: 1,
        explanation: 'Heat increases molecular kinetic energy, causing the liquid to take up more space (expansion).'
      },
      {
        question: 'Common industrial application for expansion systems?',
        options: ['Solar Panels', 'Steam Boilers', 'Lighting Circuits', 'Microscopes'],
        correctAnswer: 1,
        explanation: 'Boilers use expansion tanks to safely manage volume changes in hot water systems.'
      }
    ]
  },
  {
    id: 'engine-cooling-system',
    title: 'Car Engine Cooling System',
    slug: 'engine-cooling-system',
    classLevel: 'Class 7',
    subject: 'Science',
    chapter: 'Heat and Temperature',
    category: 'Physics',
    thumbnail: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&q=80&w=800',
    shortDescription: 'Explore how automobile radiators and coolant tanks manage engine heat.',
    aim: 'To understand the role of thermal expansion in automobile cooling engineering.',
    materials: ['Engine Block Model', 'Radiator Grid', 'Coolant Reservoir', 'Electric Fan'],
    procedure: [
      'Start the virtual combustion engine module.',
      'Observe the temperature gauge as the engine reaches operational heat.',
      'Watch the coolant expansion into the overflow reservoir.',
      'Engage the cooling fan prototype.',
      'Stop the engine and monitor the contraction phase.'
    ],
    observation: 'The coolant expands as the engine heats up, filling the reservoir tank. The cooling fan helps regulate the peak temperature.',
    results: 'Coolant liquid effectively manages engine heat through circulated expansion and contraction cycles.',
    difficulty: 'Advanced',
    realWorldApps: [
      'Automotive Radiators: Preventing engine seizure through heat dissipation.',
      'Aeronautical Systems: Fluid-based cooling in high-performance jet engines.',
      'HVAC Systems: Large scale building temperature regulation.'
    ],
    quiz: [
      {
        question: 'What happens to the coolant in the reservoir when the engine stops?',
        options: ['It boils over', 'It contracts and returns', 'It disappears', 'It stays the same'],
        correctAnswer: 1,
        explanation: 'As the engine cools, the liquid contracts and is drawn back into the main cooling circuit.'
      }
    ]
  },
  {
    id: 'speed-vs-velocity-act',
    title: 'Speed vs Velocity Tracker',
    slug: 'speed-vs-velocity',
    classLevel: 'Class 9',
    subject: 'Science',
    chapter: 'Motion',
    category: 'Physics',
    thumbnail: 'https://images.unsplash.com/photo-1506791065789-53e599283f5c?auto=format&fit=crop&q=80&w=400',
    shortDescription: 'Distinguish between rate of distance and rate of displacement.',
    aim: 'To understand the difference between scalar (Speed) and vector (Velocity) quantities.',
    materials: ['Interactive Map', 'Virtual Ruler', 'Digital Timer'],
    procedure: [
      'Move the object from Point A to Point B.',
      'Calculate the total path length (Distance).',
      'Calculate the direct line length (Displacement).',
      'Divide by time to see the difference between Speed and Velocity.'
    ],
    observation: 'Displacement is often less than distance unless moving in a perfectly straight line.',
    results: 'Velocity includes direction, while speed only considers magnitude.',
    difficulty: 'Intermediate',
    realWorldApps: [
      'Aviation: Pilots must use velocity (speed + direction) for navigation.',
      'Sports Science: Tracking player movement patterns in professional football.',
      'GPS Logic: Calculating ETAs based on road path vs direct distance.'
    ],
    quiz: []
  },
  {
    id: 'electric-circuits-intro',
    title: 'Building Simple Circuits',
    slug: 'electric-circuits',
    classLevel: 'Class 6',
    subject: 'Science',
    chapter: 'Electricity & Circuits',
    category: 'Physics',
    thumbnail: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&q=80&w=400',
    shortDescription: 'Learn how to form a complete circuit to glow a bulb.',
    aim: 'To identify the essential components of a complete electric circuit.',
    materials: ['Battery', 'Connecting Wires', 'Small Bulb', 'Switch'],
    procedure: [
      'Connect one terminal of the battery to the switch.',
      'Connect the switch to the bulb terminal.',
      'Complete the loop back to the other battery terminal.',
      'Close the switch and observe.'
    ],
    observation: 'The bulb glows only when the switch is ON and all wires are properly connected.',
    results: 'A closed path allows electricity to flow.',
    difficulty: 'Beginner',
    realWorldApps: [
      'Home Lighting: Standard switches control light bulbs in every room.',
      'Flashlights: Simple portable circuits for emergency lighting.',
      'Remote Controls: Battery-powered circuits for wireless operation.'
    ],
    quiz: []
  }
];
