# 🚇 지하철 노선도 미션

## 📝 구현할 기능 목록
- 웹 실행 초기 세팅을 담당하는 index.js 생성

- HtmlUiManager.js: Html과의 IO를 총괄
    - NavigationBarUi.js: 상단의 변하지 않는 네비게이션 바를 관리
        - 4가지 기능에 대한 버튼을 만들어 HtmlUiManager.js와 통신, bodyUi를 수정함
    - 변수 bodyUi: 4가지 기능을 위한 Ui 객체가 할당될 수 있음
        1. 역관리: ManageStationUi.js
        2. 노선관리: ManageLineUi.js
        3. 구간관리: ManageSectionUi.js
        4. 노선도 출력: PrintLineInfoUi.js          
- 지하철 모든 역의 정보를 관리하는 AllStationInfoManager.js 생성
    - 호선 별로 지하철 역들을 관리
    - 필요할 때 bodyUi와 통신하며 필요한 정보를 줄 수 있어야 함

## 😵 고민해야할 사항들

- 화면 전환은 어떻게 할 것인가
- 클래스는 어떻게 나누어야 할까
- IO를 하나의 클래스가 총괄하도록 할 것인가 나눌 것인가
