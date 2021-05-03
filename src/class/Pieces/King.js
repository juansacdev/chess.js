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

            if (cell && !(cell.piece && cell.piece.color === this.color)) {
                cell.setAvalibeMove(true)
            }
        })
    }
}

export default King