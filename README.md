# 🚇 지하철 노선도 미션
지하철 역을 추가 및 삭제하고, 생성된 노선에 역을 추가하고 삭제할 수 있는 프로그램이다.

## 🚀 기능 구현 목록
1. 사용자는 버튼 4개(역 관리, 노선 관리, 구간 관리, 지하철 노선도 출력)를 선택할 수 있다.

### 지하철 역 관련 기능
2. 사용자는 역을 등록할 수 있다.
    - [예외처리] 2글자 이상의 이름인지 검증해야 한다.
    - [예외처리] 중복된 이름이 있는지 검증해야 한다.
3. 사용자는 역을 삭제할 수 있다.
    - [예외처리] 노선에 있는지 검증하고, 노선에 있다면 삭제할 수 없다.
4. 사용자 지하철 역의 목록을 조회할 수 있다.

### 지하철 노선 관련 기능
5. 사용자는 지하철 노선을 등록할 수 있다.
    - [조건] 노선 등록 시 상행 종점역과 하행 종점역을 입력받는다.
    - [예외처리] 중복된 노선 이름이 있는지 검증해야 한다.
    - [예외처리] ~선 형태의 이름인지 검증해야 한다.
    - [예외처리] 시작점과 끝점이 같은 노선이 있는지 검증해야 한다.
6. 사용자는 지하철 노선을 삭제할 수 있다.
7. 사용자는 지하철 노선의 목록을 조회할 수 있다.

### 지하철 구간 추가 기능
8. 사용자는 노선에 역을 추가할 수 있다.
    - [예외처리] 중복된 노선이 있는지 검증해야 한다.
    - [조건] 하나의 역은 여러개의 노선에 추가될 수 있다.
    - [조건] 역과 역 사이에 새로운 역이 추가 될 수 있다.
    - [조건] 노선에서 갈래길은 생길 수 없다.

### 지하철 구간 삭제 기능
9. 사용자는 노선의 역을 삭제할 수 있다.
    - [예외처리] 노선에 역이 2개 이하인지 검증하고, 2개 이하면 삭제할 수 없다.
    - [조건] 종점을 제거할 경우 다음 역이 종점이 된다.

### 지하철 노선에 등록된 역 조회 기능
10. 사용자 노선의 상행 종점부터 하행 종점까지 연결된 순서대로 전체 노선과 역 목록을 조회할 수 있다.
