import { Component, Input } from '@angular/core';

@Component({
    selector: 'loading-animation',
    styleUrls: ['./LoadingAnimationStyles.less'],
    templateUrl: './LoadingAnimationView.html'
})
export class LoadingAnimationComponent {
    @Input() public condition: boolean;
}
