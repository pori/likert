# Likert

[![Build Status](https://travis-ci.org/pori/likert.svg?branch=master)](https://travis-ci.org/pori/likert)
[![Coverage Status](https://coveralls.io/repos/github/pori/likert/badge.svg?branch=master)](https://coveralls.io/github/pori/likert?branch=master)

Survey data flow engine.

## Install

```
npm install likert
```

## Usage

```js
import createSurvey from 'likert';

const spec = {
  'Do you like vegetables?': {
    options: ['Yes', 'No'],
    next: answer => {
      if (answer === 'Yes') return 'What\'s your favorite vegetable?';
      else return 'Thank you for taking our survey! Any last words?';
    }
  },
  'What\'s your favorite vegetable?': {
    options: [
      'Corn', 'Carrots', 'Tomatoes'
    ],
    next: answer => {
      if (answer === 'Tomatoes') return 'You do realize tomatoes are a fruit, right?';
      else return 'Thank you for taking our survey! Any last words?'; 
    }
  },
  'You do realize tomatoes are a fruit, right?': [
    'Yes', 'No'
  ],
  'Thank you for taking our survey! Any last words?': {} 
}

const question1 = createSurvey(spec2);
const question2 = question1.answer('Yes');
const question3 = question2.answer('Corn');
const question4 = question3.answer('I love vegetables!');
```

## License

MIT

---

> [pori.io](http://pori.io) &nbsp;&middot;&nbsp;
> GitHub [@pori](https://github.com/pori) &nbsp;&middot;&nbsp;
> Twitter [@pori_alex](https://twitter.com/pori_alex)

