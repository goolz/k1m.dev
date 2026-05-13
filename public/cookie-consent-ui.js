/**
 * Cookie consent UI: dialog, persistence, Consent Mode updates, dataLayer event.
 */
(function () {
  function onReady(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn);
    } else {
      fn();
    }
  }

  onReady(function () {
    var KEY = window.__k1mCookieConsentStorageKey || "k1m_cookie_consent_v1";
    var dialog = document.getElementById("cookie-consent-dialog");
    var acceptBtn = document.getElementById("cookie-consent-accept");
    var declineBtn = document.getElementById("cookie-consent-decline");

    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    window.gtag = window.gtag || gtag;

    function store(val) {
      try {
        localStorage.setItem(KEY, val);
      } catch (e) {}
    }

    function pushChoice(val) {
      window.dataLayer.push({
        event: "cookie_consent_update",
        k1m_cookie_consent: val
      });
    }

    function consentUpdate(granted) {
      gtag("consent", "update", {
        ad_storage: granted ? "granted" : "denied",
        analytics_storage: granted ? "granted" : "denied",
        ad_user_data: granted ? "granted" : "denied",
        ad_personalization: granted ? "granted" : "denied",
        personalization_storage: granted ? "granted" : "denied"
      });
    }

    function closeDialog() {
      if (dialog && dialog.open) {
        dialog.close();
      }
    }

    if (acceptBtn) {
      acceptBtn.addEventListener("click", function () {
        store("accepted");
        consentUpdate(true);
        pushChoice("accepted");
        window.__k1mCookieConsentNeedsBanner = false;
        closeDialog();
      });
    }

    if (declineBtn) {
      declineBtn.addEventListener("click", function () {
        store("declined");
        consentUpdate(false);
        pushChoice("declined");
        window.__k1mCookieConsentNeedsBanner = false;
        closeDialog();
      });
    }

    if (dialog) {
      dialog.addEventListener("cancel", function (e) {
        e.preventDefault();
      });
    }

    var needs = true;
    try {
      var v = localStorage.getItem(KEY);
      needs = v !== "accepted" && v !== "declined";
    } catch (e2) {
      needs = true;
    }

    if (needs && dialog && typeof dialog.showModal === "function") {
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          try {
            dialog.showModal();
          } catch (e3) {}
        });
      });
    }
  });
})();
