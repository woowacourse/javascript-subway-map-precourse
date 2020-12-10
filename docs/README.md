# 🚇 지하철 노선도 미션

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

## 기능 목록

- 역관리
  - 입력받은 역 이름이 다음과 같은 예외 사항에 속할 시 예외처리 해준다.
    - 역 이름 입력 값이 없는 경우
    - 역 이름이 공백으로 주어지는 경우 (ex. ‘ ‘, ‘ ‘ …)
    - 역 이름이 알파벳, 한글, 숫자가 아닌 경우(ex. +, -< #, @ …)
    - 중복된 역 이름이 입력된 경우
      - View Model을 통해 Model에서 관리 중인 역 목록을 불러들여 중복을 확인한다.
    - 역 이름이 2글자 미만인 경우
  - View에서 역의 삭제를 요청할 수 있다.
    - View Model을 통해 Model에서 관리 중인 노선들이 갖고있는 역들과 중복되는지 확인한다.
    - 중복이 확인되면 삭제할 수 없다.
  - View에서 역 목록 조회를 요청할 수 있다.
    - View Model을 통해 Model에서 관리 중인 역 목록을 불러들인 후 렌더링 한다.
- 노선관리
  - View에서 노선 이름, 상행 종점역, 하행 종점역을 입력받고 노선 등록을 요청할 수 있다.
    - 입력받은 노선 이름이 다음과 같은 예외 사항에 속할 시 예외처리 해준다.
      - 노선 이름 입력 값이 없는 경우
      - 노선 이름이 공백으로 주어지는 경우 (ex. ‘ ‘, ‘ ‘ …)
      - 노선 이름이 알파벳, 한글, 숫자가 아닌 경우(ex. +, -< #, @ …)
      - 중복된 노선 이름이 입력된 경우
        - View Model을 통해 Model에서 관리 중인 노선 목록을 불러들여 확인한다.
    - 입력받은 상행 종점역, 하행 종점역이 다음과 같은 예외 사항에 속할 시 예외처리 해준다.
      - 상행 종점역과 하행 종점역이 같은 경우
      - 다른 노선과 상행 종점역과 하행 종점역이 같은 경우
  - View에서 노선의 삭제를 요청할 수 있다.
    - View Model을 통해 Model에서 관리 중인 노선들 중 해당 노선을 삭제한다.
  - View에서 노선 목록 조회를 요청할 수 있다.
    - View Model을 통해 Model에서 관리 중인 노선들을 불러들인 후 렌더링한다.
- 구간관리
  - View에서 구간을 수정할 노선을 선택한다.
  - 노선이 포함한 구간들이 요청된다.
    - View Model을 통해 Model에서 관리 중인 노선들 중 해당 노선이 갖고있는 구간(역)을 불러들인 후 렌더링한다.
  - View에서 역을 선택하고 순서를 입력받고 등록을 요청할 수 있다.
    - 선택된 역과 순서가 다음과 같은 예외 사항에 속할 시 예외처리 해준다.
      - 선택된 역이 이미 노선 안에 구간으로 포함돼있는 경우
      - 입력된 순서가 상행 종점역 순서보다 앞이거나, 하행 종점역 순서보다 뒤인 경우
  - View에서 구간 삭제를 요청할 수 있다.
    - View Model을 통해 Model에서 관리 중인 노선들 중 해당 노선이 갖고있는 구간(역)을 불러들이고 요청된 역을 삭제한다.
    - 종점을 제거할 경우 상행 종점역의 경우 다음 역, 하행 종점역의 경우 이전 역이 종점이 된다.
    - 노선에 포함된 역이 두개 이하일 때는 역을 제거할 수 없다.
- 지하철 노선도 출력
  - 노선의 상행 종점부터 하행 종점까지 연결된 순서대로 역 목록을 조회할 수 있다.
    - View Model을 통해 Model에서 관리 중인 노선들과 이들 노선이 갖고있는 역들을 불러들이고 렌더링한다.
