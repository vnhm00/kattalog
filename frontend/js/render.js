(function registerRenderers() {
  const app = window.Kattalog;

  app.getFilteredCenters = function getFilteredCenters() {
    if (app.state.selectedCounty === "all") {
      return app.state.centers;
    }

    return app.state.centers.filter(
      (center) => center.county === app.state.selectedCounty,
    );
  };

  app.renderCenterIcon = function renderCenterIcon(center) {
    if (center.logo) {
      return `<img src="${app.escapeAttribute(center.logo)}" alt="${app.escapeAttribute(center.name)} logo">`;
    }

    return "🏠";
  };

  app.renderCatPhoto = function renderCatPhoto(cat) {
    if (cat.img) {
      return `<img src="${app.escapeAttribute(cat.img)}" alt="${app.escapeAttribute(cat.name)}" loading="lazy">`;
    }

    return "🐱";
  };

  app.renderModalPhoto = function renderModalPhoto(cat) {
    if (cat.img) {
      return `<img src="${app.escapeAttribute(cat.img)}" alt="${app.escapeAttribute(cat.name)}">`;
    }

    return "🐱";
  };

  app.renderCountyOptions = function renderCountyOptions() {
    const counties = [...new Set(app.state.centers.map((center) => center.county))].sort();

    app.dom.$countyFilter.html(`
      <option value="all">All counties</option>
      ${counties
        .map(
          (county) =>
            `<option value="${app.escapeAttribute(county)}">${app.escapeHtml(county)}</option>`,
        )
        .join("")}
    `);

    app.dom.$countyFilter.val(app.state.selectedCounty);
  };

  app.renderCatCard = function renderCatCard(center, cat) {
    const statusClass = cat.statusKey
      ? ` cm-photo-status-${app.escapeAttribute(cat.statusKey)}`
      : "";

    return `
      <div class="cat-mini" data-center-id="${center.id}" data-cat-slug="${app.escapeAttribute(cat.slug)}">
        <div class="cat-mini-photo" style="background:${cat.grad}">
          ${app.renderCatPhoto(cat)}
          <span class="cm-photo-status${statusClass}">${app.escapeHtml(cat.status)}</span>
          <span class="cm-photo-tag">${app.escapeHtml(cat.age)} ${app.escapeHtml(cat.gender)}</span>
        </div>
        <div class="cat-mini-body">
          <div class="cm-header">
            <div class="cat-mini-name">${app.escapeHtml(cat.name)}</div>
            <div class="cm-trait">${app.escapeHtml(cat.trait)}</div>
          </div>
          <div class="cm-desc">${app.escapeHtml(cat.desc)}</div>
        </div>
      </div>
    `;
  };

  app.renderCenterCard = function renderCenterCard(center) {
    const collapsed = Boolean(app.state.collapseState[center.id]);
    const catsHtml = center.cats.map((cat) => app.renderCatCard(center, cat)).join("");
    const logoBackground = center.logo ? "white" : center.grad;
    const visitButton = center.websiteUrl
      ? `
          <a
            href="${app.escapeAttribute(center.websiteUrl)}"
            class="visit-btn"
            target="_blank"
            rel="noopener"
          >
            <svg width="10" height="10" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
              <polyline points="15 3 21 3 21 9"/>
              <line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
            Visit
          </a>
        `
      : "";

    return `
      <div class="center-card">
        <div class="center-head" data-center-id="${center.id}">
          <div class="center-icon" style="background:${logoBackground}">
            ${app.renderCenterIcon(center)}
          </div>
          <div class="center-info">
            <div class="center-name-row">
              <div class="center-name">${app.escapeHtml(center.name)}</div>
            </div>
            <div class="center-addr">${app.escapeHtml(center.addr)}</div>
          </div>
          <div class="center-actions">
            <span class="center-county-badge">${app.escapeHtml(center.county)}</span>
            <span class="center-cat-badge">${center.cats.length} cats</span>
            ${visitButton}
            <button
              class="collapse-btn ${collapsed ? "collapsed" : ""}"
              type="button"
              data-center-id="${center.id}"
              title="${collapsed ? "Show cats" : "Hide cats"}"
            >
              <svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </button>
          </div>
        </div>
        <div class="cats-shelf ${collapsed ? "collapsed" : ""}">
          <div class="cat-mini-grid">
            ${catsHtml}
          </div>
        </div>
      </div>
    `;
  };

  app.renderCenters = function renderCenters(list = app.getFilteredCenters()) {
    if (!list.length) {
      app.dom.$centersList.html(`
        <div class="no-results">
          <div class="icon">🔍</div>
          <p>no centers match this filter</p>
        </div>
      `);
      return;
    }

    list.forEach((center) => {
      if (app.state.collapseState[center.id] === undefined) {
        app.state.collapseState[center.id] = true;
      }
    });

    app.dom.$centersList.html(list.map((center) => app.renderCenterCard(center)).join(""));
  };

  app.updateTopbarStat = function updateTopbarStat() {
    const filteredCenters = app.getFilteredCenters();
    const totalCats = filteredCenters.reduce((sum, center) => sum + center.cats.length, 0);

    app.dom.$centerCount.text(filteredCenters.length);
    app.dom.$catCount.text(totalCats);
  };

  app.renderApp = function renderApp() {
    app.renderCountyOptions();
    app.updateTopbarStat();
    app.renderCenters();
  };

  app.showPage = function showPage() {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        app.dom.$pageCenters.addClass("visible");
      });
    });
  };

  app.renderErrorState = function renderErrorState() {
    app.dom.$centersList.html(`
      <div class="no-results">
        <div class="icon">⚠️</div>
        <p>failed to load centers</p>
      </div>
    `);
  };
})();
