 /*
    * There would be seven pieces in Tetris following will be the numbers mapped to each piece
    1 -> I
    2 -> O
    3 -> T
    4 -> S
    5 -> Z
    6 -> J
    7 -> L

    * There would four types of rotations marked from 0 - 4 for each tetromino, by default it would 0
    * Rendering of pixels happen by incremental row first followed by column
    * eg: for tetromino of type 'T' pixels will be filled in following order
    *   1   2   3
    *       4
    * 
*/

class Tetromino {

    constructor(tetrominoShape){
        this.currentPixels = new Array();
        
        this.previousPixels = new Array();
        this.tetrominoTypeToInitialPixelsMap = {
            1: [[0,3], [0,4], [0,5], [0,6]],
            2: [[0,3], [0,4], [1,3], [1,4]],
            3: [[0,3], [0,4], [0,5], [1,4]],
            4: [[0,4], [0,5], [1,3], [1,4]],
            5: [[0,3], [0,4], [1,4], [1,5]],
            6: [[0,3], [0,4], [1,4], [2,4]],
            7: [[0,4], [1,4], [2,4], [2,5]],
        };

        this.tetrominoTypeToCentroidMap = {
            1: 2,
            2: 1,
            3: 1,
            4: 2,
            5: 2,
            6: 1,
            7: 2,
        }
        this.tetrominoType = tetrominoShape;
        this.rotationKey = 0;
    }

    get tetrominoTypeToInitialPixelsMap(){
        return this._tetrominoTypeToInitialPixelsMap;
    }

    set tetrominoTypeToInitialPixelsMap(value){
        this._tetrominoTypeToInitialPixelsMap = value;
    }

    get tetrominoType(){
        return this._tetrominoType;
    }

    set tetrominoType(value){
        if (![1,2,3,4,5,6,7].includes(value)){
            this._tetrominoType = 1;
        }
        else{
            this._tetrominoType = value;
        }
        this.currentPixels = this.tetrominoTypeToInitialPixelsMap[value];
    }

    getNextCoordinates(moveType, updateCurrentPixels){
        let nextPixels = [];
        switch(moveType){
            case 1:
                for (let i = 0; i < this.currentPixels.length; i++){
                    nextPixels.push([this.currentPixels[i][0], this.currentPixels[i][1] + 1]);
                }
                break;
            
            case -1:
                for (let i = 0; i < this.currentPixels.length; i++){
                    nextPixels.push([this.currentPixels[i][0], this.currentPixels[i][1] - 1]);
                }
                break;
            
            case 0:
                // Invert the Tetromino
                let centroid = this.currentPixels[this.tetrominoTypeToCentroidMap[this.tetrominoType]];
                let tempPixels = []

                for (let i = 0; i < this.currentPixels.length; i++){
                    tempPixels.push([
                        this.currentPixels[i][0] - centroid[0],
                        this.currentPixels[i][1] - centroid[1]
                    ])
                }

                let afterRotationPixels = []

                for (let i = 0; i < this.currentPixels.length; i++){
                    afterRotationPixels.push([
                        tempPixels[i][1],
                        0 - tempPixels[i][0]
                    ])
                }

                for (let i = 0; i < this.currentPixels.length; i++){
                    nextPixels.push([afterRotationPixels[i][0]  + centroid[0], afterRotationPixels[i][1] + centroid[1]]);
                }
                break;
            
            default:
                for (let i = 0; i < this.currentPixels.length; i++){
                    nextPixels.push([this.currentPixels[i][0] + 1, this.currentPixels[i][1]]);
                }
                break;
        }
        if (updateCurrentPixels == true){
            this.previousPixels = this.currentPixels;
            this.currentPixels = nextPixels;
            if(moveType == 0){
                this.rotationKey += 1;
            }
        }
        return nextPixels;
    }

    render() { 
        return false; 
    }
}

export default Tetromino;
