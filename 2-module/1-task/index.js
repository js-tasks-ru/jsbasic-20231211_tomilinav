function sumSalary(salaries) {
  // ваш код...
  let sumOfSalaries = 0;

  for (let key in salaries) {
    let isSalary = typeof salaries[key] === 'number' && Number.isFinite(salaries[key]);

    if (isSalary) {
      sumOfSalaries += salaries[key];
    }
  }

  return sumOfSalaries;
}

