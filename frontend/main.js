window.Kattalog = {
  config: {
    apiBaseUrl: "http://127.0.0.1:8000/api/centers/",
    gradients: [
      "linear-gradient(135deg, #fde8d5, #f5cdb0)",
      "linear-gradient(135deg, #d5f5e3, #b0e8c8)",
      "linear-gradient(135deg, #d5e8f5, #b0cce8)",
      "linear-gradient(135deg, #ecddf5, #d8b0e8)",
      "linear-gradient(135deg, #f5e8d5, #e8d0b0)",
      "linear-gradient(135deg, #d5f5f0, #b0e8e0)",
    ],
  },
  state: {
    centers: [],
    collapseState: {},
    modalCat: null,
    modalCenter: null,
    selectedCounty: "all",
  },
  dom: {},
};

window.Kattalog.cacheDom = function cacheDom() {
  const app = window.Kattalog;

  app.dom.$document = $(document);
  app.dom.$body = $(document.body);
  app.dom.$countyFilter = $("#county-filter");
  app.dom.$centerCount = $("#center-count");
  app.dom.$catCount = $("#cat-count");
  app.dom.$pageCenters = $("#page-centers");
  app.dom.$centersList = $("#centers-list");
  app.dom.$modalBg = $("#modal-bg");
  app.dom.$modalClose = $("#modal-close");
  app.dom.$modalPhoto = $("#modal-photo");
  app.dom.$modalName = $("#modal-name");
  app.dom.$modalChips = $("#modal-chips");
  app.dom.$modalDesc = $("#modal-desc");
  app.dom.$modalCenterBlock = $("#modal-center-block");
  app.dom.$modalActions = $("#modal-actions");
};

window.Kattalog.init = function init() {
  const app = window.Kattalog;

  app.cacheDom();
  app.bindEvents();
  app.loadCenters().catch((error) => {
    app.renderErrorState();
    console.error(error);
  });
};

$(window.Kattalog.init);
