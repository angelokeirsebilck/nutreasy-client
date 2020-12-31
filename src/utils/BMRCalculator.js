const calcBMR = (age, weight, height, gender, weightUnit, heightUnit) => {
  let weightKg = weight;
  let heightCm = height;

  if (weightUnit == 'lb') {
    const divided = weight / 2;
    weightKg = divided * 0.9;
  }

  if (heightUnit == 'ft') {
    heightCm = height * 30.48;
  }

  if (gender == 'male') {
    return parseFloat((10 * weightKg + 6.25 * heightCm - 5 * age + 5).toFixed(1));
  } else {
    return parseFloat((10 * weightKg + 6.25 * heightCm - 5 * age - 161).toFixed(1));
  }
};

export default calcBMR;
