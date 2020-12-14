# 🚇 지하철 노선도 미션

## 프로젝트 설명

- 지하철 역 관리 기능 : 등록, 삭제, 조회
- 지하철 노선 관리 기능 : 등록, 삭제, 조회
- 지하철 구간 관리 기능 : 등록, 삭제, 조회
- 노선도

## 실행

- localStorage 지원 브라우저: Chrome v86.0
- live-server 모듈을 이용하여 로컬 서버로 실행 가능

```
$ npm install -g live-server  // 전역 설치
$ live-server

```

## 구조

```

.
├─ README.md
├─ LICENSE
├─ .eslintrc.json
├─ index.html
├─ index.css
└─ src/
   │  index.js
   ├─ view/
   │      station-manager.view.js
   │      line-manager.view.js
   │      section-manager.view.js
   │      map-print-manager.view.js
   │      template.view.js
   ├─ service/
   │      station.service.js
   │      line.service.js
   │      section.service.js
   ├─ controller/
   │      station-manager.controller.js
   │      line-manager.controller.js
   │      section-manager.controller.js
   └─ common/
           error-message.js
           util.js



```

- service/ : 데이터 트랜잭션, 앱의 주요 로직
- controller/: 사용자 입력값을 검증, 가공하여 서비스로직에 전달하고 값을 받아 뷰에 전달
- view/ : 사용자에게 보이는 뷰 생성, controller에서 처리된 데이터를 받거나 서비스에 직접 접근
- common/ : 공동 모듈, 보조 연산 기능들

## 구현 기능 목록

## 실행 이미지

### 지하철 역 관련 기능

1. 등록 기능

- [x] 역 이름을 입력받는다.
- [x] 역 이름 입력값을 검사한다.
- [x] 예외) 역 이름은 2글자 미만일 수 없다.
- [x] 예외) 역 이름은 중복될 수 없다.

2. 삭제 기능

- [x] 역을 삭제할 수 있다.
- [x] 예외) 단, 노선에 등록된 역은 삭제 불가하다.

3. 조회 기능

- [x] 등록된 역의 목록을 조회할 수 있다.
- [x] 역 이름과 함께 역 삭제 버튼을 보여준다.
- [x] 삭제와 추가 즉시 업데이트 된다.

### 지하철 노선 관련 기능

1. 등록 기능

- [x] 노선 이름을 입력받는다.
- [x] 상행 종점역과 하행 종점역을 선택한다.
- [x] 노선 입력값에 대해 검사한다.
- [x] 노선 이름은 3글자 이상으로 한다.
- [x] 예외) 중복된 노선 이름이 등록될 수 없다.
- [x] 예외) 상행 종점역과 하행 종점역이 같을 수 없다.

2. 삭제 기능

- [x] 지하철 노선을 삭제할 수 있다.
- [x] 노선을 삭제해도 노선의 역들은 삭제되지 않는다.

3. 조회 기능

- [x] 노선의 목록을 조회할 수 있다.
- [x] 노선 이름과 상행 종점역, 하행 종점역, 삭제 버튼을 보여준다.
- [x] 삭제와 추가 즉시 업데이트 된다.

### 지하철 구간 관련 기능

- 구간:역과 역사이 / 노선: 구간들의 모임

1. 구간 추가 기능

- [x] 노선 선택
  - [x] 등록된 노선들 중 수정할 노선을 선택한다.
  - [x] UI: 노선 선택시 선택한 노선의 이름, 구간 등록기능, 노선의 구간 목록을 보여준다.
- 구간 입력
  - [x] 등록된 역들 중 추가할 역을 선택한다.
  - [x] 순서를 입력받는다.
- [x] 입력값에 대해 검사한다.
- [x] 예외) 순서는 0보다 큰 정수여야 한다.
- [x] 예외) 순서는 해당 노선 순서의 최대값 이하여야 한다.
- [x] 예외) 이미 노선에 추가된 역은 추가할 수 없다.
- [x] 등록이 완료되면 순서가 업데이트 된다.
- [x] 하나의 역은 여러개의 노선에 추가될 수 있다.

2. 구간 삭제 기능

- [x] 노선에 등록된 구간을 삭제할 수 있다.
- [x] 종점을 제거할 경우 이전 역이 종점이 된다.
- [x] 예외) 노선에 포함된 역이 두개 이하일때는 역을 제거할 수 없다.

3. 구간 조회 기능

- [x] 노선의 구간을 조회할 수 있다.
- [x] 순서, 역 이름, 노선제거 버튼을 보여준다.

### 지하철 노선도 출력

- [x] 모든 노선에 대해 추가된 역을 출력한다.

### 메뉴 DOM

1. 역 관리 버튼 : `#station-manager-button`
2. 노선 관리 버튼 : `#line-manager-button`
3. 구간 관리 버튼 : `#section-manager-button`
4. 노선도 출력 버튼: `#map-print-manager-button`

### 기능 DOM

1. 역 관리

- 역 입력: `#station-name-input`
- 역 추가: `#station-add-button`
- 역 삭제: `.station-delete-button` class값

2. 노선 관리

- 노선 입력 : `#line-name-input`
- 노선의 상행 종점을 선택하는 select 태그 : `#line-start-station-selector`
- 노선의 하행 종점을 선택하는 select 태그 : `#line-end-station-selector`
- 노선 추가 : `#line-add-button`
- 노선 삭제 : `.line-delete-button` class값

3. 구간 관리

- 노선을 선택: `.section-line-menu-button` class값
- 구간의 역 select 태그 : `#section-station-selector`
- 구간의 순서 입력 : `#section-order-input`
- 구간을 등록 : `#section-add-button`
- 구간을 제거 : `.section-delete-button` class값

4. 노선도 출력

- 지하철 노선도 출력 버튼을 누르면 `<div class="map"></div>` 태그를 만든다.
- 해당 태그 내부에 노선도를 출력한다.

### 요구사항

- [x] 삭제시 `confirm` 창을 띄운다.
- [x] 잘못된 입력값은 `alert` 후 재입력 가능하게 한다.
- [x] `template literal` 사용하여 html string을 표현한다.
- [x] `data` 속성을 활용하여 html태그에 역, 노선,구간의 유일한 데이터 값들을 관리한다.
- [x] `localStorage`를 이용하여 새로고침하더라도 가장 최근의 작업정보를 불러올 수 있게 한다.
