// 콘솔 창에 전체 복사 붙여넣기
const stationDummy = [
  {
    name: '몽촌토성',
    lineList: ['8호선'],
  },
  {
    name: '잠실나루',
    lineList: ['2호선'],
  },
  {
    name: '잠실',
    lineList: ['2호선', '8호선'],
  },
  {
    name: '잠실새내',
    lineList: ['2호선'],
  },
  {
    name: '종합운동장',
    lineList: ['2호선', '9호선'],
  },
  {
    name: '삼성',
    lineList: ['2호선'],
  },
  {
    name: '봉은사',
    lineList: ['9호선'],
  },
];

const lineDummy = [
  {
    name: '2호선',
    stationList: ['잠실나루', '잠실', '잠실새내', '종합운동장', '삼성'],
  },
  { name: '8호선', stationList: ['몽촌토성', '잠실'] },
  { name: '9호선', stationList: ['종합운동장', '봉은사'] },
];

localStorage.clear();
localStorage.setItem('station', JSON.stringify(stationDummy));
localStorage.setItem('line', JSON.stringify(lineDummy));

// 저장된 local storage 내용 확인
JSON.parse(localStorage.line);
JSON.parse(localStorage.station);
