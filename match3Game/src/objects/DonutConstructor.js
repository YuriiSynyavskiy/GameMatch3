class Donut {
    constructor(height, width, index, positionInMatrix) {
        this.height = height;
        this.width = width;
        this.index = index;  // 1 - 6
        this.position = positionInMatrix;  // x, y
    }

    outputInfo(){
        console.log(this.index, this.position);
    }

}

export default Donut;
