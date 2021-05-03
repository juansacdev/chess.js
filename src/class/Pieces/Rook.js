import Piece from "../Piece";
import { pieceTypes } from '../../utils/piecesType'

class Rook extends Piece {
    constructor(color) {
        super(color, pieceTypes.rook, ['♜', '♖'])
    }
}

export default Rook