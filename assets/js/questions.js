const quizBank = {
  math: [
    {
      question: "What is the value of x in 3x + 5 = 20?",
      options: ["x = 3", "x = 4", "x = 5", "x = 6"],
      answer: 2,
      explanation: "Subtract 5 then divide by 3: x = 15 / 3 = 5."
    },
    {
      question: "Which number is prime?",
      options: ["21", "39", "43", "51"],
      answer: 2,
      explanation: "43 has only two divisors: 1 and 43."
    },
    {
      question: "What is the area of a rectangle with length 8 cm and width 3 cm?",
      options: ["11 cm²", "24 cm²", "16 cm²", "28 cm²"],
      answer: 1,
      explanation: "Area = length × width = 8 × 3 = 24 cm²."
    },
    {
      question: "A right angle measures:",
      options: ["45°", "90°", "120°", "180°"],
      answer: 1,
      explanation: "By definition, a right angle equals 90°."
    }
  ],
  english: [
    {
      question: "Choose the correct sentence:",
      options: ["She don't like apples.", "She doesn't likes apples.", "She doesn't like apples.", "She not like apples."],
      answer: 2,
      explanation: "With 'she', use 'doesn't' + base verb: like."
    },
    {
      question: "What is a synonym of 'rapid'?",
      options: ["Slow", "Quick", "Heavy", "Soft"],
      answer: 1,
      explanation: "'Rapid' and 'quick' have similar meanings."
    },
    {
      question: "Which word is an adjective?",
      options: ["Happily", "Teacher", "Beautiful", "Run"],
      answer: 2,
      explanation: "'Beautiful' describes a noun, so it is an adjective."
    },
    {
      question: "In reading, the main idea is:",
      options: ["A minor detail", "The central message of the text", "The title only", "A character name"],
      answer: 1,
      explanation: "The main idea is the key point the text communicates."
    }
  ],
  history: [
    {
      question: "The French Revolution began in:",
      options: ["1776", "1789", "1815", "1914"],
      answer: 1,
      explanation: "The French Revolution started in 1789."
    },
    {
      question: "Who was the first emperor of Rome?",
      options: ["Julius Caesar", "Augustus", "Nero", "Trajan"],
      answer: 1,
      explanation: "Augustus became Rome's first emperor in 27 BCE."
    },
    {
      question: "The Industrial Revolution first developed strongly in:",
      options: ["Brazil", "United Kingdom", "Japan", "Russia"],
      answer: 1,
      explanation: "It began in Great Britain in the 18th century."
    },
    {
      question: "A primary source is:",
      options: ["A modern textbook", "A video summary", "A document from the time studied", "A fictional novel"],
      answer: 2,
      explanation: "Primary sources are original materials from the historical period."
    }
  ],
  geography: [
    {
      question: "What is the longest river in the world (commonly taught answer)?",
      options: ["Nile", "Amazon", "Danube", "Mississippi"],
      answer: 0,
      explanation: "Many school programs cite the Nile as the longest river."
    },
    {
      question: "Which layer of Earth has tectonic plates?",
      options: ["Inner core", "Outer core", "Crust", "Mantle only"],
      answer: 2,
      explanation: "Tectonic plates are parts of Earth's crust (lithosphere)."
    },
    {
      question: "A country with very low annual rainfall is likely to have a:",
      options: ["Tropical climate", "Polar ocean climate", "Desert climate", "Temperate rainforest climate"],
      answer: 2,
      explanation: "Desert climates are defined by low precipitation."
    },
    {
      question: "A map scale helps you:",
      options: ["Change time zones", "Calculate real distances", "Predict earthquakes", "Find latitude only"],
      answer: 1,
      explanation: "Map scales convert map distances into real-world distances."
    }
  ],
  science: [
    {
      question: "What particle has a negative electric charge?",
      options: ["Proton", "Neutron", "Electron", "Nucleus"],
      answer: 2,
      explanation: "Electrons carry negative charge."
    },
    {
      question: "Photosynthesis mainly occurs in which plant part?",
      options: ["Roots", "Leaves", "Flowers", "Seeds"],
      answer: 1,
      explanation: "Leaves contain chloroplasts where photosynthesis happens."
    },
    {
      question: "When water boils at sea level, it changes from:",
      options: ["Gas to liquid", "Solid to liquid", "Liquid to gas", "Gas to solid"],
      answer: 2,
      explanation: "Boiling is the phase change from liquid to gas."
    },
    {
      question: "The unit of force is:",
      options: ["Watt", "Joule", "Newton", "Volt"],
      answer: 2,
      explanation: "Force is measured in newtons (N)."
    }
  ],
  technology: [
    {
      question: "What does CPU stand for?",
      options: ["Central Process Unit", "Central Processing Unit", "Computer Primary Unit", "Core Programming Utility"],
      answer: 1,
      explanation: "CPU means Central Processing Unit."
    },
    {
      question: "In coding, a loop is used to:",
      options: ["Store images", "Repeat instructions", "Delete files", "Create passwords"],
      answer: 1,
      explanation: "Loops repeat a block of instructions."
    },
    {
      question: "A strong password should include:",
      options: ["Only first name", "Only numbers", "Mixed letters, numbers, and symbols", "Birthdate only"],
      answer: 2,
      explanation: "Combining character types makes passwords stronger."
    },
    {
      question: "Which is an example of cloud storage?",
      options: ["USB key", "External hard drive", "Online drive service", "Printed folder"],
      answer: 2,
      explanation: "Cloud storage saves files on remote internet servers."
    }
  ],
  "french-grammar": [
    {
      question: "Choose the correct agreement: 'Les fleurs sont ...'",
      options: ["beau", "belle", "beaux", "belles"],
      answer: 3,
      explanation: "'Fleurs' is feminine plural, so use 'belles'."
    },
    {
      question: "In French, the infinitive form of a verb is:",
      options: ["Mange", "Mangent", "Manger", "Mangé"],
      answer: 2,
      explanation: "'Manger' is the infinitive form."
    },
    {
      question: "Which sentence is correct?",
      options: ["Je suis allé au marché.", "Je suis aller au marché.", "Je suis allée au marché. (for a male speaker)", "Je suis allés au marché."],
      answer: 0,
      explanation: "Past participle agrees with gender/number when used with 'être'."
    },
    {
      question: "The pronoun replacing 'Marie et moi' is:",
      options: ["Nous", "Vous", "Ils", "Elle"],
      answer: 0,
      explanation: "'Marie et moi' corresponds to first person plural: nous."
    }
  ]
};
