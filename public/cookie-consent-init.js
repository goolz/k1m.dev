/**
 * Cookie consent + Google Consent Mode v2 defaults (k1m.dev).
 * Must load synchronously in <head> before GTM / gtag.
 */
(function () {
  var STORAGE_KEY_NEW = "k1m_cookie_consent_v1";
  var STORAGE_KEY_LEGACY = "k1m_home_cookie_consent_v1";

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = window.gtag || gtag;

  var stored = null;
  try {
    stored = localStorage.getItem(STORAGE_KEY_NEW);
    if (!stored) {
      var leg = localStorage.getItem(STORAGE_KEY_LEGACY);
      if (leg === "accepted" || leg === "declined") {
        stored = leg;
        localStorage.setItem(STORAGE_KEY_NEW, leg);
      }
    }
  } catch (e) {}

  var accepted = stored === "accepted";
  var decided = stored === "accepted" || stored === "declined";

  var defaults = {
    ad_storage: accepted ? "granted" : "denied",
    analytics_storage: accepted ? "granted" : "denied",
    ad_user_data: accepted ? "granted" : "denied",
    ad_personalization: accepted ? "granted" : "denied",
    personalization_storage: accepted ? "granted" : "denied",
    functionality_storage: "granted",
    security_storage: "granted",
    wait_for_update: decided ? 0 : 500
  };

  gtag("consent", "default", defaults);

  if (!accepted) {
    gtag("set", "ads_data_redaction", true);
    gtag("set", "url_passthrough", true);
  }

  window.__k1mCookieConsentStorageKey = STORAGE_KEY_NEW;
  window.__k1mCookieConsentNeedsBanner = !decided;

  window.__k1mDeferAppointmentAutoOpen = function () {
    var el = document.getElementById("cookie-consent-dialog");
    return !!(el && el.open);
  };
})();
