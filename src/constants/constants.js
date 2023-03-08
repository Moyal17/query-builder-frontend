
export const modelNames = [
  { id: 111, name: "Movies", value: 'movie' },
  { id: 222, name: "Actors", value: 'actor' },
  { id: 333, name: "Food", value: 'food' },
]

export const modelFieldsMap = {
  movie: [
    { id: 111, name: "Movie Id", fieldName: 'movie_id'},
    { id: 212, name: "Title", fieldName: 'title' },
    { id: 313, name: "Budget",fieldName: 'budget' },
    { id: 414, name: "Overview", fieldName: 'overview' },
    { id: 515, name: "Release Date", fieldName: 'release_date' },
    { id: 616, name: "Revenue", fieldName: 'revenue' },
    { id: 717, name: "Runtime", fieldName: 'runtime' },
    { id: 818, name: "popularity", fieldName: 'popularity' },
    { id: 919, name: "Release Range", fieldName: 'release_date'}
  ],
  actor: [
    { id: 121, name: "Actor Id", fieldName: 'id'},
    { id: 222, name: "Name", fieldName: 'name' },
    { id: 323, name: "Age",fieldName: 'age' },
    { id: 424, name: "Gender", fieldName: 'gender' },
    { id: 525, name: "popular", fieldName: 'popular' },
    { id: 626, name: "Birthday", fieldName: 'birthday' },
    { id: 827, name: "Movies", fieldName: 'movies' },
    { id: 928, name: "Valued", fieldName: 'valued' },
  ],
  food: [
    { id: 131, name: "Food Id", fieldName: 'id'},
    { id: 232, name: "Name", fieldName: 'name' },
    { id: 333, name: "Protein",fieldName: 'protein' },
    { id: 434, name: "Calories", fieldName: 'calories' },
    { id: 535, name: "Fat", fieldName: 'fat' },
    { id: 636, name: "Size", fieldName: 'size' },
    { id: 737, name: "Portion", fieldName: 'portion' },
    { id: 838, name: "Category", fieldName: 'category' },
  ]
}

export const operators = [
  { id: 1, name: 'equal', symbol: 'equal', type: 'String' },
  { id: 2, name: 'not equal', symbol: 'notEqual', type: 'String' },
  { id: 3, name: 'is not null', value: 'disabled', symbol: 'isNotNull' },
  { id: 4, name: 'is null', value: 'disabled', symbol: 'isNull' },
  { id: 7, name: 'less', symbol: 'less', type: 'Number' },
  { id: 8, name: 'less or equal', symbol: 'lessEqual', type: 'Number' },
  { id: 9, name: 'greater', symbol: 'greater', type: 'Number' },
  { id: 10, name: 'greater or equal', symbol: 'greaterEqual', type: 'Number' },
  { id: 11, name: 'between', symbol: 'between', type: "Range" },
  { id: 12, name: 'not between', symbol: 'notBetween', type: "Range" }
];

export const queryExample = [{
  condition: 'and',
  id: Number.parseInt(Math.random() * 10000),
  rules: [{
    id: 313,
    fieldName: 'budget',
    operator: 'greaterEqual',
    value: 55000000
  }, {
    condition: 'or',
    id: Number.parseInt(Math.random() * 10000),
    rules: [{
      id: 818,
      fieldName: 'popularity',
      operator: 'greater',
      value: 80
    }]
  }]
}];

export const emptyQuery = () => {
  const basicQuery = [{
    condition: 'and',
    id: Number.parseInt(Math.random() * 10000),
    rules: []
  }];
  // making a deep clone of this basic Query condition
  return JSON.parse(JSON.stringify(basicQuery));

}
