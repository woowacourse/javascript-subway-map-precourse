const words = {
	// 역 관리
	STATION: 'Stations',
	STATION_NAME: '역 이름',
	STATION_NAME_PLACEHOLDER: '역 이름을 입력해주세요.',
	STATION_ADD_BUTTON: '역 추가',
	STATION_TABLE_TITLE: '🚉 지하철 역 목록',
	STATION_TABLE_COLUMNS: ['역 이름', '설정'],

	STATION_DELETE_BUTTON: '삭제',

	STATION_MANAGER_BUTTON_ID: 'station-manager-button',
	STATION_NAME_INPUT_ID: 'station-name-input',
	STATION_ADD_BUTTON_ID: 'station-add-button',

	STATION_DELETE_CLASS: 'station-delete-button',

	// 노선 관리
	LINE: 'Lines',
	LINE_NAME: '노선 이름',
	LINE_PLACEHOLDER: '노선 이름을 입력해주세요.',
	LINE_START_POINT: '상행 종점',
	LINE_END_POINT: '하행 종점',
	LINE_ADD_BUTTON: '노선 추가',
	LINE_TABLE_TITLE: '🚉 지하철 노선 목록',
	LINE_TABLE_COLUMNS: [
		'노선 이름',
		'상행 종점역',
		'하행 종점역',
		'설정',
	],

	LINE_DELETE_BUTTON: '삭제',

	LINE_MANGER_BUTTON_ID: 'line-manager-button',
	LINE_NAME_INPUT_ID: 'line-name-input',
	LINE_START_STATION_SELECTOR_ID: 'line-start-station-selector',
	LINE_END_STATION_SELECTOR_ID: 'line-end-station-selector',
	LINE_ADD_BUTTON_ID: 'line-add-button',

	LINE_DELETE_BUTTON_CLASS: 'line-delete-button',

	// 구간 관리
	SECTION_TITLE: '구간을 설정할 노선을 선택해주세요.',
	SECTION_HANDLE_TEXT: '관리',
	SECTION_REGISTER_TEXT: '구간 등록',
	SECTION_PLACEHOLDER: '순서',
	SECTION_ADD_BUTTON: '등록',
	SECTION_TABLE_COLUMNS: [
		'순서',
		'이름',
		'설정',
    ],
    SECTION_DELETE_FOR_STATION: '노선에서 제거',

	SECTION_MANAGER_BUTTON_ID: 'section-manager-button',
	SECTION_STATION_SELECTOR_ID: 'section-station-selector',
	SECTION_ORDER_INPUT_ID: 'section-order-input',
	SECTION_ADD_BUTTON_ID: 'section-add-button',

	SECTION_LINE_MENU_BUTTON_CLASS: 'section-line-menu-button',
	SECTION_DELETE_BUTTON_CLASS: 'section-delete-button',

	// 지하철 노선도
	MAP_CONTAINER_CLASS: 'map',
	MAP_PRINT_MANAGER_BUTTON_ID: 'map-print-manager-button',
};

export default words;
