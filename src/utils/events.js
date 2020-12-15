export { dispatchReRender, RE_RENDER_EVENT, reRenderEvent };

const RE_RENDER_EVENT = "customRender";
const reRenderEvent = new CustomEvent(RE_RENDER_EVENT);
const dispatchReRender = () => window.dispatchEvent(reRenderEvent);
