import React from "react";

export default function Row({ guess, currentGuess }) {

    if (guess) {
        return (
            <div className="row past">
                {guess.map((l, i) => {
                    return (
                        <div key={i} className={l.color}>{l.key}</div>
                    )
                })}
            </div>
        )
    }

    if (currentGuess) {
        let letters = currentGuess.split("");
        return (
            <div className="row current">
                {letters.map((l, i) => (
                    <div key={i} className="filled">{l}</div>
                ))}
                {[...Array(5 - letters.length)].map((_, i) => (
                    <div key={i} className="empty"></div>
                ))}
            </div>
        )
    }

    return (
        <div className="row">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}