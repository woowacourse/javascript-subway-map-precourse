export default class EventHandler {
  handleClickEvent(targetId, onEventFunc) {
    const target = document.querySelector(`#${targetId}`);

    target.addEventListener('click', onEventFunc);
  }
}
