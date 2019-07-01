import {Component, Input} from '@angular/core';
import { Figure} from './classes/Figure';
import { Packer } from './classes/Packer';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    @Input() figure: Figure;
    checkOutForm;
    title = 'web-course';
    obj = {
        prop: 'test',
    };
    fig = [{
        id: 1,
        width: 100,
        height: 110,
        number: 1
    }, {
        id: 1,
        width: 100,
        height: 30,
        number: 2
    }, {
        id: 1,
        width: 100,
        height: 50,
        number: 3
    }, {
        id: 1,
        width: 100,
        height: 11,
        number: 4
    }, {
        id: 1,
        width: 100,
        height: 49,
        number: 5
    }];
    packer = null;
    constructor(private formBuilder: FormBuilder) {
         this.packer = new Packer();
         this.figure = new Figure();
         this.checkOutForm = this.formBuilder.group({
            number: null,
            width: null,
            height: null,
            count: null
         });
        // let sortedMass: Figure[] = packer.sortByHeight(this.fig);
        // packer.printArray(sortedMass);
    }
    getInput() {
        console.log(this.figure);
    }
    addFigure(){

    }
    onSubmit(data) {
        console.log(data);
    }
}
