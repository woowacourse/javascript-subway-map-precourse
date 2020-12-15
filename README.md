# 🚇 지하철 노선도 미션

## 👩🏻‍💻 기능 목록

- 4개 관리 페이지 연결을 위한 버튼 생성
- 4개 관리페이지 컴포넌트 생성
- 각 버튼에 이벤트 리스너 등록하여 컴포넌트 연결
- 역 관리 페이지 UI 구현
- 역 관리 페이지 각 버튼에 이벤트 리스너 연결
- local storage를 이용하여 역 데이터 저장하기
- 노선 관리 페이지 UI 구현
- 노선 관리 페이지 각 버튼에 이벤트 리스너 연결
- local storage에 객체를 이용하여 노선 데이터와 역 데이터 함께 저장하기
- 역 관리 데이터와 노선 관리 데이터 연동
- 구간 관리 페이지 UI 구현
- 구간 관리 페이지 노선 선택 버튼에 이벤트 리스너 연결하여 해당 노선 정보 렌더링
- 구간 등록 구현
- 구간 제거 구현
- 노선도 출력 페이지 UI 구현
- 예외 상황 검증
  - 역 관리
    - 중복된 역 이름 입력 시 alert v
    - 공백 입력 시 alert v
    - 2자 미만 입력 시 alert v
    - 노선에 등록된 역 삭제 시 alert v
  - 노선 관리
    - 중복된 노선 이름 입력 시 alert v
    - 공백 입력 시 alert v
    - 상행 종점역과 하행 종점역이 중복되는 노선이 이미 존재하는 경우 alert v
    - 상행 종점역과 하행 종점역이 동일한 역인 경우 alert v
  - 구간 관리
    - 노선에서 제거 시 confirm 후 삭제 v
    - 노선에 포함된 역이 2개 이하일 때 노선에서 제거 시 alert v
    - 구간 등록 시 인덱스가 0이거나 가장 끝 인덱스인 경우 alert v
    - 순서에 숫자가 아닌 값 입력 불가하도록 type=number로 설정 v
    - 순서에 음수 입력 시 alert v
    - 노선에 이미 존재하는 구간 이름 등록 시 alert v
  - 중복되는 역 이름, 노선 이름 검증 함수 통합 v
- 리팩토링
  - 자바스크립트 컨벤션에 맞추어 validation depth줄이기 및 리팩토링 v
  - 폴더 재구성 v
  - handlers 컨벤션에 맞추어 validation depth줄이기 및 리팩토링 v
  - html tag 검토 v
  - input value 검토, 구간 type=number 삭제 후 숫자만 입력 가능하도록 검증 추가 v
  - return값이 없는 map 메소드를 forEach로 수정 v
  - 상수화 v
  - css 검토 v

## ⛓ 문서 구조

```plaintext
├── src
│   │
│   ├── components  // 사용자단에 보여질 페이지를 관리하는 곳
│   │   │
│   │   ├── pages
│   │   │     ├── linePages.js  // 노선 관리 페이지
│   │   │     ├── mapPrintPages.js  // 노선도 출력 페이지
│   │   │     ├── sectionPages.js  // 구간 관리 페이지
│   │   │     └── stationPages.js  // 역 관리 페이지
│   │   │
│   │   └── app.js  // 각 페이지를 렌더링할 때 라우팅을 담당하는 곳
│   │
│   ├── constatns
│   │   │
│   │   └── tag.js  // html tag 상수를 모아놓은 곳
│   │
│   ├── managers  // 각 관리 페이지를 관리하는 곳
│   │   │
│   │   ├── handlers
│   │   │     ├── lineHanlderPages.js  // 노선 관련 이벤트 관리
│   │   │     ├── mapPrintHandlerPages.js  // 노선도 출력 관련 이벤트 관리
│   │   │     ├── sectionHandlerPages.js  // 구간 관련 이벤트 관리
│   │   │     └── stationHandlerPages.js  // 역 관련 이벤트 관리
│   │   │
│   │   └── validation  // 유효성을 검증하는 곳
│   │   │     ├── alert.js  // 유효성 검증을 위한 alert message를 생성하는 곳
│   │   │     └── validation.js  // 유효성을 검증을 하고 필요한 데이터를 반환하는 곳
│   │   │
│   │   └── init.js  // 초기화를 담당하는 곳
│   │   │
│   │   └── render.js  // 렌더링을 담당하는 곳
│   │
│   ├── objects
│   │   │
│   │   └── objects.js  // 생성한 객체를 모아둔 곳
│   │
│   ├── index.js  // 시작점
│   │
│   └── main.js  // 초기 작업들을 담당하는 곳
│
└── index.html
```

## 🤦🏻‍♀️ 고민한 지점

- 버튼에 각 관리페이지를 연결할 때, 리액트에서는 컴포넌트를 쉽게 렌더링할 수 있었는데 vanilla javascript로 연결하려고하니 어려웠다.
- 사용자 동작에 따라 새로운 엘리먼트를 추가하거나 삭제할 때, 남은 엘리먼트를 다시 render하고, 이벤트 리스너를 다시 추가하는 등 업데이트된 상태를 구현하는 부분이 까다로웠고, 이 방법이 과연 효율적인 방법이 맞는지 의구심이 들었다.
- station, line 등의 이름이 여러 함수, 변수명에 포함되어 의미 전달이 명확하면서도 가독성이 좋은 함수명, 변수명을 짓는 것이 어려웠다.
- 예외상황을 어디까지 체크해야하는지 판단하는 것이 어려웠다.

---

## 🚀 기능 요구사항

### 지하철 역 관련 기능

- 지하철 역을 등록하고 삭제할 수 있다. (단, 노선에 등록된 역은 삭제할 수 없다)
- 중복된 지하철 역 이름이 등록될 수 없다.
- 지하철 역은 2글자 이상이어야 한다.
- 지하철 역의 목록을 조회할 수 있다.

### 지하철 노선 관련 기능

- 지하철 노선을 등록하고 삭제할 수 있다.
- 중복된 지하철 노선 이름이 등록될 수 없다.
- 노선 등록 시 상행 종점역과 하행 종점역을 입력받는다.
- 지하철 노선의 목록을 조회할 수 있다.

### 지하철 구간 추가 기능

- 지하철 노선에 구간을 추가하는 기능은 노선에 역을 추가하는 기능이라고도 할 수 있다.
  - 역과 역사이를 구간이라 하고 이 구간들의 모음이 노선이다.
- 하나의 역은 여러개의 노선에 추가될 수 있다.
- 역과 역 사이에 새로운 역이 추가 될 수 있다.
- 노선에서 갈래길은 생길 수 없다.

<img width="500" src="/images/section1.png">

### 지하철 구간 삭제 기능

- 노선에 등록된 역을 제거할 수 있다.
- 종점을 제거할 경우 다음 역이 종점이 된다.
- 노선에 포함된 역이 두개 이하일 때는 역을 제거할 수 없다.

<img width="500" src="/images/section2.png">

### 지하철 노선에 등록된 역 조회 기능

- 노선의 상행 종점부터 하행 종점까지 연결된 순서대로 역 목록을 조회할 수 있다.

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

## ✅ 프로그래밍 요구사항

### 메뉴 버튼

- 역 관리 button 태그는 `#station-manager-button` id값을 가진다.
- 노선 관리 button 태그는 `#line-manager-button` id값을 가진다.
- 구간 관리 button 태그는 `#section-manager-button` id값을 가진다.
- 지하철 노선도 출력 관리 button 태그는 `#map-print-manager-button` id값을 가진다.

### 지하철 역 관련 기능

- 지하철 역을 입력하는 input 태그는 `#station-name-input` id값을 가진다.
- 지하철 역을 추가하는 button 태그는 `#station-add-button` id값을 가진다.
- 지하철 역을 삭제하는 button 태그는 `.station-delete-button` class값을 가진다.

### 지하철 노선 관련 기능

- 지하철 노선의 이름을 입력하는 input 태그는 `#line-name-input` id값을 가진다.
- 지하철 노선의 상행 종점을 선택하는 select 태그는 `#line-start-station-selector` id값을 가진다.
- 지하철 노선의 하행 종점을 선택하는 select 태그는 `#line-end-station-selector` id값을 가진다.
- 지하철 노선을 추가하는 button 태그는 `#line-add-button` id값을 가진다.
- 지하철 노선을 삭제하는 button 태그는 `.line-delete-button` class값을 가진다.

### 지하철 구간 추가 기능

- 지하철 노선을 선택하는 button 태그는 `.section-line-menu-button` class값을 가진다.
- 지하철 구간을 설정할 역 select 태그는 `#section-station-selector` id값을 가진다.
- 지하철 구간의 순서를 입력하는 input 태그는 `#section-order-input` id값을 가진다.
- 지하철 구간을 등록하는 button 태그는 `#section-add-button` id값을 가진다.
- 지하철 구간을 제거하는 button 태그는 `.section-delete-button` class값을 가진다.

### 지하철 노선도 출력 기능

- 지하철 노선도 출력 버튼을 누르면 `<div class="map"></div>` 태그를 만들고 해당 태그 내부에 노선도를 출력한다.

### 기존 요구사항

- 사용자가 잘못된 입력 값을 작성한 경우 `alert`을 이용해 메시지를 보여주고, 재입력할 수 있게 한다.
- 외부 라이브러리(jQuery, Lodash 등)를 사용하지 않고, 순수 Vanilla JS로만 구현한다.
- **자바스크립트 코드 컨벤션을 지키면서 프로그래밍** 한다
  - [https://google.github.io/styleguide/jsguide.html](https://google.github.io/styleguide/jsguide.html)
  - [https://ui.toast.com/fe-guide/ko_CODING-CONVENSION/](https://ui.toast.com/fe-guide/ko_CODING-CONVENTION)
- **indent(인덴트, 들여쓰기) depth를 3이 넘지 않도록 구현한다. 2까지만 허용**한다.
  - 예를 들어 while문 안에 if문이 있으면 들여쓰기는 2이다.
  - 힌트: indent(인덴트, 들여쓰기) depth를 줄이는 좋은 방법은 함수(또는 메소드)를 분리하면 된다.
- **함수(또는 메소드)의 길이가 15라인을 넘어가지 않도록 구현한다.**
  - 함수(또는 메소드)가 한 가지 일만 잘 하도록 구현한다.
- 변수 선언시 `var` 를 사용하지 않는다. `const` 와 `let` 을 사용한다.
  - [const](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/const)
  - [let](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/let)
- `import` 문을 이용해 스크립트를 모듈화하고 불러올 수 있게 만든다.
  - [https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/import](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/import)
- `template literal`을 이용해 데이터와 html string을 가독성 좋게 표현한다.
  - [https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Template_literals](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Template_literals)

### 추가된 요구사항

- [data](https://developer.mozilla.org/ko/docs/Learn/HTML/Howto/%EB%8D%B0%EC%9D%B4%ED%84%B0_%EC%86%8D%EC%84%B1_%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0)속성을 활용하여 html 태그에 역, 노선, 구간의 유일한 데이터 값들을 관리한다.
- [localStorage](https://developer.mozilla.org/ko/docs/Web/API/Window/localStorage)를 이용하여, 새로고침하더라도 가장 최근에 작업한 정보들을 불러올 수 있도록 한다.

<br/>

## 📝 미션 저장소 및 진행 요구사항

- 미션은 [https://github.com/woowacourse/javascript-subway-map-precours](https://github.com/woowacourse/javascript-subway-map-precourse) 저장소를 fork/clone해 시작한다.
- **기능을 구현하기 전에 javascript-subway-precourse/docs/README.md 파일에 구현할 기능 목록**을 정리해 추가한다.
- **git의 commit 단위는 앞 단계에서 README.md 파일에 정리한 기능 목록 단위로 추가**한다.
- [프리코스 과제 제출](https://github.com/woowacourse/woowacourse-docs/tree/master/precourse) 문서 절차를 따라 미션을 제출한다.
