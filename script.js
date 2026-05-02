const screens = Array.from(document.querySelectorAll(".screen"));
const navLinks = Array.from(document.querySelectorAll("[data-route]"));
const tabs = Array.from(document.querySelectorAll(".tab"));
const tabPanels = Array.from(document.querySelectorAll(".tab-panel"));

function showRoute(route) {
  const targetRoute = route || "dashboard";

  screens.forEach((screen) => {
    screen.classList.toggle("active", screen.id === targetRoute);
  });

  navLinks.forEach((link) => {
    link.classList.toggle("active", link.dataset.route === targetRoute);
  });

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function showTab(tabId) {
  tabs.forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.tab === tabId);
  });

  tabPanels.forEach((panel) => {
    panel.classList.toggle("active", panel.id === tabId);
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const route = link.dataset.route;
    history.pushState(null, "", `#${route}`);
    showRoute(route);
  });
});

tabs.forEach((tab) => {
  tab.addEventListener("click", () => showTab(tab.dataset.tab));
});

window.addEventListener("popstate", () => {
  showRoute(location.hash.replace("#", "") || "dashboard");
});

showRoute(location.hash.replace("#", "") || "dashboard");
