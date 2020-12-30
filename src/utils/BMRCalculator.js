const calcBMR = (age, weight, height, gender) => {
  if (gender == 'Male') {
    return 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    return 10 * weight + 6.25 * height - 5 * age - 161;
  }
};

export default calcBMR;
