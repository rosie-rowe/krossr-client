import { SideLengthService } from '../SideLength/SideLengthService';
import { TileSizeService } from '../TileSize/TileSizeService';
import { GameSizeEventService } from './GameSizeEventService';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class GameSizeService {
    private gameHeight: string;
    private gameWidth: string;
    private playableAreaSize: number;
    private tutorialDivider = 4;

    constructor(
        private gameSizeEventService: GameSizeEventService,
        private sideLengthService: SideLengthService,
        private tileSizeService: TileSizeService
    ) {
    }

     /* Take a given game width and subtract border widths. I either have to do this
        or remove border-box and add them instead... doesn't really matter */
    private adjustForBorders(width) {
        let borderWidth = 1;

        /* 18 is a bit of a magic number, I worked backwards from determining how much extra space
            the game had based on sideLength */
        return width - ((borderWidth * this.sideLengthService.sideLength) + (18 - this.sideLengthService.sideLength));
    }


    /** Return the width of the main section of the game so we can calculate game and tile sizes off of it */
    calculatePlayableArea() {
        let pHeight = window.innerHeight;
        let pWidth = window.innerWidth;

        this.playableAreaSize = Math.min(pHeight, pWidth);

        return Math.floor(this.playableAreaSize);
    }

     /* Return the current game size (width and height in pixels of the game field, changes depending on number of tiles) */
    getGameSize(tutorialMode) {
        // height/width will probably come in as px
        let intHeight = parseInt(this.gameHeight, 10);
        let intWidth = parseInt(this.gameWidth, 10);

        return {
            gameHeight: tutorialMode ? intHeight / this.tutorialDivider : this.gameHeight,
            gameWidth: tutorialMode ? intWidth / this.tutorialDivider : this.gameWidth
        };
    }

     /* Modify the current game size. */
    setGameSize(widthInTiles) {
        let finalWidth = Math.floor(this.playableAreaSize / 1.6);
        let finalHeight;

        finalWidth = this.adjustForBorders(finalWidth);

        finalHeight = finalWidth;
        this.gameWidth = finalWidth + 'px';
        this.gameHeight = finalHeight + 'px';

        setTimeout(() => {
            this.gameSizeEventService.gameSizeChanged.emit();
        });

        this.tileSizeService.setTileSize(finalWidth, widthInTiles);
    }
}
