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


## 📝 구현 기능 정리

### 1. 입력
- 역관리의 경우
  - 추가할 역이름
- 노선관리의 경우
  - 추가할 노선이름
  - 상행 종점
  - 하행 종점
- 구간관리의 경우
  - 수정할 노선
  - 추가할 역이름
  - 순서

### 2. 알고리즘(과정)
**1) 역관리의 경우**<br>
 ##### (추가)
  - 역이름을 입력받는다.
   <br>**(예외처리)**<br>
    - 지하철역의 이름이 1글자 이하인지(공백포함)
    - 이미 존재하는 지하철역의 이름을 입력하였는지
  - stationRepository에 새로운 역에 대한 행을 추가한다.

  ##### (삭제)
  <br>**(예외처리)**<br>
    - 지하철 노선에 등록된 역인지 확인한다.
  - 표에서 삭제한다.
  - stationRepository에서 역을 삭제한다.
    
**2) 노선관리의 경우**<br>
  #### (추가)
  - 노선이름을 입력받는다.
   <br>**(예외처리)**<br>
    - 노선이름을 공백으로 입력하지 않았는지
    - 이미 존재하는 노선이름을 입력하지 않았는지
    - 상행 종점과 하행종점을 입력받는다.
  - 지하철 노선 목록 마지막에 새로운 노선에 대한 행을 추가한다.

  #### (삭제)
  - 지하철 노선 목록 표에서 제거한다.
  - lineRepository에서 노선정보를 삭제한다.
    
**3) 구간관리의 경우**<br>
  #### (추가)
  - 구간을 수정할 노선을 선택받는다.
  - 구간 등록할 역을 선택받는다.
  - 삽입할 순서를 입력받는다.
   <br>**(예외처리)**<br>
    - 순서가 입력이 되었는지 확인한다.(공백도 포함)
    - 순서가 0이상인지 확인한다.
    - 순서가 소수(ex1.2)가 아닌지 확인한다.
    - 순서가 지금 존재하는 가장 마지막 순서 + 1 보다 큰지 확인한다(ex. 순서가 3번재까지 있는 노선에서 5번째 순서에 등록하는 경우)
    - 삽입하려는 순서 앞 뒤로 삽입하려는 역과 같은 역이 있는지 확인한다.(같은 역이 2번 연속으로 호선에 있을 수는 없으므로)
  - lineRepository에서 수정할 노선의 순서에 구간등록할 역을 삽입한다.
  - update된 lineRepository에서 Data를 가져와 표를 다시 보여준다.

  #### (삭제)
  <br>**(예외처리)**<br>
    - 지금 호선의 역들의 수가 3이상인지 확인한다.(2라면 지우는 것은 불허한다.)
  - lineRepository에서 선택된 노선의 삭제할 구간 순서를 삭제한다.
  - update된 lineRepository에서 Data를 가져와 표를 다시 보여준다.

**4) 지하철 노선도 출력의 경우**<br>
  - lineRepository에서 모든 노선에 대한 정보를 가져온다.
  - 모든 노선에 대한 모든 역을 출력한다.