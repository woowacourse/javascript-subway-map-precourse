const app = document.getElementById('app');
const nameInputArea = document.createElement('p');
const nameLabel = document.createElement('b');
nameLabel.innerHTML = '역 이름';

const nameInput = document.createElement('input');
nameInput.setAttribute('id', 'station-name-input');
nameInput.setAttribute('placeholder', '역 이름을 입력해주세요');

const nameSubmit = document.createElement('button');
nameSubmit.setAttribute('id', 'station-add-button');
nameSubmit.textContent = '역 추가';

nameInputArea.appendChild(nameLabel);
nameInputArea.appendChild(document.createElement('br'));
nameInputArea.appendChild(nameInput);
nameInputArea.appendChild(nameSubmit);

export const initStationManage = () => {
  app.appendChild(nameInputArea);

  nameInput.addEventListener('keypress', e => {
    let name = nameInput.value;
    if (e.key === 'Enter') {
      addStation(name);
    }
  });

  nameSubmit.addEventListener('click', () => {
    let name = nameInput.value;
    addStation(name);
  });
};

const addStation = name => {
  nameInput.value = '';
  console.log(name);
};
