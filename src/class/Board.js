// const Cell = require('./Cell')
import Cell from './Cell'
import { cellSelectedTheme } from './../theme'
import Piece from './Piece'

class Board {

    CELL_WIDTH
    CELL_HEIGHT
    canvas
    contextCanvas
    matriz = [new Cell()]
	selectedCellPosition = []

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

		this.selectedCellPosition = null

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
				this.matriz[x][y] = new Cell();
			}
		}

		// Bind Methods
		this.setMouseCell = this.setMouseCell.bind(this)
		this.setSelectedCell = this.setSelectedCell.bind(this)

		// // Mouse Events
		this.canvas.addEventListener('mousemove', this.setMouseCell)

		this.canvas.addEventListener('mousedown', this.setSelectedCell)

		this.canvas.addEventListener('mouseup', () => {
			console.log('Drop')
		})

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
		// this.matriz[x][y] = new Cell(piece)
	}

	renderBoard() {
		for (let x = 0; x < this.files; x++) {
			for (let y = 0; y < this.columns; y++) {
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
				// Coordenadas
				this.contextCanvas.fillStyle = textColor;
				this.contextCanvas.textBaseline = "top";
				this.contextCanvas.textAlign = "start";
				this.contextCanvas.font = '10px Arial'
				this.contextCanvas.fillText(`[${x};${y}]`, ((x * this.CELL_WIDTH) + 10), ((y * this.CELL_HEIGHT) + 10));

				// Cell
				const cell = this.matriz[x][y]

				if (cell.selected) {
					this.contextCanvas.strokeStyle = cellSelectedTheme.isSelected;
					this.contextCanvas.strokeRect(
						x * this.CELL_WIDTH,
						y * this.CELL_HEIGHT,
						this.CELL_WIDTH,
						this.CELL_HEIGHT,
					);
				}

				// Piece
				const piece = cell?.piece
				if (piece) {
					this.contextCanvas.fillStyle = piece.color;
					this.contextCanvas.textBaseline = "middle";
					this.contextCanvas.textAlign = "center";
					this.contextCanvas.font = '66px Arial'
					this.contextCanvas.fillText(piece.type[0], ((x * this.CELL_WIDTH) + (this.CELL_WIDTH / 2)), ((y * this.CELL_HEIGHT) + (this.CELL_HEIGHT / 2)));
					this.contextCanvas.fillStyle = this.pieceTheme.pieceDark;
					this.contextCanvas.fillText(piece.type[1], ((x * this.CELL_WIDTH) + (this.CELL_WIDTH / 2)), ((y * this.CELL_HEIGHT) + (this.CELL_HEIGHT / 2)));
				}
			}
		}
	}
}

export default Board
