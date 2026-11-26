/* Website analytics only. No Google request until the visitor explicitly opts in. */
(() => {
  const id = document.querySelector('meta[name="ga-measurement-id"]')?.content;
  if (!/^G-[A-Z0-9]{4,20}$/.test(id || "")) return;
  const sitePath = document.currentScript?.dataset.sitePath || "/";
  const cookiePath = sitePath === "/" ? "/" : `${sitePath.replace(/\/$/, "")}/`;
  if (!location.pathname.startsWith(cookiePath)) return;
  const consentKey = `doti-web-analytics:${id}`;
  const cookiePrefix = "doti_web";
  const labels = {
    ko: ["방문 통계 설정", "홈페이지 방문 통계", "사이트 개선을 위한 방문 통계 수집을 허용할까요? 거절해도 모든 안내를 볼 수 있어요.", "수집 항목과 설정 안내", "허용하면 Google Analytics가 방문한 페이지, 유입 사이트, 기기·브라우저 등의 접속 정보와 Google Play 버튼 클릭을 처리합니다. 통계 쿠키는 최대 30일 사용하며 광고 맞춤설정에는 사용하지 않습니다. 앱의 개인 수행기록은 보내지 않습니다. 선택은 이 브라우저에 저장하며 하단에서 언제든 변경할 수 있습니다. 이미 수집한 통계는 동의 철회로 삭제되지 않습니다.", "Google의 데이터 이용 안내", "허용하지 않음", "통계 허용"],
    en: ["Visitor analytics settings", "Website visitor analytics", "Allow visitor analytics to improve this website? All guides remain available if you decline.", "Data and settings", "If allowed, Google Analytics processes pages visited, referring sites, device and browser information, and Google Play button clicks. Analytics cookies last up to 30 days and are not used for ad personalization. Private app activity records are not sent. Your choice is saved in this browser and can be changed in the footer. Withdrawing consent does not delete previously collected statistics.", "How Google uses data", "Decline", "Allow analytics"],
    ja: ["訪問統計の設定", "ウェブサイトの訪問統計", "サイト改善のため訪問統計を許可しますか？拒否してもすべての案内をご覧いただけます。", "データと設定について", "許可するとGoogle Analyticsが閲覧ページ、参照元サイト、端末・ブラウザ情報、Google Playボタンのクリックを処理します。統計Cookieは最長30日間使用し、広告のパーソナライズには利用しません。アプリ内の個人の実践記録は送信しません。このブラウザに選択を保存し、フッターから変更できます。同意の撤回で収集済みの統計は削除されません。", "Googleによるデータの利用", "許可しない", "統計を許可"],
    "zh-Hans": ["访问统计设置", "网站访问统计", "是否允许收集访问统计以改善网站？拒绝也能查看所有指南。", "数据与设置说明", "允许后，Google Analytics会处理浏览页面、来源网站、设备和浏览器信息及Google Play按钮点击。统计Cookie最多使用30天，不用于广告个性化。不会发送应用中的私人活动记录。选择保存在此浏览器中，可在页脚更改。撤回同意不会删除已收集的统计。", "Google如何使用数据", "不允许", "允许统计"],
    "zh-Hant": ["造訪統計設定", "網站造訪統計", "是否允許收集造訪統計以改善網站？拒絕也能查看所有指南。", "資料與設定說明", "允許後，Google Analytics會處理瀏覽頁面、來源網站、裝置和瀏覽器資訊及Google Play按鈕點擊。統計Cookie最多使用30天，不用於廣告個人化。不會傳送應用程式中的私人活動記錄。選擇儲存在此瀏覽器中，可在頁尾變更。撤回同意不會刪除已收集的統計。", "Google如何使用資料", "不允許", "允許統計"],
    es: ["Ajustes de estadísticas", "Estadísticas de visitas", "¿Permites estadísticas para mejorar este sitio? Puedes leer todas las guías aunque las rechaces.", "Datos y ajustes", "Con tu permiso, Google Analytics procesa páginas visitadas, sitios de origen, información del dispositivo y navegador, y clics en Google Play. Las cookies duran hasta 30 días y no se usan para personalizar anuncios. No se envían registros privados de la app. La elección se guarda en este navegador y se puede cambiar al pie de página. Retirar el permiso no elimina las estadísticas ya recogidas.", "Cómo usa Google los datos", "Rechazar", "Permitir estadísticas"],
    vi: ["Cài đặt thống kê", "Thống kê lượt truy cập", "Cho phép thống kê để cải thiện trang web? Bạn vẫn đọc được mọi hướng dẫn nếu từ chối.", "Dữ liệu và cài đặt", "Nếu cho phép, Google Analytics xử lý trang đã xem, trang giới thiệu, thông tin thiết bị và trình duyệt, cùng lượt nhấp Google Play. Cookie thống kê dùng tối đa 30 ngày, không dùng để cá nhân hóa quảng cáo. Không gửi bản ghi hoạt động riêng tư trong ứng dụng. Lựa chọn lưu trong trình duyệt này và có thể đổi ở chân trang. Rút lại sự đồng ý không xóa thống kê đã thu thập.", "Cách Google sử dụng dữ liệu", "Từ chối", "Cho phép thống kê"],
  };
  const t = labels[document.documentElement.lang] || labels.en;
  const readChoice = () => {
    try {
      const value = JSON.parse(localStorage.getItem(consentKey));
      return value && ["granted", "denied"].includes(value.choice) &&
        typeof value.savedAt === "number" && Date.now() - value.savedAt < 180 * 86400000 ? value.choice : null;
    } catch { return null; }
  };
  let choice = readChoice(), loaded = false;
  const cleanReferrer = () => {
    try { return document.referrer ? new URL(document.referrer).origin + "/" : ""; }
    catch { return ""; }
  };
  function start() {
    if (choice !== "granted" || loaded) return;
    loaded = true;
    window[`ga-disable-${id}`] = false;
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
    window.gtag("consent", "default", { analytics_storage: "granted", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" });
    window.gtag("js", new Date());
    window.gtag("config", id, { send_page_view: false, allow_google_signals: false,
      allow_ad_personalization_signals: false, cookie_domain: "none", cookie_path: cookiePath,
      cookie_prefix: cookiePrefix, cookie_expires: 30 * 86400, cookie_update: false,
      page_location: location.origin + location.pathname, page_referrer: cleanReferrer() });
    window.gtag("event", "page_view", { page_location: location.origin + location.pathname,
      page_referrer: cleanReferrer(), page_title: document.title });
    const tag = document.createElement("script");
    tag.async = true;
    tag.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
    document.head.append(tag);
  }
  function stop() {
    window[`ga-disable-${id}`] = true;
    for (const cookie of document.cookie.split(";")) {
      const name = cookie.split("=")[0].trim();
      if (name.startsWith(cookiePrefix + "_"))
        document.cookie = `${name}=; Max-Age=0; Path=${cookiePath}; SameSite=Lax`;
    }
    // Unload an already running Google tag too; the saved refusal survives this reload.
    if (loaded) location.reload();
  }
  const settings = document.createElement("button");
  settings.type = "button";
  settings.className = "analytics-settings";
  settings.textContent = t[0];
  settings.setAttribute("aria-controls", "analytics-notice");
  document.querySelector(".footer-bottom")?.append(settings);
  const notice = document.createElement("section");
  notice.id = "analytics-notice";
  notice.className = "analytics-notice";
  notice.setAttribute("aria-label", t[1]);
  notice.innerHTML = `<strong></strong><p></p><details><summary></summary><p></p><a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer"></a></details><div class="analytics-actions"><button type="button" data-choice="denied"></button><button type="button" data-choice="granted"></button></div>`;
  notice.querySelector("strong").textContent = t[1];
  notice.querySelector(":scope > p").textContent = t[2];
  notice.querySelector("summary").textContent = t[3];
  notice.querySelector("details p").textContent = t[4];
  notice.querySelector("a").textContent = t[5];
  notice.querySelector('[data-choice="denied"]').textContent = t[6];
  notice.querySelector('[data-choice="granted"]').textContent = t[7];
  document.body.append(notice);
  function show(visible) {
    notice.hidden = !visible;
    document.body.classList.toggle("analytics-notice-open", visible);
    settings.setAttribute("aria-expanded", String(visible));
    resize();
  }
  function resize() { document.body.style.setProperty("--analytics-space", `${notice.hidden ? 0 : notice.offsetHeight + 24}px`); }
  if (window.ResizeObserver) new ResizeObserver(resize).observe(notice);
  settings.addEventListener("click", () => { show(true); notice.querySelector("button").focus(); });
  function setChoice(value, persist = true) {
    choice = value;
    if (persist) try { localStorage.setItem(consentKey, JSON.stringify({ choice, savedAt: Date.now() })); } catch { /* This page still respects the choice. */ }
    show(false);
    if (choice === "granted") start(); else stop();
  }
  notice.querySelectorAll("[data-choice]").forEach(button => button.addEventListener("click", () => setChoice(button.dataset.choice)));
  window.addEventListener("storage", event => {
    if (event.key !== consentKey) return;
    const value = readChoice();
    if (value) setChoice(value, false);
    else { choice = null; show(true); stop(); }
  });
  document.addEventListener("click", event => {
    if (choice !== "granted" || !loaded) return;
    const anchor = event.target instanceof Element ? event.target.closest("a[href]") : null;
    if (!anchor) return;
    const url = new URL(anchor.href);
    if (url.hostname === "play.google.com" && url.pathname === "/store/apps/details")
      window.gtag("event", "play_store_click", { app_id: url.searchParams.get("id") || "", transport_type: "beacon" });
  });
  show(choice === null);
  start();
})();
