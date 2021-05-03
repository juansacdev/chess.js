import Piece from "../Piece";
import { pieceTheme } from '../../utils/theme'
import { pieceTypes } from '../../utils/piecesType'

class Pawn extends Piece {
    constructor(color) {
        super(color, pieceTypes.pawn, ['♟', '♙'])
    }

    avalibleMovements(position, matriz) {
        const [x, y] = position
        const valueY = this.color === pieceTheme.pieceDark ? 1 : -1
        for (let i = 1; i <= (this.moved ? 1 : 2); i++) {
            const cell = this.getCellFromCoords([x, y + (i *  valueY)], matriz)
            if (cell.piece) break
            cell.setAvalibeMove(true)
        }

        // Movimiento diagonal pa comer
        for (let i = 0; i < 2; i++) {
            const takeCell = this.getCellFromCoords(
                [(x + (i ? 1 : -1)), (y + (1 *  valueY))],
                matriz
            )
            if (takeCell.piece && takeCell.piece.color !== this.color) {
                takeCell.setAvalibeMove(true)
            }
        }
    }
}

export default Pawn