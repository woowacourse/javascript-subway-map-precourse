# 🚇 지하철 노선도 미션

## 🚀 기능 요구사항

### 지하철 역 관련 기능

- [] 지하철 역을 등록하고 삭제할 수 있다. (단, 노선에 등록된 역은 삭제할 수 없다)
- [] 중복된 지하철 역 이름이 등록될 수 없다.
- [] 지하철 역은 2글자 이상이어야 한다.
- [] 지하철 역의 목록을 조회할 수 있다.

### 지하철 노선 관련 기능

- [] 지하철 노선을 등록하고 삭제할 수 있다.
- [] 중복된 지하철 노선 이름이 등록될 수 없다.
- [] 노선 등록 시 상행 종점역과 하행 종점역을 입력받는다.
- [] 지하철 노선의 목록을 조회할 수 있다.

### 지하철 구간 추가 기능

- [] 하나의 역은 여러개의 노선에 추가될 수 있다.
- [] 역과 역 사이에 새로운 역이 추가 될 수 있다.
- [] 노선에서 갈래길은 생길 수 없다.

### 지하철 구간 삭제 기능

- [] 노선에 등록된 역을 제거할 수 있다.
- [] 종점을 제거할 경우 다음 역이 종점이 된다.
- [] 노선에 포함된 역이 두개 이하일 때는 역을 제거할 수 없다.

### 지하철 노선에 등록된 역 조회 기능

- [] 노선의 상행 종점부터 하행 종점까지 연결된 순서대로 역 목록을 조회할 수 있다.

## ✅ 프로그래밍 요구사항

### 메뉴 버튼

- [] 역 관리 button 태그는 `#station-manager-button` id값을 가진다.
- [] 노선 관리 button 태그는 `#line-manager-button` id값을 가진다.
- [] 구간 관리 button 태그는 `#section-manager-button` id값을 가진다.
- [] 지하철 노선도 출력 관리 button 태그는 `#map-print-manager-button` id값을 가진다.

### 지하철 역 관련 기능

- [] 지하철 역을 입력하는 input 태그는 `#station-name-input` id값을 가진다.
- [] 지하철 역을 추가하는 button 태그는 `#station-add-button` id값을 가진다.
- [] 지하철 역을 삭제하는 button 태그는 `.station-delete-button` class값을 가진다.

### 지하철 노선 관련 기능

- [] 지하철 노선의 이름을 입력하는 input 태그는 `#line-name-input` id값을 가진다.
- [] 지하철 노선의 상행 종점을 선택하는 select 태그는 `#line-start-station-selector` id값을 가진다.
- [] 지하철 노선의 하행 종점을 선택하는 select 태그는 `#line-end-station-selector` id값을 가진다.
- [] 지하철 노선을 추가하는 button 태그는 `#line-add-button` id값을 가진다.
- [] 지하철 노선을 삭제하는 button 태그는 `.line-delete-button` class값을 가진다.

### 지하철 구간 추가 기능

- [] 지하철 노선을 선택하는 button 태그는 `.section-line-menu-button` class값을 가진다.
- [] 지하철 구간을 설정할 역 select 태그는 `#section-station-selector` id값을 가진다.
- [] 지하철 구간의 순서를 입력하는 input 태그는 `#section-order-input` id값을 가진다.
- [] 지하철 구간을 등록하는 button 태그는 `#section-add-button` id값을 가진다.
- [] 지하철 구간을 제거하는 button 태그는 `.section-delete-button` class값을 가진다.

### 지하철 노선도 출력 기능

- [] 지하철 노선도 출력 버튼을 누르면 `<div class="map"></div>` 태그를 만들고 해당 태그 내부에 노선도를 출력한다.

### 추가된 요구사항

- [] [data](https://developer.mozilla.org/ko/docs/Learn/HTML/Howto/%EB%8D%B0%EC%9D%B4%ED%84%B0_%EC%86%8D%EC%84%B1_%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0)속성을 활용하여 html 태그에 역, 노선, 구간의 유일한 데이터 값들을 관리한다.
- [] [localStorage](https://developer.mozilla.org/ko/docs/Web/API/Window/localStorage)를 이용하여, 새로고침하더라도 가장 최근에 작업한 정보들을 불러올 수 있도록 한다.
