/* 青柠集 · 种子数据（Demo 静态数据，字段对齐课程设计文档第 6 节） */
window.CATS = [
  { id:'教材',   label:'教材书籍', icon:'i-book',   bg:'#E3EFDB', fg:'#3F7A4B' },
  { id:'电子',   label:'数码电子', icon:'i-phone',  bg:'#DCEDEF', fg:'#3C7885' },
  { id:'生活',   label:'生活日用', icon:'i-cup',    bg:'#F5EAD3', fg:'#A8762F' },
  { id:'服饰',   label:'服饰鞋包', icon:'i-shirt',  bg:'#F1E2E6', fg:'#9B5C6E' },
  { id:'运动',   label:'运动户外', icon:'i-ball',   bg:'#E6EDD9', fg:'#63803E' },
  { id:'文具',   label:'文具乐器', icon:'i-pen',    bg:'#E5E7F1', fg:'#5B6496' },
  { id:'家具',   label:'宿舍家具', icon:'i-bed',    bg:'#EFE5D6', fg:'#8A6A3E' },
  { id:'其他',   label:'全部分类', icon:'i-grid',   bg:'#E9EBE6', fg:'#657266' }
];

window.CONDITIONS = ['全新','几乎全新','九成新','八成新','七成新'];
window.TRADES = ['面交','自提','可邮寄','可小刀'];

/* 插画配色：每个商品一组，纯 SVG，离线可渲染 */
window.PH = {
  book:   { art:'ph-book',   bg:'#E4EAD4', a:'#6E8F6A', b:'#C08237' },
  tablet: { art:'ph-tablet', bg:'#DDE7E9', a:'#5C8A94', b:'#334F57' },
  lamp:   { art:'ph-lamp',   bg:'#EFE6D2', a:'#C99B54', b:'#7A6437' },
  box:    { art:'ph-box',    bg:'#E6E9DA', a:'#87A06C', b:'#4E6440' },
  chair:  { art:'ph-chair',  bg:'#EFE7DB', a:'#A98557', b:'#6E5537' },
  bike:   { art:'ph-bike',   bg:'#DEE9E2', a:'#568B72', b:'#2F5B48' },
  cup:    { art:'ph-cup',    bg:'#E9E3D2', a:'#B08A55', b:'#6E5537' },
  shirt:  { art:'ph-shirt',  bg:'#EFE0E5', a:'#A86A7C', b:'#6E4050' },
  ball:   { art:'ph-ball',   bg:'#E4EDD9', a:'#6D9452', b:'#3E6134' },
  pen:    { art:'ph-pen',    bg:'#E3E6F0', a:'#6A76A8', b:'#3C477A' },
  bed:    { art:'ph-bed',    bg:'#EDE6D6', a:'#9C875C', b:'#635334' }
};

/* 商品：id 001–014；status 在售 / 已下架；owner=me 表示「我发布的」*/
window.SEED_ITEMS = [
  { id:'001', title:'高等数学 第七版 上下册 + 课后答案', price:25, category:'教材', condition:'九成新',
    description:'几乎没怎么翻过，笔记只在第一章写了几行。考研复习用完，留给下一届学弟妹，主校区图书馆可面交。',
    images:['book'], ph:'book', seller:{id:'u001',name:'张同学',campus:'主校区'}, status:'在售', createTime:'2026-11-11', badge:'毕业甩卖', trade:'面交', owner:'other' },
  { id:'002', title:'iPad Air 5 64G 深空灰 + 二代 pencil', price:2280, category:'电子', condition:'几乎全新',
    description:'大一买的，上课记笔记用，贴了膜一直带壳，屏幕无划痕。电池健康 97%，附原装充电头和保护壳。',
    images:['tablet'], ph:'tablet', seller:{id:'u002',name:'李同学',campus:'东校区'}, status:'在售', createTime:'2026-11-11', trade:'可小刀', owner:'other' },
  { id:'003', title:'小米台灯 1S 护眼暖光，宿舍神器', price:59, category:'生活', condition:'九成新',
    description:'断电后再没用过，暖光不刺眼，能调三档亮度。宿舍限电也能用，底座带 USB 口可以给手机充电。',
    images:['lamp'], ph:'lamp', seller:{id:'u003',name:'王同学',campus:'主校区'}, status:'在售', createTime:'2026-11-10', trade:'面交', owner:'other' },
  { id:'004', title:'宿舍收纳箱 3 个一起出，搬宿舍用不上了', price:20, category:'家具', condition:'八成新',
    description:'三个叠起来刚好塞进衣柜，盖子都在。毕业清宿舍，不单卖，主校区六号楼自提。',
    images:['box'], ph:'box', seller:{id:'u004',name:'陈同学',campus:'主校区'}, status:'在售', createTime:'2026-11-10', badge:'打包价', trade:'自提', owner:'other' },
  { id:'005', title:'懒人沙发，可自提', price:45, category:'家具', condition:'八成新',
    description:'坐了半年，外套洗过一次没起球。体积有点大，只支持南校区自提，不寄快递。',
    images:['chair'], ph:'chair', seller:{id:'u005',name:'周同学',campus:'南校区'}, status:'在售', createTime:'2026-11-09', trade:'自提', owner:'other' },
  { id:'006', title:'捷安特通勤单车，链条刚换，可小刀', price:380, category:'运动', condition:'七成新',
    description:'骑了两年，上月刚换链条和刹车皮，胎还好。校内代步够用，诚心要可以小刀，不接受大砍。',
    images:['bike'], ph:'bike', seller:{id:'u006',name:'赵同学',campus:'主校区'}, status:'在售', createTime:'2026-11-09', trade:'可小刀', owner:'other' },
  { id:'007', title:'线性代数 第六版', price:18, category:'教材', condition:'八成新',
    description:'课本加一本讲义，重点章节有荧光笔标注，介意的同学慎拍。期末复习够用。',
    images:['book'], ph:'book', seller:{id:'u007',name:'孙同学',campus:'主校区'}, status:'在售', createTime:'2026-11-08', trade:'面交', owner:'other' },
  { id:'008', title:'索尼 WH-1000XM4 头戴降噪耳机', price:890, category:'电子', condition:'九成新',
    description:'降噪很强，图书馆自习神器。耳罩有点使用痕迹，功能一切正常，原装收纳盒和线都在。',
    images:['tablet'], ph:'tablet', seller:{id:'u008',name:'吴同学',campus:'东校区'}, status:'在售', createTime:'2026-11-08', trade:'可邮寄', owner:'other' },
  { id:'009', title:'陶瓷马克杯 2 个，星巴克城市系列', price:30, category:'生活', condition:'九成新',
    description:'收藏的杯子，没泡过咖啡只摆着。搬家带不走，两个一起出，杯口无磕碰。',
    images:['cup'], ph:'cup', seller:{id:'u009',name:'郑同学',campus:'南校区'}, status:'在售', createTime:'2026-11-07', trade:'可邮寄', owner:'other' },
  { id:'010', title:'优衣库牛仔外套 M 码，穿过两次', price:75, category:'服饰', condition:'几乎全新',
    description:'买大了，M 码偏宽松，水洗过一次没变形。适合春秋，主校区可当面看货。',
    images:['shirt'], ph:'shirt', seller:{id:'u010',name:'钱同学',campus:'主校区'}, status:'在售', createTime:'2026-11-07', trade:'面交', owner:'other' },
  { id:'011', title:'斯伯丁篮球', price:55, category:'运动', condition:'八成新',
    description:'打了半学期，气密性没问题，表皮有点磨。体育课和约球都够用，附带打气筒。',
    images:['ball'], ph:'ball', seller:{id:'u011',name:'冯同学',campus:'东校区'}, status:'在售', createTime:'2026-11-06', trade:'面交', owner:'other' },
  { id:'012', title:'百乐钢笔 + 一盒墨囊，考研刷题用', price:28, category:'文具', condition:'九成新',
    description:'写起来很顺，出墨稳定，附半盒墨囊。买来练字没坚持，转给需要的同学。',
    images:['pen'], ph:'pen', seller:{id:'u012',name:'蒋同学',campus:'主校区'}, status:'在售', createTime:'2026-11-06', trade:'可邮寄', owner:'other' },
  { id:'013', title:'宿舍床帘 3 片 + 支撑杆，遮光款', price:35, category:'家具', condition:'九成新',
    description:'遮光效果不错，杆子可拆卸。搬宿舍换了新的，这套洗干净了，主校区自提。',
    images:['bed'], ph:'bed', seller:{id:'u013',name:'韩同学',campus:'主校区'}, status:'在售', createTime:'2026-11-05', trade:'自提', owner:'other' },
  /* —— 以下两条是「我发布的」，用于我的发布管理演示 —— */
  { id:'014', title:'考研英语真题卷', price:32, category:'教材', condition:'八成新',
    description:'自己做了一遍，答案册单独装订了，卷面有铅笔痕迹但都擦干净了。附赠一本词汇小册子。',
    images:['book'], ph:'book', seller:{id:'me',name:'我',campus:'主校区'}, status:'在售', createTime:'2026-11-10', trade:'面交', owner:'me' },
  { id:'015', title:'罗技 M330 无线鼠标，静音款', price:40, category:'电子', condition:'九成新',
    description:'图书馆用不吵人，接收器还在。换了新鼠标所以出掉，电池还能用很久。',
    images:['tablet'], ph:'tablet', seller:{id:'me',name:'我',campus:'主校区'}, status:'已下架', createTime:'2026-11-04', trade:'面交', owner:'me' }
];

window.HOT_WORDS = ['考研数学','iPad','台灯','收纳箱','单车','教材','耳机','毕业甩卖'];
window.DEFAULT_HISTORY = ['高等数学','台灯','蓝牙耳机'];

window.SEED_MESSAGES = [
  { id:'m1', name:'张同学', avatar:'张', bg:'#275632', item:'高等数学 第七版 上下册 + 课后答案',
    text:'同学你好，教材还在吗？可以主校区图书馆面交吗', time:'09:24', unread:2 },
  { id:'m2', name:'李同学', avatar:'李', bg:'#2C5C66', item:'iPad Air 5 64G 深空灰 + 二代 pencil',
    text:'壳和充电器都在的，方便的话今天下午可以看一下机器', time:'昨天', unread:0 },
  { id:'m3', name:'王同学', avatar:'王', bg:'#8A5F24', item:'小米台灯 1S 护眼暖光',
    text:'已给你留着啦，晚上七点食堂门口见～', time:'周一', unread:0 },
  { id:'m4', name:'青柠小助手', avatar:'柠', bg:'#6B4F2A', item:'平台通知',
    text:'欢迎来到青柠集！发布闲置前记得看看《校园交易小贴士》哦', time:'11-02', unread:0 }
];
