export default function Cell({data, onClick}) {
    const borderClasses = []
    if (data.x === 0) borderClasses.push('border-l')
    if (data.y === 0) borderClasses.push('border-t')

    function handleClick() {
        onClick(data.x, data.y)
    }

    const standardDataContent = '-'

    return (<td onClick={handleClick} className={"board-cell " + borderClasses.join(' ')}>
        {data.content ? data.content : standardDataContent}
    </td>)
}