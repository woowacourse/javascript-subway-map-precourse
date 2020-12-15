# 🚇 지하철 노선도 미션

## 🚦 디렉토리 구조
```
├── LICENSE
├── README.md
├── images
│   ├── line_manager.gif
│   ├── map_print_manager.gif
│   ├── section1.png
│   ├── section2.png
│   ├── section_manager.gif
│   └── station_manager.gif
├── index.html
└── src
    ├── config.js
    ├── core
    │   └── Component.js
    ├── index.js
    ├── pages
    │   ├── LineManager.js
    │   ├── PrintSubwayLine.js
    │   ├── SectionManager.js
    │   └── StationManager.js
    └── utils
        ├── errors.js
        ├── events.js
        └── reRenderPage.js
```
- config: 전체 페이지에 필요한 태그를 따로 관리하기 위해 설정 파일로 분리
- core: 상태로 HTML을 렌더링하기 위해 사용되는 메서드들을 컴포넌트 클래스를 사용하여 정의
- pages: 각각의 화면들을 한 폴더에서 관리하기 위해 pages 폴더에 분리
- utils: 에러메시지, 이벤트, 페이지를 다시 그려주는 함수를 utils 폴더에 분리

<br/>

## 🚀 기능 요구사항

### 1. 역 관리 페이지

#### 1) 역의 이름 유효성 검사

- 중복된 역의 이름을 등록할 수 없다.
- 역의 이름은 2글자 이상으로 한다.
- 역의 이름에 공백이 들어갈 수 없다.
- 역의 이름은 한글로만 작성 가능하다.
- 역의 이름이 올바르지 않을 시, `alert` 메시지를 출력한다.

#### 2) 지하철 역 목록 관리

- 역 관리 버튼 클릭 시, 역 관리 페이지를 출력한다.
- 역 추가 버튼 클릭 시, 역을 추가한다.
- 역 삭제 버튼 클릭 시, 역을 삭제한다.
- 역의 추가와 삭제 시, 역의 목록을 출력한다.
- 역 관리가 끝난 역의 목록을 로컬스토리지에 저장한다.

### 2. 노선 관리 페이지

#### 1) 노선의 이름 유효성 검사

- 중복된 노선의 이름을 등록할 수 없다.
- 노선의 이름에 공백이 들어갈 수 없다.
- 노선의 이름이 올바르지 않을 시, `alert` 메시지를 출력한다.

#### 2) 지하철 노선 목록 관리

- 노선 관리 버튼 클릭 시, 노선 관리 페이지를 출력한다.
- 노선 추가 버튼 클릭 시, 노선을 추가한다.
- 삭제 버튼 클릭 시, 노선을 삭제한다.
- 노선 추가와 삭제 시, 노선 목록을 출력하고 로컬스토리지에 노선 목록을 저장한다.

### 3. 구간 관리 페이지

#### 1) 노선 선택

- 로컬스토리지에서 노선을 받아와 노선 메뉴 버튼을 생성한다.
- 각 노선의 버튼을 클릭 시, 해당 노선의 정보를 출력한다.

#### 2) 지하철 구간 목록 관리

- 지하철 노선에 구간을 추가하는 기능은 노선에 역을 추가하는 기능이라고도 할 수 있다.
- 역과 역사이를 구간이라 하고 이 구간들의 모음이 노선이다.
- 하나의 역은 여러개의 노선에 추가될 수 있다.
- 역과 역 사이에 새로운 역이 추가 될 수 있다.
- 노선에서 갈래길은 생길 수 없다.
- 추가될 역의 이름과 순서를 입력 받는다.
- 등록 버튼 클릭 시, 노선에 역을 추가한다.
- 노선에서 제거 버튼 클릭 시, 노선에 역을 제거한다.
- 노선의 등록과 제거 시, 구간 목록을 출력하고 로컬스토리지에 노선 목록을 저장한다.
- 종점 제거 시 다음 역이 종점이 된다.
- 노선에 포함된 역이 2개 이하일 때, 역을 제거할 수 없다.
- 추가할 역의 순서를 입력하지 않으면 `alert` 메시지를 출력한다.

### 4. 지하철 노선도 출력

- 로컬스토리지에 저장된 노선도를 화면에 출력한다.

<br/>

## 🥊 미흡했던 점 & 고생했던 점

- [data]: 현재 구조에서 어떻게 [data]속성을 사용해야 할지 파악을 하지 못했습니다.
- 새로운 구조로 코딩을 하다 보니 막히는 부분이 많았고, 그로 인해 시간에 쫓겨 더 많은 예외사항에 대한 고민이 부족했습니다.
- 상태가 변할 때 마다 전체 화면을 렌더링하는 구조로 코딩을 하여, 변화하지 않는 부분도 다시 그려야 했습니다.
- 각 페이지마다 하나의 클래스 안에 많은 메서드가 존재하여 읽기 불편하다고 생각이 들었습니다.
- eslint와 prettier의 셋팅을 에디터에서만 설정하고, 파일로 볼 수 있도록 하지 못한 점이 아쉽습니다.
- 더 효율적인 코드를 작성하지 못하고, 단순히 15라인을 넘지 않기 위해 억지로 분리한 듯한 부분이 있어 아쉽습니다.
- 어떠한 이유로 에러메시지가 화면에 뜬 건지 상황마다 더 명확하게 설명을 하지 못했습니다. 다른 분의 pr을 보고 try catch문을 사용하면 더 명확하게 설명을 할 수 있다는 것을 배울 수 있었습니다.
- map으로 화면을 그릴 때, 화면에 계속 의도치 않은 텍스트가 발생하여 원인을 찾는데 꽤 오래 걸렸습니다. 결과적으로 배열인데 `join` 을 사용하지 않아 발생한 문제였습니다.
- 템플릿 리터럴을 사용해 일일히 화면을 그리다 보니 태그들을 작성하는데 헷갈리는 부분이 많아 고생했습니다. 확장도구를 이용하여 더 편하게 할 수 있다는 것을 나중에 알게 되었습니다.
- 어떤 값을 상수로 관리해야 하는 지 판단하는 것이 어려웠습니다. 함수안에서만 사용하고 의미가 명확해 보이는 값들도 상수 처리 해야 하는 지 의문이 들었습니다. 
- 상행종점과 하행종점의 값을 저장할 때 하나의 배열에 저장하지 않고 따로 저장했습니다. 그로 인해 구간에서 목록을 추가하고 삭제할 때, 데이터 변경하는 부분이 너무 어려웠습니다. 결국 다시 돌아가 두 값들을 하나의 배열로 관리하도록 수정하였고, 문제를 해결할 수 있었습니다.

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
