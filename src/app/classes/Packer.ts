import {Figure} from './Figure';
import {AreaItem} from './AreaItem';
import {min} from 'rxjs/operators';

export class Packer {
    packedFigures: Figure[];
    nonPackedFigures: Figure[];
    area: AreaItem;
    lastIndex: number;
    height: number;
    constructor() {
        this.height = 140;
        this.area = {
            index: 0,
            next: null,
            height: 140,
            width: 0,
            lastWidth: 0,
            number: 0,
        };
        this.packedFigures = [];
        this.nonPackedFigures = [];
        this.lastIndex = 1;
    }
    pack() {
        // ToDo добавить объединение двух соседних ячеек с одинаковой длиной
        this.nonPackedFigures = this.sortByHeight(this.nonPackedFigures);
        while (this.nonPackedFigures.length > 0) {
            let minFreeArea = this.getMinFreeHeight();
            let packingFigure: Figure = this.getPackingFigure(minFreeArea);
            while (packingFigure == null) {
                this.fillAreaToNextMin(minFreeArea);
                minFreeArea = this.getMinFreeHeight();
                packingFigure = this.getPackingFigure(minFreeArea);
            }
            this.fillFreeArea(minFreeArea, packingFigure);
            this.nonPackedFigures = this.nonPackedFigures.filter((item) => {
                if (item.id === packingFigure.id) {
                    return false;
                } else {
                    return true;
                }
            });
            this.packedFigures.push(packingFigure);
            this.drawFigure(minFreeArea);
            this.uniteArea();
        }
        // let area: AreaItem = this.area;
        // while (area != null) {
        //     // console.log(area);
        //     area = area.next;
        // }
        this.drawSubstrate();
        return;
    }
    sortByHeight(mass) {
        for (let i = 0; i < mass.length - 1; i++) {
            for (let j = 0; j < mass.length - 1; j++) {
                if (mass[j].height < mass[j + 1].height) {
                    let value = mass[j];
                    mass[j] = mass[j + 1];
                    mass[j + 1] = value;
                }
            }
        }
        return mass;
    }
    printArray(mass) {
        for (let obj of mass) {
            console.log(obj);
        }
    }
    private getMinFreeHeight() {
        /* Todo добавить проверку еще на минимальную высоту
         */
        let minHeight = this.area.height;
        let minWidth = this.area.width;
        let index: AreaItem = null;
        let area: AreaItem = this.area;
        while (area != null) {
            if (area.width <= minWidth) {
                minHeight =  area.height;
                minWidth = area.width;
                index = area;
            }
            area = area.next;
        }
        return index;
    }
    private fillFreeArea(freeArea: AreaItem, packingFigure: Figure) {
        freeArea.lastWidth = freeArea.width;
        if (freeArea.height === packingFigure.height) {
            freeArea.width += packingFigure.width;
            freeArea.number = packingFigure.number;
        } else {
            let residualArea: AreaItem = new AreaItem();
            residualArea.height = freeArea.height - packingFigure.height;
            residualArea.width = freeArea.width;
            residualArea.index = this.lastIndex;
            this.lastIndex++;
            residualArea.next = freeArea.next;
            freeArea.next = residualArea;
            freeArea.width += packingFigure.width;
            freeArea.height = packingFigure.height;
            freeArea.number = packingFigure.number;
        }
    }
    private getPackingFigure(minFreeArea) {
// ToDo сделать подбор упаковываемой фигуры по наиболее подходящей ширине(чтобы разность свободной ширины и ширины фигуры стремилась к нулю)
        for (let figure of this.nonPackedFigures) {
            if (minFreeArea.height >= figure.height) {
                return figure;
            }
        }
        return null;
    }
    private getNextMinHeightArea(minFreeArea: AreaItem) {
        let area: AreaItem = this.area;
        let min: number = Number.MAX_VALUE;
        let returnedItem: AreaItem = null;
        while (area != null) {
            if (area.height <= min && area.height >= minFreeArea.height && minFreeArea !== area) {
                returnedItem = area;
                min = area.height;
            }
            area = area.next;
        }
        return returnedItem;
    }
    private fillAreaToNextMin(minFreeArea: AreaItem) {
        let nextMinArea: AreaItem = this.getNextMinHeightArea(minFreeArea);
        minFreeArea.lastWidth = minFreeArea.width;
        minFreeArea.width = nextMinArea.width;
        this.uniteArea();
    }

    /**
     * Объединяет рядом стоящее пустое пространство, если у них одинаковая длина
     */
    private uniteArea() {
        let area: AreaItem = this.area;
        while (area != null && area.next != null) {
            if (area.width === area.next.width) {
                area.height += area.next.height;
                area.next = area.next.next;
                area.lastWidth = area.width;
            }
            area = area.next;
        }
    }
    private draw(figure: AreaItem, fillStyle: string) {
        let canvas:any = document.getElementById('test');
        if (canvas.getContext) {
            var ctx = canvas.getContext('2d');
            let area: AreaItem = this.area;
            let y = 0;
            while (area.index !== figure.index) {
                y += area.height;
                area = area.next;
            }
            if (fillStyle) {
                ctx.fillStyle = fillStyle;
                ctx.fillRect(figure.lastWidth, y, (figure.width - figure.lastWidth), figure.height);
                ctx.strokeRect(figure.lastWidth, y, (figure.width - figure.lastWidth), figure.height);
                ctx.textBaseline = 'top';
                ctx.textAlign = 'left';
                ctx.fillStyle = '#000000';
                ctx.fillText('№' + figure.number, (figure.lastWidth + (figure.width - figure.lastWidth) / 2), (y + figure.height / 2));
            } else {
                ctx.fillStyle = '#000000';
                ctx.strokeRect(figure.lastWidth, y, (figure.width - figure.lastWidth), figure.height);
            }
        }
    }
    public getWidth() {
        let area = this.area;
        let maxWidth = Number.MIN_SAFE_INTEGER;
        while (area.next != null) {
            if (area.width > maxWidth) {
                maxWidth = area.width;
            }
            area = area.next;
        }
        return maxWidth;
    }
    private drawFigure(figure) {
        this.draw(figure, '#ffe9ac');
    }
    private drawSubstrate() {
        this.draw({
            index: 0,
            next: null,
            height: this.height,
            lastWidth: 0,
            width: this.getWidth(),
            number: null
        }, null);
    }
}
