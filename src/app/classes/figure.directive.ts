import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[appFigureDirective]',
})
export class FigureDirective {
    constructor(public viewContainerRef: ViewContainerRef) { }
}