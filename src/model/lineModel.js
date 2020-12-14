import StationNode from './stationNode.js';

/**
 * localStorage에 저장하는 LineList 구조
 * lineList : [][] 이차원배열
 * lineList[a][b]: a번째로 추가한 호선의 b+1번째 역
 */

export default class LineModel {
  insertData(line, start, end) {
    let lineList = this.getList();
    const startNode = new StationNode({ name: start, line });
    const endNode = new StationNode({ name: end, line });

    lineList = [...lineList, [startNode, endNode]];
    localStorage.setItem('lineList', JSON.stringify(lineList));

    return [startNode, endNode];
  }

  deleteData(line) {
    const lineList = this.getList();
    const index = lineList.findIndex(lineNodes => lineNodes[0].line === line);
    const nodes = lineList.splice(index, 1)[0]; // splice의 결과는 이차원배열
    localStorage.setItem('lineList', JSON.stringify(lineList));

    return nodes;
  }

  getList() {
    const storageLineList = localStorage.getItem('lineList');
    let lineList = [];
    if (storageLineList) {
      lineList = [...JSON.parse(storageLineList)];
    }

    return lineList;
  }
}
