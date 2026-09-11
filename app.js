/**
 * 바로서치 (BaroSearch) - 1초 만에 완성하는 통합 멀티 검색
 * JavaScript Application Core Logic
 */

const APP_VERSION = 'v2.4.0';

// Initial Default Search Sites Presets Database
const DEFAULT_PRESET_SITES = [
  // 🛍️ Shopping (쇼핑)
  { id: 'coupang', category: 'shopping', name: '쿠팡', url: 'https://www.coupang.com/np/search?q={query}', isDefault: true },
  { id: 'naver_shopping', category: 'shopping', name: '네이버 쇼핑', url: 'https://search.shopping.naver.com/search/all?query={query}', isDefault: true },
  { id: 'elevenst', category: 'shopping', name: '11번가', url: 'https://search.11st.co.kr/Search.tmall?kwd={query}', isDefault: true },
  { id: 'aliexpress', category: 'shopping', name: '알리익스프레스', url: 'https://ko.aliexpress.com/wholesale?SearchText={query}', isDefault: true },
  { id: 'danawa', category: 'shopping', name: '다나와 (가격비교)', url: 'https://search.danawa.com/dsearch.php?query={query}', isDefault: true },
  { id: 'karrot', category: 'shopping', name: '당근 (당근마켓)', url: 'https://www.daangn.com/search/{query}', isDefault: true },
  { id: 'bunjang', category: 'shopping', name: '번개장터', url: 'https://m.bunjang.co.kr/search/products?q={query}', isDefault: true },
  { id: 'gmarket', category: 'shopping', name: 'G마켓', url: 'https://browse.gmarket.co.kr/search?keyword={query}', isDefault: true },

  // 📰 News & Media (뉴스/속보)
  { id: 'naver_news', category: 'news', name: '네이버 뉴스', url: 'https://search.naver.com/search.naver?where=news&query={query}', isDefault: true },
  { id: 'google_news', category: 'news', name: '구글 뉴스', url: 'https://news.google.com/search?q={query}&hl=ko&gl=KR&ceid=KR:ko', isDefault: true },
  { id: 'daum_news', category: 'news', name: '다음 뉴스', url: 'https://search.daum.net/search?w=news&q={query}', isDefault: true },
  { id: 'chosun', category: 'news', name: '조선일보', url: 'https://www.chosun.com/search/?query={query}', isDefault: true },
  { id: 'joongang', category: 'news', name: '중앙일보', url: 'https://www.joongang.co.kr/search?keyword={query}', isDefault: true },
  { id: 'donga', category: 'news', name: '동아일보', url: 'https://www.donga.com/news/search?query={query}', isDefault: true },
  { id: 'yonhap', category: 'news', name: '연합뉴스', url: 'https://www.yna.co.kr/search/index?query={query}', isDefault: true },
  { id: 'mk', category: 'news', name: '매일경제', url: 'https://www.mk.co.kr/search?word={query}', isDefault: true },
  { id: 'hankyung', category: 'news', name: '한국경제', url: 'https://search.hankyung.com/apps.search/search.news?query={query}', isDefault: true },

  // 🔍 Portal & Media (포털/영상)
  { id: 'google', category: 'portal', name: '구글 (Google)', url: 'https://www.google.com/search?q={query}', isDefault: true },
  { id: 'naver', category: 'portal', name: '네이버', url: 'https://search.naver.com/search.naver?query={query}', isDefault: true },
  { id: 'youtube', category: 'portal', name: '유튜브', url: 'https://www.youtube.com/results?search_query={query}', isDefault: true },
  { id: 'namuwiki', category: 'portal', name: '나무위키', url: 'https://namu.wiki/w/{query}', isDefault: true },
  { id: 'daum', category: 'portal', name: '다음 (Daum)', url: 'https://search.daum.net/search?q={query}', isDefault: true },
  { id: 'chzzk', category: 'portal', name: '치지직 (CHZZK)', url: 'https://chzzk.naver.com/search?keyword={query}', isDefault: true },

  // 💻 Dev & Tech (개발/지식)
  { id: 'stackoverflow', category: 'dev', name: 'Stack Overflow', url: 'https://stackoverflow.com/search?q={query}', isDefault: true },
  { id: 'github', category: 'dev', name: 'GitHub', url: 'https://github.com/search?q={query}', isDefault: true },
  { id: 'npm', category: 'dev', name: 'NPM Packages', url: 'https://www.npmjs.com/search?q={query}', isDefault: true },
  { id: 'pypi', category: 'dev', name: 'PyPI (Python)', url: 'https://pypi.org/search/?q={query}', isDefault: true },
  { id: 'chatgpt', category: 'dev', name: 'ChatGPT', url: 'https://chatgpt.com/?q={query}', isDefault: true },
  { id: 'mdn', category: 'dev', name: 'MDN Web Docs', url: 'https://developer.mozilla.org/ko/search?q={query}', isDefault: true },

  // 📚 Academic & Information (학술/정보)
  { id: 'wikipedia', category: 'academic', name: '위키백과 (한국어)', url: 'https://ko.wikipedia.org/wiki/Special:Search?search={query}', isDefault: true },
  { id: 'google_scholar', category: 'academic', name: 'Google 학술검색', url: 'https://scholar.google.co.kr/scholar?q={query}', isDefault: true },
  { id: 'riss', category: 'academic', name: 'RISS (학술연구정보)', url: 'https://www.riss.kr/search/Search.do?query={query}', isDefault: true },
  { id: 'dbpia', category: 'academic', name: 'DBpia (논문검색)', url: 'https://www.dbpia.co.kr/search/topSearch?searchDetailVO.searchKeyWord={query}', isDefault: true },
  { id: 'pubmed', category: 'academic', name: 'PubMed (의학/생명)', url: 'https://pubmed.ncbi.nlm.nih.gov/?term={query}', isDefault: true },
  { id: 'arxiv', category: 'academic', name: 'arXiv (학술 프리프린트)', url: 'https://arxiv.org/search/?query={query}&searchtype=all', isDefault: true },

  // 📈 Finance & Economy (금융/경제)
  { id: 'naver_stock', category: 'finance', name: '네이버 증권', url: 'https://finance.naver.com/search/searchList.naver?query={query}', isDefault: true },
  { id: 'upbit', category: 'finance', name: '업비트 (가상자산)', url: 'https://upbit.com/exchange?code=CBLK.KRW-{query}', isDefault: true },
  { id: 'hometax', category: 'finance', name: '국세청 홈택스', url: 'https://www.hometax.go.kr/', isDefault: true },

  // 🎮 Community (커뮤니티)
  { id: 'dcinside', category: 'community', name: '디시인사이드', url: 'https://search.dcinside.com/combine/q/{query}', isDefault: true },
  { id: 'fmkorea', category: 'community', name: '에펨코리아 (FMKorea)', url: 'https://www.fmkorea.co.kr/search.php?mid=home&search_target=title_content&search_keyword={query}', isDefault: true },
  { id: 'naver_cafe', category: 'community', name: '네이버 카페', url: 'https://section.cafe.naver.com/ca-fe/home/search/articles?q={query}', isDefault: true },
  { id: 'inven', category: 'community', name: '인벤 (Inven)', url: 'https://www.inven.co.kr/search/site/?q={query}', isDefault: true },
  { id: 'blind', category: 'community', name: '블라인드 (Blind)', url: 'https://www.teamblind.com/kr/search/{query}', isDefault: true },
  { id: 'twitter', category: 'community', name: '엑스 (Twitter)', url: 'https://x.com/search?q={query}', isDefault: true },

  // 🤖 AI Tools (AI 툴)
  { id: 'claude', category: 'ai', name: 'Claude AI', url: 'https://claude.ai/new', isDefault: true },
  { id: 'perplexity', category: 'ai', name: 'Perplexity AI', url: 'https://www.perplexity.ai/search?q={query}', isDefault: true },
  { id: 'gemini', category: 'ai', name: 'Google Gemini', url: 'https://gemini.google.com/app', isDefault: true }
];

// Categories Config
const CATEGORIES = [
  { id: 'all', name: '🚀 전체', title: '🚀 전체 등록 사이트' },
  { id: 'shopping', name: '🛍️ 쇼핑', title: '🛍️ 최저가 & 쇼핑몰' },
  { id: 'news', name: '📰 뉴스/속보', title: '📰 실시간 뉴스 및 언론사' },
  { id: 'portal', name: '🔍 포털/영상', title: '🔍 포털 및 영상검색' },
  { id: 'dev', name: '💻 개발/지식', title: '💻 개발 및 지식 검색' },
  { id: 'academic', name: '📚 학술/정보', title: '📚 학술 및 논문 정보' },
  { id: 'finance', name: '📈 금융/경제', title: '📈 금융 및 주식 정보' },
  { id: 'community', name: '🎮 커뮤니티', title: '🎮 커뮤니티 및 트렌드' },
  { id: 'ai', name: '🤖 AI 툴', title: '🤖 AI 및 답변 서비스' }
];

// Application State
class BaroSearchApp {
  constructor() {
    this.currentCategory = 'all';
    this.sites = [];
    this.hiddenSiteIds = [];
    this.recentSearches = [];
    this.customCategories = [];
    this.activeCategoryIds = ['all', 'shopping', 'news'];
    this.selectedSiteId = null;
    this.selectedSiteIds = new Set();
    this.isActionBarOpen = false;

    // Trending Ticker State
    this.trendingKeywords = [
      '손흥민', '아이폰16', 'OpenAI o3', '원달러 환율',
      '네이버웹툰', '챗GPT 5', '국내 증시', '제주도 여행',
      '디시 핫이슈', '쿠팡 최저가'
    ];
    this.tickerIndex = 0;
    this.tickerTimer = null;

    this.initElements();
    this.loadState();
    this.setupEventListeners();
    this.renderCategoryTabs();
    this.renderSites();
    this.renderRecentSearches();
    this.initTrendingTicker();
  }

  initElements() {
    this.searchInput = document.getElementById('searchInput');
    this.clearSearchBtn = document.getElementById('clearSearchBtn');
    this.batchSearchCheckbox = document.getElementById('batchSearchCheckbox');
    this.categoryTabsContainer = document.getElementById('categoryTabs');
    this.categoryScrollWrapper = document.querySelector('.category-scroll-wrapper');
    this.catScrollLeftBtn = document.getElementById('catScrollLeftBtn');
    this.catScrollRightBtn = document.getElementById('catScrollRightBtn');
    this.searchGrid = document.getElementById('searchGrid');
    this.currentCategoryTitle = document.getElementById('currentCategoryTitle');
    this.siteCountBadge = document.getElementById('siteCountBadge');
    this.recentTagsList = document.getElementById('recentTagsList');

    // Trending Ticker Elements
    this.trendingTickerBar = document.getElementById('trendingTickerBar');
    this.tickerWrapper = document.getElementById('tickerWrapper');
    this.tickerContent = document.getElementById('tickerContent');
    this.tickerToggleBtn = document.getElementById('tickerToggleBtn');
    this.trendingDropdown = document.getElementById('trendingDropdown');
    this.trendingList = document.getElementById('trendingList');
    this.trendingUpdateTime = document.getElementById('trendingUpdateTime');

    // Search submit and select all elements
    this.searchSubmitBtn = document.getElementById('searchSubmitBtn');
    this.selectAllSitesBtn = document.getElementById('selectAllSitesBtn');
    this.selectAllBtnLabel = document.getElementById('selectAllBtnLabel');

    // Category Modal Elements
    this.addCategoryBtn = document.getElementById('addCategoryBtn');
    this.categoryModal = document.getElementById('categoryModal');
    this.closeCategoryModalBtn = document.getElementById('closeCategoryModalBtn');
    this.cancelCategoryModalBtn = document.getElementById('cancelCategoryModalBtn');
    this.categoryForm = document.getElementById('categoryForm');
    this.categoryEmojiInput = document.getElementById('categoryEmojiInput');
    this.categoryNameInput = document.getElementById('categoryNameInput');

    // Modals
    this.siteModal = document.getElementById('siteModal');
    this.presetPacksModal = document.getElementById('presetPacksModal');
    this.settingsModal = document.getElementById('settingsModal');

    // Buttons
    this.addCustomSiteBtn = document.getElementById('addCustomSiteBtn');
    this.presetPacksBtn = document.getElementById('presetPacksBtn');
    this.settingsBtn = document.getElementById('settingsBtn');
    this.themeToggleBtn = document.getElementById('themeToggleBtn');
    this.logoBtn = document.getElementById('logoBtn');

    // Modal Close Btns
    this.closeSiteModalBtn = document.getElementById('closeSiteModalBtn');
    this.cancelSiteModalBtn = document.getElementById('cancelSiteModalBtn');
    this.closePresetPacksModalBtn = document.getElementById('closePresetPacksModalBtn');
    this.closeSettingsModalBtn = document.getElementById('closeSettingsModalBtn');

    // Forms
    this.siteForm = document.getElementById('siteForm');
    this.modalTitle = document.getElementById('modalTitle');
    this.editSiteId = document.getElementById('editSiteId');
    this.siteNameInput = document.getElementById('siteNameInput');
    this.siteCategorySelect = document.getElementById('siteCategorySelect');
    this.siteUrlInput = document.getElementById('siteUrlInput');
    this.siteIconInput = document.getElementById('siteIconInput');

    // Settings elements
    this.exportDataBtn = document.getElementById('exportDataBtn');
    this.importDataBtn = document.getElementById('importDataBtn');
    this.importFileInput = document.getElementById('importFileInput');
    this.resetDataBtn = document.getElementById('resetDataBtn');

    // Mini Popover Context Menu Elements
    this.cardContextMenu = document.getElementById('cardContextMenu');
    this.contextMenuTitle = document.getElementById('contextMenuTitle');
    this.contextMoveLeftBtn = document.getElementById('contextMoveLeftBtn');
    this.contextMoveRightBtn = document.getElementById('contextMoveRightBtn');
    this.contextEditBtn = document.getElementById('contextEditBtn');
    this.contextDeleteBtn = document.getElementById('contextDeleteBtn');
    this.contextTargetSite = null;
  }

  // Show popover context menu for a site card
  showContextMenu(site, x, y) {
    if (!this.cardContextMenu) return;
    this.contextTargetSite = site;
    if (this.contextMenuTitle) this.contextMenuTitle.textContent = site.name;

    this.cardContextMenu.style.display = 'flex';

    const menuWidth = 170;
    const menuHeight = 160;
    let posX = Math.min(x, window.innerWidth - menuWidth - 10);
    let posY = Math.min(y, window.innerHeight - menuHeight - 10);
    posX = Math.max(10, posX);
    posY = Math.max(10, posY);

    this.cardContextMenu.style.left = `${posX}px`;
    this.cardContextMenu.style.top = `${posY}px`;
  }

  hideContextMenu() {
    if (this.cardContextMenu) {
      this.cardContextMenu.style.display = 'none';
      this.contextTargetSite = null;
    }
  }

  // Get active categories list
  getCategories() {
    const allAvailable = [...CATEGORIES, ...this.customCategories];
    return allAvailable.filter(cat => cat.id === 'all' || this.activeCategoryIds.includes(cat.id));
  }

  // Get currently selected site objects (All sites if batch toggle ON, single site if toggle OFF)
  getSelectedSites() {
    const visible = this.getVisibleSites();
    if (visible.length === 0) return [];
    if (this.batchSearchCheckbox && this.batchSearchCheckbox.checked) {
      return visible;
    }
    if (this.selectedSiteId) {
      const found = visible.find(s => s.id === this.selectedSiteId);
      if (found) return [found];
    }
    return [];
  }

  // Reorder site items by dragging fromId to position of toId
  reorderSites(fromId, toId) {
    if (fromId === toId) return;
    const fromIndex = this.sites.findIndex(s => s.id === fromId);
    const toIndex = this.sites.findIndex(s => s.id === toId);

    if (fromIndex !== -1 && toIndex !== -1) {
      const [moved] = this.sites.splice(fromIndex, 1);
      this.sites.splice(toIndex, 0, moved);
      this.saveState();
      this.renderSites();
      this.showToast(`↔️ [${moved.name}] 순서가 변경되었습니다.`, 'info');
    }
  }

  // Move site 1 step left (-1) or right (+1) in current active category view
  moveSiteStep(siteId, direction) {
    const visible = this.getVisibleSites();
    const currentIdx = visible.findIndex(s => s.id === siteId);
    if (currentIdx === -1) return;

    const targetIdx = currentIdx + direction;
    if (targetIdx < 0 || targetIdx >= visible.length) return;

    const targetSiteId = visible[targetIdx].id;
    this.reorderSites(siteId, targetSiteId);
  }

  loadState() {
    // 1. Theme
    const savedTheme = localStorage.getItem('baro_theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    this.updateThemeIcon(savedTheme);

    // 2. Hidden default site IDs
    this.hiddenSiteIds = JSON.parse(localStorage.getItem('baro_hidden_ids') || '[]');

    // 3. Active Category IDs (Default is only 'all', 'shopping', 'news')
    const savedActiveCats = localStorage.getItem('baro_active_categories');
    this.activeCategoryIds = savedActiveCats ? JSON.parse(savedActiveCats) : ['all', 'shopping', 'news'];

    // 4. Custom sites & Custom Categories
    const customSites = JSON.parse(localStorage.getItem('baro_custom_sites') || '[]');
    this.customCategories = JSON.parse(localStorage.getItem('baro_custom_categories') || '[]');

    // 5. Combine default sites and custom sites & apply custom site order if saved
    const allSites = [...DEFAULT_PRESET_SITES, ...customSites];
    const savedOrder = JSON.parse(localStorage.getItem('baro_site_order') || '[]');
    if (savedOrder.length > 0) {
      allSites.sort((a, b) => {
        const idxA = savedOrder.indexOf(a.id);
        const idxB = savedOrder.indexOf(b.id);
        if (idxA === -1) return 1;
        if (idxB === -1) return -1;
        return idxA - idxB;
      });
    }
    this.sites = allSites;

    // 6. Recent searches
    this.recentSearches = JSON.parse(localStorage.getItem('baro_recent_searches') || '[]');

    // 7. Version check & update notification
    const savedVersion = localStorage.getItem('baro_app_version');
    if (savedVersion !== APP_VERSION) {
      localStorage.setItem('baro_app_version', APP_VERSION);
      setTimeout(() => {
        this.showToast(`🚀 바로서치가 ${APP_VERSION} (구글 포털 에디션)으로 최신 업데이트되었습니다!`, 'success');
      }, 500);
    }
  }

  saveState() {
    const customSites = this.sites.filter(s => !s.isDefault);
    const siteOrder = this.sites.map(s => s.id);
    localStorage.setItem('baro_custom_sites', JSON.stringify(customSites));
    localStorage.setItem('baro_custom_categories', JSON.stringify(this.customCategories));
    localStorage.setItem('baro_hidden_ids', JSON.stringify(this.hiddenSiteIds));
    localStorage.setItem('baro_recent_searches', JSON.stringify(this.recentSearches));
    localStorage.setItem('baro_active_categories', JSON.stringify(this.activeCategoryIds));
    localStorage.setItem('baro_site_order', JSON.stringify(siteOrder));
  }

  setupEventListeners() {
    // Version Badge Click Event
    const versionBadge = document.getElementById('appVersionBadge');
    if (versionBadge) {
      versionBadge.textContent = APP_VERSION;
      versionBadge.addEventListener('click', () => {
        this.showToast(`✨ 현재 바로서치 버전을 확인 중입니다: ${APP_VERSION} (최신 배포 상태)`, 'info');
      });
    }

    // Search submit button & Enter key
    const performSearch = () => {
      const query = this.searchInput.value.trim();
      if (!query) {
        this.showToast('🔍 검색어를 입력해 주세요!', 'warning');
        return;
      }
      this.addRecentSearch(query);
      const visibleSites = this.getVisibleSites();
      const targetSites = visibleSites.filter(s => this.selectedSiteIds.has(s.id));

      if (targetSites.length === 0) {
        if (visibleSites.length > 0) {
          this.executeSingleSearch(visibleSites[0], query);
        } else {
          this.showToast('검색할 사이트가 없습니다.', 'warning');
        }
      } else if (targetSites.length === 1) {
        this.executeSingleSearch(targetSites[0], query);
      } else {
        this.executeBatchSearch(query, targetSites);
      }
    };

    if (this.searchSubmitBtn) {
      this.searchSubmitBtn.addEventListener('click', performSearch);
    }

    this.searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        performSearch();
      }
    });

    // Select All Sites Button
    if (this.selectAllSitesBtn) {
      this.selectAllSitesBtn.addEventListener('click', () => {
        const visibleSites = this.getVisibleSites();
        const allSelected = visibleSites.length > 0 && visibleSites.every(s => this.selectedSiteIds.has(s.id));

        if (allSelected) {
          visibleSites.forEach(s => this.selectedSiteIds.delete(s.id));
        } else {
          visibleSites.forEach(s => this.selectedSiteIds.add(s.id));
        }
        this.renderSites();
      });
    }
    });

    // Logo reset to home
    this.logoBtn.addEventListener('click', () => {
      this.currentCategory = 'all';
      this.selectedSiteId = null;
      this.isActionBarOpen = false;
      this.renderCategoryTabs();
      this.renderSites();
    });

    // Context Menu Event Listeners
    if (this.contextMoveLeftBtn) {
      this.contextMoveLeftBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (this.contextTargetSite) this.moveSiteStep(this.contextTargetSite.id, -1);
        this.hideContextMenu();
      });
    }
    if (this.contextMoveRightBtn) {
      this.contextMoveRightBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (this.contextTargetSite) this.moveSiteStep(this.contextTargetSite.id, 1);
        this.hideContextMenu();
      });
    }
    if (this.contextEditBtn) {
      this.contextEditBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const target = this.contextTargetSite;
        this.hideContextMenu();
        if (target) this.openEditSiteModal(target);
      });
    }
    if (this.contextDeleteBtn) {
      this.contextDeleteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const target = this.contextTargetSite;
        this.hideContextMenu();
        if (target) this.deleteOrHideSite(target);
      });
    }

    // Close Context Menu on click outside
    document.addEventListener('click', (e) => {
      if (this.cardContextMenu && !e.target.closest('#cardContextMenu') && !e.target.closest('.card-menu-trigger')) {
        this.hideContextMenu();
      }
    });

    // Header Action Buttons
    this.addCustomSiteBtn.addEventListener('click', () => this.openAddSiteModal());
    this.presetPacksBtn.addEventListener('click', () => this.openModal(this.presetPacksModal));
    this.settingsBtn.addEventListener('click', () => this.openModal(this.settingsModal));
    this.themeToggleBtn.addEventListener('click', () => this.toggleTheme());

    // Category Modal Handlers
    if (this.addCategoryBtn) {
      this.addCategoryBtn.addEventListener('click', () => this.openAddCategoryModal());
    }
    if (this.closeCategoryModalBtn) {
      this.closeCategoryModalBtn.addEventListener('click', () => this.closeModal(this.categoryModal));
    }
    if (this.cancelCategoryModalBtn) {
      this.cancelCategoryModalBtn.addEventListener('click', () => this.closeModal(this.categoryModal));
    }
    if (this.categoryForm) {
      this.categoryForm.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleCategoryFormSubmit();
      });
    }

    // Modal Close Handlers
    this.closeSiteModalBtn.addEventListener('click', () => this.closeModal(this.siteModal));
    this.cancelSiteModalBtn.addEventListener('click', () => this.closeModal(this.siteModal));
    this.closePresetPacksModalBtn.addEventListener('click', () => this.closeModal(this.presetPacksModal));
    this.closeSettingsModalBtn.addEventListener('click', () => this.closeModal(this.settingsModal));

    // Backdrop clicks to close modal
    [this.siteModal, this.categoryModal, this.presetPacksModal, this.settingsModal].forEach(modal => {
      if (modal) {
        modal.addEventListener('click', (e) => {
          if (e.target === modal) this.closeModal(modal);
        });
      }
    });

    // Site Form Submit (Add / Edit)
    this.siteForm.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleSiteFormSubmit();
    });

    // Preset Pack installation & uninstallation buttons
    document.querySelectorAll('.install-pack-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const packType = e.target.closest('.install-pack-btn').dataset.pack;
        this.installPresetPack(packType);
      });
    });

    document.querySelectorAll('.uninstall-pack-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const packType = e.target.closest('.uninstall-pack-btn').dataset.pack;
        this.uninstallPresetPack(packType);
      });
    });

    // Settings actions
    this.exportDataBtn.addEventListener('click', () => this.exportData());
    this.importDataBtn.addEventListener('click', () => this.importFileInput.click());
    this.importFileInput.addEventListener('change', (e) => this.importData(e));
    this.resetDataBtn.addEventListener('click', () => this.resetData());

    // Category horizontal scroll & swipe controls
    this.setupCategoryScrollControls();
  }

  setupCategoryScrollControls() {
    if (!this.categoryTabsContainer || !this.categoryScrollWrapper) return;

    const updateScrollHints = () => {
      const el = this.categoryTabsContainer;
      const wrapper = this.categoryScrollWrapper;
      if (!el || !wrapper) return;

      const scrollLeft = el.scrollLeft;
      const maxScroll = el.scrollWidth - el.clientWidth;

      const hasLeft = scrollLeft > 5;
      const hasRight = scrollLeft < maxScroll - 5;

      wrapper.classList.toggle('has-left', hasLeft);
      wrapper.classList.toggle('has-right', hasRight);

      if (this.catScrollLeftBtn) {
        this.catScrollLeftBtn.classList.toggle('visible', hasLeft);
      }
      if (this.catScrollRightBtn) {
        this.catScrollRightBtn.classList.toggle('visible', hasRight);
      }
    };

    this.categoryTabsContainer.addEventListener('scroll', updateScrollHints);
    window.addEventListener('resize', updateScrollHints);

    if (this.catScrollLeftBtn) {
      this.catScrollLeftBtn.addEventListener('click', () => {
        this.categoryTabsContainer.scrollBy({ left: -220, behavior: 'smooth' });
      });
    }

    if (this.catScrollRightBtn) {
      this.catScrollRightBtn.addEventListener('click', () => {
        this.categoryTabsContainer.scrollBy({ left: 220, behavior: 'smooth' });
      });
    }

    this.updateCategoryScrollHints = updateScrollHints;
    setTimeout(updateScrollHints, 50);
  }

  // Render Nav Category Tabs
  renderCategoryTabs() {
    this.categoryTabsContainer.innerHTML = '';
    const activeCategories = this.getCategories();

    activeCategories.forEach(cat => {
      const btn = document.createElement('button');
      btn.className = `tab-btn ${this.currentCategory === cat.id ? 'active' : ''}`;
      
      if (cat.id !== 'all') {
        btn.innerHTML = `${cat.name} <i class="fa-solid fa-xmark custom-cat-delete-btn" title="카테고리 삭제"></i>`;
        btn.querySelector('.custom-cat-delete-btn').addEventListener('click', (e) => {
          e.stopPropagation();
          this.deleteCategory(cat.id);
        });
      } else {
        btn.innerHTML = cat.name;
      }

      btn.addEventListener('click', () => {
        this.currentCategory = cat.id;
        this.selectedSiteId = null;
        this.isActionBarOpen = false;
        this.renderCategoryTabs();
        this.renderSites();
      });
      this.categoryTabsContainer.appendChild(btn);
    });

    this.populateSiteCategorySelect();

    if (this.updateCategoryScrollHints) {
      setTimeout(() => this.updateCategoryScrollHints(), 50);
    }
  }

  // Populate Site Category Select Dropdown
  populateSiteCategorySelect() {
    if (!this.siteCategorySelect) return;
    const currentVal = this.siteCategorySelect.value;
    this.siteCategorySelect.innerHTML = '';
    const allCategories = [...CATEGORIES, ...this.customCategories].filter(c => c.id !== 'all');

    allCategories.forEach(cat => {
      const opt = document.createElement('option');
      opt.value = cat.id;
      opt.textContent = cat.name;
      this.siteCategorySelect.appendChild(opt);
    });

    if (currentVal && allCategories.some(c => c.id === currentVal)) {
      this.siteCategorySelect.value = currentVal;
    } else if (this.currentCategory !== 'all' && allCategories.some(c => c.id === this.currentCategory)) {
      this.siteCategorySelect.value = this.currentCategory;
    }
  }

  // Open & Handle Custom Category Modal
  openAddCategoryModal() {
    if (this.categoryEmojiInput) this.categoryEmojiInput.value = '📂';
    if (this.categoryNameInput) this.categoryNameInput.value = '';
    this.openModal(this.categoryModal);
  }

  handleCategoryFormSubmit() {
    const emoji = (this.categoryEmojiInput.value.trim() || '📂');
    const name = this.categoryNameInput.value.trim();

    if (!name) return;

    const newCatId = 'custom_cat_' + Date.now();
    const newCat = {
      id: newCatId,
      name: `${emoji} ${name}`,
      title: `${emoji} ${name}`,
      isCustom: true
    };

    this.customCategories.push(newCat);
    if (!this.activeCategoryIds.includes(newCatId)) {
      this.activeCategoryIds.push(newCatId);
    }
    this.saveState();

    this.currentCategory = newCat.id;
    this.renderCategoryTabs();
    this.renderSites();
    this.closeModal(this.categoryModal);
    this.showToast(`✨ [${name}] 카테고리가 새로 추가되었습니다!`, 'success');
  }

  // Delete category tab (Default or Custom)
  deleteCategory(catId) {
    if (catId === 'all') return;

    const allAvailable = [...CATEGORIES, ...this.customCategories];
    const cat = allAvailable.find(c => c.id === catId);
    const catName = cat ? cat.name : catId;

    if (!confirm(`[${catName}] 카테고리 탭을 삭제하시겠습니까?\n(나중에 [추천 팩] 또는 [카테고리 추가]에서 언제든지 다시 추가할 수 있습니다)`)) {
      return;
    }

    if (cat && cat.isCustom) {
      this.customCategories = this.customCategories.filter(c => c.id !== catId);
    }
    this.activeCategoryIds = this.activeCategoryIds.filter(id => id !== catId);

    if (this.currentCategory === catId) {
      this.currentCategory = 'all';
    }

    this.saveState();
    this.renderCategoryTabs();
    this.renderSites();
    this.showToast(`[${catName}] 카테고리가 삭제되었습니다.`, 'info');
  }

  // Real-Time Rolling Trend Ticker Controller
  initTrendingTicker() {
    if (!this.tickerContent || !this.trendingList) return;

    this.renderTrendingUI();
    this.fetchGoogleTrends();

    if (this.tickerTimer) clearInterval(this.tickerTimer);
    this.tickerTimer = setInterval(() => {
      if (this.trendingKeywords.length === 0) return;
      this.tickerIndex = (this.tickerIndex + 1) % this.trendingKeywords.length;
      this.tickerContent.style.transform = `translateY(-${this.tickerIndex * 24}px)`;
    }, 3000);

    const toggleDropdown = () => {
      if (this.trendingTickerBar) {
        this.trendingTickerBar.classList.toggle('open');
      }
    };

    if (this.tickerWrapper) {
      this.tickerWrapper.addEventListener('click', toggleDropdown);
    }
    if (this.tickerToggleBtn) {
      this.tickerToggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleDropdown();
      });
    }

    document.addEventListener('click', (e) => {
      if (this.trendingTickerBar && !this.trendingTickerBar.contains(e.target)) {
        this.trendingTickerBar.classList.remove('open');
      }
    });
  }

  renderTrendingUI() {
    if (!this.tickerContent || !this.trendingList) return;

    // 1. Ticker Items
    this.tickerContent.innerHTML = '';
    this.trendingKeywords.forEach((kw, idx) => {
      const item = document.createElement('div');
      item.className = 'ticker-item';
      item.innerHTML = `<strong class="rank-num">${idx + 1}</strong> <span class="keyword">${kw}</span>`;
      item.addEventListener('click', (e) => {
        e.stopPropagation();
        this.executeSearchWithKeyword(kw);
      });
      this.tickerContent.appendChild(item);
    });

    // 2. Dropdown List
    this.trendingList.innerHTML = '';
    this.trendingKeywords.forEach((kw, idx) => {
      const item = document.createElement('div');
      item.className = `trending-list-item ${idx < 3 ? 'top-three' : ''}`;
      item.innerHTML = `
        <span class="rank-badge">${idx + 1}</span>
        <span class="keyword-text">${kw}</span>
      `;
      item.addEventListener('click', () => {
        if (this.trendingTickerBar) this.trendingTickerBar.classList.remove('open');
        this.executeSearchWithKeyword(kw);
      });
      this.trendingList.appendChild(item);
    });
  }

  executeSearchWithKeyword(keyword) {
    this.searchInput.value = keyword;
    this.clearSearchBtn.style.display = 'block';
    this.addRecentSearch(keyword);
    this.searchInput.focus();

    this.executeBatchSearch(keyword);
  }

  async fetchGoogleTrends() {
    try {
      const res = await fetch('https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Ftrends.google.co.kr%2Ftrends%2Ftrendingsearches%2Fdaily%2Frss%3Fgeo%3DKR');
      if (res.ok) {
        const data = await res.json();
        if (data.items && data.items.length > 0) {
          const fetched = data.items.slice(0, 10).map(item => item.title);
          if (fetched.length >= 5) {
            this.trendingKeywords = fetched;
            this.renderTrendingUI();
            if (this.trendingUpdateTime) {
              this.trendingUpdateTime.textContent = '방금 갱신됨 (Google Trends)';
            }
          }
        }
      }
    } catch (err) {
      // Fallback trend dataset used automatically
    }
  }

  // Get Visible Sites for current active category
  getVisibleSites() {
    return this.sites.filter(site => {
      const isCatActive = this.activeCategoryIds.includes(site.category);
      const matchesCategory = this.currentCategory === 'all' || site.category === this.currentCategory;
      const notHidden = !this.hiddenSiteIds.includes(site.id);
      return isCatActive && matchesCategory && notHidden;
    });
  }

  // Render Grid Cards
  renderSites() {
    const allCatList = [...CATEGORIES, ...this.customCategories];
    const activeCategoryObj = allCatList.find(c => c.id === this.currentCategory);
    this.currentCategoryTitle.textContent = activeCategoryObj ? activeCategoryObj.title : '🚀 검색 대상 사이트 (다중 선택 가능)';

    const visibleSites = this.getVisibleSites();
    const selectedCount = visibleSites.filter(s => this.selectedSiteIds.has(s.id)).length;
    this.siteCountBadge.textContent = `${selectedCount}개 선택됨 / 총 ${visibleSites.length}개`;

    if (this.selectAllBtnLabel) {
      const allSelected = visibleSites.length > 0 && selectedCount === visibleSites.length;
      this.selectAllBtnLabel.textContent = allSelected ? '전체 해제' : '전체 선택';
    }

    this.searchGrid.innerHTML = '';

    if (visibleSites.length === 0) {
      this.searchGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
          <i class="fa-solid fa-folder-open" style="font-size: 2.5rem; margin-bottom: 1rem; opacity: 0.5;"></i>
          <p>등록된 사이트가 없습니다. 상단의 <strong>[사이트 관리]</strong> 버튼을 이용해 보세요!</p>
        </div>
      `;
      return;
    }

    visibleSites.forEach(site => {
      const isSelected = this.selectedSiteIds.has(site.id);
      const card = document.createElement('div');
      card.className = `site-card ${isSelected ? 'selected' : ''}`;
      card.setAttribute('draggable', 'true');

      const domain = this.extractDomain(site.url);
      const faviconUrl = site.icon || `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;

      card.innerHTML = `
        ${isSelected ? '<span class="selected-badge"><i class="fa-solid fa-check"></i></span>' : ''}
        <div class="card-menu-trigger" title="사이트 메뉴/순서 변경">
          <i class="fa-solid fa-ellipsis-vertical"></i>
        </div>
        <div class="site-icon-wrapper">
          <img class="site-icon" src="${faviconUrl}" alt="${site.name}" onerror="this.src='https://www.google.com/s2/favicons?domain=google.com&sz=64'">
        </div>
        <span class="site-name">${site.name}</span>
      `;

      // Drag & Drop Reordering Event Listeners
      card.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', site.id);
        card.classList.add('dragging');
      });

      card.addEventListener('dragend', () => {
        card.classList.remove('dragging');
        document.querySelectorAll('.site-card').forEach(c => c.classList.remove('drag-over'));
      });

      card.addEventListener('dragover', (e) => {
        e.preventDefault();
        card.classList.add('drag-over');
      });

      card.addEventListener('dragleave', () => {
        card.classList.remove('drag-over');
      });

      card.addEventListener('drop', (e) => {
        e.preventDefault();
        card.classList.remove('drag-over');
        const draggedId = e.dataTransfer.getData('text/plain');
        if (draggedId && draggedId !== site.id) {
          this.reorderSites(draggedId, site.id);
        }
      });

      // Context menu trigger (⋮) button click
      const menuTrigger = card.querySelector('.card-menu-trigger');
      if (menuTrigger) {
        menuTrigger.addEventListener('click', (e) => {
          e.stopPropagation();
          const rect = menuTrigger.getBoundingClientRect();
          this.showContextMenu(site, rect.left - 130, rect.bottom + 5);
        });
      }

      // Context menu trigger on Right-Click
      card.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        this.showContextMenu(site, e.clientX, e.clientY);
      });

      // Touch long press for mobile
      let touchTimer = null;
      card.addEventListener('touchstart', (e) => {
        touchTimer = setTimeout(() => {
          if (e.touches && e.touches[0]) {
            this.showContextMenu(site, e.touches[0].clientX, e.touches[0].clientY);
          }
        }, 500);
      }, { passive: true });

      card.addEventListener('touchend', () => {
        if (touchTimer) clearTimeout(touchTimer);
      });

      card.addEventListener('touchmove', () => {
        if (touchTimer) clearTimeout(touchTimer);
      });

      // Click card to toggle selection or execute search
      card.addEventListener('click', (e) => {
        if (e.target.closest('.card-menu-trigger')) return;

        const query = this.searchInput.value.trim();

        if (!query) {
          // Toggle selection
          if (this.selectedSiteIds.has(site.id)) {
            this.selectedSiteIds.delete(site.id);
          } else {
            this.selectedSiteIds.add(site.id);
          }
          this.renderSites();
          return;
        }

        this.addRecentSearch(query);

        if (this.selectedSiteIds.size > 0 && this.selectedSiteIds.has(site.id)) {
          const targetSites = visibleSites.filter(s => this.selectedSiteIds.has(s.id));
          this.executeBatchSearch(query, targetSites);
        } else {
          this.executeSingleSearch(site, query);
        }
      });

      this.searchGrid.appendChild(card);
    });
  }

  // Execute single site search in new tab
  executeSingleSearch(site, query) {
    const targetUrl = site.url.replace('{query}', encodeURIComponent(query));
    window.open(targetUrl, `_blank_${site.id}`);
    this.showToast(`[${site.name}] 검색 결과를 새 탭에서 엽니다!`, 'info');
  }

  // Execute batch multi-search in new tabs for target sites (defaults to selected sites)
  executeBatchSearch(query, targetSites = null) {
    let sitesToSearch = targetSites || this.getSelectedSites();
    if (sitesToSearch.length === 0) {
      const visible = this.getVisibleSites();
      if (visible.length > 0) {
        sitesToSearch = [visible[0]];
      } else {
        this.showToast('선택된 검색 사이트가 없습니다.', 'warning');
        return;
      }
    }

    if (sitesToSearch.length === 1) {
      this.executeSingleSearch(sitesToSearch[0], query);
      return;
    }

    if (sitesToSearch.length > 5) {
      if (!confirm(`선택한 ${sitesToSearch.length}개 사이트를 동시에 새 탭에서 검색하시겠습니까?\n(브라우저 팝업 허용이 필요할 수 있습니다)`)) {
        return;
      }
    }

    let openedCount = 0;
    let blockedCount = 0;

    sitesToSearch.forEach((site, idx) => {
      const targetUrl = site.url.replace('{query}', encodeURIComponent(query));
      const targetName = `_blank_${site.id}_${Date.now()}_${idx}`;
      
      try {
        const win = window.open(targetUrl, targetName);
        if (!win || win.closed || typeof win.closed === 'undefined') {
          blockedCount++;
        } else {
          openedCount++;
        }
      } catch (e) {
        blockedCount++;
      }
    });

    if (blockedCount > 0) {
      this.showToast(`⚠️ ${openedCount}개 탭이 열렸으며 ${blockedCount}개는 팝업 차단되었습니다. 주소창 우측에서 [팝업 항상 허용]을 설정해 주세요!`, 'warning');
    } else {
      this.showToast(`🚀 ${sitesToSearch.length}개 사이트의 새 탭 동시 검색을 실행했습니다!`, 'success');
    }
  }

  // Uninstall/Remove an entire Preset Pack
  uninstallPresetPack(packType) {
    const targetSites = this.sites.filter(s => s.category === packType);
    if (targetSites.length === 0) {
      this.showToast(`[${packType.toUpperCase()}] 팩에 등록된 사이트가 없습니다.`, 'warning');
      return;
    }

    const packNameObj = CATEGORIES.find(c => c.id === packType);
    const packLabel = packNameObj ? packNameObj.name : packType.toUpperCase();

    if (!confirm(`[${packLabel}] 추천 팩의 사이트들을 한 번에 삭제/숨기기 하시겠습니까?`)) {
      return;
    }

    targetSites.forEach(s => {
      if (s.isDefault) {
        if (!this.hiddenSiteIds.includes(s.id)) {
          this.hiddenSiteIds.push(s.id);
        }
      } else {
        this.sites = this.sites.filter(site => site.id !== s.id);
      }
    });

    this.saveState();
    this.renderSites();
    this.closeModal(this.presetPacksModal);
    this.showToast(`🗑️ [${packLabel}] 팩이 일괄 삭제되었습니다.`, 'info');
  }

  // Clear current active category pack
  clearCurrentCategorySites() {
    const visibleSites = this.getVisibleSites();
    if (visibleSites.length === 0) {
      this.showToast('삭제할 사이트가 없습니다.', 'warning');
      return;
    }

    const activeCategoryObj = CATEGORIES.find(c => c.id === this.currentCategory);
    const catName = this.currentCategory === 'all' ? '전체' : activeCategoryObj?.name || '';

    if (!confirm(`[${catName}] 카테고리의 ${visibleSites.length}개 사이트를 한 번에 삭제/숨기기 하시겠습니까?`)) {
      return;
    }

    visibleSites.forEach(s => {
      if (s.isDefault) {
        if (!this.hiddenSiteIds.includes(s.id)) {
          this.hiddenSiteIds.push(s.id);
        }
      } else {
        this.sites = this.sites.filter(site => site.id !== s.id);
      }
    });

    this.saveState();
    this.renderSites();
    this.showToast(`🗑️ [${catName}] 팩/사이트가 일괄 삭제되었습니다.`, 'info');
  }

  // Extract domain from URL
  extractDomain(url) {
    try {
      const parsed = new URL(url.replace('{query}', 'test'));
      return parsed.hostname;
    } catch {
      return 'google.com';
    }
  }

  // Recent Searches Render & Logic
  renderRecentSearches() {
    this.recentTagsList.innerHTML = '';
    if (this.recentSearches.length === 0) {
      this.recentTagsList.innerHTML = '<span style="color: var(--text-muted); font-size: 0.85rem;">최근 검색 내역이 없습니다.</span>';
      return;
    }

    this.recentSearches.forEach(term => {
      const tag = document.createElement('span');
      tag.className = 'recent-tag';
      tag.textContent = term;
      tag.addEventListener('click', () => {
        this.searchInput.value = term;
        this.clearSearchBtn.style.display = 'block';
        this.searchInput.focus();
        this.addRecentSearch(term);
        this.executeBatchSearch(term);
      });
      this.recentTagsList.appendChild(tag);
    });
  }

  addRecentSearch(term) {
    if (!term) return;
    this.recentSearches = this.recentSearches.filter(t => t !== term);
    this.recentSearches.unshift(term);
    if (this.recentSearches.length > 8) {
      this.recentSearches.pop();
    }
    this.saveState();
    this.renderRecentSearches();
  }

  // Modal Methods
  openModal(modal) {
    modal.classList.add('active');
  }

  closeModal(modal) {
    modal.classList.remove('active');
  }

  openAddSiteModal() {
    this.modalTitle.innerHTML = '<i class="fa-solid fa-plus-circle"></i> 나만의 사이트 추가';
    this.editSiteId.value = '';
    this.siteForm.reset();
    this.populateSiteCategorySelect();
    if (this.currentCategory !== 'all') {
      this.siteCategorySelect.value = this.currentCategory;
    }
    this.openModal(this.siteModal);
  }

  openEditSiteModal(site) {
    this.modalTitle.innerHTML = '<i class="fa-solid fa-pen-to-square"></i> 사이트 수정';
    this.editSiteId.value = site.id;
    this.siteNameInput.value = site.name;
    this.populateSiteCategorySelect();
    this.siteCategorySelect.value = site.category;
    this.siteUrlInput.value = site.url;
    this.siteIconInput.value = site.icon || '';
    this.openModal(this.siteModal);
  }

  handleSiteFormSubmit() {
    const id = this.editSiteId.value;
    const name = this.siteNameInput.value.trim();
    const category = this.siteCategorySelect.value;
    const url = this.siteUrlInput.value.trim();
    const icon = this.siteIconInput.value.trim();

    if (!name || !url) return;

    if (!url.includes('{query}')) {
      alert('검색 URL 패턴에 {query} 파라미터가 들어가야 합니다.\n예: https://example.com/search?q={query}');
      return;
    }

    if (!this.activeCategoryIds.includes(category)) {
      this.activeCategoryIds.push(category);
    }

    if (id) {
      // Edit existing
      const index = this.sites.findIndex(s => s.id === id);
      if (index !== -1) {
        this.sites[index] = { ...this.sites[index], name, category, url, icon };
        this.showToast('사이트 정보가 수정되었습니다.', 'info');
      }
    } else {
      // Add new custom site
      const newSite = {
        id: 'custom_' + Date.now(),
        name,
        category,
        url,
        icon,
        isDefault: false
      };
      this.sites.push(newSite);
      this.showToast(`[${name}] 사이트가 새로 추가되었습니다!`, 'success');
    }

    this.saveState();
    this.renderCategoryTabs();
    this.renderSites();
    this.closeModal(this.siteModal);
  }

  deleteOrHideSite(site) {
    if (!confirm(`[${site.name}] 사이트를 삭제하시겠습니까?`)) return;

    if (site.isDefault) {
      // Default sites are hidden
      if (!this.hiddenSiteIds.includes(site.id)) {
        this.hiddenSiteIds.push(site.id);
      }
    } else {
      // Custom sites are completely removed
      this.sites = this.sites.filter(s => s.id !== site.id);
    }

    if (this.selectedSiteId === site.id) {
      this.selectedSiteId = null;
      this.isActionBarOpen = false;
    }

    this.saveState();
    this.renderSites();
    this.showToast(`[${site.name}] 사이트가 목록에서 삭제되었습니다.`, 'info');
  }

  // Install Preset Pack
  installPresetPack(packType) {
    if (!this.activeCategoryIds.includes(packType)) {
      this.activeCategoryIds.push(packType);
    }

    const packSites = DEFAULT_PRESET_SITES.filter(s => s.category === packType);
    packSites.forEach(ps => {
      this.hiddenSiteIds = this.hiddenSiteIds.filter(id => id !== ps.id);
    });

    this.currentCategory = packType;
    this.saveState();
    this.renderCategoryTabs();
    this.renderSites();
    this.closeModal(this.presetPacksModal);

    const packObj = CATEGORIES.find(c => c.id === packType);
    const packLabel = packObj ? packObj.name : packType.toUpperCase();
    this.showToast(`✨ [${packLabel}] 추천 팩 및 카테고리가 등록되었습니다!`, 'success');
  }

  // Theme Toggling
  toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('baro_theme', newTheme);
    this.updateThemeIcon(newTheme);
    this.showToast(`${newTheme === 'dark' ? '다크' : '라이트'} 모드로 전환되었습니다.`, 'info');
  }

  updateThemeIcon(theme) {
    this.themeToggleBtn.innerHTML = theme === 'dark' 
      ? '<i class="fa-solid fa-sun"></i>' 
      : '<i class="fa-solid fa-moon"></i>';
  }

  // Toast System
  showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    let iconClass = 'fa-circle-info';
    if (type === 'success') iconClass = 'fa-circle-check';
    if (type === 'warning') iconClass = 'fa-triangle-exclamation';

    toast.innerHTML = `<i class="fa-solid ${iconClass}"></i> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  // Data Export & Import
  exportData() {
    const data = {
      customSites: this.sites.filter(s => !s.isDefault),
      customCategories: this.customCategories,
      activeCategoryIds: this.activeCategoryIds,
      hiddenSiteIds: this.hiddenSiteIds,
      recentSearches: this.recentSearches,
      exportDate: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `barosearch_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    this.showToast('백업 파일 다운로드가 완료되었습니다.', 'success');
  }

  importData(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parsed = JSON.parse(e.target.result);
        if (parsed.customSites) {
          const defaultSites = DEFAULT_PRESET_SITES;
          this.sites = [...defaultSites, ...parsed.customSites];
        }
        if (parsed.customCategories) this.customCategories = parsed.customCategories;
        if (parsed.activeCategoryIds) this.activeCategoryIds = parsed.activeCategoryIds;
        if (parsed.hiddenSiteIds) this.hiddenSiteIds = parsed.hiddenSiteIds;
        if (parsed.recentSearches) this.recentSearches = parsed.recentSearches;

        this.saveState();
        this.renderCategoryTabs();
        this.renderSites();
        this.renderRecentSearches();
        this.closeModal(this.settingsModal);
        this.showToast('데이터 복원이 정상적으로 완료되었습니다!', 'success');
      } catch (err) {
        alert('올바르지 않은 백업 파일 형식입니다.');
      }
    };
    reader.readAsText(file);
  }

  resetData() {
    if (!confirm('정말로 모든 커스텀 설정 및 데이터를 초기화하시겠습니까?')) return;
    localStorage.removeItem('baro_custom_sites');
    localStorage.removeItem('baro_custom_categories');
    localStorage.removeItem('baro_hidden_ids');
    localStorage.removeItem('baro_recent_searches');
    localStorage.removeItem('baro_active_categories');
    
    this.hiddenSiteIds = [];
    this.recentSearches = [];
    this.customCategories = [];
    this.activeCategoryIds = ['all', 'shopping', 'news'];
    this.sites = [...DEFAULT_PRESET_SITES];
    this.currentCategory = 'all';

    this.renderCategoryTabs();
    this.renderSites();
    this.renderRecentSearches();
    this.closeModal(this.settingsModal);
    this.showToast('모든 설정이 초기 상태로 되돌아갔습니다.', 'warning');
  }
}

// App Initialization on DOM Loaded
document.addEventListener('DOMContentLoaded', () => {
  window.baroApp = new BaroSearchApp();
});
