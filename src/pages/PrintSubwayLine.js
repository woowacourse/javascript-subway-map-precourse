import Component from "../core/Component.js";

export default class PrintSubwayLine extends Component {
  constructor() {
    super();
  }

  render() {
    const { lines } = this.store;
    console.log(lines);
    return `
      <div>
        ${lines
          .map(
            (line) => `
             <div>
               <h4>${line.name}</h4>
               <ul>
                 ${line.stations
                   .map(
                     (station) => `
                 <li style="margin-top: 5px;" >${station}</li>
                 `
                   )
                   .join("")}
               </ul>
             </div>  
            `
          )
          .join("")}
      </div>
      `;
  }
}
