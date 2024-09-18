export default function ScoreBoard({players}) {
    const rows = []
    for (let player of players) {
        rows.push(<tr className="text-center">
            <td>{player.symbol}</td>
            <td>{player.score}</td>
        </tr>)
    }

    return (<table className="mt-5">
            <thead>
            <tr>
                <th>Jogador</th>
                <th>Pontuação</th>
            </tr>
            </thead>
            <tbody>{rows}</tbody>
        </table>)
}