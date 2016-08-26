import test from 'ava';
import createSurvey from  '../';

const spec1 = {
  "How likely is it that you would recommend this company to a friend or colleague?": [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
  ],
  "When looking for this product, how likely are you to consider our company first?": [
    "Extremely likely",
    "Very likely",
    "Somewhat likely",
    "No so likely",
    "Not at all likely"  
  ],
  "In the past 12 months, how many times have you visited our store?": {}    
};

const spec2 = {
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
};

test('complete a survey', t => {
  const question1 = createSurvey(spec1);

  t.is(question1.label, "How likely is it that you would recommend this company to a friend or colleague?"); 

  const question2 = question1.answer(0);

  t.is(question2.label, "When looking for this product, how likely are you to consider our company first?"); 

  const question3 = question2.answer("Extremely likely");

  t.is(question3.label, "In the past 12 months, how many times have you visited our store?"); 
});

test('skipping', t => {
  const question1 = createSurvey(spec2);
  const question2 = question1.answer('Yes');

  t.is(question2.label, 'What\'s your favorite vegetable?');

  const question3 = question2.answer('Corn');

  t.is(question3.label, 'Thank you for taking our survey! Any last words?'); 
});
