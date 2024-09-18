import {useState} from "react";
import CellRow from "./CellRow";

export default function Board({onPlayerInRoundChange, game, onPlayerWinning}) {
    const [board, setBoard] = useState(boardFactory)
    const [cellRows, setCellRows] = useState(() => getCellRows(boardFactory()))

    function boardFactory() {
        const boardSize = {x: 3, y: 3};

        const cells = []
        for (let i = 0; i < boardSize.x; i++) {
            for (let j = 0; j < boardSize.y; j++) {
                cells.push(cellFactory(i, j));
            }
        }

        return {cells: cells, currentPlayerInRound: 'O', size: boardSize}
    }

    function cellFactory(x, y) {
        return {x: x, y: y, content: null};
    }

    function onCellClick(clickedX, clickedY) {
        const clickedCell = board.cells.filter(cell => cell.x === clickedX && cell.y === clickedY)[0]
        const wasAlreadyClicked = clickedCell.content !== null
        if (wasAlreadyClicked) return;

        const newCells = board.cells.map(cell => {
            if (cell.x === clickedX && cell.y === clickedY) cell.content = board.currentPlayerInRound
            return cell
        })

        const symbols = game.players.map((player) => player.symbol)
        const newCurrentPlayer = board.currentPlayerInRound === symbols[0] ? symbols[1] : symbols[0]

        const updatedBoard = board
        updatedBoard.cells = newCells
        updatedBoard.currentPlayerInRound = newCurrentPlayer

        onPlayerInRoundChange(newCurrentPlayer)

        const wasThereAnyWinner = checkForWinning(updatedBoard)

        if (wasThereAnyWinner) {
            updatedBoard.cells = boardFactory().cells
        }

        setBoard(updatedBoard)
        setCellRows(getCellRows(updatedBoard))
    }

    function checkForWinning(board) {
        const possibleAxes = {
            columns: [],
            rows: [],
            diagonals: [],
        }

        possibleAxes.diagonals = [
            board.cells.filter(cell => cell.x === cell.y),
            board.cells.filter(cell => cell.x + cell.y === board.size.x - 1),
        ]

        for (let i = 0; i < board.size.x; i++) {
            possibleAxes.columns.push(board.cells.filter(cell => cell.x === i))
            possibleAxes.rows.push(board.cells.filter(cell => cell.y === i))
        }

        let results = []
        for (let axis in possibleAxes) {
            results = (results.concat(possibleAxes[axis].map(cellsList => {
                const firstCellContent = cellsList[0].content
                return {
                    player: firstCellContent,
                    isWinning: cellsList.every(cell => cell.content === firstCellContent && firstCellContent !== null)
                }
            })))
        }

        if (results.some(result => result.isWinning)) {
            const winner = results.filter(result => result.isWinning)[0].player
            handleWinning(winner)
            return true
        }

        return false
    }

    function handleWinning(player) {
        onPlayerWinning(player)
    }

    function getCellRows(inputBoard) {
        const rows = []

        for (let i = 0; i < inputBoard.size.y; i++) {
            const cells = inputBoard.cells.filter((cell) => cell.y === i)
            rows.push(<CellRow key={i} cells={cells} onCellClick={onCellClick}/>)
        }

        return rows
    }

    return (<table className="flex flex-col items-center">
        <tbody>{cellRows}</tbody>
    </table>)
}