export function mostFrequent(arr, n) {
    //using moore's voting algorithm
    var res = 0;
    var count = 1;
    for (var i = 1; i < n; i++) {
      if (arr[i] === arr[res]) {
        count++;
      } else {
        count--;
      }

      if (count === 0) {
        res = i;
        count = 1;
      }
    }

    //count how many times the most frequent element appears
    let maxCount = 0;
    for (var i = 0; i < n; i++) {
        if (arr[i] === arr[res]) {
            maxCount++;
        }
    }


    return [arr[res], maxCount];
}