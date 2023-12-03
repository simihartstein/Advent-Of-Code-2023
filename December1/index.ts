import { realCase } from "./input";

const stringDigits: {[val: string]: number} = {
  // "zero": 0,
  "one": 1,
  "two": 2,
  "three": 3,
  "four": 4,
  "five": 5,
  "six": 6,
  "seven": 7,
  "eight": 8,
  "nine": 9,
};

async function main(doc: string) {
  // console.log(`calibration doc:\n${doc}`)

  const lines: string[] = doc.split('\n');

  let sum = 0;
  for (const line of lines) {
    const calibrationValue = getCalibrationValue(line);
    console.log(`${line}: ${calibrationValue}`);
    sum += calibrationValue;
  }

  console.log(`Sum of calibrationValues: ${sum}`);
  return sum;
}

function getCalibrationValue(line: string) {
  let firstVal;
  let j = 0;
  while (j < line.length) {
    const cVal = Number.parseInt(line[j]);
    if (!Number.isNaN(cVal)) {
      firstVal = cVal;
      break;
    }
    else {
      const strDigitVal = getStringDigitVal(line.slice(j));
      if (strDigitVal !== undefined) {
        firstVal = strDigitVal;
        break;
      }
    }
    j++;
  }

  let lastVal;
  let i = line.length - 1;
  while(i >= 0) {
    const cVal = Number.parseInt(line[i]);
    if (!Number.isNaN(cVal)) {
      lastVal = cVal;
      break;
    }
    else {
      const strDigitVal = getStringDigitVal(line.slice(i));
      if (strDigitVal !== undefined) {
        lastVal = strDigitVal;
        break;
      }
    }
    i--;
  }

  if (firstVal === undefined || lastVal === undefined) {
    throw new Error("no digit in line");
  }

  return firstVal * 10 + lastVal;
}

function getStringDigitVal(value: string): number | undefined {
  for (const strNum in stringDigits) {
    const slice = value.slice(0, strNum.length);
    if (slice === strNum) {
      return stringDigits[strNum];
    }
  }
  return undefined;
}

main(realCase);