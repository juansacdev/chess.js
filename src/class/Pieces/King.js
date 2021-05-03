import Piece from "../Piece";
import { pieceTypes } from '../../utils/piecesType'

class King extends Piece {
    constructor(color) {
        super(color, pieceTypes.king, ['♚', '♔'])
    }

    avalibleMovements(position, matriz) {
        const [x, y] = position
        const possibleMovements = [
            [0, -1], // Up
            [0, +1], // Down
            [+1, 0], // Right
            [-1, 0], // Left
            [-1, -1], // Up left
            [1, -1], // Up right
            [-1, 1], // Down right
            [1, 1], // Down left
        ]


        possibleMovements.forEach(mv =>{
            const [dirX, dirY] = mv
            const cell = this.getCellFromCoords([x + (1 * dirX), y + (1 * dirY)], matriz)

            if (this.checkValidCell(cell)) {
                cell.setAvalibeMove(true)
            }
        })

        if (this.moved) return

        // Enroque right side
        const cellOneRightToCastling = this.getCellFromCoords([x + 1, y], matriz)
        const cellTwoRightToCastling = this.getCellFromCoords([x + 2, y], matriz)
        const cellRightToCastlingRook = this.getCellFromCoords([x + 3, y], matriz)
        if (
            !cellOneRightToCastling.piece
            && !cellTwoRightToCastling.piece
            && cellRightToCastlingRook.piece
            && cellRightToCastlingRook.piece.type === pieceTypes.rook
            && !cellRightToCastlingRook.piece.moved
        ) {
            cellTwoRightToCastling.setAvalibeMove(true)
        }

        // Enroque left side
        const cellOneLeftToCastling = this.getCellFromCoords([x - 1, y], matriz)
        const cellTwoLeftToCastling = this.getCellFromCoords([x - 2, y], matriz)
        const cellThreeToCastlingRook = this.getCellFromCoords([x - 3, y], matriz)
        const cellLeftToCastlingRook = this.getCellFromCoords([x - 4, y], matriz)
        if (
            !cellOneLeftToCastling.piece
            && !cellTwoLeftToCastling.piece
            && !cellThreeToCastlingRook.piece
            && cellLeftToCastlingRook.piece
            && cellLeftToCastlingRook.piece.type === pieceTypes.rook
            && !cellLeftToCastlingRook.piece.moved
        ) {
            cellTwoLeftToCastling.setAvalibeMove(true)
        }
    }
}

export default King