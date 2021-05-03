import Piece from "../Piece";
import { pieceTheme } from '../../utils/theme'
import { pieceTypes } from '../../utils/piecesType'

class Pawn extends Piece {
    constructor(color) {
        super(color, pieceTypes.pawn, ['♟', '♙'])
    }

    avalibleMovements(position, matriz) {
        const [x, y] = position

        // 1 = negras | -1 = blancas
        const positionY = this.color === pieceTheme.pieceDark ? 1 : -1

        // Primer movimiento
        for (let i = 1; i <= (this.moved ? 1 : 2); i++) {
            const cell = this.getCellFromCoords([x, y + (i *  positionY)], matriz)
            if (cell.piece) break
            cell.setAvalibeMove(true)
        }

        // Movimiento diagonal pa' comer
        for (let i = 0; i < 2; i++) {
            const takeCell = this.getCellFromCoords(
                [
                    (x + (i ? 1 : -1)), // Valor X
                    (y + (1 * positionY)) // Valor Y
                ],
                matriz
            )
            if (takeCell && takeCell.piece && takeCell.piece.color !== this.color) {
                takeCell.setAvalibeMove(true)
            }
        }
    }
}

export default Pawn