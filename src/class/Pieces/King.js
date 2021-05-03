import Piece from "../Piece";
import { pieceTypes } from '../../utils/piecesType'

class King extends Piece {
    constructor(color) {
        super(color, pieceTypes.king, ['♚', '♔'])
    }
}

export default King