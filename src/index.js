import Board from './class/Board'
import Pawn from './class/Pieces/Pawn';
import Rook from './class/Pieces/Rook';
import Knight from './class/Pieces/Knight';
import Bishop from './class/Pieces/Bishop';
import Queen from './class/Pieces/Queen';
import King from './class/Pieces/King';
import { pieceTypes } from './utils/piecesType'
import { theme, pieceTheme } from './utils/theme'
import socket from './helpers/sockets'

const COLUMNS = 8;
const FILES = 8;

const WIDTH = 800;
const HEIGHT = 800;

const board = new Board (WIDTH, HEIGHT, COLUMNS, FILES, theme, pieceTheme)

socket.on('init board', (serverPeices) => {
	serverPeices.forEach((file, y) => {
		file.forEach((currentPiece, x) => {
			if (!currentPiece) return
			const [colorType, pieceType = ''] = currentPiece.split('')
			const color = colorType === 'b' ? pieceTheme.pieceDark : pieceTheme.pieceLight
			let piece
			if (pieceType === pieceTypes.pawn) piece = new Pawn(color)
			if (pieceType === pieceTypes.rook) piece = new Rook(color)
			if (pieceType === pieceTypes.king) piece = new King(color)
			if (pieceType === pieceTypes.queen) piece = new Queen(color)
			if (pieceType === pieceTypes.knight) piece = new Knight(color)
			if (pieceType === pieceTypes.bishop) piece = new Bishop(color)

			board.initPlacePiece(x, y, piece)
		})
	})
	board.renderBoard()
})
