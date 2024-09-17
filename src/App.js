import './App.css';
import Board from './components/Board'
import {useState} from "react";

function App() {
    const [playerInRound, setPlayerInRound] = useState('O')

    function onPlayerInRoundChange() {
        setPlayerInRound((prevPlayerInRound) => {
            const switchPlayer = {'O': 'X', 'X': 'O'}
            return switchPlayer[prevPlayerInRound]
        })
    }

    return (
        <div className="flex content-center gap-10 p-10">
            <Board onPlayerInRoundChange={onPlayerInRoundChange}/>
            <div className="flex flex-col gap-3">
                <h1 className="text-4xl">TicTacToe!</h1>
                <p>Jogador atual: {playerInRound}</p>
            </div>
        </div>
    )
}

export default App;
