import Cell from './Cell'
import { cellSelectedTheme, pieceTheme } from '../utils/config'
import { pieceTypes } from '../utils/config'
import socket from '../helpers/sockets'

class Board {
    constructor(
		width,
		height,
		columns,
		files,
		theme,
		pieceTheme
	) {
        this.width = width
        this.height = height
        this.columns = columns
        this.files = files
        this.theme = theme
		this.pieceTheme = pieceTheme

        this.CELL_WIDTH = this.width / this.columns;
        this.CELL_HEIGHT = this.height / this.files;

		this.previousCell = null
		this.previousCellXY = []
		this.allSelectedCells = []
		this.matriz = [];

		this.disable = true
		this.isBlack = false

        this.canvas = document.createElement("canvas");
        this.contextCanvas = this.canvas.getContext("2d");

        this.canvas.width = this.width;
        this.canvas.height = this.height;

		this.div = document.getElementById('gameScreen')
        this.div.appendChild(this.canvas);
        document.body.style.display = 'grid'
        document.body.style.placeItems = 'center'
        document.body.style.height = '99vh'
        document.body.parentElement.style.height = '100vh'
        document.body.style.alignItems = 'center'
        document.body.style.backgroundColor = '#333'

		// Init board
		for (let x = 0; x < this.files ; x++) {
			this.matriz[x] = [];
			for (let y = 0; y < this.columns; y++) {
				this.matriz[x][y] = new Cell;
			}
		}

		// Bind Methods
		this.setSelectedCell = this.setSelectedCell.bind(this)
		this.pickPiece = this.pickPiece.bind(this)
		this.dropPiece = this.dropPiece.bind(this)
		this.onSocketMove = this.onSocketMove.bind(this)
		this.onSocketWhiteTurn = this.onSocketWhiteTurn.bind(this)
		this.onSocketBlackTurn = this.onSocketBlackTurn.bind(this)

		// Mouse Events
		this.canvas.addEventListener('mousedown', this.pickPiece)
		this.canvas.addEventListener('mouseup', this.dropPiece)

		// Socket Events
		socket.on('move', this.onSocketMove)
		socket.on('white Turn', this.onSocketWhiteTurn)
		socket.on('black Turn', this.onSocketBlackTurn)
    }

	onSocketMove([prev, next]) {
		const [xPrev, yPrev] = prev
		const [xNext, yNext] = next

		const selectedCell = this.matriz[xNext][yNext]
		const previousCell = this.matriz[xPrev][yPrev]

		selectedCell.setPiece(previousCell.piece)
		this.allSelectedCells.push(selectedCell)

		previousCell.piece.moved = true
		previousCell.setPiece(null)
		this.previousCell = null
		selectedCell.setSelected(true)

		this.disable = true

		// this.flip = !this.flip

		this.clearAvalibleMove()
		this.renderBoard()
	}

	onSocketWhiteTurn() {
		this.disable = false
	}

	onSocketBlackTurn() {
		this.isBlack = true
		this.renderBoard()
	}

	clearSelections() {
		this.allSelectedCells.forEach(cell => cell.setSelected(false))
		this.allSelectedCells = []
	}

	clearAvalibleMove() {
		this.matriz.forEach((column) => {
			column.forEach((cell) => {
				cell.setAvalibeMove(false)
			})
		})
	}

	pickPiece(event) {
		if (this.disable) return
		this.clearSelections()
		this.clearAvalibleMove()
		if (this.previousCell) return

		const { layerX, layerY } = event
		const [column, file] = this.mouseCoordinateToCell(layerX, layerY)
		const selectedCell = this.matriz[column][file]

		if (!selectedCell.piece) return
		if (this.isBlack && selectedCell.piece.color === pieceTheme.pieceLight) return
		if (!this.isBlack && selectedCell.piece.color === pieceTheme.pieceDark) return

		console.log(this.matriz);
		selectedCell.piece.avalibleMovements([column, file], this.matriz)

		this.previousCellXY = [column, file]
		this.previousCell = selectedCell
		this.allSelectedCells.push(selectedCell)
		selectedCell.setSelected(true)

		this.renderBoard()
	}

	dropPiece(event) {
		if (!this.previousCell){
			return
		}

		const { layerX, layerY } = event
		const [file, column] = this.mouseCoordinateToCell(layerX, layerY)
		const selectedCell = this.matriz[file][column]

		// Previene que se mueva en la misma coordenada
		if (this.previousCell === selectedCell){
			this.previousCell = null
			this.clearSelections()
			this.renderBoard()
			return
		}

		// Evita un movimiento que no es valido
		if (!selectedCell.avalibleMove){
			this.previousCell = null
			this.renderBoard()
			return
		}

		// Enroque
		let kingPiece
		if (this.previousCell.piece.type === pieceTypes.king) {
			kingPiece = this.previousCell.piece
			if (!kingPiece.moved || kingPiece.isCastling([file, column])) {
				kingPiece.castling([file, column], this.matriz)
			}
		}

		socket.emit('move', [this.previousCellXY, [file, column]])
	}

	mouseCoordinateToCell(x, y) {
		let file = Math.floor(x / this.CELL_WIDTH)
		let column = Math.floor(y / this.CELL_HEIGHT)

		if (this.isBlack) {
			file = this.files - 1 - file
			column = this.columns - 1 - column
		}

		return [file, column]
	}

	setSelectedCell(event) {
		const { layerX, layerY } = event
		const [file, column] = this.mouseCoordinateToCell(layerX, layerY)
		const selectedCell = this.matriz[file][column]
		selectedCell.setSelected(true)
		this.renderBoard()
	}

	initPlacePiece(x, y, piece) {
		const cell = this.matriz[x][y]
		cell.setPiece(piece)
	}

	renderBoard() {
		for (let x = 0; x < this.columns; x++) {
			for (let y = 0; y < this.files; y++) {
				let drawX = x
				let drawY = y

				if (this.isBlack) {
					drawX = this.files - 1 - drawX
					drawY = this.columns - 1 - drawY
				}

				// Cell Even
				let cellColor = this.theme.boardLight;
				let textColor = this.theme.boardDark;
				if ((drawX + drawY) % 2) {
					// Cell Odd
					cellColor = this.theme.boardDark;
					textColor = this.theme.boardLight;
				}
				this.contextCanvas.fillStyle = cellColor;
				this.contextCanvas.fillRect(
					drawX * this.CELL_WIDTH,
					drawY * this.CELL_HEIGHT,
					this.CELL_WIDTH,
					this.CELL_HEIGHT,
				);

				const coordinateColumns = [
					'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
				]

				const coordinateFiles = [
					8, 7, 6, 5, 4, 3, 2, 1,
				]

				// Coordinates
				this.contextCanvas.fillStyle = textColor;
				this.contextCanvas.textBaseline = "top";
				this.contextCanvas.textAlign = "start";
				this.contextCanvas.font = '10px Arial'
				this.contextCanvas.fillText(`[${coordinateColumns[x]};${coordinateFiles[y]}]`, ((drawX * this.CELL_WIDTH) + 10), ((drawY * this.CELL_HEIGHT) + 10));

				// Cell
				const cell = this.matriz[x][y]

				if (cell.selected) {
					this.contextCanvas.fillStyle = cellSelectedTheme.isSelected;
					this.contextCanvas.globalAlpha = 0.4
					this.contextCanvas.fillRect(
						drawX * this.CELL_WIDTH,
						drawY * this.CELL_HEIGHT,
						this.CELL_WIDTH,
						this.CELL_HEIGHT,
					);
					this.contextCanvas.globalAlpha = 1
				}

				if (cell.avalibleMove) {
					this.contextCanvas.fillStyle = cellSelectedTheme.isavalible;
					this.contextCanvas.globalAlpha = 0.5
					this.contextCanvas.beginPath()
					this.contextCanvas.arc(
						(drawX * this.CELL_WIDTH) + (this.CELL_WIDTH / 2),
						(drawY * this.CELL_HEIGHT) + (this.CELL_HEIGHT / 2),
						30,
						0,
						2 * Math.PI
					)
					this.contextCanvas.fill()
					this.contextCanvas.globalAlpha = 1
				}

				// Piece
				const piece = cell?.piece
				if (piece) {
					this.contextCanvas.fillStyle = piece.color;
					this.contextCanvas.textBaseline = "middle";
					this.contextCanvas.textAlign = "center";
					this.contextCanvas.font = '66px Arial'
					this.contextCanvas.fillText(piece.imgPiece[0], ((drawX * this.CELL_WIDTH) + (this.CELL_WIDTH / 2)), ((drawY * this.CELL_HEIGHT) + (this.CELL_HEIGHT / 2)));
					this.contextCanvas.fillStyle = this.pieceTheme.pieceDark;
					this.contextCanvas.fillText(piece.imgPiece[1], ((drawX * this.CELL_WIDTH) + (this.CELL_WIDTH / 2)), ((drawY * this.CELL_HEIGHT) + (this.CELL_HEIGHT / 2)));
				}
			}
		}
	}
}

export default Board
