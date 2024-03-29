//1. MISSING NUMBER:
let inputData = [1, 2, 3, 5, 6] 
let maxCount = Math.max(...inputData)
let missingNumber;

for(let index=1; index <= maxCount; index++) {
    if (inputData.indexOf(index) == -1) {missingNumber = index}
}
console.log('Mising Number is : ', missingNumber)

//2. REMOVE DUPLICATE VALUES:
let inputArray = [1, 2, 3, 3, 4,4, 5, 5, 5, 6, 6, 7] 
let uniqueArray = [...new Set(inputArray)]
console.log('New Length :', uniqueArray.length)


//3. Factorial
function factorial(n) {
    if (n === 0 || n === 1) {
        return 1;
    }
    else {
        return n * factorial(n - 1);
    }
}

const num = 5;
const result = factorial(num);
console.log(`Factorial of ${num} is: ${result}`);



//4. ROTATE ARRAY:
// Function to rotate the array
function rotateArray(arr, k) {
	const n = arr.length;
	if (k === 0) {
		return;
	}

	// Rotate the array to the right by one position
	const temp = arr[n - 1];
	for (let i = n - 1; i > 0; i--) {
		arr[i] = arr[i - 1];
	}
	arr[0] = temp;

	// Recursively rotate the remaining elements k-1 times
	rotateArray(arr, k - 1);
}

const arr = [1,2,3, 4, 5,6, 7];
const k = 3; 
rotateArray(arr, k);

console.log('Rotated Array:', [...new Set(arr.join(''))]);