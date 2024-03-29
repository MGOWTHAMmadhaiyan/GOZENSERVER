// Sequential execution using async/await
async function sequentialOperations() {
    try {
      const result1 = await asyncOperation1()
      console.log(result1);
      
      const result2 = await asyncOperation2()
      console.log(result2);
      
      const result3 = await asyncOperation3()
      console.log(result3);
    } catch (error) {
      console.error('Error occurred:', error)
    }
  }
  
  // Parallel execution using async/await
  async function parallelOperations() {
    try {
      const [result1, result2, result3] = await Promise.all([
        asyncOperation1(),
        asyncOperation2(),
        asyncOperation3()
      ]);
      
      console.log(result1, result2, result3);
    } catch (error) {
      console.error('Error occurred:', error);
    }
  }
  
  // Async operations
  function asyncOperation1() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('Result of operation 1');
      }, 1000);
    });
  }
  
  function asyncOperation2() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('Result of operation 2');
      }, 1500);
    });
  }
  
  function asyncOperation3() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('Result of operation 3');
      }, 2000);
    });
  }
  
  // Calling the functions
  sequentialOperations();
  parallelOperations();
  