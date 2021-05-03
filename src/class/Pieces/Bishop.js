import Piece from "../Piece";
import { pieceTypes } from '../../utils/piecesType'

class Bishop extends Piece {
    constructor(color) {
        super(color, pieceTypes.bishop, ['♝', '♗'])
    }

    checkDiagonal(position, movement, matriz) {
        const [x, y] = position
        const [movX, movY] = movement

        for (let i = 1; i <= matriz.length; i++) {
            const cell = this.getCellFromCoords([x + (i * movX), y + (i * movY)], matriz)

            if (!cell) break
            if (cell.piece && cell.piece.color === this.color) break
            cell.setAvalibeMove(true)
            if (cell.piece) break
        }
    }

    avalibleMovements(position, matriz) {
        // Down right
        this.checkDiagonal(position, [1, 1], matriz)

        // Down left
        this.checkDiagonal(position, [-1, 1], matriz)

        // Up right
        this.checkDiagonal(position, [1, -1], matriz)

        // Up left
        this.checkDiagonal(position, [-1, -1], matriz)

    }
}

export default Bishop