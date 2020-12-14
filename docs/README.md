# 지하철 노선도 미션

우아한 테크코스의 프리코스 3주차 미션. 지하철 노선도 관리 어플리케이션

## 기능 구현 목록

### 네비게이터

- [x] 라우팅을 통해 화면을 전환한다

### 역 관리

- [x] 역 목록에 역을 등록한다
  - [x] 역 이름이 2글자 이상인지 검증한다
  - [x] 중복된 역 이름인지 검증한다
- [x] 역 목록에서 역을 삭제한다
  - [x] 노선에 등록됐는지 검증한다
- [x] 역 목록을 조회한다

### 노선 관리

- [x] 노선 목록에 노선을 등록한다(노선 이름, 상행 종점, 하행 종점 입력)
  - [x] 중복된 노선 이름인지 검증한다
  - [x] 빈 입력인지 검증한다 (노선 이름, 상행 종점, 하행 종점)
  - [x] ~~상행 종점과 하행 종점이 같은 역인지 검증한다~~
- [x] 노선 목록을 조회한다 (종점역만 표시)
- [x] 노선 목록에서 노선을 삭제한다

### 구간 관리

- [x] 등록된 노선 목록을 조회한다
- [x] 노선에 구간을 추가한다
  - [x] 순서, 역이 빈 입력인지 검증한다
  - [x] ~~노선에 이미 존재하는 구간인지 검증한다~~
- [x] 노선에서 구간을 삭제한다 (종점 제거 시, 다음 역이 종점)
  - [x] 구간이 3개 이상인지 검증한다

## 지하철 노선도 출력

- [x] 노선도를 조회한다(상행 종점부터 시작)

## 로컬스토리지

- [x] 로컬스토리지에 노선, 역, 구간 값을 저장, 불러온다.

## 디렉토리 구조

```
.
├── LICENSE
├── README.md
├── babel.config.js
├── docs
│   └── README.md
├── images
├── index.css
├── index.html
├── jest.config.js
├── package-lock.json
├── package.json
└── src
    ├── components
    │   ├── app.js
    │   ├── line-manager
    │   │   ├── index.js
    │   │   ├── line-input.js
    │   │   └── line-list.js
    │   ├── map-print-manager
    │   │   └── index.js
    │   ├── navigator.js
    │   ├── section-manager
    │   │   ├── index.js
    │   │   └── line-section-manager
    │   │       ├── index.js
    │   │       ├── section-input.js
    │   │       └── section-list.js
    │   └── station-manager
    │       ├── index.js
    │       ├── station-input.js
    │       └── station-list.js
    ├── index.js
    └── library
        ├── constants
        │   ├── common-alert.js
        │   ├── confirm.js
        │   ├── line-manager-alert.js
        │   ├── localstorage.js
        │   ├── route.js
        │   ├── section-manager-alert.js
        │   └── station-manager-alert.js
        ├── core
        │   ├── component.js
        │   └── state.js
        └── utils
            ├── template.js
            └── validation.js

13 directories, 40 files
```

## UI 컴포넌트 구조

- 초기화면
  ![컴포넌트_1](./../images/component.png)
- 역 관리
  ![컴포넌트_2](./../images/component2.png)
- 노선 관리
  ![컴포넌트_3](./../images/component3.png)
- 구간 관리
  ![컴포넌트_4](./../images/component4.png)
- 지하철 노선도 출력
  ![컴포넌트_5](./../images/component5.png)
