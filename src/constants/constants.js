
export const modelNames = [
  { id: 111, name: "Movies", value: 'movie' },
  { id: 222, name: "Actors", value: 'actor' },
  { id: 333, name: "Food", value: 'food' },
]

export const modelFieldsMap = {
  movie: [
    { id: 1, name: "Movie Id", fieldName: 'movie_id'},
    { id: 2, name: "Title", fieldName: 'title' },
    { id: 3, name: "Budget",fieldName: 'budget' },
    { id: 4, name: "Overview", fieldName: 'overview' },
    { id: 5, name: "Release Date", fieldName: 'release_date' },
    { id: 6, name: "Revenue", fieldName: 'revenue' },
    { id: 8, name: "Runtime", fieldName: 'runtime' },
    { id: 9, name: "popularity", fieldName: 'popularity' },
    { id: 10, name: "Release Range", fieldName: 'release_date'}
  ],
  actor: [
    { id: 1, name: "Actor Id", fieldName: 'id'},
    { id: 2, name: "Name", fieldName: 'name' },
    { id: 3, name: "Age",fieldName: 'age' },
    { id: 4, name: "Gender", fieldName: 'gender' },
    { id: 5, name: "popular", fieldName: 'popular' },
    { id: 6, name: "Birthday", fieldName: 'birthday' },
    { id: 8, name: "Movies", fieldName: 'movies' },
    { id: 9, name: "Valued", fieldName: 'valued' },
  ],
  food: [
    { id: 1, name: "Food Id", fieldName: 'id'},
    { id: 2, name: "Name", fieldName: 'name' },
    { id: 3, name: "Protein",fieldName: 'protein' },
    { id: 4, name: "Calories", fieldName: 'calories' },
    { id: 5, name: "Fat", fieldName: 'fat' },
    { id: 6, name: "Size", fieldName: 'size' },
    { id: 8, name: "Portion", fieldName: 'portion' },
    { id: 9, name: "Category", fieldName: 'category' },
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
