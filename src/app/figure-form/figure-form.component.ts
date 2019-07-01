import {Component, OnInit, OnDestroy, Input, ViewChild, ComponentFactoryResolver} from '@angular/core';
import {Figure} from '../classes/Figure';
import {FigureDirective} from '../classes/figure.directive';
import {OneFigureFormComponent} from '../one-figure-form/one-figure-form.component';
import {FormBuilder} from '@angular/forms';
import * as _ from 'lodash';
import {Packer} from '../classes/Packer';
import {ShareService} from '../share.service';



@Component({
  selector: 'app-figure-form',
  templateUrl: './figure-form.component.html',
  styleUrls: ['./figure-form.component.css']
})
export class FigureFormComponent implements OnInit, OnDestroy {
    figures: Figure[];
    count: number;
    @Input() data = '';
    checkOutForm;
    sofaCountForm;
    substrateHeightForm;
    calculated = false;
    packer: Packer;
    substrateHeight = 0;
    constructor(private componentFactoryResolver: ComponentFactoryResolver, private formBuilder: FormBuilder,
                private share: ShareService) { }
    ngOnInit() {
        this.checkOutForm = this.formBuilder.group({
            number: 1,
            width: null,
            height: null,
            count: null
        });
        this.sofaCountForm = this.formBuilder.group({
            count: 1
        });
        this.substrateHeightForm = this.formBuilder.group({
            height: 140
        });
        this.figures = [];
        this.count = 0;
    }

    ngOnDestroy() {
    }

    loadComponent() {
        // this.data += '<app-one-figure-form></app-one-figure-form><h1>test</h1>';
    }
    addFigure(event: Event) {
        // event.preventDefault();
        this.loadComponent();
    }
    onSubmit(data) {
        if (data.width && data.height && data.count) {
            let newFig = new Figure();
            newFig.loadItem(data);
            newFig.id = this.count;
            this.count++;
            this.figures.push(newFig);
            this.checkOutForm = this.formBuilder.group({
                number: this.figures.length + 1,
                width: null,
                height: null,
                count: null
            });
        }
    }
    deleteFigure(figure: Figure) {
        this.figures = _.filter(this.figures, (fig) => {
           return !(fig.id === figure.id);
        });
    }
    calculate(data) {
        const sofaCount = data.count;
        this.packer = new Packer();
        let count = 0;
        _.forEach(this.figures, (item) => {
            for (let i = 0; i < item.count * sofaCount; i++, count++) {
                let obj = new Figure();
                obj.number = item.number;
                obj.width = item.width;
                obj.height = item.height;
                obj.id = count;
                this.packer.nonPackedFigures.push(obj);
            }
        });
        this.packer.pack();
        this.share.setFigures(this.figures);
        this.calculated = true;
    }
    clearCanvas() {
        let canvas: any = document.getElementById('test');
        var ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.figures = [];
        this.checkOutForm = this.formBuilder.group({
            number: null,
            width: null,
            height: null,
            count: null
        });
        this.calculated = false;
    }
    setSubstrateHeight(data) {
        if (data.height) {
            this.substrateHeight = data.height;
        }
    }
}
