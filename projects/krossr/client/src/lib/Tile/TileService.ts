import { Point } from '../Point/Point';
import { SideLengthService } from '../SideLength/SideLengthService';
import { TileState } from './TileState';
import { Injectable } from '@angular/core';

/**
 * Keeps a cache of the tiles on the screen for faster access (smooth animation for dragging & selecting),
 * as well as methods for accessing it
 */

@Injectable({
    providedIn: 'root'
})
export class TileService {
    private tileIndex: any[] = [];

    constructor(
        private sideLengthService: SideLengthService
    ) {

    }

    /** Convert a 2D coordinate into an index */
    private convertTo1D(coord: Point): number {
        return (coord.y * this.sideLengthService.sideLength) + coord.x;
    }

    /** Append the current tile index */
    addTile(obj): void {
        this.tileIndex.push(obj);
    }

    /** Make sure the index is clean before we add to it, to avoid bugs with switching between screens */
    clearTileIndex(): void {
        this.tileIndex = [];
    }

    /** Convert an index into a 2D coordinate */
    convertTo2D(index: number): Point {
        let x = index % this.sideLengthService.sideLength;
        let y = (index - x) / this.sideLengthService.sideLength;

        let coord = {
            y,
            x
        };

        return coord;
    }

    /** Empty out all of the tiles, but keep them on-screen */
    eraseTiles(): void {
        let len = this.tileIndex.length;

        for (let i = 0; i < len; i++) {
            this.tileIndex[i].tileCtrl.fill(TileState.empty);
        }
    }

     /**
      * Fill all of the tiles in the specified coordinate array
      * @params {Array} array of coordinate objects
      * @params {function} a function to run on each tile controller before changing it to determine whether or not to change.
      * must be defined in TileController
      */
    fillTiles(coords: Point[], initState, override, validationFn?) {
        let len = coords.length;

        for (let i = 0; i < len; i++) {
            let currentCoord = coords[i];
            let currentTileController = this.findTileCtrlByCoord(currentCoord);

            if (!validationFn || (typeof currentTileController[validationFn] === 'function' && currentTileController[validationFn]())) {
                currentTileController.change(currentCoord, initState, override);
            }
        }
    }

    /** Grab a tile controller out of the tile index from a given 2D coordinate */
    findTileCtrlByCoord(coord: Point): any { // todo
        let index = this.convertTo1D(coord);
        return this.findTileCtrlByIndex(index);
    }

    /** Grab a tile controller out of the tile index from a given 1D index */
    findTileCtrlByIndex(index: number): any { // todo
        return this.tileIndex[index].tileCtrl;
    }

    /** Return the current tileIndex */
    getTileIndex(): any { // todo
        return this.tileIndex;
    }
}
