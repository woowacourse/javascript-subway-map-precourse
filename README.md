# 🚇 지하철 노선도 미션

## 폴더 구조

```bash
│  index.html
│  LICENSE
│  README.md
│
├─images
│
└─src
    │  index.js
    │
    ├─common
    │      alertMessage.js
    │      checkInput.js
    │      clearInput.js
    │      constant.js
    │
    ├─event
    │  │  menuEvent.js
    │  │
    │  ├─common
    │  │      checkStorageItem.js
    │  │
    │  ├─line
    │  │      addLineEvent.js
    │  │      delLineEvent.js
    │  │
    │  ├─section
    │  │      addSectionEvent.js
    │  │      chooseLineEvent.js
    │  │      delSectionEvent.js
    │  │
    │  └─station
    │          addStationEvent.js
    │          delStationEvent.js
    │
    └─render
            render.js
            renderLine.js
            renderMapPrint.js
            renderSection.js
            renderStation.js
```

- common: 자주 사용되는 상수, 함수 등을 모아놓은 디렉토리
- event: eventHandle에 필요한 로직을 모아놓은 디렉토리
- render: 사용자에게 보이는 화면을 구성하는 로직을 모아놓은 디렉토리

## 🚀 기능 요구사항

### 지하철 역 관련 기능

- 지하철 역을 등록하고 삭제할 수 있다. (단, 노선에 등록된 역은 삭제할 수 없다) (완료)
- 중복된 지하철 역 이름이 등록될 수 없다. (완료)
- 지하철 역은 2글자 이상이어야 한다. (완료)
- 지하철 역의 목록을 조회할 수 있다. (완료)

### 지하철 노선 관련 기능

- 지하철 노선을 등록하고 삭제할 수 있다. (완료)
- 중복된 지하철 노선 이름이 등록될 수 없다. (완료)
- 노선 등록 시 상행 종점역과 하행 종점역을 입력받는다. (완료)
- 지하철 노선의 목록을 조회할 수 있다. (완료)
- 노선에서 갈래길은 생길 수 없다. (상행선 혹은 하행선이 다른 노선과 겹치는 경우도 갈래길로 인정) (완료)

### 지하철 구간 추가 기능

- 지하철 노선에 구간을 추가하는 기능은 노선에 역을 추가하는 기능이라고도 할 수 있다. (완료)
  - 역과 역사이를 구간이라 하고 이 구간들의 모음이 노선이다.
- 하나의 역은 여러개의 노선에 추가될 수 있다. (완료)
- 역과 역 사이에 새로운 역이 추가 될 수 있다. (완료)
- 노선에서 갈래길은 생길 수 없다. (상행선 혹은 하행선이 다른 노선과 겹치는 경우도 갈래길로 인정) (완료)
- 구간 순서는 어떤 숫자든 입력 받을 수 있다.
  - 0보다 작은 숫자를 입력 받은 경우, 상행선(0번 순서)에 추가한다.
  - 해당 노선 하행선 순서 보다 큰 숫자를 입력 받은 경우, 하행선에 추가한다.

<img width="500" src="/images/section1.png">

### 지하철 구간 삭제 기능

- 노선에 등록된 역을 제거할 수 있다. (완료)
- 종점을 제거할 경우 다음 역이 종점이 된다. (완료)
- 노선에 포함된 역이 두개 이하일 때는 역을 제거할 수 없다. (완료)

<img width="500" src="/images/section2.png">

### 지하철 노선에 등록된 역 조회 기능

- 노선의 상행 종점부터 하행 종점까지 연결된 순서대로 역 목록을 조회할 수 있다. (완료)

<br/>

## 💻 프로그램 실행 결과

### 역관리

<img width="100%" src="/images/station_manager.gif">

### 노선관리

<img width="100%" src="/images/line_manager.gif">

### 구간관리

<img width="100%" src="/images/section_manager.gif">

### 노선도 출력

<img width="100%" src="/images/map_print_manager.gif">
