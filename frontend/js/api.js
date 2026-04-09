(function registerApi() {
  const app = window.Kattalog;

  app.loadCenters = async function loadCenters() {
    const data = await $.ajax({
      url: app.config.apiBaseUrl,
      method: "GET",
      dataType: "json",
    });
    const centers = Array.isArray(data.centers) ? data.centers : [];

    app.state.centers = centers.map((center) => app.mapCenter(center));

    app.state.centers.forEach((center) => {
      if (app.state.collapseState[center.id] === undefined) {
        app.state.collapseState[center.id] = true;
      }
    });

    if (
      app.state.selectedCounty !== "all" &&
      !app.state.centers.some((center) => center.county === app.state.selectedCounty)
    ) {
      app.state.selectedCounty = "all";
    }

    app.renderApp();
    app.showPage();
  };
})();
