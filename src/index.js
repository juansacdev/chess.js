import Board from './class/Board'
import Piece from './class/Piece';
import { theme, pieceTheme } from './theme'

const COLUMNS = 8;
const FILES = 8;

const WIDTH = 800;
const HEIGHT = 800;

const pieces = {
	king: ['♚', '♔'],
	queen: ['♛', '♕'],
	rook: ['♜', '♖'],
	bishop: ['♝', '♗'],
	knight: ['♞', '♘'],
	pawn: ['♟', '♙'],
}

const board = new Board (WIDTH, HEIGHT, COLUMNS, FILES, theme, pieceTheme)

// Set all pieces
for (let x = 0; x < FILES; x++) {
	// Black pawns
	board.initPlacePiece(x, 1, new Piece(pieces.pawn, pieceTheme.pieceDark))
	// White pawns
	board.initPlacePiece(x, 6, new Piece(pieces.pawn, pieceTheme.pieceLight))
}

for (let x = 0; x < 2; x++) {
	board.initPlacePiece(0, (x * 7), new Piece(pieces.rook, x ? pieceTheme.pieceLight : pieceTheme.pieceDark))
	board.initPlacePiece(1, (x * 7), new Piece(pieces.knight, x ? pieceTheme.pieceLight : pieceTheme.pieceDark))
	board.initPlacePiece(2, (x * 7), new Piece(pieces.bishop, x ? pieceTheme.pieceLight : pieceTheme.pieceDark))
	board.initPlacePiece(3, (x * 7), new Piece(pieces.queen, x ? pieceTheme.pieceLight : pieceTheme.pieceDark))
	board.initPlacePiece(4, (x * 7), new Piece(pieces.king, x ? pieceTheme.pieceLight : pieceTheme.pieceDark))
	board.initPlacePiece(5, (x * 7), new Piece(pieces.bishop, x ? pieceTheme.pieceLight : pieceTheme.pieceDark))
	board.initPlacePiece(6, (x * 7), new Piece(pieces.knight, x ? pieceTheme.pieceLight : pieceTheme.pieceDark))
	board.initPlacePiece(7, (x * 7), new Piece(pieces.rook, x ? pieceTheme.pieceLight : pieceTheme.pieceDark))
}

board.renderBoard()
