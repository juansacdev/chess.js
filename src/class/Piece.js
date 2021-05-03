class Piece {
    constructor(color, type, imgPiece) {
        this.color = color
        this.type = type
        this.imgPiece = imgPiece
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