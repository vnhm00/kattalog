(function registerUtils() {
  const app = window.Kattalog;

  app.escapeHtml = function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, (character) => {
      const htmlEntities = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      };

      return htmlEntities[character];
    });
  };

  app.escapeAttribute = function escapeAttribute(value) {
    return app.escapeHtml(value);
  };

  app.gradientForSeed = function gradientForSeed(seed) {
    let hash = 0;

    for (const char of seed) {
      hash = (hash << 5) - hash + char.charCodeAt(0);
      hash |= 0;
    }

    return app.config.gradients[Math.abs(hash) % app.config.gradients.length];
  };

  app.formatAge = function formatAge(dateString) {
    if (!dateString) {
      return "Age unknown";
    }

    const birthDate = new Date(dateString);

    if (Number.isNaN(birthDate.getTime())) {
      return "Age unknown";
    }

    const now = new Date();
    let months =
      (now.getFullYear() - birthDate.getFullYear()) * 12 +
      (now.getMonth() - birthDate.getMonth());

    if (now.getDate() < birthDate.getDate()) {
      months -= 1;
    }

    if (months < 0) {
      months = 0;
    }

    if (months < 12) {
      return `${months}M`;
    }

    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;

    if (remainingMonths === 0) {
      return `${years}Y`;
    }

    return `${years}Y ${remainingMonths}M`;
  };

  app.formatGender = function formatGender(sex) {
    if (sex === "male") {
      return "♂";
    }

    if (sex === "female") {
      return "♀";
    }

    return "?";
  };

  app.formatStatus = function formatStatus(status) {
    if (!status) {
      return "Unknown";
    }

    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  app.formatTrait = function formatTrait(trait) {
    return trait || "Looking for a home";
  };

  app.formatDescription = function formatDescription(description) {
    return description || "No description yet.";
  };

  app.firstImage = function firstImage(imageUrls) {
    return imageUrls && imageUrls.length > 0 ? imageUrls[0] : "";
  };
})();
