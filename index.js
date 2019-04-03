const timeit = require('timeit');
const get = require('lodash.get');
const deepFreeze = require('deep-freeze');

const iterations = 50000;

const mainGuy = {
  a: 'yes',
  b: {
    c: 1,
    d: {
      e: 'cold',
      f: {
        g: [
          {
            h: 'v cold',
          },
        ],
      },
    },
  },
};

//This guy doesn't call a function
const nofreeze = (done) => {
  let result;
  result = mainGuy;
  done();
}

//This guy calls a function
const freeze = (done) => {
  let result;
  result = deepFreeze(mainGuy);
  done();
}

timeit.howlong(iterations, [freeze, nofreeze], (err, results) => {
  console.log('Baseline', results[0].average_step_runtime);
  console.log('with freeze', results[1].average_step_runtime);
  console.log('without freeze', results[2].average_step_runtime);
});
