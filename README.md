# 우테코 프리코스 3주차 미션 by Seongwon Kim

## 구현할 목록 정리
- 0. html div구역 분리 설정
    

- 1. 역 관리 
    - 1. 역 이름 등록 input 이벤트 생성
    - 2. 역 목록 출력(table) 및 삭제 기능 구현 + 삭제 전 alert message

- 2. 노선 관리
    - 1. 노선 이름 입력 input 이벤트 생성
    - 2. 상행 종점, 하행 종점 선택 form
    - 3. 노선 추가 버튼 이벤트
    - 4. 노선 목록 출력(table) 및 삭제 기능 구현 + 삭제 전 alert message

- 3. 구간 관리
    - 1. 구간을 수정할 노선 선택 input 및 X호선 관리라고 출력되게 하기
    - 2. 구간 등록 폼 (왼쪽 역 이름 중 선택, 오른쪽 상수 입력 폼)
    - 3. 설정(노선에서 제거) 버튼 생성
    
- 4. 지하철 노선도 출력


#### 마지막에 실행 파일 만들기(지난 미션처럼 깃헙 페이지 생성)

## 요구 사항
1. localstorage 개념 이용 (새로고침 하더라도 데이터가 남아있도록)
2. UI 라이브러리(view)랑 비즈니스 로직(store??)를 분류한다. (reducer 직접 구현?)

## 지난주에 잘 한것(피드백 바탕)
1. 상수 활용
2. JS 내장 메소드 활용

## 지난주에 잘 못한 것(피드백 바탕)
1. boolean을 리턴할 경우 간결하게 한다.
2. 멤버변수를 최소화하라 (중복된거 최대한 줄이기)
3. 비즈니스 로직과 UI로직 분리는 지난주엔 잘 했으나, 변수/메소드명이 명확하지 못했다.
4. 주석은 왠만하면 함수 밖 혹은 코드 우측에 추가하라. (왠만하면 하지 말자)
5. 커밋 메시지에 번호 추가하지 마라.

## 새롭게 배운 것
1. innerHTML과 outerHTML의 차이 (outerHTML은 html object를 string으로 파싱할 때 사용)

## 참고
[내가 정리한 객체를 배열로 변환하는 메소드](https://blog.naver.com/kodewithamy/222139550359)
[역, 노선, 구간의 유일한 데이터 값들을 data속성으로 관리](https://developer.mozilla.org/ko/docs/Learn/HTML/Howto/%EB%8D%B0%EC%9D%B4%ED%84%B0_%EC%86%8D%EC%84%B1_%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0)
[localstorage 객체 사용](https://developer.mozilla.org/ko/docs/Web/API/Window/localStorage)

## 개발 과정

### day 1
1. 디렉토리 구조 설계
  - 데이터 모델링은 models, **인풋/삭제 유효성 체크는 controllers**, 공통 변수는 common
  - ui는 views, 그리고 user 인풋 처리는 action / 데이터 저장은 reducer에서 함

### day 2
1. UI 로직 구현 part 1 => 매뉴 버튼 생성
  - [참고, insert adjacent html](https://developer.mozilla.org/ko/docs/Web/API/Element/insertAdjacentHTML)

2. document.createElement를 변수로 저장할 때 조심하자
3. 매뉴에 해당하는 tab부터 렌더링하는 이벤트 완료
  - 컴포넌트 클래스 생성자 사용, add event listener기능을 클래스 내장함수로 사용
  - 콜백 함수는 action폴더에 따로 분류

- 저번에 기능 목록 구현을 지나치게 상세하게 썼는데 이번엔 간략화해서 기능별로 정리함
- 이번 미션은, UI로직과 비즈니스 로직 확실하게 구분하는데 목표를 둠
- 이제 UI로직까지는 대략적으로 짰으므로, 이제 비즈니스 로직(데이터 모델링, user action, store등)에 신경쓰면 됨.

### day 3
1. 인풋을 위한 view 재검토하기
  - 주의사항 innerHTML은 함수가 아니라 안에 string을 대입하는 것이다.

2. 생각보다 UI로직에서 시간이 많이 걸렸다. 이것만 하는데 이틀은 쓴거같다ㅠ
  - 그 이유는 이벤트 리스너 등록 과정에서 비동기 처리 때문.. 이 아니었다 중요한 것은...

3. 일단 input 성공적으로 되는 것까지는 확인했다.
  - 가상 돔을 직접 만들 시, 템플릿 리터럴로 html을 삽입하는 방법이랑 dom 조작함수를 이용하는 방법 두 가지가 있는데,
  - 하나로 쓸거면 하나로 쭉 밀고나가는게 좋다.
  - 리액트에 익숙한 관계로 둘 다 짬뽕하다가 로직이 꼬여서 시간을 많이 썼다ㅠㅠ

4. 이제 인풋 유효성 검사랑 로컬 스토리지 데이터 모델링 하자!

### day 4
[dataset 사용법](https://javascript.info/dom-attributes-and-properties#non-standard-attributes-dataset)

1. input 유효성 체크 시, 결과를 리턴하는 클래스 선언 후 promise 리턴. 성공하면 resolve 후 다음 순서(스토리지 저장 진행),
실패 시 오류 메시지 alert창에 출력
   
2. 데이터 모델은, 우선 역 명은 그냥 string배열로 저장하는게 더 간결해 보여서 삭제함.

3. 로컬 스토리지에서 데이터를 가져올 때는 selector, 업데이트된 데이터를 로컬 스토리지에 저장할 땐 reducer 함수 사용

4. css를 로딩 후 js파일에서 렌더링하게 구현

5. 데이터 모델링은 생각보다 단순했지만 요구사항에 맞게 구현하는게 많이 까다롭다 흑

6. 구현하면서 모듈화...! 또 모듈화!!
  - tab(매뉴) 데이터 출력하는 컴포넌트 내에 새로운 열 추가하는 메소드 [역이름, 삭제버튼], [노선이름, 기점, 종점, 삭제버튼] etc
    - 재사용성을 위해 2차원 배열로 리턴이 된다. 그래서 삽입 시에는 구조분해할당으로 첫 원소만 따내서 삽입
  - table 컴포넌트 폴더 내에 위에서 뽑아온 데이터 1열을 tr 코드로 변환시켜준다.

7. [경고 메시지??](https://stackoverflow.com/questions/51094117/dependency-cycle-detected-import-no-cycle)

8. **삭제 과정에서 오류 발견** -> 인덱싱 잘못함. 삭제 함수에서 그냥 삭제할 인덱스를 직접 정하자!
  - 삭제 후 상태 업데이트가 안됨 (로컬에서는 삭제됐으나...)
  - 원인은 기존 로컬 스토리지 값을 정적인 변수에 저장하느냐, 아니면 함수를 호출해서 그때그때 갱신하느냐...
  - `export const stationSelector = JSON.parse(localStorage.getItem(STATION_STORAGE_NAME));` -> 
    `export const stationSelector = () => JSON.parse(localStorage.getItem(STATION_STORAGE_NAME));` 로 변경

9. 일단 역 이름은 구현 완료... 일단 가장 크게 배운건 input 유효성 체크할 때 보다 깔끔하게 유지보수 편하게끔 짜는 것!


### day 5

1. 어제 삽질하면서 배운 내용을 살짝 응용해서 다른 부분은 비교적 수월하게 해보자.
2. 콜백이 여러번 발생한다는 것 염두하자. 모델링만 조금 신경써주면 될 듯.
3. 단, 유효성 체크는 조금 더 꼼꼼하게!