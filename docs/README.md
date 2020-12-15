## 🚠 기능 구현할 것들

1. `역 관리` 버튼을 눌렀을 때

   1. ```html
      <h1>역 이름</h1>
      <div>
          <input 
      		id="station-name-input" 
      		placeholder="역 이름을 입력해주세요"
           >
          <button id="station-add-button">
              역 추가
          </button>
      </div>
      <div>
          <h3>🚉 지하철 역 목록</h3>
          <!--여기에 테이블 형식의 지하철 역 목록이 들어감-->
          <!-- 삭제 버튼 class="station-delete-button" -->
      </div>
      ```

   2. 역 이름 `input 창`, `역 추가` 버튼, `지하철 역 목록` 영역 활성화

   3. 입력 창에 역 이름을 입력하고 `역 추가` 버튼을 누르면

      1. `isNotExistStation`: 중복된 지하철 역 이름이 있는지 확인하는 함수
      2. `checkLength`: 입력된 지하철 역 이름이 2글자 이상인지 확인하는 함수 
      3. `addStation`: 두 조건을 확인하는 함수의 결과 값이 모두 `true`이면 지하철 역 목록에 테이블로 추가되는 함수

   4. `deleteStation`: 등록된 지하철 역을 삭제하는 함수

2. `노선 관리` 버튼을 눌렀을 때

   1. ```html
      <h1>노선 이름</h1>
      <div>
          <input 
      		id="line-name-input" 
      		placeholder="노선 이름을 입력해주세요"
           >
          
          상행 종점
          <select id="line-start-station-selector"></select>
          하행 종점
          <select id="line-end-station-selector"></select>
          <button id="line-add-button">
              노선 추가
          </button>
          
          🚉 지하철 노선 목록
          <!-- 노선 이름 | 상행 종점역 | 하행 종점역 | 설정 -->
          <!-- 1호선 | 인천 | 소요산 | 삭제 -->
          <!-- 삭제 버튼 class="line-delete-button"-->
          
      </div>
      <div>
          <h3>🚉 지하철 역 목록</h3>
      </div>
      ```

   2. 노선 이름 `input 창`, 상행 종점 `select 태그`, 하행 종점 `select 태그`, `노선 추가 버튼`, `지하철 노선 목록` 활성화

   3. `isNotExistLine`: 중복된 지하철 노선(ex: 1호선, 2호선...) 있는지 확인하는 함수. true이면 입력 받은 노선 이름과 상/하행 종점을 지하철 노선 목록 테이블의 행에 추가한다.

   4. 상행 종점역과 하행 종점역은 `select`로 입력 받는데, 필수로 입력을 받도록 설정한다.

   5. 지하철 노선 목록에서는 `노선 이름 | 상행 종점역 | 하행 종점역 | 설정`을 제목으로 갖는 테이블을 볼 수 있다.

3. `구간 관리` 버튼을 눌렀을 때

   1. ```html
      <h1>구간을 수정할 노선을 선택해 주세요</h1>
      <div>
          <!-- 등록된 노선 수 만큼의 버튼 생성 
      		class="section-line-menu-button"
      	-->
          <!-- n호선 관리 -->
          <!-- 구간 등록 -->
          <!-- select 태그 id="section-station-selector"
      		input 태그 id="section-order-input"
      		등록 button id="section-add-button"
      	-->
          
          <!-- 
      		순서 | 이름 | 설정(삭제) ".line-delete-button" 
      	-->
          <!-- 
      		0 | 인천 | 노선에서 제거
      		1 | 소요산 | 노선에서 제거
      	-->
          
      </div>
      <div>
          <h3>🚉 지하철 역 목록</h3>
      </div>
      ```

   2. `selectLine`: 구간을 수정할 노선을 선택할 때 실행되는 함수

   3. `getSelectedLineInfo`: 선택한 노선의 현재 상태를 가져오는 함수

   4. `addStationOrder`:

      1. 순서를 입력하지 않으면 0으로 취급
      2. 해당 순서에 이미 역이 존재하면 현재 입력된 역에 우선 순서를 붙이고, 해당 순서부터 기존에 존재하던 구간의 모든 순서는 +1
      3. 추가되는 역은 여러 노선에 추가될 수 있다. (환승역 개념)

   5. `deleteStationOrder`:
      1. 해당 순서의 역을 삭제한다.
      2. 삭제된 역의 뒷 순서에 있는 모든 역들의 순서는 -1

4. `지하철 노선도 출력` 버튼을 눌렀을 때

   1. n호선
      1. OO역
      2. XX역
   2. k호선
      1. UU역
      2. DD역

   이런 식으로 출력되게 만든다.