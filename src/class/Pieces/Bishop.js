import Piece from "../Piece";
import { pieceTypes } from '../../utils/piecesType'

class Bishop extends Piece {
    constructor(color) {
        super(color, pieceTypes.bishop, ['♝', '♗'])
    }

    avalibleMovements(position, matriz) {
        const possibleMovements = [
            [-1, -1], // Up left
            [1, -1], // Up right
            [-1, 1], // Down right
            [1, 1], // Down left
        ]

        possibleMovements.forEach(mv => this.checkDirection(position, mv, matriz))
    }
}

export default Bishop