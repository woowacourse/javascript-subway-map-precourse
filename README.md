# 우테코 프리코스 3주차 미션 by Seongwon Kim
[실행해보기] (https://loquemedalagana.github.io/javascript-subway-map-precourse/)

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