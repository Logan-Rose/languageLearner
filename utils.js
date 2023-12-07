export function calculateSM2Score(grade, repititions, easiness, interval) {
  let newInterval = 0;
  let newRepititions
  if (grade >= 1) {
    if (repititions == 0) {
      newInterval = 1;
    } else if (repititions == 1) {
      newInterval = 6;
    } else {
      newInterval = Math.round(interval * easiness);
    }
    newRepititions = repititions + 1
    console.log(newRepititions, grade)  
  } else {
    newRepititions = 0;
    newInterval = 1;
  }
  const newEasiness = Math.max(
    easiness + (0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02)),
    1.3
  );
  return { repititions: newRepititions, easiness: newEasiness, interval: newInterval };
}
