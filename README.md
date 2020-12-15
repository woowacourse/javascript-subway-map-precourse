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

## 구조
```
src
 ┣ components
 ┃ ┣ line-manager
 ┃ ┃ ┣ LineManager.js
 ┃ ┃ ┣ LineManagerInput.js
 ┃ ┃ ┗ LineManagerList.js
 ┃ ┣ map-print-manager
 ┃ ┃ ┗ MapPrint.js
 ┃ ┣ section-manager
 ┃ ┃ ┣ SectionManager.js
 ┃ ┃ ┣ SectionManagerHeaderButtons.js
 ┃ ┃ ┣ SectionManagerInput.js
 ┃ ┃ ┗ SectionManagerList.js
 ┃ ┣ station-manager
 ┃ ┃ ┣ StationManager.js
 ┃ ┃ ┣ StationManagerInput.js
 ┃ ┃ ┗ StationManagerList.js
 ┃ ┣ ContentContainer.js
 ┃ ┣ HeaderButtons.js
 ┃ ┗ SubwayMap.js
 ┣ constants
 ┃ ┗ constants.js
 ┣ utils
 ┃ ┣ handleDom.js
 ┃ ┣ templates.js
 ┃ ┗ validation.js
 ┗ index.js

```

## 추가될 기능
- SubwayMap
  - ContentContainer과 HeaderButtons를 갖고 있으며, 버튼을 클릭했을 때, 아래에 어떤 컴포넌트가 렌더링 되어야할지를 결정할 함수를 갖고 있다.

- ContentContainer
  - 4개의 매니저 컴포넌트들을 갖고 있으며, 컴포넌트들에 필요한 데이터를 들고 있는 곳이다.

- HeaderButtons
  - 4개의 헤더 버튼들을 갖고 있다.

- 역관리 (station-manager)
  - 사용자가 역 이름을 받으면 
    - 2글자 이하일 경우 예외처리 해야한다.
    - 역이 중복인지 검사해야한다.
  - 사용자에게 지하철 역 목록을 불러와서 보여주어야한다.
  - 사용자가 삭제버튼을 누르면 데이터에서 선택한 역을 찾아 삭제해야한다.
    - 사용자가 삭제하고자 하는 역이 이미 노선에 추가되어 있는 상태인지 확인후, 노선에 추가되어있지 않으면 삭제한다.

- 노선관리 ( line-manager )
  - 사용자가 노선 이름을 입력하면
    - 노선이름이 중복인지 검사해야한다.
    - 노선 이름이 빈칸인지 검사해야한다.
  - 사용자가 상행종점과 하행종점을 입력하고 노선추가를 한다.
    - 상행종점과 하행종점이 서로 같은지 검사해야한다.
  - 사용자에게 지하철 노선 목록을 보여주어야한다.
    - 실시간으로 업데이트 하여 보여주어야 한다.
  - 사용자가 노선을 삭제한다면 데이터에서 선택한 노선을 찾아 삭제해야한다.

- 구간관리 ( section-manager )
  - 각 구간들을 관리할 수 있는 버튼창을 보여주어야한다.
    - 버튼을 누르면 각각에 맞는 구간이 나와야한다.
    - 구간을 등록버튼을 누르면
      - 이미 현재 노선에 등록되어있는 역인지 검사해야한다.
      - 순서가 음수인지 검사해야한다.
      - 순서가 길이보다 길면 맨 마지막 번호로 넣어야한다.
      - 순서가 숫자로 되어있는지 검사해야한다.
    - 각 노선에 구간을 추가한다면 추가된 구간을 실시간으로 출력해주어야한다.
    - 노선에서 역을 제거하는 버튼을 누르면
      - 노선에 남아있는 역이 2개 이하이면 더 이상 노선에서 역을 삭제할 수 없도록 한다.

- 노선도 출력 ( map-print-manager )
  - 지하철의 각 노선도를 상행종점부터 하행종점까지 출력해야한다.

## 느낀점

이번 미션은 2주차 까지 했던 미션들보다는 확실히 고통스러웠다. 처음 미션을 받았을 때에는, 구현해야하는 컴포넌트들이 많다는 사실과, 그 컴포넌트 사이에서 데이터가 이곳 저곳으로 흘러가야한다는 사실을 인지하고 조금 막막했다. 

일단 레이싱 카 미션에서 했던 것 처럼, 하나의 뷰를 각각의 컴포넌트들로 나누어 구조를 짜기로 했다.

그 후 html 파일을 작성한 뒤, 4가지의 버튼 별로 아래 렌더링 되는 화면이 다르게 하는 로직을 구현할 때, 자식 1의 조건에 맞게 자식 2를 고치는 함수를 부모에 둔 뒤에 사용하면 되겠다는 생각이 들었고, 그 뒤에도 자식에서 필요한 뷰의 업데이트나 또는 데이터의 저장들이 필요할 땐, 부모에 함수를 놓고 자식들을 관리하는 형태로 가져갔다.

모든 기능을 다 구현한 후 구조적인 문제점을 발견했다. 부모에서 처리하면 된다는 생각을 갖고 구현해서 이런 문제가 생긴 것 같다.
문제점을 정리하면 다음과 같다.

1. 데이터와 ui로직들이 꽉 찬 방대한 SubwayMap(가장 상위 부모)
2. 데이터 변화에 따른 이벤트의 흐름이 일정치 않음.
3. 부모와 자식 컴포넌트들의 관계가 틀림. Manager 컴포넌트들이 SubwayMap에서 관리되고 있음.
4. 각각의 매니저 컴포넌트들의 내부 자식 컴포넌트들을 show, hide 하기 위해서 각각의 매니저 컴포넌트들이 show, hide되는 순간을 알아야하는데, 모두 SubwayMap에서 관리되다보니 그 시점을 알기 어렵고 또 SubwayMap과 매니저 컴포넌트들의 하위 컴포넌트와의 의존성이 높아짐. 

아래와 같은 방법으로 코드 구조들을 리팩토링 하였다.

1. 각각의 매니저 컴포넌트들에서만 사용되는 데이터 로직들은 매니저 컴포넌트에서 선언하고 그 자식컴포넌트들에서 사용하기.
2. 공통으로만 사용되는 데이터 로직들만 매니저 컴포넌트의 부모(ContentsContainer) 에 선언해 props로 하위 컴포넌트들에서 받아 사용하기.
3. Component에는 일관성있게 initializeDOM과 render함수를 두고, 처음으로 생성할 때에는 initialiDom과 initializeEvent를 호출하고, 데이터가 업데이트될 때마다 바뀌어야하는 컴포넌트들의 경우 render함수에 두기.
4. 데이터가 변경된다면, 뷰를 업데이트하는 각각의 함수를 만들어 호출시키는 방법이 아니라, 아예 ContentsContainer에서 onUpdate를 실시해 내부에서 this.render가 돌아 하위 뷰를 모두 업데이트 하기.
5. 매니저 컴포넌트들의 show, hide를 결정하는 것은 ContentsContainer가 아니라, 그곳에서 보내오는 isShow 값을 통해 각각의 매니저 컴포넌트의 render함수에서 변경하고, 그 시점을 통해 매니저의 하위 컴포넌트들의 show, hide도 결정하기.

#### 데이터 구조
  <img width="80%" src="/images/data_structure.png">
  
  - **왼쪽은 첫번째 기능구현이 다 끝났을때, 오른쪽은 구조를 변경한 뒤**

마지막 과제는 처음부터 구조를 잘 짜고 구현해서 구조를 바꾸는 데에서 일어나는 커밋을 없애야지라고 생각하고(필자는 레이싱 카 미션에서 중간에 또 구조를 엄청 바꾸는 일을 겪었다.), 중간 중간에도 처음에 생각했던 "부모에서 관리하기"만 따라가자고 생각했는데, 분명히 고려할 사항은 더 많았던지 어쨌든 구조를 수정하게 되었다. 조금 아쉽긴 하지만, 성장한 증거라고 믿는다. 그리고 매 과제를 할 때마다 느끼는 것이지만 분명히 배움과 그를 통한 성장은 존재한다. 그 다음 미션을 진행할 때, 그 전에 진행했던 미션에서 고민했던 것들은 좀 더 자연스럽게 써졌기 때문이다.
고민한 흔적들이 잘 보였으면 좋겠다.


## Demo
  - [지하철노선도](https://huijiny.github.io/javascript-subway-map-precourse/)
