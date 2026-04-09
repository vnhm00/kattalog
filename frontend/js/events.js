(function registerEvents() {
  const app = window.Kattalog;

  app.handleCountyChange = function handleCountyChange(event) {
    app.state.selectedCounty = $(event.currentTarget).val();
    app.updateTopbarStat();
    app.renderCenters();
  };

  app.handleCentersListClick = function handleCentersListClick(event) {
    const $target = $(event.target);
    const collapseButton = $target.closest(".collapse-btn")[0];

    if (collapseButton) {
      app.toggleCenterCollapse(Number(collapseButton.dataset.centerId));
      return;
    }

    const catCard = $target.closest(".cat-mini")[0];

    if (catCard) {
      app.openModal(Number(catCard.dataset.centerId), catCard.dataset.catSlug);
      return;
    }

    const centerHead = $target.closest(".center-head")[0];

    if (centerHead && !$target.closest("a, button").length) {
      app.toggleCenterCollapse(Number(centerHead.dataset.centerId));
    }
  };

  app.toggleCenterCollapse = function toggleCenterCollapse(centerId) {
    app.state.collapseState[centerId] = !app.state.collapseState[centerId];
    app.renderCenters();
  };

  app.bindEvents = function bindEvents() {
    app.dom.$countyFilter.on("change", app.handleCountyChange);
    app.dom.$centersList.on("click", app.handleCentersListClick);
    app.dom.$modalClose.on("click", app.closeModal);
    app.dom.$modalBg.on("click", (event) => {
      if (event.target === app.dom.$modalBg[0]) {
        app.closeModal();
      }
    });
    app.dom.$document.on("keydown", (event) => {
      if (event.key === "Escape" && app.dom.$modalBg.hasClass("open")) {
        app.closeModal();
      }
    });
  };
})();
