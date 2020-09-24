function quick_sort(arr) {
  if (arr.length < 2) return arr;
  _quickSort(arr, 0, arr.length - 1)
  return arr
}
function swap(arr, a, b) {
  let temp = arr[a]
  arr[a] = arr[b]
  arr[b] = temp
}
function partition(arr, start, end) {
  let pivot = end
  let j = start - 1
  for(let i = start; i < end; i++) {
      if(arr[i] < arr[pivot]) {
          j++
          swap(arr, i, j)
      }
  }
  swap(arr, j + 1, pivot)
  return j + 1
}
function _quickSort(arr, start, end) {
  if(start > end) return 
  let pos = partition(arr, start, end)
  _quickSort(arr, start, pos - 1)
  _quickSort(arr, pos + 1, end)
}
quick_sort([325,235,35,23,623,123,62,6,23,23,12])