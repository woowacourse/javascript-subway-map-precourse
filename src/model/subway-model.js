class SubwayModel {
  lineModel(lineName, start, end) {
    return {
      [lineName]: [
        {name: start},
        {name: end},
      ],
    };
  }
}

const subwayModel = new SubwayModel();

export const {lineModel} = subwayModel;
