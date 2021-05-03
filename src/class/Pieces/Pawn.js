import Piece from "../Piece";
import { pieceTheme } from '../../utils/theme'
import { pieceTypes } from '../../utils/piecesType'

class Pawn extends Piece {
    constructor(color) {
        super(color, pieceTypes.pawn, ['♟', '♙'])
    }

    avalibleMovements(position, matriz) {
        const [x, y] = position
        for (let i = 1; i <= 2; i++) {
            const cell = matriz[x][this.color === pieceTheme.pieceDark ? (y + i) : (y - i)]
            console.log(x, y, i, cell);
            if (cell.piece) {
                break
            }
            cell.setAvalibeMove(true)
        }
    }
}

export default Pawn