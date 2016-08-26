function createSurvey (spec, data = {}, current = null) {

  const keys = Object.keys(spec)

  if (!current) { 
    current = keys[0]
  }
  
  var next = keys[keys.indexOf(current) + 1]

  function answer (response) {
    const question = spec[current]
    const recorded = Object.assign(data, {[current]: response})

    if (Array.isArray(question)) {
      return valid(question)
    }
    else {
      if (question.next) {
        next = question.next(response)
      }

      if (question.options) {
        return valid(question.options)
      }
    }

    function valid (array) {
      if (array.includes(response)) return createSurvey(spec, recorded, next);
      else throw new Error('This is not an option.');
    }
  }

  return {
    data,
    label: current,
    answer
  }
}

module.exports = createSurvey
