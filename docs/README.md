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
- [x] 지하철 역 이름을 입력할 수 있는 input tag(`#station-name-input`), 지하철 역 이름을 추가하는 button tag(`#station-add-button`)를 생성한다.
  - [x] `#station-name-input`의 placeholder는 "역 이름을 입력해주세요" 이다.
- [x] 사용자가 입력한 지하철 역 이름을 검증하는 함수를 구현한다.
  - [x] 중복된 지하철 역 이름은 등록될 수 없다.
  - [x] 지하철 역은 2글자 이상이어야 한다.
- [x] 유효한 지하철 역 이름이 입력된 경우, 지하철 역 목록을 표시한다.
- [x] 유효하지 않은 지하철 역 이름이 입력된 경우, `alert`를 이용해 메시지를 보여주고 재입력할 수 있게 한다.
- [x] 지하철 역 목록을 표시한다. 
  - [x] 지하철 역 이름과 삭제 버튼을 표시한다.
  - [x] 사용자가 삭제 버튼을 누를 경우, `confirm`을 이용해 삭제 여부를 확인하며, 
  삭제 여부가 확인되면 해당 지하철 역 이름을 삭제하여 지하철 역 목록을 재표시한다.
    - [x] 노선에 등록된 역은 삭제할 수 없다. 
- [ ] 지하철 역 관련 기능의 화면이 프로그램 실행결과와 유사하게 표시되게끔 CSS설정
- [x] localStorage를 이용하여, 새로고침하더라도 가장 최근에 작업한 지하철 역 정보들을 불러올 수 있도록 한다.


### 지하철 노선 관리
- [x] 아래의 태그를 생성한다.
  - [x] 지하철 노선의 이름을 입력하는 input 태그(`#line-name-input`)
    - [x] `#line-name-input`의 placeholder는 "노선 이름을 입력해주세요" 이다.
  - [x] 지하철 노선의 상행 종점을 선택하는 select 태그(`#line-start-station-selector`)
    - [x] 지하철 역 관리 목록에서 추가된 지하철 열 목록이 option으로 표시된다.
  - [x] 지하철 노선의 하행 종점을 선택하는 select 태그(`#line-end-station-selector`)
    - [x] 지하철 역 관리 목록에서 추가된 지하철 열 목록이 option으로 표시된다.
  - [x] 지하철 노선을 추가하는 button 태그(`#line-add-button`)
  
- [x] 사용자가 입력한 지하철 노선 정보를 검증하는 함수를 구현한다.
  - [x] 지하철 노선 이름은 1글자 이상이어야 한다.
  - [x] 중복된 지하철 노선 이름이 등록될 수 없다.
  - [x] 상행 종점역과 하행 종점역은 서로 다른 역이어야 한다.

- [x] 노선 추가 버튼(`#line-add-button`)을 클릭한 경우 
  - [x] 사용자가 입력한 노선 정보가 유효하면 지하철 노선 목록에 추가된다.
  - [x] 유효하지 않은 노선 정보가 입력된 경우, `alert`를 이용해 메시지를 보여주고 재입력할 수 있게 한다.
  
- [x] 지하철 노선 목록을 표시한다.
  - [x] 지하철 노선 이름과 상행 종점역, 하행 종점역, 삭제 버튼(`.line-delete-button`)을 표시한다.
    - [x] 사용자가 삭제 버튼(`.line-delete-button`)을 클릭한 경우, `confirm`을 이용해 삭제 여부를 확인하며, 
      삭제 여부가 확인되면 해당 지하철 노선을 삭제하여 지하철 노선 목록을 재표시한다.

- [x] localStorage를 이용하여, 새로고침하더라도 가장 최근에 작업한 지하철 노선 정보들을 불러올 수 있도록 한다.

- [ ] 지하철 노선 관련 기능의 화면이 프로그램 실행결과와 유사하게 표시되게끔 CSS설정

### 지하철 구간 관리
- [ ] 아래의 태그를 생성한다.
  - [x] 지하철 노선을 선택하는 button 태그(`.section-line-menu-button`)
    - [x] 지하철 노선 관리 목록에서 추가된 지하철 노선이 각각 button으로 표시된다.
    - [ ] 각 지하철 노선 버튼을 누르면 구간 등록 화면이 표시된다.
  - [ ] 지하철 구간을 설정할 역 select 태그(`#section-station-selector`)
  - [ ] 지하철 구간의 순서를 입력하는 input 태그(`#section-order-input`)
  - [ ] 지하철 구간을 등록하는 button 태그 (`#section-add-button`)
  - [ ] 지하철 구간을 제거하는 button 태그 (`.section-delete-button`)