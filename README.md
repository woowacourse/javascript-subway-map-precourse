# 🚇 지하철 노선도 미션

## 소개

나만의 역을 만들고, 만들어진 역들을 바탕으로 나만의 지하철 노선과 지하철 노선도를 제작할 수 있는 프로그램입니다. 실제 지하철 노선도와 유사한 노선도를 제작할 수 있도록 여러 기능과 제약사항이 제공됩니다.

<br/><br/>

## 🚀 기능 요구사항

<br/>

### 지하철 역 관련 기능

- 지하철 역을 추가 (add subway station)
  - :exclamation: 예외#1 - 추가하려는 역이 다른 역과 중복된 이름을 가질 경우
  - :exclamation: 예외#2 - 역의 이름이 2글자 미만일 경우(한글, 영어 모두)
- 지하철 역을 삭제 (delete subway station)
  - :exclamation: 예외#3 - 삭제하려는 역이 노선에 추가되어 있는 경우
- 지하철 역 추가 가능 여부 검사 (check if the subway station can be added)
  - :wrench: 해결(예외 #1,#2) - 추가하려는 역의 이름이 다른 역과 중복되는지, 2글자 미만인지를 검사
- 지하철 역 삭제 가능 여부 검사 (check if the subway station can be deleted)
  - :wrench: 해결(예외 #3) - 삭제할 수 없는 역을 삭제하려는 것인지를 검사

<br/>

### 지하철 노선 관련 기능

- 지하철 노선을 추가 (add subway line)
  - :exclamation: 예외#4 - 추가하려는 노선이 다른 노선과 중복된 이름을 가질 경우
  - :exclamation: 예외#5 - 추가할 때 설정하는 상행, 하행 종점역이 같을 경우
- 지하철 노선을 삭제 (delete subway line)
- 지하철 노선 추가 가능 여부 검사 (check if the subway line can be added)
  - :wrench: 해결(예외 #4,#5) - 추가하려는 노선이 다른 노선과 중복된 이름을 가지는지, 해당 노선의 상행, 하행 종점역이 같은지를 검사
- 지하철 노선의 상행 종점부터 하행 종점까지 연결된 순서대로 역 목록을 조회 (get all subway stations in subway line)

<br/>

### 지하철 전체 정보 조회 기능

- 전체 지하철 역의 목록 조회 (get all subway stations)
- 전체 지하철 노선의 목록 조회 (get all subway lines)

<br/>

### 지하철 구간 추가 기능

- 지하철 노선에 구간을 추가, 즉 지하철 노선 안의 두 역 사이에 새로운 역 끼워넣기(insert subway station in subway line)
  - :exclamation: 예외#6 - 끼워 넣으려는 역이 이미 노선 안에 있는 경우
  - :exclamation: 예외#7 - 끼워넣으려는 역의 순서가 숫자로 표현되어 있지 않을 경우
- 지하철 노선 구간 추가 가능성 여부 검사 (check if the subway station can be inserted)
  - :wrench: 해결(예외 #6) - 끼워 넣으려는 역이 이미 노선 안에 있는지 검사
  - :wrench: 해결(예외 #7) - 끼워 넣으려는 역의 순서값이 숫자인지 검사

<br/>

<img width="500" src="/images/section1.png">

<br/>

### 지하철 구간 삭제 기능

- 지하철 노선에 구간을 삭제, 즉 지하철 노선 안에서 특정 역을 빼기 (pull out subway station in subway line)
  - :exclamation: 예외#8 - 노선에 포함된 역을 삭제하려는 시점에 그 노선에 포함된 역이 두개 이하일 경우
- 지하철 노선 구간 삭제 가능성 여부 검사 (check if the subway station can be pulled out)
  - :wrench: 해결(예외 #8) - 삭제 후 그 노선에 포함된 역이 두개 미만인지를 검사

<br/>

### 로컬 스토리지 기능

- 전체 지하철 역, 노선 목록을 포함한 지하철 노선도 정보를 로컬 스토리지에 저장 (save subway map info to local storage)
- 전체 지하철 역, 노선 목록을 포함한 지하철 노선도 정보를 로컬 스토리지에서 불러오기 (load subway map info from local storage)

<br/>

### 인터페이스 전환 기능

- 버튼 클릭으로 인터페이스 전환 (convert interface with button click)

### 인터페이스 데이터 동기화 기능

- 인터페이스에 입력된 정보 저장하기 (save interface data)
- 입력 정보를 불러오기 (load interface data)
- 입력 정보를 인터페이스와 동기화 시키기(sync interface data to interface)

### 역관리 인터페이스 기능

- 역 추가 기능을 위한 유효성 검사에 따른 안내메시지 출력 (validation check before 'add subway station' with alert message)
  - 잘못된 입력이 들어왔을 때, 역을 추가할 수 없는 이유를 알려주어 재입력을 유도
- 역 삭제 기능을 위한 유효성 검사에 따른 안내메시지 출력 (validation check before 'delete subway station' with alert message)
  - 삭제할 수 없는 역을 삭제하려 할 때, 역을 삭제할 수 없는 이유를 알려주어 재입력을 유도
- 역 추가 & 삭제 결과 보여주기(show result of add & delete subway station)

<br/>

### 노선관리 인터페이스 기능

- 노선 추가 기능을 위한 유효성 검사에 따른 안내메시지 출력 (validation check before 'add subway line' with alert message)
  - 잘못된 입력이 들어왔을 때, 노선을 추가할 수 없는 이유를 알려주어 재입력을 유도
- 노선 추가 & 삭제 결과 보여주기 (show result of add & delete subway line)

<br/>

### 구간관리 인터페이스 기능

- 구간 추가 기능을 위한 유효성 검사에 따른 안내메시지 출력 (validation check before 'insert & pull out subway station in subway line' with alert message)
  - 구간을 추가할 수 없는 이유를 알려주어 재입력을 유도
  - 역을 삭제할 수 없는 이유를 알려주면서 노선 자체를 제거할 방법을 안내
- 구간 추가 & 삭제 결과 보여주기 (show result of insert & pull out subway station)

<br/>

### 노선도 출력 인터페이스 기능

- 전체 지하철 노선의 목록 조회 기능 호출 & 조회한 노선도 보여주기 (trigger 'get all subway lines' & show subway map)

<br/>

### 로컬스토리지 동기화

- 닫기, 새로고침 전 로컬스토리지에 인터페이스 정보, 노선도 정보 저장하기 (save interface & subway Map data to local storage before exit or reload)
- 접속 시 인터페이스 정보, 노선도 정보를 로컬스토리지로부터 받아 동기화 시키기 (synchronize interface & subway Map data from local storage when user access)

<br/>

<img width="500" src="/images/section2.png">

<br/><br/>

## 💻 프로그램 실행 결과

<br/>

### 역관리

<img width="100%" src="/images/station_manager.gif">

<br/>

### 노선관리

<img width="100%" src="/images/line_manager.gif">

<br/>

### 구간관리

<img width="100%" src="/images/section_manager.gif">

<br/>

### 노선도 출력

<img width="100%" src="/images/map_print_manager.gif">
