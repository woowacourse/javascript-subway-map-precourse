export const setStationDummy = () => {
  const stationList = [
    {
      name: '잠실',
      lineList: ['2호선', '8호선'],
    },
    {
      name: '잠실새내',
      lineList: ['2호선'],
    },
    {
      name: '잠실나루',
      lineList: ['2호선'],
    },
  ];
  localStorage.setItem('station', JSON.stringify(stationList));
  const listAgain = JSON.parse(localStorage.getItem('station'));
  console.log(listAgain);
  listAgain.push(new Station('운동장'));
  console.log(listAgain);
  localStorage.setItem('station', JSON.stringify(stationList));
};

export const lineListDummy = [
  { name: '2호선', stationList: ['잠실새내', '잠실', '잠실나루'] },
  { name: '8호선', stationList: ['석촌', '잠실', '몽촌토성'] },
];
