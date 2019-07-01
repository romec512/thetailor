export class Figure {
    id: number;
    width: number;
    height: number;
    number: number;
    count: number;
    loadItem(data) {
        this.width = Number.parseInt(data.width, 10);
        this.height = Number.parseFloat(data.height);
        this.number = Number.parseInt(data.number, 10);
        this.count = Number.parseInt(data.count, 10);
    }
}
