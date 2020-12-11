export const APP = document.getElementById('app');
export const MANAGEMENT = document.getElementById('management-page');

export const MENU = {
    STATION: document.getElementById('station-manager-button'),
    LINE: document.getElementById('line-manager-button'),
    SECTION: document.getElementById('section-manager-button'),
    MAP_PRINT: document.getElementById('map-print-manager-button'),
};

export const PAGE = {
    STATION: 'station.html',
    LINE: 'line.html',
    SECTION:'section.html',
    MAP_PRINT: 'mapPrint.html',
}

export const STATION = {
    INPUT: document.getElementById('station-name-input'),
    ADD: document.getElementById('station-add-button'),
    DELETE: document.getElementsByClassName('station-delete-button'),
};

export const LINE = {
    INPUT: document.getElementById('line-name-input'),
    START: document.getElementById('line-start-station-selector'),
    END: document.getElementById('line-end-station-selector'),
    ADD: document.getElementById('line-add-button'),
    DELETE: document.getElementsByClassName('line-delete-button'),
};

export const SECTION = {
    SELECTION: document.getElementsByClassName('section-line-menu-button'),
    STATION: document.getElementById('section-station-selector'),
    ORDER: document.getElementById('section-order-input'),
    ADD: document.getElementsByTagName('section-add-button'),
    DELETE: document.getElementsByClassName('section-delete-button'),
};

// export const MAP_PRINT = {
//     MAP = document.getElementsByClassName('map'),
// };