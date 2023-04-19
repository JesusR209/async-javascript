// Part 1  Introducing Asynchronus Programing: 


//Asynchronous progamming - what allows for several tasks to be accomplished in a timely manner rather than waiting for 
//the tasks previous to it to complete -> multitasking rather than linear structures for completion

//Async code helps functions things like <these>
//Making HTTP requests using fetch()
//Accessing a user's camera or microphone using getUserMedia()
// Asking a user to select files using showOpenFilePicker() <these>
// run while other tasks can continue to get completed too!


//Asked ChatGPT for some notes too:

//Synchronous code can be easier to read and understand because it follows a logical order of execution.
//ynchronous code is useful when we need to perform operations that rely on the completion of a previous operation. For example, if we need to calculate a value based on the result of a previous calculation, we need to wait for the first calculation to complete before we can perform the second one.
// Synchronous code can sometimes lead to performance issues, especially if there are long-running operations that block other operations from running. This can cause the webpage to freeze or become unresponsive.
// Asynchronous JavaScript coding:

//Asynchronous code can be more difficult to read and understand because it doesn't follow a logical order of execution. Instead, we need to use callbacks or promises to manage the order of operations.
// Asynchronous code is useful when we need to perform multiple operations at the same time, or when we have long-running operations that could cause performance issues if we wait for them to complete before continuing with other operations.
// Asynchronous code can sometimes be harder to debug because it can be more difficult to track the order of operations.


// More Mozilla Notes:
//Synchronous functions can lead to performance issues that cause just about everything on a page to either run slow or end up disabled due to functions completing in a linear-like matter
//Async-functions can start operations and come back to them instantaniously whenever they'd need to in order to remain extremely responsive
//Async code can also notify us when an operation is completed. This can come in handy due to asynchronous function running in a non-linear manner.

//CallBack function - a function that is passed into another function with the expectation that the callback will be called at the appropriate time


// This next section is a copy and paste from MDN because there is no explanation needed besides the one given :

// Because we have to call callbacks inside callbacks, we get a deeply nested doOperation() function, which is much harder to read and debug. This is sometimes called "callback hell" or the "pyramid of doom" (because the indentation looks like a pyramid on its side).

// When we nest callbacks like this, it can also get very hard to handle errors: often you have to handle errors at each level of the "pyramid", instead of having error handling only once at the top level.

// For these reasons, most modern asynchronous APIs don't use callbacks. Instead, the foundation of asynchronous programming in JavaScript is the Promise, and that's the subject of the next article.



// Questions: 

// Synchronous completes operations in a linear-like structure, Asynchronous completes tasks in an multitask type manner to provide max efficiency and runtime

// This knowledge can be useful especially when creating a project that may require multiple levels of operations simultaneously, we live in time where consumers are impatient so providing info quick can sometimes be a necessity for a successful program

// The biggest solutions Ansynchronous programming provides as of my knowledge so far is providing faster and more efficient run times through handling several operations at one time, handling long running task in a way that allows for multiple tasks to run at once.


// Part 2:



//Using Promises
//Promises (the foundation of asynchronous programming) - an object returned by a async function representing its current state, the operation is usually incomplete but provides methods on how to complete it.
//fetch is the modern promise-based replacement for XMLHttpRequest

// using Fetch -

const fetchPromise = fetch('https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json');

console.log(fetchPromise);

fetchPromise.then((response) => {
  console.log(`Received response: ${response.status}`);
});

console.log("Started request…");

//fetchPromise is logged to show us the value of the Promise returning the current state of it for example:
// Promise { <state>: "pending" }

// We use the 'then()' method and pass in a function to handle (a "handler") the data we get back. (in this case "response")
// If the server sends us the data successfully, the promise will call our function and pass in the data we asked for. This data is stored in something called a Response object, which has all the information from the server's response.

//lastly we log a message to show that the request has begun




//Chaining Promises
fetchPromise.then((response) => {
    const jsonPromise = response.json();
    jsonPromise.then((data) => {
      console.log(data[0].name);
    });
  });

  // We want the data as JSON so we call .json() on the response object
  






//This example properly shows what promise "Promise Chaining" is to avoid "callback Hell" by returning the first promise
//And using .then() to handle the results of data received from the first .then()

  ____________________________________________

  fetchPromise
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    console.log(data[0].name);
  });
  ____________________________________________



  //Catching Errors:



  //Errors can be thrown for many issues such as connectivity, or a malformed URL and many other reasons
  //handling errors in nested callbacks can be an annoyance since you could end up handling erros at every nesting level
//We use the .catch() method and the end of a promise chain in order for it to be called whenever any of the asynchronous function calls fails.

//It would look something like this when implemented
____________________________________________
fetchPromise
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    console.log(data[0].name);
  })
  .catch((error) => { //starting here
    console.error(`Could not get products: ${error}`);  
  });
  ____________________________________________





  //Promise Terminology:



  // A promise can be in one of 3 states: Pending(neither succeeded or failed yet), fulfilled (succeeded), rejected(failed -this is where the catch() handler will be called)
  //The term "settled" can be used to cover both states, "fulfilled" & "rejected"
  



  //Combining Multiple Promises:



  //A promise chain is what you need when your operation has several async functions that need to be completed one after another
  // Sometimes you may need to combine async function calls and thats where the Promise API comes in
  //Sometimes you need several promises fulfilled but they aren't dependent on one another, in a case like this 
  //we can start them off together and simply have "Promise.all()" tell us when they have all been fulfilled

//   The promise returned by Promise.all() is:

// fulfilled when and if all the promises in the array are fulfilled. In this case, the then() handler is called with an array of all the responses, in the same order that the promises were passed into all().
// rejected when and if any of the promises in the array are rejected. In this case, the catch() handler is called with the error thrown by the promise that rejected.


____________________________________________

const fetchPromise1 = fetch('https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json');
const fetchPromise2 = fetch('https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/not-found');
const fetchPromise3 = fetch('https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json');

Promise.all([fetchPromise1, fetchPromise2, fetchPromise3]) //Promise.all() example
  .then((responses) => {
    for (const response of responses) {
      console.log(`${response.url}: ${response.status}`);
    }
  })
  .catch((error) => {
    console.error(`Failed to fetch: ${error}`)
  });


  ____________________________________________


  //Sometimes, you might need any one of a set of promises to be fulfilled, and don't care which one.
  // In that case, you want Promise.any(). 
  //This is like Promise.all(), except that it is fulfilled as soon as any of the array of promises is fulfilled, or rejected if all of them are rejected:



  ____________________________________________

  Promise.any([fetchPromise1, fetchPromise2, fetchPromise3]) //These do not need to be fulfill in order, whichever is fulfilled first will return first
  .then((response) => {
    console.log(`${response.url}: ${response.status}`);
  })
  .catch((error) => {
    console.error(`Failed to fetch: ${error}`)
  });

  ____________________________________________







  //Async and Await:

  

  //The async keyword gives you a simpler way to work with asynchronous promise-based code. Adding async at the start of a function makes it an async function:


  ____________________________________________

async function myFunction() {
    // This is an async function
  }

  ____________________________________________


  // We use the "await" keyword befora a call to a function that returns a promise in order to return a value once the promise is "settled"
  // The fulfilled value of the promise is then treated as a return value or the rejected value is "thrown" (error)
  // "await" allows you to write async code that looks like synchronous code

  ____________________________________________



  async function fetchProducts() {
    try {
      // after this line, our function will wait for the `fetch()` call to be settled
      // the `fetch()` call will either return a Response or throw an error
      const response = await fetch('https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json');
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
      // after this line, our function will wait for the `response.json()` call to be settled
      // the `response.json()` call will either return the parsed JSON object or throw an error
      const data = await response.json();
      console.log(data[0].name);
    }
    catch (error) {
      console.error(`Could not get products: ${error}`);
    }
  }
  
  fetchProducts();

  ____________________________________________



//Keep in mind that just like a promise chain, await forces asynchronous operations to be completed in series
// This is necessary if the result of the next operation depends on the result of the last one
// but if that's not the case then something like Promise.all() will be more performant



//How To Implement A Promise Based API:


____________________________________________

const output = document.querySelector('#output');
const button = document.querySelector('#set-alarm');

function setAlarm() {
  setTimeout(() => {//start here
    output.textContent = 'Wake up!';
  }, 1000);
}// ends here

button.addEventListener('click', setAlarm);

____________________________________________







//The Promise Constructor 

// This code creates a function called alarm() that returns a Promise.
//  The Promise is fulfilled when a timer expires, passing a message of "Wake up!" to the then() handler.
//   If the caller passes a negative delay value, the Promise is rejected.
//    The Promise() constructor is used to create the Promise, which takes an executor function as an argument. 
//    The executor function takes two arguments, resolve and reject, and is responsible for calling an underlying asynchronous function. 
//    If the asynchronous function succeeds, resolve is called, and if it fails, reject is called.
//     If the executor function throws an error, reject is called automatically.
//      The resolve and reject functions can be passed a single parameter of any type.

____________________________________________

function alarm(person, delay) {
    return new Promise((resolve, reject) => {
      if (delay < 0) {
        throw new Error('Alarm delay must not be negative');
      }
      setTimeout(() => {
        resolve(`Wake up, ${person}!`);
      }, delay);
    });
  }


  ____________________________________________


//   This function creates and returns a new Promise. Inside the executor for the promise, we:

//   check that delay is not negative, and throw an error if it is.

//   call setTimeout(), passing a callback and delay.
//    The callback will be called when the timer expires, and in the callback we call resolve, passing in our "Wake up!" message.




// Just Copied from MDN because its readable 
// Using the alarm() API



// This part should be quite familiar from the last article. 
// We can call alarm(), and on the returned promise call then() and catch() to set handlers for promise fulfillment and rejection.


____________________________________________

const name = document.querySelector('#name');
const delay = document.querySelector('#delay');
const button = document.querySelector('#set-alarm');
const output = document.querySelector('#output');

function alarm(person, delay) {
  return new Promise((resolve, reject) => {
    if (delay < 0) {
      throw new Error('Alarm delay must not be negative');
    }
    setTimeout(() => {
      resolve(`Wake up, ${person}!`);
    }, delay);
  });
}

button.addEventListener('click', () => {
  alarm(name.value, delay.value)
    .then((message) => output.textContent = message)//look here
    .catch((error) => output.textContent = `Couldn't set alarm: ${error}`);
});

____________________________________________















// Using async and await with the alarm() API


// Since alarm() returns a Promise, we can do everything with it that we could do with any other promise: promise chaining, Promise.all(), and async / await:



____________________________________________

const name = document.querySelector('#name');
const delay = document.querySelector('#delay');
const button = document.querySelector('#set-alarm');
const output = document.querySelector('#output');

function alarm(person, delay) {
  return new Promise((resolve, reject) => {
    if (delay < 0) {
      throw new Error('Alarm delay must not be negative');
    }
    setTimeout(() => {
      resolve(`Wake up, ${person}!`);
    }, delay);
  });
}

button.addEventListener('click', async () => {//look here
  try {
    const message = await alarm(name.value, delay.value);//look here
    output.textContent = message;
  }
  catch (error) {
    output.textContent = `Couldn't set alarm: ${error}`;
  }
});
____________________________________________













// Introducing Workers:

//A thread is a sequence of instructions that a program follows.
//A long-running synchronous program may become completely irresponsive if a task in it takes time to fulfill if it is all on a single thread 

//Workers give you the ability to run some tasks in a different thread
//so you can start the task, then continue with other processing (such as handling user actions).

//The downside is  you never know when your thread will be suspended and the other thread will get a chance to run. 
// So if both threads have access to the same variables, 
// it's possible for a variable to change unexpectedly at any time, and this causes bugs that are hard to find.


//3 Types of Workers :

// dedicated workers
// shared workers
// service workers





// Code Example -

____________________________________________

// Create a new worker, giving it the code in "generate.js"
const worker = new Worker('./generate.js');                                      //Look at this line 

// When the user clicks "Generate primes", send a message to the worker.
// The message command is "generate", and the message also contains "quota",
// which is the number of primes to generate.
document.querySelector('#generate').addEventListener('click', () => {
  const quota = document.querySelector('#quota').value;
  worker.postMessage({
    command: 'generate',
    quota,
  });
});

// When the worker sends a message back to the main thread,
// update the output box with a message for the user, including the number of
// primes that were generated, taken from the message data.
worker.addEventListener('message', (message) => {
  document.querySelector('#output').textContent = `Finished generating ${message.data} primes!`;
});

document.querySelector('#reload').addEventListener('click', () => {
  document.querySelector('#user-input').value = 'Try typing in here immediately after pressing "Generate primes"';
  document.location.reload();
});


____________________________________________


//Worker Code :

____________________________________________


// Listen for messages from the main thread.
// If the message command is "generate", call `generatePrimes()`
addEventListener("message", (message) => {
    if (message.data.command === 'generate') {
      generatePrimes(message.data.quota);
    }
  });
  
  // Generate primes (very inefficiently)
  function generatePrimes(quota) {
  
    function isPrime(n) {
      for (let c = 2; c <= Math.sqrt(n); ++c) {
        if (n % c === 0) {
            return false;
         }
      }
      return true;
    }
  
    const primes = [];
    const maximum = 1000000;
  
    while (primes.length < quota) {
      const candidate = Math.floor(Math.random() * (maximum + 1));
      if (isPrime(candidate)) {
        primes.push(candidate);
      }
    }
  
    // When we have finished, send a message to the main thread,
    // including the number of primes we generated.
    postMessage(primes.length);
  }
  ____________________________________________



  //TLDR
  //In this article we've introduced web workers, which enable a web application to offload tasks to a separate thread.
//    The main thread and the worker don't directly share any variables,
//     but communicate by sending messages, which are received by the other side as message events.

// Workers can be an effective way to keep the main application responsive,
//  although they can't access all the APIs that the main application can, and in particular can't access the DOM.