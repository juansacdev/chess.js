import Piece from "../Piece";
import { pieceTypes } from '../../utils/config'

class Rook extends Piece {
    constructor(color) {
        super(color, pieceTypes.rook, ['♜', '♖'])
    }

    avalibleMovements(position, matriz) {
        const possibleMovements = [
            [0, -1], // Up
            [0, +1], // Down
            [+1, 0], // Right
            [-1, 0], // Left
        ]

        possibleMovements.forEach(mv => this.checkDirection(position, mv, matriz))
    }
}

export default Rook