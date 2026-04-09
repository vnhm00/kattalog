(function registerMappers() {
  const app = window.Kattalog;

  app.mapCat = function mapCat(cat, center) {
    return {
      id: cat.id,
      slug: cat.slug,
      name: cat.name,
      age: app.formatAge(cat.estimated_birth_date),
      gender: app.formatGender(cat.sex),
      trait: app.formatTrait(cat.trait),
      desc: app.formatDescription(cat.description),
      grad: app.gradientForSeed(cat.slug),
      url: cat.source_url,
      img: app.firstImage(cat.image_urls),
      statusKey: cat.adoption_status || "",
      status: app.formatStatus(cat.adoption_status),
      centerId: center.id,
      center: center.name,
      centerAddr: center.addr,
      centerLogo: center.logo,
      centerGrad: center.grad,
      county: center.county,
    };
  };

  app.mapCenter = function mapCenter(center) {
    const mappedCenter = {
      id: center.id,
      websiteUrl: center.website_url,
      slug: center.slug,
      name: center.name,
      county: center.county,
      addr: center.address,
      logo: center.logo_url || "",
      grad: app.gradientForSeed(center.slug),
      cats: [],
    };

    mappedCenter.cats = center.cats.map((cat) => app.mapCat(cat, mappedCenter));
    return mappedCenter;
  };
})();
