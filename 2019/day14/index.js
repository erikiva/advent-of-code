const { test1, test2, test3, test4, test5, final } = require("./data");

const getElement = elementStr => {
  const [amount, elem] = elementStr.trim().split(" ");
  return [parseInt(amount), elem];
};

const processComponents = data => {
  let components = [];
  data.split(",").forEach(comp => {
    components.push(getElement(comp));
  });
  return components;
};

const processRule = ruleStr => {
  let rule = [];
  const [componentsStr, elementStr] = ruleStr.split("=>");
  const [amount, element] = getElement(elementStr);
  const components = processComponents(componentsStr);
  rule = [element, { element, amount, components }];
  return rule;
};

const buildRules = data => {
  const rules = data.split("\n");
  return rules.reduce((elements, rule) => {
    const [element, elementData] = processRule(rule);
    elements[element] = elementData;
    return elements;
  }, {});
};

const findRule = (requirements, rules) => {
  const el = Object.keys(requirements).find(el => {
    return requirements[el] > 0 && el != "ORE";
  });
  return rules[el];
};

const getRequirements = (requirements, rules) => {
  const rule = findRule(requirements, rules);
  const factor = Math.ceil(requirements[rule.element] / rule.amount);
  requirements[rule.element] -= factor * rule.amount;
  rule.components.forEach(([amount, elem]) => {
    if (requirements[elem]) {
      requirements[elem] += factor * amount;
    } else {
      requirements[elem] = factor * amount;
    }
  });
  return requirements;
};

const isFinnished = requirements => {
  const elements = Object.keys(requirements);
  for (let i = 0; i < elements.length; i++) {
    if (requirements[elements[i]] > 0 && elements[i] != "ORE") {
      return false;
    }
  }
  return true;
};

const fuelCalculator = (rulesStr, fuel) => {
  const rules = buildRules(rulesStr);
  let requirements = { FUEL: fuel };
  const finalElements = Object.keys(rules);
  let done = false;
  while (!done) {
    requirements = getRequirements(requirements, rules);
    //console.log(requirements);
    done = isFinnished(requirements);
  }

  // console.log(requirements);
  // requirements = getRequirements(requirements, rules);
  // console.log(requirements);
  return requirements;
};

const numOres = (rulesStr, fuel) => {
  const requirements = fuelCalculator(rulesStr, fuel);
  return requirements["ORE"];
};

const testRule = rules => {
  const result = fuelCalculator(rules.data);
  console.log("Result:", result);
};

const testRules = rules => {
  const fuel = 1;
  const result = fuelCalculator(rules.data, fuel);

  if (result["ORE"] == rules.result) {
    console.log("All correct");
  } else {
    console.log(
      `Result expected: ${rules.result} obtained: ${
        result["ORE"]
      } - ${fuel} ${Math.round(result["ORE"] / fuel)}`
    );
  }
};

const testFuel = rules => {
  const fuel = 1;
  const maxOres = 1e12;
  let oresFor1 = rules.result;
  let low = Math.ceil(maxOres / oresFor1);
  let high = low * 2;
  let mid = Math.floor((high + low) / 2);
  let midOres = 0;
  while (low < high - 1) {
    midOres = numOres(rules.data, mid);
    console.log(`low: ${low} mid: ${mid} high: ${high} midOres: ${midOres}`);
    if (midOres < maxOres) {
      low = mid;
    } else {
      high = mid;
    }
    mid = Math.floor((high + low) / 2);
  }
  console.log(low, " - ", rules.result2);
};

// console.log(findRule({ FUEL: 1 }, buildRules(test1.data)));
// console.log(findRule({ A: -1, B: 1 }, buildRules(test1.data)));

//testRules(test1);
//testRules(test2);
//testRules(test3);
//testRules(test4);
//testRules(test5);
testFuel(test3);

//testRules(final);

// console.log(
//   applyRule(
//     "FUEL",
//     {
//       amount: 1,
//       components: [
//         [7, "A"],
//         [1, "E"]
//       ]
//     },
//     { FUEL: 1 }
//   ) == { A: 7, E: 1 }
// );

// console.log(
//   "ORB: 10, A: -2, E: 0, B:1}",
//   isFinnished({ ORE: 10, A: -2, E: 0, B: 1 })
// );
// console.log(
//   "ORB: 10, A: -2, E: 0, B:0}",
//   isFinnished({ ORE: 10, A: -2, E: 0, B: 0 })
// );

// console.log(getElement("1 C"));
// console.log(getElement(" 1 C "));
// console.log(
//   processComponents("44 XJWVT, 5 KHKGT, 1 QDVJ, 29 NZVS, 9 GPVTF, 48 HKGWZ ")
// );

// console.log(
//   processRule("44 XJWVT, 5 KHKGT, 1 QDVJ, 29 NZVS, 9 GPVTF, 48 HKGWZ => 1 FUEL")
// );
