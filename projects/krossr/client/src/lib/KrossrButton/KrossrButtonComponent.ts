import { Component, Input } from '@angular/core';

@Component({
    selector: 'krossr-button',
    styles: [require('./KrossrButtonStyles.less')],
    template: require('./KrossrButtonView.html')
})
export class KrossrButtonComponent {
    @Input() public disabled = false;
    @Input() public text: string;
    @Input() public buttonType = 'button';
}
