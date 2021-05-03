import Piece from "../Piece";
import { pieceTypes } from '../../utils/piecesType'

class Bishop extends Piece {
    constructor(color) {
        super(color, pieceTypes.bishop, ['♝', '♗'])
    }

    avalibleMovements(position, matriz) {
        const [x, y] = position

        // Down right
        for (let i = 1; i <= matriz.length; i++) {
            const cell = this.getCellFromCoords([x + i, y + i], matriz)

            if (!cell) break
            cell.setAvalibeMove(true)
            if (cell.piece) break
        }

        // Down left
        for (let i = 1; i <= matriz.length; i++) {
            const cell = this.getCellFromCoords([x - i, y + i], matriz)

            if (!cell) break
            cell.setAvalibeMove(true)
            if (cell.piece) break
        }

        // Up right
        for (let i = 1; i <= matriz.length; i++) {
            const cell = this.getCellFromCoords([x + i, y - i], matriz)

            if (!cell) break
            cell.setAvalibeMove(true)
            if (cell.piece) break

        }

        // Up left
        for (let i = 1; i <= matriz.length; i++) {
            const cell = this.getCellFromCoords([x - i, y - i], matriz)

            if (!cell) break
            cell.setAvalibeMove(true)
            if (cell.piece) break
        }
    }
}

export default Bishop