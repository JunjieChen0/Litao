/* 青柠集 · 共用渲染与交互
   每屏 body 上写 data-page="home|detail|..."，DOMContentLoaded 后自动初始化。 */
(function(){
  'use strict';
  var $  = function(s, r){ return (r||document).querySelector(s); };
  var $$ = function(s, r){ return Array.prototype.slice.call((r||document).querySelectorAll(s)); };

  function esc(s){
    return String(s == null ? '' : s).replace(/[&<>"']/g, function(c){
      return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];
    });
  }
  function qs(name){
    var m = new RegExp('[?&]' + name + '=([^&]*)').exec(location.search);
    return m ? decodeURIComponent(m[1]) : '';
  }

  /* —— 状态栏 & 底部标签栏（结构每屏一致）—— */
  function statusbar(){
    return '<div class="statusbar"><span class="sb-time">9:41</span>' +
      '<svg class="sb-icons" viewBox="0 0 78 14" aria-hidden="true">' +
      '<rect x="0" y="8" width="3" height="6" rx="1"/><rect x="5" y="6" width="3" height="8" rx="1"/>' +
      '<rect x="10" y="3" width="3" height="11" rx="1"/><rect x="15" y="0" width="3" height="14" rx="1"/>' +
      '<path d="M27 4.5a10 10 0 0 1 12 0M29.5 7.5a6.5 6.5 0 0 1 7 0M32.5 10.5a2.6 2.6 0 0 1 1 0" fill="none" stroke="#1E3326" stroke-width="1.5" stroke-linecap="round"/>' +
      '<rect x="50" y="1.5" width="22" height="11" rx="3" fill="none" stroke="#1E3326" stroke-width="1.2"/>' +
      '<rect x="52" y="3.5" width="16" height="7" rx="1.5"/><rect x="73" y="5" width="2" height="4" rx="1"/></svg></div>';
  }
  var TABS = [
    { id:'home',      label:'首页', icon:'i-home', href:'home.html' },
    { id:'publish',   label:'发布', icon:'i-plus', href:'publish.html' },
    { id:'messages',  label:'消息', icon:'i-chat', href:'messages.html' },
    { id:'profile',   label:'我的', icon:'i-user', href:'profile.html' }
  ];
  function tabbar(active){
    return '<nav class="tabbar" aria-label="底部导航">' + TABS.map(function(t){
      if (t.id === 'publish') {
        return '<a class="tab tab-pub" href="'+t.href+'"><span class="pub"><svg><use href="#i-plus"/></svg></span><span>发布</span></a>';
      }
      return '<a class="tab'+(active===t.id?' active':'')+'" href="'+t.href+'">' +
        '<svg class="ti"><use href="#'+t.icon+'"/></svg><span>'+t.label+'</span></a>';
    }).join('') + '</nav><div class="home-indicator"></div>';
  }
  function topnav(title, back){
    return '<div class="topnav"><a class="iconbtn" href="'+back+'" aria-label="返回">' +
      '<svg class="ti"><use href="#i-back"/></svg></a><h1>'+esc(title)+'</h1><span class="spacer"></span></div>';
  }

  /* —— 插画占位 —— */
  function ph(item, cls, style){
    var p = window.PH[item.ph] || window.PH.box;
    var h = style || '';
    return '<div class="ph '+(cls||'')+'" style="--ph-bg:'+p.bg+';--ph-a:'+p.a+';--ph-b:'+p.b+';'+h+'">' +
      '<svg class="ph-art" viewBox="0 0 64 64"><use href="#'+p.art+'"/></svg></div>';
  }

  /* —— 商品卡（双列瀑布流）—— */
  function card(item){
    var p = window.PH[item.ph] || window.PH.box;
    return '<a class="card" href="detail.html?id='+encodeURIComponent(item.id)+'">' +
      '<div class="ph" style="--ph-bg:'+p.bg+';--ph-a:'+p.a+';--ph-b:'+p.b+';height:'+(150 + (parseInt(item.id,36) % 5) * 9)+'px">' +
        '<svg class="ph-art" viewBox="0 0 64 64"><use href="#'+p.art+'"/></svg>' +
        (item.badge ? '<span class="badge">'+esc(item.badge)+'</span>' : '') +
      '</div>' +
      '<div class="body"><div class="ttl">'+esc(item.title)+'</div>' +
      '<div class="row"><span class="price"><small>¥</small>'+item.price+'</span>' +
      '<span class="cond">'+esc(item.condition)+'</span></div>' +
      '<div class="who">'+esc(item.seller.name)+' · '+esc(item.seller.campus)+'</div></div></a>';
  }
  function flow(items){
    return items.length ? items.map(card).join('') : emptyState();
  }
  function emptyState(title, desc, href, btn){
    return '<div class="empty"><div class="art"><svg viewBox="0 0 64 64"><use href="#i-empty"/></svg></div>' +
      '<h3>'+esc(title||'这里还空着')+'</h3><p>'+esc(desc||'去首页逛逛，或者发布第一件闲置吧')+'</p>' +
      (href ? '<a class="btn btn-primary" href="'+href+'" style="width:auto;padding:0 24px">'+esc(btn||'去逛逛')+'</a>' : '') + '</div>';
  }

  /* —— 横排卡（我的发布 / 收藏）—— */
  function rowcard(item, extra){
    return '<div class="rowcard">' +
      '<a href="detail.html?id='+encodeURIComponent(item.id)+'">'+ph(item,'','width:88px;height:88px;border-radius:10px')+'</a>' +
      '<div class="info"><a href="detail.html?id='+encodeURIComponent(item.id)+'"><div class="ttl">'+esc(item.title)+'</div></a>' +
      '<div class="meta">'+esc(item.condition)+' · '+esc(item.category)+'</div>' +
      '<span class="price"><small>¥</small>'+item.price+'</span></div>' +
      (extra || '') + '</div>';
  }

  /* —— 轻提示 —— */
  var toastTimer;
  function toast(msg){
    var t = $('#toast');
    if (!t){ t = document.createElement('div'); t.className='toast'; t.id='toast'; document.body.appendChild(t); }
    t.textContent = msg;
    requestAnimationFrame(function(){ t.classList.add('show'); });
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function(){ t.classList.remove('show'); }, 2000);
  }

  /* —— 各页初始化 —— */
  var pages = {};

  /* 首页：分类宫格 + 双列流 + 下拉刷新 + 上拉加载 */
  pages.home = function(){
    var cats = $('#cats');
    if (cats){
      cats.innerHTML = window.CATS.map(function(c){
        return '<a class="cat" href="category.html?cat='+encodeURIComponent(c.id)+'">' +
          '<span class="bubble" style="background:'+c.bg+';color:'+c.fg+'"><svg><use href="#'+c.icon+'"/></svg></span>' +
          '<span class="lbl">'+esc(c.label)+'</span></a>';
      }).join('');
    }
    var flowEl = $('#flow');
    var visible = 8;
    function render(){
      var arr = window.Store.onSale();
      flowEl.innerHTML = flow(arr.slice(0, visible));
      $('#count').textContent = arr.length;
      var end = $('#endnote');
      if (end) end.textContent = visible >= arr.length ? '— 没有更多了 · 共 '+arr.length+' 件 —' : '— 上拉加载更多 —';
    }
    if (flowEl){
      render();
      // 上拉加载（滚到底追加）
      window.addEventListener('scroll', function(){
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 120){
          var arr = window.Store.onSale();
          if (visible < arr.length){ visible = Math.min(visible + 4, arr.length); render(); }
        }
      }, {passive:true});
      // 下拉刷新（顶部下拉 > 60px 重新洗牌）
      var startY = null;
      document.addEventListener('touchstart', function(e){ if (window.scrollY === 0) startY = e.touches[0].clientY; }, {passive:true});
      document.addEventListener('touchend', function(e){
        if (startY !== null){
          var dy = e.changedTouches[0].clientY - startY;
          if (dy > 60){ var a = window.Store.onSale(); a.unshift(a.pop()); render(); toast('已刷新，看看有什么新上架'); }
          startY = null;
        }
      }, {passive:true});
      // 桌面演示：点「刷新」按钮也能看到反馈
      var rf = $('#refresh');
      if (rf) rf.addEventListener('click', function(){ render(); toast('已刷新'); });
    }
  };

  /* 分类页：分类 + 价格 + 排序筛选 */
  pages.category = function(){
    var cat = qs('cat') || '全部';
    var sort = '综合', maxPrice = 0;
    var wrap = $('#results');
    $$('#catchips .chip').forEach(function(ch){
      if (ch.getAttribute('data-cat') === cat) ch.classList.add('on');
    });
    function render(){
      var arr = window.Store.filter(cat, sort, maxPrice);
      wrap.innerHTML = flow(arr);
      $('#rescount').textContent = arr.length;
    }
    if (!wrap) return;
    $$('#catchips .chip').forEach(function(ch){
      ch.addEventListener('click', function(e){
        e.preventDefault(); cat = ch.getAttribute('data-cat');
        $$('#catchips .chip').forEach(function(x){ x.classList.remove('on'); }); ch.classList.add('on'); render();
      });
    });
    $$('#sortchips .chip').forEach(function(ch){
      ch.addEventListener('click', function(e){
        e.preventDefault(); sort = ch.getAttribute('data-sort');
        $$('#sortchips .chip').forEach(function(x){ x.classList.remove('on'); }); ch.classList.add('on'); render();
      });
    });
    $$('#pricechips .chip').forEach(function(ch){
      ch.addEventListener('click', function(e){
        e.preventDefault(); maxPrice = parseInt(ch.getAttribute('data-price'),10) || 0;
        $$('#pricechips .chip').forEach(function(x){ x.classList.remove('on'); }); ch.classList.add('on'); render();
      });
    });
    render();
  };

  /* 搜索页：关键词 / 历史 / 热搜 / 结果 */
  pages.search = function(){
    var input = $('#kw'), result = $('#result'), hist = $('#history');
    var kw = qs('kw') || '';
    if (input) input.value = kw;
    function renderHistory(){
      if (!hist) return;
      var h = window.Store.history();
      hist.innerHTML = h.length ? h.map(function(x){
        return '<a class="chip" href="search.html?kw='+encodeURIComponent(x)+'">'+esc(x)+'</a>';
      }).join('') + '<a class="chip" href="#" id="clearhist">清空</a>' : '<span style="font-size:14px;color:var(--muted)">暂无搜索历史</span>';
      var c = $('#clearhist');
      if (c) c.addEventListener('click', function(e){ e.preventDefault(); window.Store.clearHistory(); renderHistory(); toast('已清空'); });
    }
    function doSearch(){
      var k = (input && input.value.trim()) || '';
      window.Store.addHistory(k);
      renderHistory();
      var arr = window.Store.search(k);
      $('#rescount').textContent = arr.length;
      $('#reshead').textContent = k ? '「'+k+'」的搜索结果' : '全部商品';
      result.innerHTML = k ? (arr.length ? flow(arr) : emptyState('没找到相关闲置','换个关键词试试，比如「教材」「台灯」「iPad」','home.html','回首页'))
                           : flow(window.Store.onSale().slice(0,6));
    }
    renderHistory();
    if ($('#hot')) $('#hot').innerHTML = window.HOT_WORDS.map(function(w){
      return '<a class="chip" href="search.html?kw='+encodeURIComponent(w)+'">'+esc(w)+'</a>';
    }).join('');
    var go = $('#go');
    if (go) go.addEventListener('click', function(e){ e.preventDefault(); doSearch(); });
    if (input) input.addEventListener('keydown', function(e){ if (e.key === 'Enter'){ e.preventDefault(); doSearch(); } });
    doSearch();
  };

  /* 详情页：轮播 + 信息 + 收藏 + 联系卖家 */
  pages.detail = function(){
    var item = window.Store.byId(qs('id')) || window.Store.onSale()[0];
    if (!item) return;
    var root = $('#detail');
    var p = window.PH[item.ph] || window.PH.box;
    var slides = [item.ph, 'box', 'book'];
    root.innerHTML =
      '<div class="gallery">'+ph(item,'','height:300px') +
        '<div class="dots">'+slides.map(function(_,i){ return '<span class="'+(i===0?'on':'')+'"></span>'; }).join('')+'</div>' +
        '<span class="gcount">1 / '+slides.length+'</span></div>' +
      '<div class="dbody"><div class="dhead"><span class="price"><small>¥</small>'+item.price+'</span>' +
        '<span class="stat on">'+esc(item.status)+'</span></div>' +
        '<h1 class="dtitle">'+esc(item.title)+'</h1>' +
        '<div class="dtags"><span class="cond">'+esc(item.condition)+'</span><span class="cond">'+esc(item.category)+'</span>' +
          '<span class="cond">'+esc(item.trade||'面交')+'</span></div>' +
        '<div class="dsec"><h2>商品描述</h2><p>'+esc(item.description)+'</p></div>' +
        '<div class="dsec"><h2>交易信息</h2><div class="kv"><span>发布时间</span><b>'+esc(item.createTime)+'</b></div>' +
          '<div class="kv"><span>交易方式</span><b>'+esc(item.trade||'面交')+'</b></div>' +
          '<div class="kv"><span>所属校区</span><b>'+esc(item.seller.campus)+'</b></div></div>' +
        '<div class="sellerbox"><span class="avatar md">'+esc(item.seller.name.charAt(0))+'</span>' +
          '<div class="sinfo"><b>'+esc(item.seller.name)+'</b><small>'+esc(item.seller.campus)+' · 校内认证学生</small></div>' +
          '<span class="stat on">已认证</span></div>' +
        '<div class="dsec"><h2>温馨提示</h2><p>本平台为课程设计 Demo，不提供真实支付与物流。请当面验货、校内面交，谨防诈骗。</p></div>' +
      '</div>';
    // 收藏按钮
    var fav = $('#fav');
    function renderFav(){
      var on = window.Store.isFav(item.id);
      fav.classList.toggle('on', on);
      fav.querySelector('span').textContent = on ? '已收藏' : '收藏';
    }
    if (fav){
      renderFav();
      fav.addEventListener('click', function(){
        var on = window.Store.toggleFav(item.id);
        renderFav(); toast(on ? '已加入我的收藏' : '已取消收藏');
      });
    }
    // 联系卖家 → 生成一条会话并跳到消息页
    var contact = $('#contact');
    if (contact) contact.addEventListener('click', function(){
      window.Store.addMessage(item.seller.name, item.seller.name.charAt(0), '#275632', item.title,
        '你好，我对「'+item.title+'」感兴趣，请问还在吗？');
      toast('已发起咨询，去消息里看看');
      location.href = 'messages.html';
    });
  };

  /* 发布页：图片选择 + 表单校验 + 写入本地存储 */
  pages.publish = function(){
    var picked = 'box';
    var arts = ['book','tablet','lamp','box','chair','bike','cup','shirt','ball','pen','bed'];
    var thumbs = $('#thumbs');
    function renderThumbs(){
      thumbs.innerHTML = arts.slice(0,6).map(function(a){
        var p = window.PH[a];
        return '<a class="upthumb" href="#" data-art="'+a+'" style="opacity:'+(a===picked?1:.55)+';outline:'+(a===picked?'2px solid var(--primary)':'none')+'">' +
          ph({ph:a},'','width:100%;height:100%')+'</a>';
      }).join('');
      $$('#thumbs .upthumb').forEach(function(el){
        el.addEventListener('click', function(e){ e.preventDefault(); picked = el.getAttribute('data-art'); renderThumbs(); });
      });
    }
    renderThumbs();

    var form = $('#pubform');
    var price = $('#f-price'), title = $('#f-title'), desc = $('#f-desc');
    var condition = '九成新', category = '教材', trade = '面交';
    function bindPills(sel, cb){
      $$(sel + ' .pill').forEach(function(el){
        el.addEventListener('click', function(){
          $$(sel + ' .pill').forEach(function(x){ x.classList.remove('on'); });
          el.classList.add('on'); cb(el.getAttribute('data-v'));
        });
      });
    }
    bindPills('#condition', function(v){ condition = v; });
    bindPills('#category',  function(v){ category = v; });
    bindPills('#trade',     function(v){ trade = v; });

    form.addEventListener('submit', function(e){
      e.preventDefault();
      var ok = true;
      [title, price, desc].forEach(function(el){ el.classList.remove('err'); });
      if (!title.value.trim()){ title.classList.add('err'); ok = false; }
      if (!price.value || isNaN(Number(price.value)) || Number(price.value) < 0){ price.classList.add('err'); ok = false; }
      if (!desc.value.trim()){ desc.classList.add('err'); ok = false; }
      if (!ok){ toast('请把标题、价格、描述填完整'); return; }
      var item = window.Store.publish({ title:title.value.trim(), price:Number(price.value),
        category:category, condition:condition, description:desc.value.trim(), trade:trade, ph:picked });
      toast('发布成功！已出现在首页');
      setTimeout(function(){ location.href = 'detail.html?id='+encodeURIComponent(item.id); }, 700);
    });
  };

  /* 我的发布：上架 / 下架 / 删除 */
  pages.myposts = function(){
    var wrap = $('#myposts');
    function render(){
      var arr = window.Store.myPosts();
      $('#postcount').textContent = arr.length;
      wrap.innerHTML = arr.length ? arr.map(function(i){
        var extra = '<div class="manage">' +
          '<button class="btn btn-sm '+(i.status==='在售'?'btn-ghost':'btn-soft')+'" data-toggle="'+i.id+'">'+(i.status==='在售'?'下架':'上架')+'</button>' +
          '<button class="btn btn-sm btn-danger" data-del="'+i.id+'">删除</button></div>';
        return rowcard(i, extra);
      }).join('') : emptyState('还没发布过闲置','点下面的按钮，把第一件闲置挂上来吧','publish.html','去发布');
      $$('[data-toggle]', wrap).forEach(function(b){
        b.addEventListener('click', function(){
          var it = window.Store.byId(b.getAttribute('data-toggle'));
          window.Store.setStatus(it.id, it.status==='在售'?'已下架':'在售');
          render(); toast(it.status==='在售'?'已上架':'已下架');
        });
      });
      $$('[data-del]', wrap).forEach(function(b){
        b.addEventListener('click', function(){
          window.Store.remove(b.getAttribute('data-del')); render(); toast('已删除');
        });
      });
    }
    render();
  };

  /* 我的收藏 */
  pages.favorites = function(){
    var wrap = $('#favlist');
    var arr = window.Store.favItems();
    $('#favcount').textContent = arr.length;
    wrap.innerHTML = arr.length ? arr.map(function(i){ return rowcard(i); }).join('')
      : emptyState('收藏夹还是空的','在商品详情点「收藏」，喜欢的闲置就存到这里','home.html','去逛逛');
  };

  /* 消息列表 */
  pages.messages = function(){
    var wrap = $('#msglist');
    var arr = window.Store.messages();
    wrap.innerHTML = arr.length ? arr.map(function(m){
      return '<a class="listrow" href="chat.html?name='+encodeURIComponent(m.name)+'&item='+encodeURIComponent(m.item)+'">' +
        '<span class="avatar md" style="background:'+m.bg+';color:#fff">'+esc(m.avatar)+'</span>' +
        '<span class="tx"><b>'+esc(m.name)+ (m.unread?' <span class="unread">'+m.unread+'</span>':'') +'</b>' +
        '<small>'+esc(m.text)+'</small></span>' +
        '<span class="tail">'+esc(m.time)+'<svg class="chev" viewBox="0 0 24 24"><use href="#i-back"/></svg></span></a>';
    }).join('') : emptyState('还没有消息','去商品详情点「联系卖家」，就能发起一条咨询','home.html','去逛逛');
  };

  /* 模拟聊天 */
  pages.chat = function(){
    var name = qs('name') || '张同学', item = qs('item') || '高等数学教材';
    $('#chatname').textContent = name;
    $('#chatitem').textContent = '关于「'+item+'」';
    var log = $('#chatlog');
    log.innerHTML =
      '<div class="bubble in">你好，请问这件还在吗？</div>' +
      '<div class="bubble out">在的～ 主校区可以面交</div>' +
      '<div class="bubble in">方便什么时候看货？</div>' +
      '<div class="bubble out">今天下午三点后都行，图书馆门口见</div>';
    var input = $('#chatinput'), send = $('#chatsend');
    function sendMsg(){
      var v = input.value.trim(); if (!v) return;
      var b = document.createElement('div'); b.className='bubble out'; b.textContent=v;
      log.appendChild(b); input.value=''; log.scrollTop = log.scrollHeight;
      window.Store.addMessage(name, name.charAt(0), '#275632', item, v);
    }
    send.addEventListener('click', sendMsg);
    input.addEventListener('keydown', function(e){ if (e.key==='Enter'){ e.preventDefault(); sendMsg(); } });
  };

  /* 我的 */
  pages.profile = function(){
    $('#postcount').textContent = window.Store.myPosts().length;
    $('#favcount').textContent = window.Store.favorites().length;
    $('#msgcount').textContent = window.Store.messages().length;
  };

  /* —— 启动 —— */
  document.addEventListener('DOMContentLoaded', function(){
    window.QN = { esc:esc, qs:qs, ph:ph, card:card, flow:flow, rowcard:rowcard, emptyState:emptyState,
                  statusbar:statusbar, tabbar:tabbar, topnav:topnav, toast:toast };
    var page = document.body.getAttribute('data-page');
    if (page && pages[page]) {
      try { pages[page](); } catch(err){ console.error('[青柠集] '+page+' 初始化失败', err); }
    }
  });
})();
