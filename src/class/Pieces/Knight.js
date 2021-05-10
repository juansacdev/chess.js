import Piece from "../Piece";
import { pieceTypes } from '../../utils/config'

class Knight extends Piece {
    constructor(color) {
        super(color, pieceTypes.knight, ['♞', '♘'])
    }

    avalibleMovements(position, matriz) {
        const [x, y] = position

        const possibleMovements = [
            [x - 1, y - 2], // Up left
            [x + 1, y - 2], // Up right
            [x + 2, y - 1], // Right up
            [x + 2, y + 1], // Right down
            [x + 1, y + 2], // Down right
            [x - 1, y + 2], // Down left
            [x - 2, y + 1], // Left down
            [x - 2, y - 1], // Left up
        ]

        possibleMovements.forEach(mv => {
            const cell = this.getCellFromCoords(mv, matriz)
            if (this.checkValidCell(cell)) {
                cell.setAvalibeMove(true)
            }
        })
    }
}

export default Knight