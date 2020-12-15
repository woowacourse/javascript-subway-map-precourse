export default function reRenderPage(app, page) {
  page.create();
  page.afterCreate();
  app.innerHTML = page.render();
  page.mount();
}
