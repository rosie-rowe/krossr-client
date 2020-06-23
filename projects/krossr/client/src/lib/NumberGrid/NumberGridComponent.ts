import { BooleanMatrix } from '../Matrix/BooleanMatrix';
import { TileSizeService } from '../TileSize/TileSizeService';
import { TileSizeEventService } from '../TileSize/TileSizeEventService';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
    selector: 'number-grid',
    styles: [require('./NumberGridStyles.less')],
    template: require('./NumberGridView.html')
})
export class NumberGridComponent implements OnInit, OnDestroy {
    static $name = 'numberGrid';

    constructor(
        private tileSizeEventService: TileSizeEventService,
        private tileSizeService: TileSizeService
    ) {
    }

    /** The top row is considered vertical because the numbers go from top to bottom */
    private isVertical: boolean;

    // At this level and below we're working with the individual rotated pieces, not the full thing
    @Input() gameMatrix: BooleanMatrix;
    @Input() goalMatrix: BooleanMatrix;

    @Input() orientation: string;

    private tileSize: string;

    public repeater: number[];

    private subscriptions: Subscription[];

    ngOnDestroy() {
        this.subscriptions.forEach(sub => sub.unsubscribe());
    }

    ngOnInit() {
        this.repeater = new Array(this.goalMatrix.length).fill(null).map((x, i) => i);

        this.isVertical = this.orientation === 'vertical';
        this.setTileSize();

        this.subscriptions = [
            this.tileSizeEventService.tileSizeChanged.subscribe(() => {
                this.setTileSize();
            })
        ];
    }

    private setTileSize() {
        this.tileSize = this.tileSizeService.getTileSizePx();
    }

    getFontSize() {
        return parseInt(this.tileSize, 10) / 2 + 'px';
    }
}
