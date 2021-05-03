class Cell {
    constructor(piece) {
        this.selected = false
        this.avalibleMove = false
        this.piece = piece
    }

    setSelected(selected) {
        this.selected = selected
    }

    setAvalibeMove(avalible) {
        this.avalibleMove = avalible
    }

    setPiece(piece) {
        this.piece = piece
    }
}

export default Cell