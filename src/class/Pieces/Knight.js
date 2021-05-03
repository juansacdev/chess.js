import Piece from "../Piece";
import { pieceTypes } from '../../utils/piecesType'

class Knight extends Piece {
    constructor(color) {
        super(color, pieceTypes.knight, ['♞', '♘'])
    }
}

export default Knight