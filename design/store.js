/* 青柠集 · 本地存储层（localStorage，无后端）
   所有屏共用：发布后首页/我的发布即时可见，收藏后我的收藏即时可见。 */
window.Store = (function(){
  var NS = 'qingningji.v1.';
  var SEED_VERSION = 2;                /* 种子数据版本；改 data.js 时 +1，自动覆盖旧缓存 */
  function read(key, fallback){
    try { var v = localStorage.getItem(NS + key); return v === null ? fallback : JSON.parse(v); }
    catch(e){ return fallback; }
  }
  function write(key, val){
    try { localStorage.setItem(NS + key, JSON.stringify(val)); } catch(e){}
  }

  /* 首次进入 / 种子版本更新时注入种子数据，之后以本地数据为准 */
  function init(){
    if (read('version', 0) !== SEED_VERSION){
      write('items', window.SEED_ITEMS);
      write('messages', window.SEED_MESSAGES);
      write('version', SEED_VERSION);
    }
    if (read('favorites', null) === null) write('favorites', []);
    if (read('history', null) === null) write('history', window.DEFAULT_HISTORY);
    if (read('me', null) === null) write('me', { name:'我', avatar:'我', campus:'主校区', studentId:'2023XXXX', posts:2, favorites:0 });
  }

  function items(){ return read('items', []); }
  function allItems(){ return items(); }                       /* 含已下架，供管理页 */
  function onSale(){ return items().filter(function(i){ return i.status === '在售'; }); }
  function byId(id){ return items().filter(function(i){ return i.id === id; })[0] || null; }
  function myPosts(){ return items().filter(function(i){ return i.owner === 'me'; }); }

  function publish(data){
    var arr = items();
    var id = 'u' + Date.now().toString(36);
    var item = {
      id:id, title:data.title, price:data.price, category:data.category,
      condition:data.condition || '九成新', description:data.description || '',
      images:[data.ph], ph:data.ph || 'box',
      seller:{ id:'me', name:'我', campus:'主校区' },
      status:'在售', createTime:new Date().toISOString().slice(0,10),
      trade:data.trade || '面交', owner:'me'
    };
    arr.unshift(item);
    write('items', arr);
    return item;
  }

  function setStatus(id, status){
    var arr = items().map(function(i){ if (i.id === id) i.status = status; return i; });
    write('items', arr);
  }
  function remove(id){
    write('items', items().filter(function(i){ return i.id !== id; }));
  }

  function favorites(){ return read('favorites', []); }
  function isFav(id){ return favorites().indexOf(id) >= 0; }
  function toggleFav(id){
    var f = favorites(); var idx = f.indexOf(id);
    if (idx >= 0) f.splice(idx,1); else f.push(id);
    write('favorites', f);
    return idx < 0;                                            /* true = 已收藏 */
  }
  function favItems(){ return items().filter(function(i){ return isFav(i.id); }); }

  function history(){ return read('history', []); }
  function addHistory(kw){
    if (!kw) return;
    var h = history().filter(function(x){ return x !== kw; });
    h.unshift(kw);
    write('history', h.slice(0,8));
  }
  function clearHistory(){ write('history', []); }

  function messages(){ return read('messages', []); }
  function addMessage(name, avatar, bg, item, text){
    var m = messages();
    m.unshift({ id:'m'+Date.now().toString(36), name:name, avatar:avatar, bg:bg,
      item:item, text:text, time:'刚刚', unread:0 });
    write('messages', m);
  }

  function search(kw){
    var k = (kw || '').trim().toLowerCase();
    if (!k) return [];
    return onSale().filter(function(i){
      return (i.title + ' ' + i.description + ' ' + i.category + ' ' + i.seller.name).toLowerCase().indexOf(k) >= 0;
    });
  }

  function filter(cat, sort, maxPrice){
    var arr = onSale().filter(function(i){ return cat === '全部' || cat === '其他' || i.category === cat; });
    if (maxPrice) arr = arr.filter(function(i){ return i.price <= maxPrice; });
    if (sort === '价格') arr.sort(function(a,b){ return a.price - b.price; });
    else if (sort === '最新') arr.sort(function(a,b){ return b.createTime.localeCompare(a.createTime); });
    return arr;
  }

  init();
  return {
    init:init, items:items, allItems:allItems, onSale:onSale, byId:byId, myPosts:myPosts,
    publish:publish, setStatus:setStatus, remove:remove,
    favorites:favorites, isFav:isFav, toggleFav:toggleFav, favItems:favItems,
    history:history, addHistory:addHistory, clearHistory:clearHistory,
    messages:messages, addMessage:addMessage, search:search, filter:filter
  };
})();
