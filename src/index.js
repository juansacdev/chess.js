import Board from './class/Board'
import Pawn from './class/Pieces/Pawn';
import Rook from './class/Pieces/Rook';
import Knight from './class/Pieces/Knight';
import Bishop from './class/Pieces/Bishop';
import Queen from './class/Pieces/Queen';
import King from './class/Pieces/King';
import { theme, pieceTheme } from './utils/theme'

const COLUMNS = 8;
const FILES = 8;

const WIDTH = 800;
const HEIGHT = 800;

const board = new Board (WIDTH, HEIGHT, COLUMNS, FILES, theme, pieceTheme)

// Set all pieces
for (let x = 0; x < FILES; x++) {
	// Black pawns
	board.initPlacePiece(x, 1, new Pawn(pieceTheme.pieceDark))
	// White pawns
	board.initPlacePiece(x, 6, new Pawn(pieceTheme.pieceLight))
}

for (let x = 0; x < 2; x++) {
	board.initPlacePiece(0, (x * 7), new Rook(x ? pieceTheme.pieceLight : pieceTheme.pieceDark))
	board.initPlacePiece(1, (x * 7), new Knight(x ? pieceTheme.pieceLight : pieceTheme.pieceDark))
	board.initPlacePiece(2, (x * 7), new Bishop(x ? pieceTheme.pieceLight : pieceTheme.pieceDark))
	board.initPlacePiece(3, (x * 7), new Queen(x ? pieceTheme.pieceLight : pieceTheme.pieceDark))
	board.initPlacePiece(4, (x * 7), new King(x ? pieceTheme.pieceLight : pieceTheme.pieceDark))
	board.initPlacePiece(5, (x * 7), new Bishop(x ? pieceTheme.pieceLight : pieceTheme.pieceDark))
	board.initPlacePiece(6, (x * 7), new Knight(x ? pieceTheme.pieceLight : pieceTheme.pieceDark))
	board.initPlacePiece(7, (x * 7), new Rook( x ? pieceTheme.pieceLight : pieceTheme.pieceDark))
}

board.renderBoard()

