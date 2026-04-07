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
    { id: "maths", topics: ["literal-calculation", "fractions", "geometry", "algebra", "percentages", "equations"] },
    { id: "english", topics: ["grammar", "reading"] },
    { id: "history", topics: ["chronology", "sources"] },
    { id: "geography", topics: ["maps", "climate"] },
    { id: "science", topics: ["biology", "physics"] },
    { id: "technology", topics: ["coding", "digital-safety"] }
  ]
};

const quizBank = buildQuizBank();

function buildQuizBank() {
  const bank = {};
  curriculum.subjects.forEach((subject) => {
    bank[subject.id] = {};
    subject.topics.forEach((topicId) => {
      bank[subject.id][topicId] = {};
      curriculum.grades.forEach((grade, gradeIndex) => {
        bank[subject.id][topicId][grade.id] = generateTopicQuestions(subject.id, topicId, gradeIndex, grade.label);
      });
    });
  });
  return bank;
}

function levelTag(index) {
  if (index <= 2) return "easy"; // Year 2-4
  if (index <= 4) return "medium"; // Year 5-6
  if (index <= 9) return "difficult"; // Year 7-11
  return "very-difficult"; // A Levels
}

function generateTopicQuestions(subject, topic, index, gradeLabel) {
  const level = levelTag(index);
  const generators = {
    maths: {
      "literal-calculation": mathsLiteral,
      fractions: mathsFractions,
      geometry: mathsGeometry,
      algebra: mathsAlgebra,
      percentages: mathsPercentages,
      equations: mathsEquations
    },
    english: { grammar: englishGrammar, reading: englishReading },
    history: { chronology: historyChronology, sources: historySources },
    geography: { maps: geographyMaps, climate: geographyClimate },
    science: { biology: scienceBiology, physics: sciencePhysics },
    technology: { coding: technologyCoding, "digital-safety": technologySafety }
  };

  return generators[subject][topic](index, level, gradeLabel);
}

function mathsLiteral(i, level, g) {
  const a = 2 + i;
  const b = 1 + (i % 4);
  if (level === "easy") return [
    q(`[${g}] If x = ${a}, what is x + ${b}?`, [String(a + b - 1), String(a + b), String(a + b + 1), String(a + b + 2)], 1, `Substitute x = ${a}.`),
    q(`[${g}] If y = ${b + 1}, what is 2y?`, [String((b + 1) * 2 - 1), String((b + 1) * 2), String((b + 1) * 2 + 1), String((b + 1) * 2 + 2)], 1, "Multiply by 2."),
    q(`[${g}] If n = ${a + 1}, what is n - 1?`, [String(a - 1), String(a), String(a + 1), String(a + 2)], 2, "Subtract 1.")
  ];
  if (level === "medium") return [
    q(`[${g}] If x=${a} and y=${b}, evaluate 3x + 2y.`, [String(3 * a + 2 * b - 2), String(3 * a + 2 * b), String(3 * a + 2 * b + 2), String(3 * a + 2 * b + 4)], 1, "Substitute x and y."),
    q(`[${g}] Evaluate m² + 2m for m=${b + 2}.`, [String((b + 2) ** 2 + 2 * (b + 2) - 1), String((b + 2) ** 2 + 2 * (b + 2)), String((b + 2) ** 2 + 2 * (b + 2) + 1), String((b + 2) ** 2)], 1, "Compute square then add."),
    q(`[${g}] For p=${a}, q=${b + 2}, find 2p - q.`, [String(2 * a - (b + 2) - 2), String(2 * a - (b + 2)), String(2 * a - (b + 2) + 2), String(2 * a - (b + 2) + 4)], 1, "Substitute and simplify.")
  ];
  return [
    q(`[${g}] If a=${a}, b=${b + 3}, evaluate 4a² - 3ab.`, [String(4 * a * a - 3 * a * (b + 3) - 3), String(4 * a * a - 3 * a * (b + 3)), String(4 * a * a - 3 * a * (b + 3) + 3), String(4 * a * a - 3 * a * (b + 3) + 6)], 1, "Use powers and products carefully."),
    q(`[${g}] Evaluate (2p + q)/p for p=${a + 2}, q=${b + 4}.`, [String((2 * (a + 2) + (b + 4)) / (a + 2) - 1), String((2 * (a + 2) + (b + 4)) / (a + 2)), String((2 * (a + 2) + (b + 4)) / (a + 2) + 1), String((2 * (a + 2) + (b + 4)) / (a + 2) + 2)], 1, "Numerator then divide by p."),
    q(`[${g}] For k=${b}, evaluate k² - 5k + 6.`, [String(b * b - 5 * b + 5), String(b * b - 5 * b + 6), String(b * b - 5 * b + 7), String(b * b - 5 * b + 8)], 1, "Substitute and simplify polynomial." )
  ];
}

function mathsFractions(i, level, g) {
  const d = 2 + (i % 4);
  if (level === "easy") return [
    q(`[${g}] What is 1/${d} + 1/${d}?`, [`1/${d}`, `2/${d}`, `3/${d}`, `1`], 1, "Add equal denominators."),
    q(`[${g}] Which is larger?`, [`1/${d + 1}`, `1/${d}`, "Equal", "Cannot compare"], 1, "Smaller denominator gives larger unit fraction."),
    q(`[${g}] What is ${d}/${d + 1} of ${d + 1}?`, [String(d - 1), String(d), String(d + 1), String(d + 2)], 1, "Fraction of a whole number." )
  ];
  if (level === "medium") return [
    q(`[${g}] Simplify ${2 * d}/${4 * d}.`, ["1/4", "1/2", "2/3", "3/4"], 1, "Divide top and bottom by 2d."),
    q(`[${g}] Compute ${d}/${d + 2} + 1/${d + 2}.`, [`${d}/${d + 2}`, `${d + 1}/${d + 2}`, `${d + 2}/${d + 2}`, `${d - 1}/${d + 2}`], 1, "Same denominator, add numerators."),
    q(`[${g}] Compute ${d + 1}/${d + 3} - 1/${d + 3}.`, [`${d - 1}/${d + 3}`, `${d}/${d + 3}`, `${d + 1}/${d + 3}`, `${d + 2}/${d + 3}`], 1, "Subtract numerators." )
  ];
  return [
    q(`[${g}] Evaluate (${d}/${d + 1}) ÷ (${2 * d}/${2 * d + 2}).`, ["1/2", "1", "2", "3/2"], 1, "These fractions are equivalent, quotient is 1."),
    q(`[${g}] Compute ${d}/${d + 2} + ${d + 1}/${d + 2}.`, [`${2 * d}/${d + 2}`, `${2 * d + 1}/${d + 2}`, `${2 * d + 2}/${d + 2}`, `${2 * d - 1}/${d + 2}`], 1, "Add numerators over common denominator."),
    q(`[${g}] If x = ${d + 2}/${d}, what is x - 1?`, [`1/${d}`, `2/${d}`, `${d}/${d + 2}`, `${d + 1}/${d}`], 1, "Subtract 1 = d/d." )
  ];
}

function mathsGeometry(i, level, g) {
  const side = 4 + i;
  if (level === "easy") return [
    q(`[${g}] How many sides does a hexagon have?`, ["5", "6", "7", "8"], 1, "Hexagon has 6 sides."),
    q(`[${g}] A right angle equals:`, ["45°", "90°", "120°", "180°"], 1, "Definition of right angle."),
    q(`[${g}] Perimeter of a square with side ${side} cm?`, [String(2 * side), String(3 * side), String(4 * side), String(5 * side)], 2, "Perimeter = 4 × side.")
  ];
  if (level === "medium") return [
    q(`[${g}] Area of rectangle ${side} cm by ${side - 2} cm?`, [String(side * (side - 2) - 2), String(side * (side - 2)), String(side * (side - 2) + 2), String(side + (side - 2))], 1, "Area = length × width."),
    q(`[${g}] Interior angle sum of pentagon?`, ["360°", "540°", "720°", "900°"], 1, "(n-2)×180 for n=5."),
    q(`[${g}] Area of triangle with base ${side + 2} and height ${side}?`, [String(((side + 2) * side) / 2 - 2), String(((side + 2) * side) / 2), String(((side + 2) * side) / 2 + 2), String((side + 2) * side)], 1, "1/2 × base × height.")
  ];
  return [
    q(`[${g}] Circumference of circle radius ${i + 3} is:`, [`${2 * (i + 3)}π`, `${(i + 3) ** 2}π`, `${(i + 3)}π`, `${4 * (i + 3)}π`], 0, "C = 2πr."),
    q(`[${g}] Volume of a cuboid ${side}×${side - 1}×${side - 2}?`, [String(side * (side - 1) * (side - 2) - 5), String(side * (side - 1) * (side - 2)), String(side * (side - 1) * (side - 2) + 5), String(side + (side - 1) + (side - 2))], 1, "Volume = lwh."),
    q(`[${g}] For similar shapes, scale factor 3 gives area factor:`, ["3", "6", "9", "12"], 2, "Area scales by factor squared.")
  ];
}

function mathsAlgebra(i, level, g) {
  if (level === "easy") return [
    q(`[${g}] Solve x + ${i + 3} = ${i + 9}.`, ["4", "5", "6", "7"], 2, "Subtract constants."),
    q(`[${g}] Simplify 2a + 3a.`, ["5", "5a", "6a", "a²"], 1, "Collect like terms."),
    q(`[${g}] Value of 3n when n = ${i % 4 + 2}?`, [String(3 * (i % 4 + 2) - 1), String(3 * (i % 4 + 2)), String(3 * (i % 4 + 2) + 1), String(i)], 1, "Multiply by 3.")
  ];
  if (level === "medium") return [
    q(`[${g}] Expand ${i + 2}(x + 3).`, [`${i + 2}x + 3`, `${i + 2}x + ${(i + 2) * 3}`, `${i + 2}x + ${i + 2}`, `${i + 2}x + ${3 * i}`], 1, "Distribute across bracket."),
    q(`[${g}] Factorise x² + ${i + 5}x.`, [`x(x+${i + 5})`, `(x+${i + 5})²`, `x²(${i + 5})`, `x+${i + 5}`], 0, "Take common factor x."),
    q(`[${g}] Solve 2x - ${i + 3} = ${i + 7}.`, [String(i + 4), String(i + 5), String(i + 6), String(i + 7)], 1, "Move constant then divide by 2.")
  ];
  return [
    q(`[${g}] Solve 3x + ${i + 5} = 2x + ${2 * i + 11}.`, [String(i + 5), String(i + 6), String(i + 7), String(i + 8)], 1, "Collect x terms one side."),
    q(`[${g}] If f(x)=2x²-3x+1, find f(2).`, ["1", "2", "3", "5"], 2, "2(4)-6+1=3."),
    q(`[${g}] Solve simultaneously: x+y=10, x-y=2. x=?`, ["4", "5", "6", "7"], 2, "Add equations: 2x=12.")
  ];
}

function mathsPercentages(i, level, g) {
  const base = 40 + i * 5;
  if (level === "easy") return [
    q(`[${g}] 10% of ${base} is:`, [String(base / 10 - 1), String(base / 10), String(base / 10 + 1), String(base / 10 + 2)], 1, "Divide by 10."),
    q(`[${g}] 50% means:`, ["a quarter", "a half", "double", "none"], 1, "50% equals one half."),
    q(`[${g}] 25% of ${base} is:`, [String(base / 4 - 2), String(base / 4), String(base / 4 + 2), String(base / 2)], 1, "25% is one quarter.")
  ];
  if (level === "medium") return [
    q(`[${g}] Increase ${base} by 15%.`, [String(base * 1.15 - 2), String(base * 1.15), String(base * 1.15 + 2), String(base * 1.2)], 1, "Find 15% then add."),
    q(`[${g}] Decrease ${base} by 20%.`, [String(base * 0.8 - 2), String(base * 0.8), String(base * 0.8 + 2), String(base * 0.75)], 1, "Subtract one fifth."),
    q(`[${g}] If 30% is ${base * 0.3}, whole amount is:`, [String(base - 10), String(base), String(base + 10), String(base + 20)], 1, "Divide by 0.3.")
  ];
  return [
    q(`[${g}] Compound growth: ${base} increased by 10% twice equals:`, [String(Math.round(base * 1.2)), String(Math.round(base * 1.21)), String(Math.round(base * 1.22)), String(Math.round(base * 1.19))], 1, "Multiply by 1.1 twice."),
    q(`[${g}] A value rises from ${base} to ${base + 18}. Percentage increase?`, ["18%", `${Math.round((18 / base) * 100)}%`, "25%", "30%"], 1, "Increase/base × 100."),
    q(`[${g}] If price after VAT 20% is ${base * 1.2}, original price is:`, [String(base - 5), String(base), String(base + 5), String(base + 10)], 1, "Divide by 1.2.")
  ];
}

function mathsEquations(i, level, g) {
  if (level === "easy") return [
    q(`[${g}] Solve x + ${i + 6} = ${i + 11}.`, ["3", "4", "5", "6"], 2, "Subtract the same number."),
    q(`[${g}] Solve 3x = ${3 * (i + 2)}.`, [String(i + 1), String(i + 2), String(i + 3), String(i + 4)], 1, "Divide both sides by 3."),
    q(`[${g}] Solve y - 2 = ${i + 5}.`, [String(i + 5), String(i + 6), String(i + 7), String(i + 8)], 1, "Add 2 to both sides.")
  ];
  if (level === "medium") return [
    q(`[${g}] Solve 4x + ${i + 3} = ${i + 19}.`, [String(i + 2), String(i + 3), String(i + 4), String(i + 5)], 2, "Subtract then divide by 4."),
    q(`[${g}] Solve 3(x - 2)=${3 * (i + 2)}.`, [String(i + 2), String(i + 3), String(i + 4), String(i + 5)], 2, "Divide by 3 then add 2."),
    q(`[${g}] Solve 2x + 5 = x + ${i + 12}.`, [String(i + 5), String(i + 6), String(i + 7), String(i + 8)], 1, "Subtract x then subtract 5.")
  ];
  return [
    q(`[${g}] Solve 3(2x-1)=5x+${i + 7}.`, [String(i + 6), String(i + 7), String(i + 8), String(i + 9)], 1, "Expand then collect like terms."),
    q(`[${g}] Solve x/3 + 2 = ${(i + 8) / 3 + 2}.`, [String(i + 6), String(i + 7), String(i + 8), String(i + 9)], 2, "Isolate x by subtracting then multiplying."),
    q(`[${g}] Solve: 2x - y = 7 and x + y = 8. x=?`, ["4", "5", "6", "7"], 1, "Add equations to remove y.")
  ];
}

function englishGrammar(i, level, g) {
  if (level === "easy") return [
    q(`[${g}] Choose the correct sentence.`, ["She don't like apples.", "She doesn't like apples.", "She not likes apples.", "She doesn't likes apples."], 1, "Use does not + base verb."),
    q(`[${g}] Which word is an adjective?`, ["quickly", "teacher", "bright", "run"], 2, "Adjectives describe nouns."),
    q(`[${g}] Pick the sentence with correct punctuation.`, ["Lets eat, Grandma!", "Let's eat, Grandma!", "Lets eat Grandma", "Let's, eat Grandma"], 1, "Contraction needs apostrophe.")
  ];
  if (level === "medium") return [
    q(`[${g}] Select the sentence with correct subject-verb agreement.`, ["The list of items are on the desk.", "The list of items is on the desk.", "The list are on the desk.", "The items list is on desk."], 1, "Main subject is singular: list."),
    q(`[${g}] Which is a subordinate conjunction?`, ["and", "because", "quickly", "book"], 1, "Because introduces dependent clauses."),
    q(`[${g}] Identify the modal verb.`, ["might", "blue", "running", "after"], 0, "Modal verbs express possibility/ability.")
  ];
  return [
    q(`[${g}] Which sentence uses the subjunctive correctly?`, ["If I was taller, I'd play basketball.", "If I were taller, I'd play basketball.", "If I am taller, I'd play basketball.", "If I be taller, I'd play basketball."], 1, "Use 'were' in hypothetical form."),
    q(`[${g}] Identify the subordinate clause: 'Although it was late, we kept studying.'`, ["Although it was late", "we kept", "kept studying", "it was"], 0, "It cannot stand alone."),
    q(`[${g}] Pick the sentence with correct parallel structure.`, ["She likes reading, to swim, and biking.", "She likes reading, swimming, and biking.", "She likes read, swimming, and bike.", "She likes to reading, swim, biking."], 1, "All items should share the same form.")
  ];
}

function englishReading(i, level, g) {
  if (level === "easy") return [
    q(`[${g}] The main idea of a text is:`, ["a tiny detail", "the central message", "only the title", "the author's name"], 1, "Main idea = core message."),
    q(`[${g}] Inference means:`, ["copy exact words", "use clues to understand", "skip difficult parts", "guess randomly"], 1, "Infer using evidence."),
    q(`[${g}] A reliable source usually:`, ["has no author", "uses evidence", "has no date", "is always very short"], 1, "Reliable writing includes support." )
  ];
  if (level === "medium") return [
    q(`[${g}] What best describes tone?`, ["the number of paragraphs", "the writer's attitude", "the font used", "the topic only"], 1, "Tone is attitude/feeling."),
    q(`[${g}] Which detail is likely evidence?`, ["I feel this is true.", "A statistic from a study.", "Maybe it happened.", "My cousin said so."], 1, "Data-backed claims are evidence."),
    q(`[${g}] Skimming is used to:`, ["memorise every word", "get the general idea quickly", "translate the text", "ignore headings"], 1, "Skimming gives gist.")
  ];
  return [
    q(`[${g}] Which statement is the strongest critical evaluation?`, ["I liked it.", "The argument is valid because claims are supported by peer-reviewed data.", "The font is nice.", "It is long."], 1, "Evaluation judges argument quality."),
    q(`[${g}] In rhetoric, an appeal to ethos targets:`, ["logic", "credibility", "emotion", "humor"], 1, "Ethos = authority/trust."),
    q(`[${g}] A synthesis task requires you to:`, ["summarize one source only", "combine ideas from multiple sources", "copy quotations only", "list unknown words"], 1, "Synthesis integrates sources.")
  ];
}

function historyChronology(i, level, g) {
  if (level === "easy") return [
    q(`[${g}] Chronology is:`, ["map work", "events in time order", "weather report", "a type of source"], 1, "Chronology means sequence."),
    q(`[${g}] Which came first?`, ["World War II", "Internet age", "Titanic sinking", "Moon landing"], 2, "Titanic was 1912."),
    q(`[${g}] One century equals:`, ["10 years", "50 years", "100 years", "1000 years"], 2, "Century = 100 years.")
  ];
  if (level === "medium") return [
    q(`[${g}] Place in order: Industrial Revolution, French Revolution, World War I.`, ["WWI, French, Industrial", "French, Industrial, WWI", "Industrial, French, WWI", "French, WWI, Industrial"], 2, "Industrial (late 1700s), French (1789), WWI (1914)."),
    q(`[${g}] The decade 1940s includes years:`, ["1940-1949", "1941-1950", "1939-1948", "1945-1954"], 0, "Decade starts at zero year."),
    q(`[${g}] BCE dates move:`, ["forward to bigger numbers", "toward year 0 as numbers decrease", "same as CE", "randomly"], 1, "BCE counts down toward 0." )
  ];
  return [
    q(`[${g}] Which periodization is most precise?`, ["Old times", "Late 18th century (1780-1799)", "A long while ago", "Modern-ish"], 1, "Specific ranges are strongest."),
    q(`[${g}] Event A causes B in 1910 and 1912. This suggests:`, ["reverse causation", "possible causal sequence needing evidence", "no relation possible", "chronology is irrelevant"], 1, "Temporal order can support causality if evidence fits."),
    q(`[${g}] Historians use chronology mainly to:`, ["remove context", "trace continuity and change over time", "avoid interpretation", "rank countries"], 1, "Chronology supports change/continuity analysis.")
  ];
}

function historySources(i, level, g) {
  if (level === "easy") return [
    q(`[${g}] A soldier's diary from 1916 is a:`, ["Primary source", "Secondary source", "Tertiary source", "Fiction"], 0, "It was produced at the time."),
    q(`[${g}] Why compare two sources?`, ["to increase bias", "to check reliability", "to remove evidence", "to shorten homework"], 1, "Corroboration improves confidence."),
    q(`[${g}] A modern textbook is usually:`, ["Primary", "Secondary", "Artifact", "Official decree"], 1, "It interprets earlier events." )
  ];
  if (level === "medium") return [
    q(`[${g}] Source provenance refers to:`, ["font style", "origin and authorship", "color", "length"], 1, "Provenance = where source came from."),
    q(`[${g}] A newspaper editorial is most likely to show:`, ["neutral data only", "an argument with viewpoint", "scientific method", "legal verdict"], 1, "Editorials are opinion pieces."),
    q(`[${g}] Best reason to question a source?`, ["it is old", "author had clear political motive", "it is in a museum", "it mentions dates"], 1, "Motive may shape bias." )
  ];
  return [
    q(`[${g}] 'Value' in source analysis means:`, ["selling price", "how useful it is for a question", "page count", "translation quality"], 1, "Value depends on inquiry focus."),
    q(`[${g}] A limitation of memoirs is often:`, ["lack of memory bias", "retrospective distortion", "too much quant data", "absence of narrative"], 1, "Memory may shift over time."),
    q(`[${g}] Strongest evaluation of a source combines:`, ["origin only", "content only", "provenance, purpose, and context", "date only"], 2, "Balanced critique needs all three.")
  ];
}

function geographyMaps(i, level, g) {
  if (level === "easy") return [
    q(`[${g}] A compass rose shows:`, ["temperature", "directions", "rainfall", "population"], 1, "N, S, E, W."),
    q(`[${g}] On a map scale 1:100, 1 cm equals:`, ["1 m", "10 m", "100 m", "1000 m"], 0, "100 cm = 1 m."),
    q(`[${g}] Close contour lines show:`, ["flat area", "steep slope", "river mouth", "desert"], 1, "Closer = steeper.")
  ];
  if (level === "medium") return [
    q(`[${g}] Map scale 1:50,000 means 2 cm is:`, ["500 m", "1 km", "2 km", "10 km"], 1, "1 cm = 500 m, so 2 cm = 1 km."),
    q(`[${g}] Grid references are used to:`, ["estimate weather", "locate places accurately", "show tectonics", "measure altitude only"], 1, "They pinpoint location."),
    q(`[${g}] A thematic map mainly shows:`, ["all roads", "one chosen variable", "only borders", "scale bars"], 1, "It emphasizes one pattern." )
  ];
  return [
    q(`[${g}] In GIS, layering data helps to:`, ["reduce all maps to paper", "analyze spatial relationships", "delete coordinates", "avoid projections"], 1, "Layers reveal spatial interactions."),
    q(`[${g}] Which projection issue is correct?`, ["All projections preserve everything", "Distortion in area/shape is unavoidable", "Only digital maps distort", "Distortion affects colors only"], 1, "Map projection always involves trade-offs."),
    q(`[${g}] A choropleth map is best for:`, ["individual buildings", "rate comparisons by region", "ocean depth profiles", "street turns"], 1, "It shades regions by data value." )
  ];
}

function geographyClimate(i, level, g) {
  if (level === "easy") return [
    q(`[${g}] Climate means:`, ["today's weather", "long-term weather patterns", "only rainfall", "wind right now"], 1, "Climate is long-term average."),
    q(`[${g}] Which biome is driest?`, ["Rainforest", "Desert", "Savanna", "Tundra"], 1, "Deserts receive little precipitation."),
    q(`[${g}] Greenhouse gases tend to:`, ["cool Earth quickly", "trap more heat", "stop wind", "create mountains"], 1, "They enhance heat retention." )
  ];
  if (level === "medium") return [
    q(`[${g}] A climate graph combines:`, ["population and GDP", "temperature and precipitation", "elevation and slope", "latitude and longitude"], 1, "It plots temp + rainfall."),
    q(`[${g}] El Niño often affects:`, ["global atmospheric and ocean patterns", "moon phases", "plate tectonics", "soil pH only"], 0, "It's an ocean-atmosphere oscillation."),
    q(`[${g}] Higher albedo surfaces usually:`, ["absorb more heat", "reflect more sunlight", "increase humidity", "raise sea level directly"], 1, "Albedo = reflectivity." )
  ];
  return [
    q(`[${g}] Positive climate feedback example:`, ["More ice increases heat absorption", "Ice melt lowers albedo and can increase warming", "Clouds always cool equally", "Volcanoes permanently warm climate"], 1, "Lower albedo can amplify warming."),
    q(`[${g}] Mitigation policy mainly aims to:`, ["adapt to impacts only", "reduce greenhouse gas emissions", "increase weather variability", "ban seasons"], 1, "Mitigation addresses causes."),
    q(`[${g}] A 2°C target refers to:`, ["daily weather variance", "mean global temperature change vs pre-industrial", "ocean salinity", "urban heat island only"], 1, "It's a long-term global benchmark." )
  ];
}

function scienceBiology(i, level, g) {
  if (level === "easy") return [
    q(`[${g}] Photosynthesis mainly occurs in:`, ["roots", "leaves", "flowers", "seeds"], 1, "Leaves have chloroplasts."),
    q(`[${g}] Cells are:`, ["organ systems", "basic units of life", "tissues", "organs"], 1, "Cells are smallest living units."),
    q(`[${g}] Humans need this gas for respiration:`, ["nitrogen", "oxygen", "helium", "argon"], 1, "Aerobic respiration uses oxygen." )
  ];
  if (level === "medium") return [
    q(`[${g}] Mitochondria are mainly responsible for:`, ["photosynthesis", "energy release in respiration", "protein packaging", "cell wall synthesis"], 1, "They produce ATP."),
    q(`[${g}] DNA carries:`, ["cell membrane", "genetic information", "blood plasma", "enzymes only"], 1, "Genes are encoded in DNA."),
    q(`[${g}] Diffusion is movement of particles from:`, ["low to high concentration", "high to low concentration", "left to right only", "solid to gas only"], 1, "Net movement down gradient." )
  ];
  return [
    q(`[${g}] During translation, mRNA is decoded at the:`, ["nucleus", "ribosome", "mitochondria", "Golgi"], 1, "Ribosomes synthesize proteins."),
    q(`[${g}] Enzyme activity typically peaks at an optimum because:`, ["substrates vanish", "active site interactions depend on conditions", "genes stop existing", "ATP becomes infinite"], 1, "pH/temperature affect active sites."),
    q(`[${g}] Natural selection requires:`, ["identical traits", "heritable variation and differential survival", "no environment change", "random grading"], 1, "Variation + selection pressure drive evolution." )
  ];
}

function sciencePhysics(i, level, g) {
  if (level === "easy") return [
    q(`[${g}] Unit of force is:`, ["Joule", "Newton", "Watt", "Volt"], 1, "Force measured in newtons."),
    q(`[${g}] Speed formula is:`, ["distance × time", "distance ÷ time", "time ÷ distance", "mass ÷ volume"], 1, "Basic kinematics formula."),
    q(`[${g}] Electrical charge of electron is:`, ["positive", "neutral", "negative", "variable"], 2, "Electrons are negative." )
  ];
  if (level === "medium") return [
    q(`[${g}] If mass is 5 kg and acceleration 2 m/s², force is:`, ["2 N", "5 N", "10 N", "25 N"], 2, "F = ma."),
    q(`[${g}] Potential difference is measured in:`, ["amps", "ohms", "volts", "watts"], 2, "Symbol V."),
    q(`[${g}] Energy transfer in a stretched spring is mainly:`, ["chemical", "elastic potential", "nuclear", "thermal only"], 1, "Stored as elastic potential energy." )
  ];
  return [
    q(`[${g}] In SHM, acceleration is:`, ["in phase with displacement", "proportional and opposite to displacement", "always zero", "equal to velocity"], 1, "a = -ω²x."),
    q(`[${g}] For ideal gas at constant temperature, p is inversely proportional to:`, ["mass", "volume", "density", "moles"], 1, "Boyle's law."),
    q(`[${g}] Photon energy is given by:`, ["E=mc²", "E=hf", "E=ma", "E=Pt"], 1, "Planck relation." )
  ];
}

function technologyCoding(i, level, g) {
  if (level === "easy") return [
    q(`[${g}] A loop in code is used to:`, ["store pictures", "repeat instructions", "charge a laptop", "delete internet"], 1, "Loops repeat steps."),
    q(`[${g}] An algorithm is:`, ["a random guess", "step-by-step instructions", "computer fan", "file type"], 1, "Algorithms define logic."),
    q(`[${g}] Debugging means:`, ["adding bugs", "finding/fixing errors", "writing essays", "compressing images"], 1, "Debugging removes defects." )
  ];
  if (level === "medium") return [
    q(`[${g}] Which structure chooses between alternatives?`, ["sequence", "selection", "iteration", "storage"], 1, "Selection uses conditions."),
    q(`[${g}] A Boolean variable can store:`, ["any paragraph", "true/false", "only numbers", "only arrays"], 1, "Booleans are binary."),
    q(`[${g}] Time complexity O(n) means runtime grows:`, ["linearly with input", "quadratically", "constant only", "randomly"], 0, "O(n) is linear growth." )
  ];
  return [
    q(`[${g}] Recursion must include a:`, ["color palette", "base case", "USB port", "database index"], 1, "Base case stops infinite calls."),
    q(`[${g}] Which data structure is FIFO?`, ["Stack", "Queue", "Tree", "Hash"], 1, "Queue = first in first out."),
    q(`[${g}] In version control, branching enables:`, ["permanent lockouts", "parallel development", "deleting history", "offline hardware repair"], 1, "Branches isolate changes." )
  ];
}

function technologySafety(i, level, g) {
  if (level === "easy") return [
    q(`[${g}] Strong password should include:`, ["your name only", "mixed letters, numbers, symbols", "birthdate only", "123456"], 1, "Complexity improves safety."),
    q(`[${g}] Phishing is:`, ["safe login method", "attempt to steal personal data", "software update", "device charging"], 1, "Phishing is social engineering."),
    q(`[${g}] Two-factor authentication adds:`, ["a second security step", "more ads", "faster internet", "battery boost"], 0, "Extra verification increases security." )
  ];
  if (level === "medium") return [
    q(`[${g}] HTTPS mainly provides:`, ["file compression", "encrypted communication", "free antivirus", "offline browsing"], 1, "TLS protects web traffic."),
    q(`[${g}] Public Wi-Fi risk can be reduced by using:`, ["VPN", "lower brightness", "larger screen", "speaker mode"], 0, "VPN encrypts tunnel."),
    q(`[${g}] Principle of least privilege means:`, ["everyone gets admin rights", "users get minimum required access", "no passwords", "share all accounts"], 1, "Limits damage from compromise." )
  ];
  return [
    q(`[${g}] A zero-day vulnerability is:`, ["already fully patched", "unknown exploit before vendor fix", "a fake alert", "a deleted account"], 1, "Zero-day has no patch yet."),
    q(`[${g}] Hashing passwords is important because it:`, ["stores reversible text", "reduces exposure if database leaks", "improves Wi-Fi speed", "removes need for authentication"], 1, "Hashes are one-way digests."),
    q(`[${g}] Best incident-response first step after breach detection is to:`, ["post on social media", "contain affected systems", "ignore logs", "reboot everything randomly"], 1, "Containment limits spread." )
  ];
}

function q(question, options, answer, explanation) {
  return { question, options, answer, explanation };
}
