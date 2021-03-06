function bucketSort(arr, bucketSize) {
  if(arr.length === 0) {
    return arr;
  }

  var i;
  var minValue = arr[0];
  var maxValue = arr[0];
  for (i = 1; i < arr.length; i++){
    if(arr[i] < minValue) {
      minValue = arr[i];              // 输入数据的最小值
    } else if (arr[i] > maxValue) {
      maxValue = arr[i];              // 输入数据的最大值
    }
  }

  const DEFAULT_BUCKET_SIZE = 5;      //设置初始值
  bucketSize = bucketSize || DEFAULT_BUCKET_SIZE;
  var bucketCount = Math.floor((maxValue - minValue) / bucketSize) + 1;
  var buckets = new Array(bucketCount);
  for(i = 0; i < buckets.length; i++) {
    buckets[i] = [];
  }
  //利用映射将数据分配到各个桶中
  for(i = 0; i < arr.length; i++) {
    buckets[Math.floor((arr[i] - minValue) / bucketSize)].push(arr[i]);
  }

  arr.length = 0;
  for (i = 0; i < buckets.length; i++) {
    insertionSort(buckets[i]);
    for (var j = 0; j < buckets[i].length; j++) {
      arr.push(buckets[i][j]]);
    }
  }
  return arr;
}
