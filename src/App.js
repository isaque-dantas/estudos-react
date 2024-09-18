import './App.css';
import Board from './components/Board'
import {useState} from "react";

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

    return (<div className="flex content-center gap-10 p-10">
        <Board onPlayerInRoundChange={onPlayerInRoundChange} onPlayerWinning={onPlayerWinning} game={game}/>
        <div className="flex flex-col gap-3">
            <h1 className="text-4xl">TicTacToe!</h1>
            <p>Jogador atual: {currentPlayer}</p>
            <table className="mt-5">
                <thead>
                <tr>
                    <th>Jogador</th>
                    <th>Pontuação</th>
                </tr>
                </thead>
                <tbody>
                <tr className="text-center">
                    <td>{game.players[0].symbol}</td>
                    <td>{game.players[0].score}</td>
                </tr>
                <tr className="text-center">
                    <td>{game.players[1].symbol}</td>
                    <td>{game.players[1].score}</td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>)
}

export default App;
