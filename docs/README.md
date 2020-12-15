## 📝 구현할 기능 목록

### 🗂 공통

- [X] 메뉴 버튼을 구현해야 한다.
  - 역 관리 button 태그 : ```#station-manager-button```
  - 노선 관리 button 태그 : ```#line-manager-button```
  - 구관 관리 button 태그 : ```#section-manager-button```
  - 지하철 노선도 출력 관리 button 태그 : ```#map-print-manager-button```
- [X] 메뉴 버튼 클릭시 클릭된 버튼에 맞는 화면을 보여줘야 한다.

### 🚋 지하철 역 관리

- [X] 지하철 역 관리에 필요한 요소들이 사용자에게 보이도록 구현해야 한다. 
  - 지하철 역을 입력하는 input 태그 : ```#station-name-input```
  - 지하철 역을 추가하는 button 태그 : ```#station-add-button```
  - 지하철 역을 삭제하는 button 태그 : ```.station-delete-button```
- [X] input 창에 값을 입력하고 '역 추가' 버튼 클릭을 통해 새로운 역을 추가할 수 있어야 한다.
  - 입력받은 역은 특정 템플릿을 가진 채로 localStorage에 저장한다.
- [X] 새로 입력받은 역 이름이 올바른지 검증해야 한다.
  - 이름은 2글자 이상이어야 한다.
  - 중복된 지하철 역 이름은 등록할 수 없다.
  - 공백으로 구성된 이름은 등록할 수 없다. ex) '    '
  - 올바르지 않은 역 이름을 입력받았을 경우 ```alert```를 통해 사용자에게 알려줘야 한다.
- [X] ```localStorage```에 저장 된 역 목록을 리스트 형태로 보여줘야 한다.
- [X] 지하철 역 목록의 '삭제'버튼을 통해 등록된 역을 삭제할 수 있어야 한다.
- [X] 사용자가 '삭제'버튼을 눌렀을 때 해당 역을 삭제할 수 있는지 확인해야 한다.
  - 노선에 등록된 역은 삭제할 수 없다.


### 🛤 지하철 노선 관리

- [X] 지하철 노선 관리에 필요한 요소들이 사용자에게 보이도록 구현해야 한다.
  - 노선의 이름을 입력하는 input 태그 : ```#line-name-input```
  - 노선의 상행 종점을 선택하는 slect 태그 : ```#line-start-station-selector```
  - 노선의 하행 종점을 선택하는 slect 태그 : ```#line-end-station-selector```
  - 노선을 추가하는 button 태그 : ```#line-add-button```
  - 노선을 삭제하는 input 태그 : ```.line-delete-button```
- [X] 상행 종점, 하행 종점을 선택하는 select태그에 option태그로 현재 역 목록을 보여줘야 한다.
- [X] ```localStorange```에 저장된 지하철 노선 목록을 보여줘야 한다.
- [X] '노선 추가' 버튼 클릭을 통해 새로운 노선을 추가할 수 있어야 한다.
  - 추가한 값은 특정 템플릿을 가진 채로 ```localStorage```에 저장한다.
- [X] 노선 이름과 상행, 하행 종점 선택이 올바른지 검증해야 한다.
  - 이름은 1글자 이상이어야 한다.
  - 중복된 이름은 등록할 수 없다.
  - 공백으로 구성된 이름은 등록할 수 없다. ex) '     '
  - 상행 종점과 하행 종점은 다른 역을 선택해야 한다.  
- [X] 노선 목록에서 '삭제' 버튼을 통해 등록 된 노선을 제거할 수 있어야 한다.

### 🚉 지하철 구간 관리

- [X] 지하철 구간 관리에 필요한 요소들이 사용자에게 보이도록 구현해야 한다.
  - 관리할 노선을 선택하는 button 태그 : ```.section-line-menu-button```
  - 구간에 새로 등록할 역을 선택하는 select. 태그. : ```#section-station-selector```
  - 구간의 순서를 입력하는 input 태그 : ```#section-order-input```
  - 구간을 등록하는 button 태그 : ```#section-add-button```
  - 구간을 제거하는 button 태그 : ```.section-delete-button```
- [X] 현재 존재하는 노선 목록을 버튼으로 선택할 수 있게 보여줘야 한다.
- [X] 관리할 노선을 선택했을 때 해당 노선에 대한 정보가 보여야 한다.
- [X] 등록 버튼을 클릭했을 때 해당 순서에 선택한 역이 추가되어야 한다.
- [X] 선택한 역 이름이 올바른지 검증해야 한다.
  - 기존 노선에 존재하는 값은 등록할 수 없다.(중복 등록 안 됨)
- [X] 선택한 순서가 올바른지 검증해야 한다.
  - 음수는 입력받을 수 없다.
  - 순서에 존재하는 범위를 벗어나는 경우 입력을 받을 수 없다.
- [X] 노선에서 제거 버튼을 통해 노선 안에 있는 구간을 삭제할 수 있어야 한다.
- [X] 삭제가 가능한지 검증해야 한다.
  - 삭제 후에 노선에 남게 되는 구간 수가 2개 미만이라면 삭제할 수 없다.

### 🗺 지하철 노선도 출력

- [X] 지하철 노선도 출력 버튼 클릭시 현재 등록된 지하철 노선을 사용자에게 보여줘야 한다.
  - 노선이 등록되지 않은 경우 사용자에게 현재 등록된 노선이 없음을 알려준다.

## 🗂 디렉토리 구조

```plaintext
├── LICENSE
├── README.md
├── package.json
├── package-lock.json
├── .gitignore
├── .prettierrc
├── .eslintrc.json
├── index.html 
├── images
│   ├── result.gif
│   └── result.jpg
├── docs
│   └── README.md // 구현할 기능 목록, 디렉토리 구조를 적은 markdown 문서
└── src
    ├── index.js // 지하철 노선도 관리 기능을 호출하는 메인 모듈
    ├── render // 화면을 보여주는 기능을 하는 모듈을 모아놓은 폴더
    │   ├── render.js // 화면을 구성하는데 필요한 모듈들을 한번에 호출하는 모듈
    │   ├── common 
    │   │   └── selectMenuButtonEvent.js // 메뉴버튼을 보여주는 모듈
    │   ├── station
    │   │   └── renderStationList.js // 역 목록을 보여주는 모듈
    │   ├── line
    │   │   └── renderLineList.js // 노선 목록을 보여주는 모듈
    │   ├── section
    │   │   ├── renderLineSelect.js // 관리할 노선 선택 버튼을 보여주는 모듈
    │   │   └── renderSectionContainer.js // 노선의 구간을 보여주는 모듈
    │   └── subway-map
    │       └── renderSubwayMap.js // 지하철 노선도를 보여주는 모듈
    └── controller // 노선도 관리에 필요한 기능들을 제어하는 모듈을 모아놓은 폴더
        ├── initEvent.js // 제어하는데 필요한 이벤트들을 등록해주는 모듈
        ├── common 
        │   └── selectMenuButtonEvent.js // 메뉴버튼 클릭을 통해 화면을 보여주는 모듈
        ├── station
        │   ├── addStationEvent.js // 역을 추가해주는 모듈
        │   └── removeStationEvent.js // 역을 제거해주는 모듈
        ├── line
        │   ├── addLineEvent.js // 노선을 추가해주는 모듈
        │   └── removeLineEvent.js // 노선을 제거해주는 모듈
        └── section
            ├── selectLineButtonEvent.js // 관리할 노선을 선택할 수 있게 해주는 모듈
            ├── updateSectionList.js // 구간 추가, 삭제시에 구간 목록을 업데이트 해주는 모듈  
            ├── addSectionEvent.js  // 구간을 추가해주는 모듈
            └── removeSectionEvent.js // 구간을 삭제해주는 모듈
    
```
