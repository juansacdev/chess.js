import Cell from './Cell'
import { cellSelectedTheme } from '../utils/theme'
import { pieceTypes } from '../utils/piecesType'
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
		this.allSelectedCells = []
		this.matriz = [];

        this.canvas = document.createElement("canvas");
        this.contextCanvas = this.canvas.getContext("2d");

        this.canvas.width = this.width;
        this.canvas.height = this.height;

        document.body.appendChild(this.canvas);
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
		this.setMouseCell = this.setMouseCell.bind(this)
		this.pickPiece = this.pickPiece.bind(this)
		this.dragPiece = this.dragPiece.bind(this)
		this.dropPiece = this.dropPiece.bind(this)

		// Mouse Events
		this.canvas.addEventListener('mousemove', this.dragPiece)
		this.canvas.addEventListener('mousedown', this.pickPiece)
		this.canvas.addEventListener('mouseup', this.dropPiece)

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
		this.clearSelections()
		this.clearAvalibleMove()
		if (this.previousCell){
			return
		}

		const { layerX, layerY } = event
		const [column, file] = this.mouseCoordinateToCell(layerX, layerY)
		const selectedCell = this.matriz[column][file]

		if (!selectedCell.piece) {
			return
		}

		console.log(this.matriz);
		selectedCell.piece.avalibleMovements([column, file], this.matriz)

		this.previousCell = selectedCell
		this.allSelectedCells.push(selectedCell)
		selectedCell.setSelected(true)

		this.renderBoard()
	}

	// ! TODO
	dragPiece(event) {

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

		selectedCell.setPiece(this.previousCell.piece)
		this.allSelectedCells.push(selectedCell)

		this.previousCell.piece.moved = true
		this.previousCell.setPiece(null)
		this.previousCell = null
		selectedCell.setSelected(true)

		this.clearAvalibleMove()

		socket.emit('test')
		this.renderBoard()
	}

	mouseCoordinateToCell(x, y) {
		const file = Math.floor(x / this.CELL_WIDTH)
		const column = Math.floor(y / this.CELL_HEIGHT)
		return [file, column]
	}

	setSelectedCell(event) {
		const { layerX, layerY } = event
		const [file, column] = this.mouseCoordinateToCell(layerX, layerY)
		const selectedCell = this.matriz[file][column]
		selectedCell.setSelected(true)
		this.renderBoard()
	}

	setMouseCell(event) {
		const { layerX, layerY } = event
		// const x = Math.floor(layerX / this.CELL_WIDTH)
		// const y = Math.floor(layerY / this.CELL_HEIGHT)
		// const selectedCell = this.matriz[x][y]
		// selectedCell.setSelected(true)
		// this.renderBoard()
	}

	initPlacePiece(x, y, piece) {
		const cell = this.matriz[x][y]
		cell.setPiece(piece)
	}

	renderBoard() {
		for (let x = 0; x < this.columns; x++) {
			for (let y = 0; y < this.files; y++) {
				// Cell Even
				let cellColor = this.theme.boardLight;
				let textColor = this.theme.boardDark;
				if ((x + y) % 2) {
					// Cell Odd
					cellColor = this.theme.boardDark;
					textColor = this.theme.boardLight;
				}
				this.contextCanvas.fillStyle = cellColor;
				this.contextCanvas.fillRect(
					x * this.CELL_WIDTH,
					y * this.CELL_HEIGHT,
					this.CELL_WIDTH,
					this.CELL_HEIGHT,
				);

				// Coordinates
				this.contextCanvas.fillStyle = textColor;
				this.contextCanvas.textBaseline = "top";
				this.contextCanvas.textAlign = "start";
				this.contextCanvas.font = '10px Arial'
				this.contextCanvas.fillText(`[${x};${y}]`, ((x * this.CELL_WIDTH) + 10), ((y * this.CELL_HEIGHT) + 10));

				// Cell
				const cell = this.matriz[x][y]

				if (cell.selected) {
					this.contextCanvas.fillStyle = cellSelectedTheme.isSelected;
					this.contextCanvas.globalAlpha = 0.4
					this.contextCanvas.fillRect(
						x * this.CELL_WIDTH,
						y * this.CELL_HEIGHT,
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
						(x * this.CELL_WIDTH) + (this.CELL_WIDTH / 2),
						(y * this.CELL_HEIGHT) + (this.CELL_HEIGHT / 2),
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
					this.contextCanvas.fillText(piece.imgPiece[0], ((x * this.CELL_WIDTH) + (this.CELL_WIDTH / 2)), ((y * this.CELL_HEIGHT) + (this.CELL_HEIGHT / 2)));
					this.contextCanvas.fillStyle = this.pieceTheme.pieceDark;
					this.contextCanvas.fillText(piece.imgPiece[1], ((x * this.CELL_WIDTH) + (this.CELL_WIDTH / 2)), ((y * this.CELL_HEIGHT) + (this.CELL_HEIGHT / 2)));
				}
			}
		}
	}
}

export default Board
