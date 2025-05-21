import { useState } from 'react'

const useWordle = (solution) => {   
    const [turn, setTurn] = useState(0) // Current turn
    const [currentGuess, setCurrentGuess] = useState('') // Current guess
    const [guesses, setGuesses] = useState([...Array(6)]) // All guesses as arrays
    const [isCorrect, setIsCorrect] = useState(false) // Is the guess correct
    const [history, setHistory] = useState([]) // History of guesses as strings

    // Get a guess and format it into an array of letters objects
    // [{key: 'a', color: 'yellow'}]
    const formatGuess = () => {
        let solutionArray = [...solution]
        let formattedGuess = [...currentGuess].map((l) => {
            return { key: l, color: 'grey' }
        })

        // find any green letters
         formattedGuess.forEach((l, i) => {
            if (solution[i] === l.key) {
                formattedGuess[i].color = 'green'
                solutionArray[i] = null
            }
        })

        // find any yellow letters
        formattedGuess.forEach((l, i) => {
            if (solutionArray.includes(l.key) && l.color !== 'green') {
                formattedGuess[i].color = 'yellow'
                solutionArray[solutionArray.indexOf(l.key)] = null
                }
        })

        return formattedGuess
    }

    // Add new guess to the guess state
    // Update the isCorrect state if the guess is correct
    // Add one turn to the turn state
    const addNewGuess = (formattedGuess) => {
        if (currentGuess === solution) {
            setIsCorrect(true)
        }
        setGuesses(prevGuesses => {
            let newGuesses = [...prevGuesses]
            newGuesses[turn] = formattedGuess
            return newGuesses
        })
        setHistory(prevHistory => {
            return [...prevHistory, currentGuess]
        })
        setTurn(prevTurn => {
            return prevTurn + 1
        })
        setCurrentGuess('')
    }

    // Handle the keyup event and track current guess
    // If the user presses enter, check if the guess is valid
    // If the guess is valid, add it to the guesses state
    // If the guess is not valid, show an error message
    const handleKeyup = ({ key }) => {
        // Check if the key is an enter
        // Check if the turn is less than 6
        // Check if the length of the current guess is 5
        // Check the word is not duplicated
        // TODO If it is, check if the guess is valid
        if (key === 'Enter') {
            if (turn > 5) {
                console.log('You have used all your guesses')
                return
            }
            if (currentGuess.length !== 5){
                console.log('Word must be 5 characters')
                return
            }
            if (history.includes(currentGuess)) {
                console.log('Word already guessed')
                return
            }
            const formatted = formatGuess()
            addNewGuess(formatted)
        }

        // Check if the key is a backspace
        // If it is, remove the last character from the current guess
        if (key === 'Backspace') setCurrentGuess((prev) => prev.slice(0, -1))
        // Check if the key is enter
        // If it is, check if word has less than 5 characters
        // TODO check if word exists as valid word
        else if (/^[A-Za-z]$/.test(key)) {
            if (currentGuess.length < 5) {
                setCurrentGuess((prev) => prev + key)
            }
        }

    }

    return {
        turn,
        currentGuess,
        guesses,
        isCorrect,
        handleKeyup
    }

}

export default useWordle