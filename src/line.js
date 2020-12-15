import { Section }from './section.js'

export class Line {
    constructor(name, firstStation, lastStation) {
        this.name = name;
        this.section = new Section(firstStation, lastStation);
    }
}