const curriculum = {
  grades: [
    { id: "year2", label: "Year 2" },
    { id: "year3", label: "Year 3" },
    { id: "year4", label: "Year 4" },
    { id: "year5", label: "Year 5" },
    { id: "year6", label: "Year 6" },
    { id: "year7", label: "Year 7" },
    { id: "year8", label: "Year 8" },
    { id: "year9", label: "Year 9" },
    { id: "year10", label: "Year 10" },
    { id: "year11", label: "Year 11" },
    { id: "alevel", label: "A Levels" }
  ],
  subjects: [
    {
      id: "maths",
      label: "Maths",
      topics: [
        makeTopic("literal-calculation", "Literal calculation", mathsLiteralQuestions),
        makeTopic("fractions", "Fractions", mathsFractionsQuestions),
        makeTopic("geometry", "Geometry", mathsGeometryQuestions),
        makeTopic("algebra", "Algebra", mathsAlgebraQuestions),
        makeTopic("percentages", "Percentages", mathsPercentagesQuestions),
        makeTopic("equations", "Equations", mathsEquationsQuestions)
      ]
    },
    {
      id: "english",
      label: "English",
      topics: [
        makeTopic("grammar", "Grammar", englishGrammarQuestions),
        makeTopic("reading", "Reading comprehension", englishReadingQuestions)
      ]
    },
    {
      id: "history",
      label: "History",
      topics: [
        makeTopic("chronology", "Chronology", historyChronologyQuestions),
        makeTopic("sources", "Historical sources", historySourcesQuestions)
      ]
    },
    {
      id: "geography",
      label: "Geography",
      topics: [
        makeTopic("maps", "Maps and scale", geographyMapsQuestions),
        makeTopic("climate", "Climate", geographyClimateQuestions)
      ]
    },
    {
      id: "science",
      label: "Science",
      topics: [
        makeTopic("biology", "Biology", scienceBiologyQuestions),
        makeTopic("physics", "Physics", sciencePhysicsQuestions)
      ]
    },
    {
      id: "technology",
      label: "Technology",
      topics: [
        makeTopic("coding", "Coding fundamentals", technologyCodingQuestions),
        makeTopic("digital-safety", "Digital safety", technologySafetyQuestions)
      ]
    }
  ]
};

function makeTopic(id, label, questionBuilder) {
  return { id, label, questionBuilder };
}

function getLevelBand(gradeId) {
  const order = curriculum.grades.map((grade) => grade.id);
  const index = order.indexOf(gradeId);
  if (index <= 2) return "primary-lower";
  if (index <= 5) return "primary-upper";
  if (index <= 8) return "secondary";
  if (index === 9) return "gcse";
  return "alevel";
}

function mathsLiteralQuestions(level) {
  if (level === "alevel") return [
    q("If a = 2 and b = -3, evaluate 4a² - 2ab.", ["4", "28", "34", "-34"], 1, "4(4) - 2(2)(-3) = 16 + 12 = 28."),
    q("Given p = 3, q = 5, evaluate (2p + q)/(p).", ["11/3", "13/3", "5", "3"], 0, "(6+5)/3 = 11/3."),
    q("Evaluate k² - 3k + 2 for k = -1.", ["0", "2", "6", "8"], 2, "1 + 3 + 2 = 6.")
  ];
  if (level === "gcse" || level === "secondary") return [
    q("If x = 4 and y = 2, evaluate 3x + y.", ["10", "12", "14", "16"], 2, "3×4 + 2 = 14."),
    q("If m = 6, evaluate 5m - 8.", ["22", "24", "26", "28"], 0, "30 - 8 = 22."),
    q("If a = 3, b = 4, find a² + b.", ["7", "12", "13", "16"], 2, "9 + 4 = 13.")
  ];
  return [
    q("If x = 5, what is x + 3?", ["6", "7", "8", "9"], 2, "5 + 3 = 8."),
    q("If y = 2, what is 2y?", ["2", "3", "4", "6"], 2, "2 × 2 = 4."),
    q("If n = 4, what is n - 1?", ["2", "3", "4", "5"], 1, "4 - 1 = 3.")
  ];
}

function mathsFractionsQuestions(level) { return genericMathSet(level, "fractions"); }
function mathsGeometryQuestions(level) { return genericMathSet(level, "geometry"); }
function mathsAlgebraQuestions(level) { return genericMathSet(level, "algebra"); }
function mathsPercentagesQuestions(level) { return genericMathSet(level, "percentages"); }
function mathsEquationsQuestions(level) { return genericMathSet(level, "equations"); }

function genericMathSet(level, topic) {
  const sets = {
    fractions: {
      basic: [q("What is 1/2 + 1/4?", ["1/4", "2/4", "3/4", "1"], 2, "1/2 is 2/4, so total is 3/4."), q("Which is bigger?", ["1/3", "1/2", "Equal", "Can't tell"], 1, "One half is greater than one third."), q("What is 3/5 of 10?", ["5", "6", "7", "8"], 1, "10 ÷ 5 = 2 and 2 × 3 = 6.")],
      advanced: [q("Simplify 18/24.", ["2/3", "3/4", "4/5", "5/6"], 1, "Divide numerator and denominator by 6."), q("Compute 5/6 - 1/4.", ["7/12", "2/12", "1/2", "3/10"], 0, "Common denominator 12: 10/12 - 3/12 = 7/12."), q("Evaluate (3/5) ÷ (9/10).", ["2/3", "3/2", "1/3", "5/3"], 0, "Multiply by reciprocal: 3/5 × 10/9 = 2/3.")]
    },
    geometry: {
      basic: [q("How many sides does a hexagon have?", ["5", "6", "7", "8"], 1, "Hexagon means 6 sides."), q("A right angle is:", ["45°", "90°", "120°", "180°"], 1, "A right angle is 90 degrees."), q("Perimeter means:", ["Space inside", "Distance around", "Point in middle", "Shape type"], 1, "Perimeter is the distance around a shape.")],
      advanced: [q("Area of triangle with base 10 and height 8?", ["18", "40", "80", "20"], 1, "Area = 1/2 × 10 × 8 = 40."), q("Interior angle sum of a pentagon?", ["360°", "540°", "720°", "900°"], 1, "(5-2) × 180 = 540."), q("Circumference formula is:", ["2πr", "πr²", "r²", "d²"], 0, "Circumference of a circle is 2πr.")]
    },
    algebra: {
      basic: [q("What is x in x + 4 = 9?", ["3", "4", "5", "6"], 2, "Subtract 4 from 9."), q("Simplify 2a + 3a.", ["5", "5a", "6a", "a²"], 1, "Like terms add to 5a."), q("Value of 3n when n = 2?", ["3", "5", "6", "9"], 2, "3 × 2 = 6.")],
      advanced: [q("Expand 3(x + 4).", ["3x+4", "3x+12", "x+12", "7x"], 1, "Distribute 3 to both terms."), q("Factorise x² + 5x.", ["x(x+5)", "(x+5)²", "x²(5)", "x+5"], 0, "Take common factor x."), q("Solve 2x - 7 = 9.", ["x=1", "x=8", "x=7", "x=6"], 1, "2x = 16 so x = 8.")]
    },
    percentages: {
      basic: [q("10% of 50 is:", ["10", "5", "15", "20"], 1, "10% means divide by 10."), q("50% means:", ["a quarter", "a half", "double", "none"], 1, "50% is half."), q("25% of 20 is:", ["4", "5", "6", "7"], 1, "A quarter of 20 is 5.")],
      advanced: [q("Increase 80 by 15%.", ["90", "92", "95", "100"], 1, "15% of 80 is 12, total 92."), q("A price drops from 60 to 48. % decrease?", ["10%", "20%", "25%", "30%"], 1, "Drop is 12 on 60 => 20%."), q("If 30% is 45, whole amount is:", ["120", "135", "150", "160"], 2, "45 ÷ 0.3 = 150.")]
    },
    equations: {
      basic: [q("Solve x + 7 = 12.", ["3", "4", "5", "6"], 2, "12 - 7 = 5."), q("Solve 3x = 15.", ["3", "4", "5", "6"], 2, "Divide by 3."), q("Solve y - 2 = 9.", ["7", "9", "11", "13"], 2, "Add 2 to both sides.")],
      advanced: [q("Solve 4x + 3 = 19.", ["3", "4", "5", "6"], 1, "4x = 16 so x = 4."), q("Solve 3(x - 2)=12.", ["4", "5", "6", "8"], 2, "x - 2 = 4 so x = 6."), q("Solve 2x + 5 = x + 12.", ["5", "6", "7", "8"], 2, "x = 7.")]
    }
  };

  const pool = level === "primary-lower" || level === "primary-upper" ? sets[topic].basic : sets[topic].advanced;
  return pool;
}

function englishGrammarQuestions(level) {
  return level === "alevel"
    ? [q("Identify the subordinate clause: 'Although it rained, we played.'", ["Although it rained", "we played", "it rained", "Although"], 0, "It depends on the main clause to complete meaning."), q("Choose the correct sentence.", ["Each of the students are ready.", "Each of the students is ready.", "Each students are ready.", "Each is of students ready."], 1, "'Each' takes singular verb 'is'."), q("Which is a modal verb?", ["because", "might", "happy", "running"], 1, "Modal verbs express possibility/necessity.")]
    : [q("Choose the correct sentence.", ["She don't like apples.", "She doesn't like apples.", "She not likes apples.", "She doesn't likes apples."], 1, "With 'she' use 'doesn't' + base verb."), q("Which word is an adjective?", ["quickly", "teacher", "bright", "run"], 2, "Adjective describes a noun."), q("Pick the correct punctuation.", ["Lets eat, grandma!", "Let's eat, grandma!", "Lets eat grandma", "Let's, eat grandma"], 1, "Apostrophe marks missing letter in let's.")];
}

function englishReadingQuestions(level) { return [q("A text's main idea is:", ["A small detail", "Its central message", "Only the title", "A random fact"], 1, "Main idea is what the text is mostly about."), q("When you infer, you:", ["copy words", "guess without evidence", "use clues and prior knowledge", "ignore context"], 2, "Inference combines clues and knowledge."), q("A reliable source usually:", ["has no author", "uses evidence", "avoids dates", "uses only opinions"], 1, "Reliable texts support claims with evidence.")]; }
function historyChronologyQuestions(level) { return [q("Chronology means:", ["Map reading", "Order of events in time", "Weather study", "Population study"], 1, "Chronology is timeline order."), q("Which happened first?", ["Moon landing 1969", "WWII 1939", "Internet public 1990s", "Titanic 1912"], 3, "Titanic sank in 1912."), q("A century is:", ["10 years", "50 years", "100 years", "1000 years"], 2, "Century equals 100 years.")]; }
function historySourcesQuestions(level) { return [q("A diary from 1914 is a:", ["Primary source", "Secondary source", "Myth", "Poster"], 0, "It was written during the time."), q("Why compare two sources?", ["To increase bias", "To check reliability", "To remove context", "To avoid evidence"], 1, "Cross-checking improves reliability."), q("Which is secondary source?", ["Letter from soldier", "Modern textbook", "Old newspaper", "Speech recording"], 1, "Textbook interprets past events later.")]; }
function geographyMapsQuestions(level) { return [q("Map scale 1:1000 means 1 cm equals:", ["10 m", "100 m", "1000 m", "1 m"], 0, "1 cm on map equals 1000 cm = 10 m."), q("A compass rose shows:", ["Population", "Directions", "Temperature", "Distance"], 1, "It shows N, S, E, W directions."), q("Contour lines close together mean:", ["Flat land", "Steep slope", "River", "Forest"], 1, "Closer contours = steeper gradient.")]; }
function geographyClimateQuestions(level) { return [q("Climate describes:", ["Today's weather", "Long-term weather patterns", "Soil type", "Only rainfall"], 1, "Climate is long-term average weather."), q("Which biome is driest?", ["Rainforest", "Desert", "Tundra", "Savanna"], 1, "Deserts receive very little rain."), q("Greenhouse gases mainly cause:", ["Longer rivers", "Global warming", "Earthquakes", "Volcanoes"], 1, "They trap more heat in atmosphere.")]; }
function scienceBiologyQuestions(level) { return [q("Photosynthesis mainly happens in:", ["Roots", "Leaves", "Flowers", "Seeds"], 1, "Leaves contain chloroplasts."), q("Cells are:", ["Organs", "Basic units of life", "Tissues", "Systems"], 1, "Cells are the smallest living units."), q("Human gas needed for respiration:", ["Nitrogen", "Oxygen", "Carbon dioxide", "Helium"], 1, "Respiration uses oxygen.")]; }
function sciencePhysicsQuestions(level) { return [q("Force unit is:", ["Joule", "Newton", "Volt", "Watt"], 1, "Force is measured in newtons."), q("Speed =", ["Distance × Time", "Distance ÷ Time", "Time ÷ Distance", "Mass × Acceleration"], 1, "Speed formula is distance over time."), q("Energy cannot be:", ["Converted", "Transferred", "Destroyed", "Stored"], 2, "Conservation says it is not destroyed.")]; }
function technologyCodingQuestions(level) { return [q("A loop in coding is used to:", ["Store images", "Repeat instructions", "Delete internet", "Print hardware"], 1, "Loops repeat code blocks."), q("An algorithm is:", ["A random guess", "Step-by-step instructions", "Computer brand", "Power cable"], 1, "Algorithms describe precise steps."), q("Debugging means:", ["Creating bugs", "Fixing code errors", "Formatting fonts", "Installing games"], 1, "Debugging removes code errors.")]; }
function technologySafetyQuestions(level) { return [q("Strong password includes:", ["Only name", "Only numbers", "Mixed letters, numbers, symbols", "Birthday only"], 2, "Mixing character types improves security."), q("Phishing is:", ["Safe email", "Attempt to steal data", "System update", "Cloud storage"], 1, "Phishing tricks users into revealing information."), q("Two-factor authentication adds:", ["A second security step", "More ads", "Faster Wi-Fi", "Lower battery"], 0, "It requires an extra verification step.")]; }

function q(question, options, answer, explanation) {
  return { question, options, answer, explanation };
}
