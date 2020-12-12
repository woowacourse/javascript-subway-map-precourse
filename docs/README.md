# 구현해야 할 기능 목록

### 메뉴 버튼
- [x] App 은 Nav 와 Main 으로 구성되어 있다.
- [x] Nav는 아래의 메뉴 버튼으로 구성되어 있다.
   - 역 관리 button 태그는 #station-manager-button id값을 가진다.
   - 노선 관리 button 태그는 #line-manager-button id값을 가진다.
   - 구간 관리 button 태그는 #section-manager-button id값을 가진다.
   - 지하철 노선도 출력 button 태그는 #map-print-manager-button id값을 가진다
- [x] Nav의 각 버튼을 누르면, Main에 표시되는 화면이 변경된다.
   - 역 관리 button 태그 클릭시: StationManager 표시
   - 노선 관리 button 태그 클릭시: LineManager 표시
   - 구간 관리 button 태그 클릭시: SectionManager 표시
   - 지하철 노선도 출력 button 태그 클릭시: MapPrintManager 표시


### 지하철 역 관리
- [ ] 지하철 역 이름을 입력할 수 있는 input tag(`#station-name-input`), 지하철 역 이름을 추가하는 button tag(`#station-name-input`)를 생성한다.
- [ ] 사용자가 입력한 지하철 역 이름을 검증하는 함수를 구현한다.
  - [ ] 중복된 지하철 역 이름은 등록될 수 없다.
  - [ ] 지하철 역은 2글자 이상이어야 한다.
- [ ] 유효한 지하철 역 이름이 입력된 경우, 지하철 역 목록을 표시한다.
- [ ] 유효하지 않은 지하철 역 이름이 입력된 경우, `alert`를 이용해 메시지를 보여주고 재입력할 수 있게 한다.
- [ ] 지하철 역 목록을 표시한다. 
  - [ ] 지하철 역 이름과 삭제 버튼을 표시한다.
  - [ ] 사용자가 삭제 버튼을 누를 경우, `confirm`을 이용해 삭제 여부를 확인하며, 
  삭제 여부가 확인되면 해당 지하철 역 이름을 삭제하여 지하철 역 목록을 재표시한다.
    - [ ] 노선에 등록된 역은 삭제할 수 없다. 