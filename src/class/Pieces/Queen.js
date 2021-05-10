import Piece from "../Piece";
import { pieceTypes } from '../../utils/config'

class Queen extends Piece {
    constructor(color) {
        super(color, pieceTypes.queen, ['♛', '♕'])
    }

    avalibleMovements(position, matriz) {
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

        possibleMovements.forEach(mv => this.checkDirection(position, mv, matriz))
    }
}

export default Queen