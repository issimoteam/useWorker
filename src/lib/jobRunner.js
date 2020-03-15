/**
 * This function accepts as a parameter a function "userFunc"
 * And as a result returns an anonymous function.
 * This anonymous function, accepts as arguments,
 * the parameters to pass to the function "useArgs" and returns a Promise
 * This function can be used as a wrapper, only inside a Worker
 * because it depends by "postMessage".
 *
 * @param {Function} userFunc {Function} fn the function to run with web worker
 *
 * @returns {Function} returns a function that accepts the parameters
 * to be passed to the "userFunc" function
 */
const jobRunner = userFunc => e => {
  const [userFuncArgs] = e.data

  return Promise.resolve(userFunc(...userFuncArgs))
    .then(result => {
      postMessage(['SUCCESS', result])
    })
    .catch(error => {
      postMessage(['ERROR', error])
    })
}

export default jobRunner
