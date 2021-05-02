class Cell {
    selected
    constructor(piece) {
        this.selected = false
        this.piece = piece
    }

    setSelected(selected) {
        this.selected = selected
    }

    setPiece(piece) {
        this.piece = piece
    }
}

export default Cell