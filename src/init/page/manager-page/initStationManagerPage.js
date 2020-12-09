// eslint-disable-next-line max-lines-per-function
function stationManagerPage() {
  return `<div class="station-manager-page" hidden>
            <div>
              역 이름
              <div class="station-input-container">
                <input
                  id="station-name-input"
                  placeholder="역 이름을 입력해주세요."
                />
                <button id="station-add-button">역 추가</button>
              </div>
            </div>
            <h3>🚉 지하철 역 목록</h3>
            <table border="1">
              <tr>
                <th>역 이름</th>
                <th>설정</th>
              </tr>
            </table>
          </div>`;
}

export default function initStationManagerPage() {
  const $managementContainer = document.querySelector('.manager-container');

  $managementContainer.insertAdjacentHTML('beforeend', stationManagerPage());
}
