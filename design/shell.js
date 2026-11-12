/* 青柠集 · 页面骨架（解析期生成，保证 8 屏 head/状态栏/Tab 完全一致）
   用法：每屏 <head> 里写 <script src="shell.js"></script>，
   并在 <body data-page="..." data-title="..." data-active="..."> 上标注；
   骨架会补上 tokens.css/app.css 的 <link>、状态栏、底部标签栏。 */
(function(){
  var d = document;
  var links =
    '<link rel="stylesheet" href="tokens.css">' +
    '<link rel="stylesheet" href="app.css">';
  d.write(links);

  // DOMContentLoaded 后补结构：状态栏插到 body 最前，Tab 插到最后
  function build(){
    var body = d.body;
    if (!body) return;
    var sb = '<div class="statusbar"><span class="sb-time">9:41</span>' +
      '<svg class="sb-icons" viewBox="0 0 78 14" aria-hidden="true">' +
      '<rect x="0" y="8" width="3" height="6" rx="1"/><rect x="5" y="6" width="3" height="8" rx="1"/>' +
      '<rect x="10" y="3" width="3" height="11" rx="1"/><rect x="15" y="0" width="3" height="14" rx="1"/>' +
      '<path d="M27 4.5a10 10 0 0 1 12 0M29.5 7.5a6.5 6.5 0 0 1 7 0M32.5 10.5a2.6 2.6 0 0 1 1 0" fill="none" stroke="#1E3326" stroke-width="1.5" stroke-linecap="round"/>' +
      '<rect x="50" y="1.5" width="22" height="11" rx="3" fill="none" stroke="#1E3326" stroke-width="1.2"/>' +
      '<rect x="52" y="3.5" width="16" height="7" rx="1.5"/><rect x="73" y="5" width="2" height="4" rx="1"/></svg></div>';
    body.insertAdjacentHTML('afterbegin', sb);

    if (body.getAttribute('data-tabbar') === 'none') return;

    var active = body.getAttribute('data-active') || '';
    var TABS = [
      { id:'home',      label:'首页', icon:'i-home', href:'home.html' },
      { id:'publish',   label:'发布', icon:'i-plus', href:'publish.html' },
      { id:'messages',  label:'消息', icon:'i-chat', href:'messages.html' },
      { id:'profile',   label:'我的', icon:'i-user', href:'profile.html' }
    ];
    var tabs = TABS.map(function(t){
      if (t.id === 'publish')
        return '<a class="tab tab-pub" href="'+t.href+'"><span class="pub"><svg><use href="#i-plus"/></svg></span><span>发布</span></a>';
      return '<a class="tab'+(active===t.id?' active':'')+'" href="'+t.href+'">' +
        '<svg class="ti"><use href="#'+t.icon+'"/></svg><span>'+t.label+'</span></a>';
    }).join('');
    body.insertAdjacentHTML('beforeend',
      '<nav class="tabbar" aria-label="底部导航">'+tabs+'</nav><div class="home-indicator"></div>');
  }
  if (d.readyState === 'loading') d.addEventListener('DOMContentLoaded', build);
  else build();
})();
