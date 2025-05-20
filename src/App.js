function App() {
  return (
    <div className='App'>
      <h1>Wordle Clone</h1>
    </div>
  );
}

export default App;

/**
 * How does wordle work
 * 
 * Need 6 attemps at six 5 character valid words in the english langauage
 * For more fidelity only words that are not slurs or offensive are allowed
 * 
 * At every attempt the system will check which characters exist in the selected word
 * If a character is in the word an not in the right position -> highlight it as yellow
 * If a character is in the word on in the right position -> highlight it as green
 * If a character is not in the word -> highlight it as grey
 * If multiple of the same character is inputted "mamma" and only not all are in the word
 *    If any is in the right position start with that one
 *    If not all are in the word and none are in the right position highlight from left to right
 */