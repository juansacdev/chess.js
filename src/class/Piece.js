class Piece {
    constructor(color, type, imgPiece) {
        this.color = color
        this.type = type
        this.imgPiece = imgPiece
        this.moved = false
    }

    // Torre - Reina - Alfil
    checkDirection(position, direction, matriz) {
        const [x, y] = position
        const [dirX, dirY] = direction

        for (let i = 1; i <= matriz.length; i++) {
            const cell = this.getCellFromCoords([x + (i * dirX), y + (i * dirY)], matriz)

            if (!cell) break
            if (cell.piece && cell.piece.color === this.color) break
            cell.setAvalibeMove(true)
            if (cell.piece) break
        }
    }

    getCellFromCoords(position, matriz) {
        const [x, y] = position
        const column = matriz[x] || []
        const cell = column[y]
        return cell
    }

    avalibleMovements(position, matriz) {
        throw new Error(`Missing avalibleMovements in ${this.type}`)
    }
}

export default Piece