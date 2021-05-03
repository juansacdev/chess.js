import Piece from "../Piece";
import { pieceTypes } from '../../utils/piecesType'

class Queen extends Piece {
    constructor(color) {
        super(color, pieceTypes.queen, ['♛', '♕'])
    }
}

export default Queen