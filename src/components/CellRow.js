import Cell from "./Cell";

export default function CellRow({cells, onCellClick}) {
    const cellsDisplayable = cells.map(
        (cell, i) => <Cell key={i} data={cell} onClick={onCellClick}/>
    )

    return (<tr>{cellsDisplayable}</tr>)
}