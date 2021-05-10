import ChessBoard from './class/Board'
import PawnPiece from './class/Pieces/Pawn';
import RookPiece from './class/Pieces/Rook';
import KnightPiece from './class/Pieces/Knight';
import BishopPiece from './class/Pieces/Bishop';
import QueenPiece from './class/Pieces/Queen';
import KingPiece from './class/Pieces/King';
import { pieceTypes } from './utils/config'
import { theme, pieceTheme } from './utils/config'
import { boardSettings } from './utils/config'
import socket from './helpers/sockets'

const board = new ChessBoard(
	boardSettings.WIDTH,
	boardSettings.HEIGHT,
	boardSettings.COLUMNS,
	boardSettings.FILES,
	theme,
	pieceTheme,
)

socket.on('init board', (serverPeices) => {
	serverPeices.forEach((file, y) => {
		file.forEach((currentPiece, x) => {
			if (!currentPiece) return
			const [colorType, pieceType = ''] = currentPiece.split('')
			const color = colorType === 'b' ? pieceTheme.pieceDark : pieceTheme.pieceLight
			let piece
			if (pieceType === pieceTypes.pawn) piece = new PawnPiece(color)
			if (pieceType === pieceTypes.rook) piece = new RookPiece(color)
			if (pieceType === pieceTypes.king) piece = new KingPiece(color)
			if (pieceType === pieceTypes.queen) piece = new QueenPiece(color)
			if (pieceType === pieceTypes.knight) piece = new KnightPiece(color)
			if (pieceType === pieceTypes.bishop) piece = new BishopPiece(color)

			board.initPlacePiece(x, y, piece)
		})
	})
	board.renderBoard()
})
