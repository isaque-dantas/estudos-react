import {useState} from "react";
import CellRow from "./CellRow";

export default function Board({onPlayerInRoundChange}) {
    const [board, setBoard] = useState(boardFactory());
    const [cellRows, setCellRows] = useState(getCellRows());

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
        const wasCellAlreadyClicked = clickedCell.content !== null

        if (wasCellAlreadyClicked) {
            console.log(`WAS CLICKED! x: ${clickedX}; y: ${clickedY}`);
            return;
        }

        board.cells = board.cells.map(cell => {
            if (cell.x === clickedX && cell.y === clickedY) {
                cell.content = board.currentPlayerInRound
            }

            return cell
        });

        const switchPlayer = {'O': 'X', 'X': 'O'}
        board.currentPlayerInRound = switchPlayer[board.currentPlayerInRound]

        onPlayerInRoundChange()

        setBoard(board)
        setCellRows(getCellRows())
    }

    function getCellRows() {
        const rows = []
        for (let i = 0; i < board.size.y; i++) {
            const cells = board.cells.filter((cell) => cell.y === i)
            rows.push(<CellRow key={i} cells={cells} onCellClick={onCellClick}/>)
        }

        return rows
    }

    return (<table className="flex flex-col items-center">
        <tbody>{cellRows}</tbody>
    </table>)
}