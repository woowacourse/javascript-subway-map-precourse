# 🚇 지하철 노선도 미션

## 📌 프로젝트 개요

지하철 노선도 미션은 지하철 노선도를 관리할 수 있는 프로젝트입니다. 프로그램 상단에는 총 4가지의 메뉴로 `1. 역 관리`, `2. 노선 관리`, `3. 구간 관리`, `4. 지하철 노선도 출력` 가 있습니다. `1. 역 관리`, `2. 노선 관리`, `3. 구간 관리` 메뉴는 각각 지하철 역, 지하철 노선, 지하철 구간을 등록(추가) 하거나 삭제, 조회하는 기능을 가지고 있으며, `4. 지하철 노선도 출력` 메뉴는 지하철 노선도를 보여주는 기능을 합니다.

## 🚀 기능 요구 사항

### 1.1 주어진 요구 사항

##### 지하철 역 관련 기능

- 지하철 역을 등록하고 삭제할 수 있다. (단, 노선에 등록된 역은 삭제할 수 없다)
- 중복된 지하철 역 이름이 등록될 수 없다.
- 지하철 역은 2글자 이상이어야 한다.
- 지하철 역의 목록을 조회할 수 있다.

##### 지하철 노선 관련 기능
- 지하철 노선을 등록하고 삭제할 수 있다.
- 중복된 지하철 노선 이름이 등록될 수 없다.
- 노선 등록 시 상행 종점역과 하행 종점역을 입력받는다.
- 지하철 노선의 목록을 조회할 수 있다.

##### 지하철 구간 추가 기능
- 지하철 노선에 구간을 추가하는 기능은 노선에 역을 추가하는 기능이라고도 할 수 있다.
  - 역과 역사이를 구간이라 하고 이 구간들의 모음이 노선이다.  
- 하나의 역은 여러개의 노선에 추가될 수 있다.
- 역과 역 사이에 새로운 역이 추가 될 수 있다.
- 노선에서 갈래길은 생길 수 없다.

##### 지하철 구간 삭제 기능
- 노선에 등록된 역을 제거할 수 있다.
- 종점을 제거할 경우 다음 역이 종점이 된다.
- 노선에 포함된 역이 두개 이하일 때는 역을 제거할 수 없다.

##### 지하철 노선에 등록된 역 조회 기능
- 노선의 상행 종점부터 하행 종점까지 연결된 순서대로 역 목록을 조회할 수 있다.

### 1.2 기능 목록

- `1. 역 관리`, `2. 노선 관리`, `3. 구간 관리`, `4. 지하철 노선 출력` 버튼을 누르면 관련 화면을 출력한다.

- 역 관리
  - 추가
    - 사용자가 입력한 역 이름은 2글자 이상인지 검증해야 한다.
      - 중복된 역 이름은 등록할 수 없다.
      - 한글만 가능하다. (공백이 포함된 경우, 입력값이 없는 경우, 알파벳인 경우, 특수 문자인 경우 확인)
  - 삭제
    - 지하철 역 목록에서 역을 삭제할 수 있다.
      - `alert`를 통해 다시 물어본다.
  - 역의 목록을  조회한다.
- 노선 관리
  - 추가
    - 사용자가 입력한 노선 이름을 검증한다.
      - 중복된 노선 이름은 등록할 수 없다.
      - 숫자와 알파벳 문자만 가능하다. (공백이 포함된 경우, 입력값이 없는 경우 확인)
    - 상행 종점과 하행 종점 목록을 역 목록에서 가져온다.
    - 노선의 이름이 다르면 상행 종점과 하행 종점이 중복될 수 있다. (고민)
  - 삭제
    - 지하철 노선 목록에서 노선을 삭제할 수 있다.
      - `alert`를 통해 다시 물어본다.
  - 노선 목록을 조회한다.
- 구간 관리
  - 구간을 수정할 노선을 선택하면 관련 화면을 출력한다.
  - 등록(추가)
    - 사용자가 입력한 역의 이름과 순서를 검증한다.
      - 중복된 역 이름은 등록할 수 없다.
      - 역과 역 사이(구간)만 추가할 수 있다. (상행 종점이나 하행 종점 추가는 불가능)
  - 삭제
    - 노선에 등록된 역을 제거할 수 있다.
      - `alert`를 통해 다시 물어본다.
      - 노선에 등록된 역이 두 개 이하일 때는 역을 제거할 수 없다.
  - 노선의 구간 목록을 조회한다.
- 지하철 노선도 관리
  - 각 노선의 역들을 출력한다.

<br/>


## ✅ 비기능 요구사항

### 2.1 속성 태그 요구사항

##### 메뉴 버튼

- 역 관리 button 태그는 `#station-manager-button` id값을 가진다.
- 노선 관리 button 태그는 `#line-manager-button` id값을 가진다.
- 구간 관리 button 태그는 `#section-manager-button` id값을 가진다.
- 지하철 노선도 출력 관리 button 태그는 `#map-print-manager-button` id값을 가진다.

##### 지하철 역 관련 기능
- 지하철 역을 입력하는 input 태그는 `#station-name-input` id값을 가진다.
- 지하철 역을 추가하는 button 태그는 `#station-add-button` id값을 가진다.
- 지하철 역을 삭제하는 button 태그는 `.station-delete-button` class값을 가진다.

##### 지하철 노선 관련 기능
- 지하철 노선의 이름을 입력하는 input 태그는 `#line-name-input` id값을 가진다.
- 지하철 노선의 상행 종점을 선택하는 select 태그는 `#line-start-station-selector` id값을 가진다.
- 지하철 노선의 하행 종점을 선택하는 select 태그는 `#line-end-station-selector` id값을 가진다.
- 지하철 노선을 추가하는 button 태그는 `#line-add-button` id값을 가진다.
- 지하철 노선을 삭제하는 button 태그는 `.line-delete-button` class값을 가진다.

##### 지하철 구간 추가 기능
- 지하철 노선을 선택하는 button 태그는 `.section-line-menu-button` class값을 가진다.
- 지하철 구간을 설정할 역 select 태그는 `#section-station-selector` id값을 가진다.
- 지하철 구간의 순서를 입력하는 input 태그는 `#section-order-input` id값을 가진다.
- 지하철 구간을 등록하는 button 태그는 `#section-add-button` id값을 가진다.
- 지하철 구간을 제거하는 button 태그는 `.section-delete-button` class값을 가진다.

##### 지하철 노선도 출력 기능
- 지하철 노선도 출력 버튼을 누르면 `<div class="map"></div>` 태그를 만들고 해당 태그 내부에 노선도를 출력한다.

### 2.2 프로그래밍 요구사항

##### 기존 요구사항

- 사용자가 잘못된 입력 값을 작성한 경우 `alert`을 이용해 메시지를 보여주고, 재입력할 수 있게 한다.
- 외부 라이브러리(jQuery, Lodash 등)를 사용하지 않고, 순수 Vanilla JS로만 구현한다.
- **자바스크립트 코드 컨벤션을 지키면서 프로그래밍** 한다
- **indent(인덴트, 들여쓰기) depth를 3이 넘지 않도록 구현한다. 2까지만 허용**한다.
- **함수(또는 메소드)의 길이가 15라인을 넘어가지 않도록 구현한다.**
  - 함수(또는 메소드)가 한 가지 일만 잘 하도록 구현한다.
- 변수 선언시 `var` 를 사용하지 않는다. `const` 와 `let` 을 사용한다.
- `import` 문을 이용해 스크립트를 모듈화하고 불러올 수 있게 만든다.
- `template literal`을 이용해 데이터와 html string을 가독성 좋게 표현한다.

#### 추가된 요구사항
- [data](https://developer.mozilla.org/ko/docs/Learn/HTML/Howto/%EB%8D%B0%EC%9D%B4%ED%84%B0_%EC%86%8D%EC%84%B1_%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0)속성을 활용하여 html 태그에 역, 노선, 구간의 유일한 데이터 값들을 관리한다. 
- [localStorage](https://developer.mozilla.org/ko/docs/Web/API/Window/localStorage)를 이용하여, 새로고침하더라도 가장 최근에 작업한 정보들을 불러올 수 있도록 한다.

## 💻 프로그램 실행 결과

### 역관리

![img](file:///Users/hanjunmo/Desktop/javascript-subway-map-precourse/images/station_manager.gif?lastModify=1607501706)

### 노선관리

![img](file:///Users/hanjunmo/Desktop/javascript-subway-map-precourse/images/line_manager.gif?lastModify=1607501706)

### 구간관리

![img](file:///Users/hanjunmo/Desktop/javascript-subway-map-precourse/images/section_manager.gif?lastModify=1607501706)

### 노선도 출력

![img](file:///Users/hanjunmo/Desktop/javascript-subway-map-precourse/images/map_print_manager.gif?lastModify=1607501706)