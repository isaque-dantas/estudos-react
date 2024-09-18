import './App.css';
import Board from './components/Board'
import {useState} from "react";
import ScoreBoard from "./components/ScoreBoard";

function App() {
    const [game, setGame] = useState(gameFactory())
    const [currentPlayer, setCurrentPlayer] = useState(game.players[0].symbol)

    function gameFactory() {
        const firstPlayer = playerFactory('O')

        return {
            currentPlayer: firstPlayer.symbol, players: [firstPlayer, playerFactory('X')]
        }
    }

    function playerFactory(symbol) {
        return {symbol: symbol, score: 0}
    }

    function onPlayerInRoundChange(currentPlayer) {
        setGame({...game, currentPlayer: currentPlayer})
        setCurrentPlayer(currentPlayer)
    }

    function onPlayerWinning(winner) {
        const winnerPlayer = game.players.filter((player) => {
            return player.symbol === winner
        })[0]

        const newScore = winnerPlayer.score + 1

        setGame((prevState) => {
            const players = prevState.players.map((player) => {
                if (player.symbol === winner) player.score = newScore
                return player
            })

            return {...prevState, players: players}
        })
    }

    return (<>
        <div className="fixed bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2 p-10 flex flex-col gap-6 items-center">
            <div className="flex content-center gap-10 items-center">
                <Board onPlayerInRoundChange={onPlayerInRoundChange} onPlayerWinning={onPlayerWinning} game={game}/>
                <div className="flex flex-col gap-3">
                    <h1 className="text-4xl">Jogo da velha</h1>
                    <h3 className="mt-2 text-xl">Jogador atual: {currentPlayer}</h3>
                    <ScoreBoard players={game.players}/>
                </div>
            </div>
            <p className="text-gray-500">Por Isaque Dantas, com&nbsp;
                <a className="text-blue-500 underline" href="https://react.dev">React</a></p>
        </div>
    </>)
}

export default App;
