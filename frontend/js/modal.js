(function registerModal() {
  const app = window.Kattalog;

  app.findCenter = function findCenter(centerId) {
    return app.state.centers.find((center) => center.id === centerId);
  };

  app.populateModal = function populateModal(center, cat) {
    app.state.modalCenter = center;
    app.state.modalCat = cat;
    const statusClass = cat.statusKey
      ? ` modal-chip-status-${app.escapeAttribute(cat.statusKey)}`
      : "";

    app.dom.$modalPhoto.css("background", cat.grad).html(app.renderModalPhoto(cat));
    app.dom.$modalName.text(cat.name);
    app.dom.$modalChips.html(`
      <span class="modal-chip-age">${app.escapeHtml(cat.age)} ${app.escapeHtml(cat.gender)}</span>
      <span class="modal-chip-trait">${app.escapeHtml(cat.trait)}</span>
      <span class="modal-chip-status${statusClass}">${app.escapeHtml(cat.status)}</span>
    `);
    app.dom.$modalDesc.text(cat.desc);
    app.dom.$modalCenterBlock.html(`
      <div class="modal-center-main">
        <div class="modal-center-icon" style="background:${center.logo ? "white" : center.grad}">
          ${app.renderCenterIcon(center)}
        </div>
        <div class="modal-center-info">
          <div class="modal-center-name">${app.escapeHtml(center.name)}</div>
          <div class="modal-center-addr">${app.escapeHtml(center.addr)}</div>
        </div>
      </div>
    `);

    app.dom.$modalActions.html(
      cat.url
      ? `
          <a class="modal-btn-primary" href="${app.escapeAttribute(cat.url)}" target="_blank" rel="noopener">
            View ${app.escapeHtml(cat.name)} on adoption center website
          </a>
        `
      : "",
    );
  };

  app.openModal = function openModal(centerId, catSlug) {
    const center = app.findCenter(centerId);

    if (!center) {
      return;
    }

    const cat = center.cats.find((item) => item.slug === catSlug);

    if (!cat) {
      return;
    }

    app.populateModal(center, cat);
    app.dom.$modalBg.addClass("open");
    app.dom.$body.css("overflow", "hidden");
  };

  app.closeModal = function closeModal() {
    app.dom.$modalBg.removeClass("open");
    app.dom.$body.css("overflow", "");
    app.state.modalCenter = null;
    app.state.modalCat = null;
  };
})();
