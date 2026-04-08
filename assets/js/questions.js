const QUESTIONS = {
  "Year 2": {
    maths: {
      addition: [
        { q: "2 + 3 =", choices: ["4","5","6","3"], answer: 1 },
        { q: "1 + 4 =", choices: ["5","6","4","3"], answer: 0 },
        { q: "3 + 2 =", choices: ["6","5","4","3"], answer: 1 },
        { q: "0 + 5 =", choices: ["4","5","6","3"], answer: 1 }
      ]
    }
  },

  "Year 3": {
    maths: {
      subtraction: [
        { q: "5 - 2 =", choices: ["1","2","3","4"], answer: 2 },
        { q: "9 - 3 =", choices: ["6","5","4","7"], answer: 0 },
        { q: "7 - 4 =", choices: ["3","2","1","4"], answer: 0 },
        { q: "10 - 6 =", choices: ["2","3","4","5"], answer: 2 }
      ]
    }
  },

  "Year 4": {
    maths: {
      multiplication: [
        { q: "3 × 2 =", choices: ["5","6","7","4"], answer: 1 },
        { q: "4 × 2 =", choices: ["6","7","8","9"], answer: 2 },
        { q: "5 × 2 =", choices: ["10","8","6","7"], answer: 0 },
        { q: "6 × 2 =", choices: ["10","12","14","16"], answer: 1 }
      ]
    }
  },

  "Year 5": {
    maths: {
      division: [
        { q: "10 ÷ 2 =", choices: ["2","3","4","5"], answer: 3 },
        { q: "12 ÷ 3 =", choices: ["4","5","3","6"], answer: 0 },
        { q: "15 ÷ 5 =", choices: ["1","2","3","4"], answer: 2 },
        { q: "20 ÷ 4 =", choices: ["4","5","6","7"], answer: 1 }
      ]
    }
  },

  "Year 6": {
    maths: {
      fractions: [
        { q: "1/2 + 1/2 =", choices: ["1","2","1/2","0"], answer: 0 },
        { q: "1/4 + 1/4 =", choices: ["1/2","1","1/4","2"], answer: 0 },
        { q: "3/4 - 1/4 =", choices: ["1/2","1","1/4","3/4"], answer: 0 },
        { q: "2/3 + 1/3 =", choices: ["1","2","2/3","1/3"], answer: 0 }
      ]
    }
  },

  "Year 7": {
    maths: {
      algebra: [
        { q: "x + 3 = 5, x =", choices: ["1","2","3","4"], answer: 1 },
        { q: "x - 2 = 4", choices: ["2","4","6","8"], answer: 2 },
        { q: "2x = 8", choices: ["2","3","4","5"], answer: 2 },
        { q: "x + 7 = 10", choices: ["1","2","3","4"], answer: 2 }
      ]
    }
  },

  "Year 8": {
    maths: {
      powers: [
        { q: "2² =", choices: ["2","4","6","8"], answer: 1 },
        { q: "3² =", choices: ["6","9","12","3"], answer: 1 },
        { q: "5² =", choices: ["10","15","20","25"], answer: 3 },
        { q: "10² =", choices: ["10","100","1000","20"], answer: 1 }
      ]
    }
  },

  "Year 9": {
    maths: {
      equations: [
        { q: "2x + 2 = 6", choices: ["1","2","3","4"], answer: 1 },
        { q: "3x = 9", choices: ["1","2","3","4"], answer: 2 },
        { q: "x/2 = 5", choices: ["5","8","10","2"], answer: 2 },
        { q: "x + 10 = 15", choices: ["3","4","5","6"], answer: 2 }
      ]
    }
  },

  "Year 10": {
    maths: {
      geometry: [
        { q: "Angles triangle sum =", choices: ["90","180","270","360"], answer: 1 },
        { q: "Square sides?", choices: ["3","4","5","6"], answer: 1 },
        { q: "Rectangle angles?", choices: ["90","60","120","45"], answer: 0 },
        { q: "Circle full angle?", choices: ["180","360","90","270"], answer: 1 }
      ]
    }
  },

  "Year 11": {
    maths: {
      quadratic: [
        { q: "x² = 9", choices: ["±3","3","-3","0"], answer: 0 },
        { q: "x² = 16", choices: ["±4","4","-4","2"], answer: 0 },
        { q: "x² = 25", choices: ["±5","5","-5","10"], answer: 0 },
        { q: "x² = 1", choices: ["±1","1","-1","0"], answer: 0 }
      ]
    }
  },

  "A Levels": {
    maths: {
      calculus: [
        { q: "Derivative of x²", choices: ["2x","x","x²","1"], answer: 0 },
        { q: "Derivative of 3x", choices: ["3","x","0","1"], answer: 0 },
        { q: "Integral of 1", choices: ["x","1","0","x²"], answer: 0 },
        { q: "Derivative of x³", choices: ["3x²","x²","x³","2x"], answer: 0 }
      ]
    }
  }
};
