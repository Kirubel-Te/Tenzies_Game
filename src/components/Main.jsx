import "./Main.css"
import Roll from "./RollDie"
import React, { useEffect } from "react"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"

export default function Main(){
    function generatenewDice(){
        let newArray = []
        for (let i = 0 ; i < 10; i++){
            let newDice = Math.ceil(Math.random()*6);
            newArray.push({
                value:newDice,
                isHeld:false,
                id:nanoid()
            })
        }
        return newArray
    }
    const[stateArray, setArray] = React.useState(() => generatenewDice()); 

    function hold(id){
        setArray(prev => (
            prev.map(list => 
                (list.id === id ? {...list , isHeld:!list.isHeld} : list)
            )
        ))
    }

    const rolledDice = stateArray.map(list => (<Roll key={list.id} value={list.value} isHeld={list.isHeld} hold = {() => hold(list.id)}/>))

    function clickHandler(){
        if(!gameWon){
            setArray(prev => (
                prev.map(list => (
                    list.isHeld ? list : {...list,value:Math.ceil(Math.random()*6)}
                ))
            ))
        } else{
            setArray(generatenewDice())
        }
        
    }

    const buttonRef = React.useRef(null)

    const gameWon = (stateArray.every(die => die.isHeld) && stateArray.every(die => die.value === stateArray[0].value))

    useEffect(() => {
        if(gameWon){
            buttonRef.current.focus()
        }
    },[gameWon])

    return(
        <main className="main-section">
            {gameWon && <Confetti/>}
            <div className="headerInfo">
                <h1>Tenzies</h1>
                <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls</p>
            </div>
            <div className="section">
                {rolledDice}
            </div>
            <div className="rollbutton">
                <button ref={buttonRef}onClick={clickHandler}>{gameWon ? "New Game" : "Roll"}</button>
            </div>
        </main>
    )
}