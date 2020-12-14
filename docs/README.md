# 🚇 지하철 노선도 미션

## 👩🏻‍💻 구현할 기능 목록

### 통합적 기능

- `역 관리`, `노선 관리`, `구간 관리`, `지하철 노선도 출력 버튼` 중 하나를 누르면 해당 기능의 내용이 아래에 생성된다.
- 삭제 버튼을 누를 경우 경고창이 뜨고, 확인을 누를 경우 실제로 삭제가 된다.
- local storage를 이용하여, 새로고침하더라도 가장 최근에 작업한 정보들을 불러올 수 있도록 해야한다.
- `역 추가`, `노선 추가`, `등록` 버튼을 누르면 input 칸의 값이 비워진다.
- 페이지를 새로고침할 때뿐만 아니라 특정 버튼을 클릭할 경우에도 localStorage의 데이터를 새롭게 받아와서 해당하는 요소들을 업데이트 해줘야 한다.

### 잘못된 입력에 대한 처리

- `alert`를 이용해 메시지를 보여주고, 재입력할 수 있도록 `focus`한다.

---

### 지하철 역 관련 기능

- 지하철 역을 등록할 수 있어야 한다.
- 등록된 지하철 역을 삭제할 수 있어야 한다.
- 등록된 지하철 역의 목록을 표 형식으로 띄워줘야 한다.

### 지하철 역 관련 기능의 예외

- 노선에 등록된 역은 삭제할 수 없어야 한다.
- 중복된 지하철 역 이름이 등록될 수 없어야 한다.
- 2글자 미만의 지하철 역을 등록할 수 없어야 한다.
- 문자가 아닌 지하철 역 이름은 등록할 수 없어야 한다.

---

### 지하철 노선 관련 기능

- 등록된 지하철 역을 상행 종점역과 하행 종점역 목록에서 조회할 수 있어야 한다.
- 지하철 노선을 등록할 수 있어야 한다.
- 지하철 노선을 삭제할 수 있어야 한다.
- 노선 등록 시 상행 종점역과 하행 종점역을 입력받아야 한다.
- `노선 이름`, `상행 종점역`, `하행 종점역`이 포함된 지하철 노선의 목록을 표 형식으로 조회할 수 있어야 한다.

### 지하철 노선 관련 기능의 예외

- 중복된 지하철 노선 이름이 등록될 수 없어야 한다.
- `$문자 + 선`(ex.신분당선) `$숫자 + 호선`(ex.1호선)의 형식에서 벗어난 지하철 노선 이름은 등록할 수 없어야 한다.

---

### 구간 관리 기능

#### 지하철 구간 추가 기능

- 구간을 수정할 노선을 선택할 수 있어야 한다.
- 노선을 선택하면 해당 노선 관리 정보가 아래에 뜬다.
- 등록된 지하철 역 중 하나를 선택하고 삽입할 위치를 입력하면 해당 위치에 역이 추가되고, 원래 그 위치에 있던 역은 한 칸 뒤로 밀려난다.
- 이미 다른 노선에 등록된 지하철 역도 등록할 수 있다.

#### 지하철 구간 추가 기능의 예외

- 이미 해당 노선에 등록된 지하철 역은 추가할 수 없어야 한다.
- 삽입할 위치 인덱스는 `0 ~ 해당 노선에 등록된 역의 수 + 1`의 범위를 벗어날 수 없다.

#### 지하철 구간 삭제 기능

- 노선에 등록된 역을 제거할 수 있다.
- 상행 종점을 제거할 경우 다음 역이 상행 종점이 된다.
- 하행 종점을 제거할 경우 이전 역이 하행 종점이 된다.

#### 지하철 구간 삭제 기능의 예외

- 노선에 포함된 역이 두개 이하일 때는 역을 제거할 수 없어야 한다.

---

### 지하철 노선에 등록된 역 조회 기능

- 노선의 상행 종점부터 하행 종점까지 연결된 순서대로 역 목록을 조회할 수 있어야 한다.
- 이때 역 목록은 `<div class="map"></div>` 태그를 만들고 해당 태그 내부에 노선도를 출력해야 한다.

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
