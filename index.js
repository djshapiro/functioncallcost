const timeit = require('timeit');
const get = require('lodash.get');

const iterations = 500000;

const mainGuy = {
  a: 'yes'
};

//This guy doesn't call a function
const nofunc = (done) => {
  let result;
  result = (mainGuy && mainGuy.a) || '';
  done();
}

//This guy calls a function
const func = (done) => {
  let result;
  result = get(mainGuy, 'a', '');
  done();
}

timeit.howlong(iterations, [func, nofunc], (err, results) => {
  console.log('Baseline', results[0].average_step_runtime);
  console.log('with function invokation', results[1].average_step_runtime);
  console.log('without function invokation', results[2].average_step_runtime);
});
