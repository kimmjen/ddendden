(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[180],{3426:(e,t,s)=>{Promise.resolve().then(s.bind(s,314))},5663:function(e){var t;t=function(){"use strict";var e="millisecond",t="second",s="minute",n="hour",r="week",i="month",a="quarter",l="year",o="date",c="Invalid Date",d=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,u=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,h=function(e,t,s){var n=String(e);return!n||n.length>=t?e:""+Array(t+1-n.length).join(s)+e},m="en",f={};f[m]={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(e){var t=["th","st","nd","rd"],s=e%100;return"["+e+(t[(s-20)%10]||t[s]||"th")+"]"}};var g="$isDayjsObject",x=function(e){return e instanceof b||!(!e||!e[g])},p=function e(t,s,n){var r;if(!t)return m;if("string"==typeof t){var i=t.toLowerCase();f[i]&&(r=i),s&&(f[i]=s,r=i);var a=t.split("-");if(!r&&a.length>1)return e(a[0])}else{var l=t.name;f[l]=t,r=l}return!n&&r&&(m=r),r||!n&&m},v=function(e,t){if(x(e))return e.clone();var s="object"==typeof t?t:{};return s.date=e,s.args=arguments,new b(s)},y={s:h,z:function(e){var t=-e.utcOffset(),s=Math.abs(t);return(t<=0?"+":"-")+h(Math.floor(s/60),2,"0")+":"+h(s%60,2,"0")},m:function e(t,s){if(t.date()<s.date())return-e(s,t);var n=12*(s.year()-t.year())+(s.month()-t.month()),r=t.clone().add(n,i),a=s-r<0,l=t.clone().add(n+(a?-1:1),i);return+(-(n+(s-r)/(a?r-l:l-r))||0)},a:function(e){return e<0?Math.ceil(e)||0:Math.floor(e)},p:function(c){return({M:i,y:l,w:r,d:"day",D:o,h:n,m:s,s:t,ms:e,Q:a})[c]||String(c||"").toLowerCase().replace(/s$/,"")},u:function(e){return void 0===e}};y.l=p,y.i=x,y.w=function(e,t){return v(e,{locale:t.$L,utc:t.$u,x:t.$x,$offset:t.$offset})};var b=function(){function h(e){this.$L=p(e.locale,null,!0),this.parse(e),this.$x=this.$x||e.x||{},this[g]=!0}var m=h.prototype;return m.parse=function(e){this.$d=function(e){var t=e.date,s=e.utc;if(null===t)return new Date(NaN);if(y.u(t))return new Date;if(t instanceof Date)return new Date(t);if("string"==typeof t&&!/Z$/i.test(t)){var n=t.match(d);if(n){var r=n[2]-1||0,i=(n[7]||"0").substring(0,3);return s?new Date(Date.UTC(n[1],r,n[3]||1,n[4]||0,n[5]||0,n[6]||0,i)):new Date(n[1],r,n[3]||1,n[4]||0,n[5]||0,n[6]||0,i)}}return new Date(t)}(e),this.init()},m.init=function(){var e=this.$d;this.$y=e.getFullYear(),this.$M=e.getMonth(),this.$D=e.getDate(),this.$W=e.getDay(),this.$H=e.getHours(),this.$m=e.getMinutes(),this.$s=e.getSeconds(),this.$ms=e.getMilliseconds()},m.$utils=function(){return y},m.isValid=function(){return this.$d.toString()!==c},m.isSame=function(e,t){var s=v(e);return this.startOf(t)<=s&&s<=this.endOf(t)},m.isAfter=function(e,t){return v(e)<this.startOf(t)},m.isBefore=function(e,t){return this.endOf(t)<v(e)},m.$g=function(e,t,s){return y.u(e)?this[t]:this.set(s,e)},m.unix=function(){return Math.floor(this.valueOf()/1e3)},m.valueOf=function(){return this.$d.getTime()},m.startOf=function(e,a){var c=this,d=!!y.u(a)||a,u=y.p(e),h=function(e,t){var s=y.w(c.$u?Date.UTC(c.$y,t,e):new Date(c.$y,t,e),c);return d?s:s.endOf("day")},m=function(e,t){return y.w(c.toDate()[e].apply(c.toDate("s"),(d?[0,0,0,0]:[23,59,59,999]).slice(t)),c)},f=this.$W,g=this.$M,x=this.$D,p="set"+(this.$u?"UTC":"");switch(u){case l:return d?h(1,0):h(31,11);case i:return d?h(1,g):h(0,g+1);case r:var v=this.$locale().weekStart||0,b=(f<v?f+7:f)-v;return h(d?x-b:x+(6-b),g);case"day":case o:return m(p+"Hours",0);case n:return m(p+"Minutes",1);case s:return m(p+"Seconds",2);case t:return m(p+"Milliseconds",3);default:return this.clone()}},m.endOf=function(e){return this.startOf(e,!1)},m.$set=function(r,a){var c,d=y.p(r),u="set"+(this.$u?"UTC":""),h=((c={}).day=u+"Date",c[o]=u+"Date",c[i]=u+"Month",c[l]=u+"FullYear",c[n]=u+"Hours",c[s]=u+"Minutes",c[t]=u+"Seconds",c[e]=u+"Milliseconds",c)[d],m="day"===d?this.$D+(a-this.$W):a;if(d===i||d===l){var f=this.clone().set(o,1);f.$d[h](m),f.init(),this.$d=f.set(o,Math.min(this.$D,f.daysInMonth())).$d}else h&&this.$d[h](m);return this.init(),this},m.set=function(e,t){return this.clone().$set(e,t)},m.get=function(e){return this[y.p(e)]()},m.add=function(e,a){var o,c=this;e=Number(e);var d=y.p(a),u=function(t){var s=v(c);return y.w(s.date(s.date()+Math.round(t*e)),c)};if(d===i)return this.set(i,this.$M+e);if(d===l)return this.set(l,this.$y+e);if("day"===d)return u(1);if(d===r)return u(7);var h=((o={})[s]=6e4,o[n]=36e5,o[t]=1e3,o)[d]||1,m=this.$d.getTime()+e*h;return y.w(m,this)},m.subtract=function(e,t){return this.add(-1*e,t)},m.format=function(e){var t=this,s=this.$locale();if(!this.isValid())return s.invalidDate||c;var n=e||"YYYY-MM-DDTHH:mm:ssZ",r=y.z(this),i=this.$H,a=this.$m,l=this.$M,o=s.weekdays,d=s.months,h=s.meridiem,m=function(e,s,r,i){return e&&(e[s]||e(t,n))||r[s].slice(0,i)},f=function(e){return y.s(i%12||12,e,"0")},g=h||function(e,t,s){var n=e<12?"AM":"PM";return s?n.toLowerCase():n};return n.replace(u,function(e,n){return n||function(e){switch(e){case"YY":return String(t.$y).slice(-2);case"YYYY":return y.s(t.$y,4,"0");case"M":return l+1;case"MM":return y.s(l+1,2,"0");case"MMM":return m(s.monthsShort,l,d,3);case"MMMM":return m(d,l);case"D":return t.$D;case"DD":return y.s(t.$D,2,"0");case"d":return String(t.$W);case"dd":return m(s.weekdaysMin,t.$W,o,2);case"ddd":return m(s.weekdaysShort,t.$W,o,3);case"dddd":return o[t.$W];case"H":return String(i);case"HH":return y.s(i,2,"0");case"h":return f(1);case"hh":return f(2);case"a":return g(i,a,!0);case"A":return g(i,a,!1);case"m":return String(a);case"mm":return y.s(a,2,"0");case"s":return String(t.$s);case"ss":return y.s(t.$s,2,"0");case"SSS":return y.s(t.$ms,3,"0");case"Z":return r}return null}(e)||r.replace(":","")})},m.utcOffset=function(){return-(15*Math.round(this.$d.getTimezoneOffset()/15))},m.diff=function(e,o,c){var d,u=this,h=y.p(o),m=v(e),f=(m.utcOffset()-this.utcOffset())*6e4,g=this-m,x=function(){return y.m(u,m)};switch(h){case l:d=x()/12;break;case i:d=x();break;case a:d=x()/3;break;case r:d=(g-f)/6048e5;break;case"day":d=(g-f)/864e5;break;case n:d=g/36e5;break;case s:d=g/6e4;break;case t:d=g/1e3;break;default:d=g}return c?d:y.a(d)},m.daysInMonth=function(){return this.endOf(i).$D},m.$locale=function(){return f[this.$L]},m.locale=function(e,t){if(!e)return this.$L;var s=this.clone(),n=p(e,t,!0);return n&&(s.$L=n),s},m.clone=function(){return y.w(this.$d,this)},m.toDate=function(){return new Date(this.valueOf())},m.toJSON=function(){return this.isValid()?this.toISOString():null},m.toISOString=function(){return this.$d.toISOString()},m.toString=function(){return this.$d.toUTCString()},h}(),j=b.prototype;return v.prototype=j,[["$ms",e],["$s",t],["$m",s],["$H",n],["$W","day"],["$M",i],["$y",l],["$D",o]].forEach(function(e){j[e[1]]=function(t){return this.$g(t,e[0],e[1])}}),v.extend=function(e,t){return e.$i||(e(t,b,v),e.$i=!0),v},v.locale=p,v.isDayjs=x,v.unix=function(e){return v(1e3*e)},v.en=f[m],v.Ls=f,v.p={},v},e.exports=t()},1847:(e,t,s)=>{"use strict";s.d(t,{A:()=>n});let n=(0,s(8229).A)("LoaderCircle",[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]])},2683:(e,t,s)=>{"use strict";var n=s(435);s.o(n,"useParams")&&s.d(t,{useParams:function(){return n.useParams}}),s.o(n,"usePathname")&&s.d(t,{usePathname:function(){return n.usePathname}}),s.o(n,"useRouter")&&s.d(t,{useRouter:function(){return n.useRouter}})},314:(e,t,s)=>{"use strict";s.r(t),s.d(t,{default:()=>h});var n=s(5878),r=s(3446),i=s(3898),a=s(1847),l=s(7175);let o=e=>{let{video:t}=e,s=t.title.replace("[EN] ","").replace("ㅣ","-"),r=t.thumbnail_urls.maxres||t.thumbnail_urls.high;return(0,n.jsxs)("article",{className:"bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow",children:[(0,n.jsxs)("div",{className:"aspect-video bg-gray-100 relative",children:[(0,n.jsx)("img",{src:r,alt:s,className:"w-full h-full object-cover",loading:"lazy"}),(0,n.jsx)("div",{className:"absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 text-sm rounded",children:t.duration})]}),(0,n.jsxs)("div",{className:"p-4",children:[(0,n.jsx)("h3",{className:"font-medium mb-2 line-clamp-2",children:s}),(0,n.jsx)("p",{className:"text-sm text-gray-500 mb-2 line-clamp-2",children:t.description}),(0,n.jsxs)("div",{className:"flex justify-between text-sm text-gray-500",children:[(0,n.jsxs)("span",{children:["조회수 ",(0,l.Z)(t.statistics.viewCount)]}),(0,n.jsx)("time",{dateTime:t.published_at,children:(0,l.Y)(t.published_at)})]})]})]})};var c=s(297);let d=e=>{let{videos:t,category:s}=e,{t:r}=(0,c.B)();return(0,n.jsxs)("div",{children:[(0,n.jsxs)("div",{className:"flex justify-between items-center mb-6",children:[(0,n.jsx)("h2",{className:"text-xl font-bold",children:r("navigation.".concat(s))}),"`",(0,n.jsxs)("span",{className:"text-gray-500 text-sm",children:["총 ",t.length,"개"]})]}),(0,n.jsx)("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-6",children:t.map(e=>(0,n.jsx)(o,{video:e},e.video_id))})]})},u={intro:()=>(0,n.jsxs)("div",{className:"bg-white rounded-lg p-6 shadow-sm",children:[(0,n.jsxs)("div",{className:"flex flex-col md:flex-row gap-8 mb-8",children:[(0,n.jsx)("div",{className:"w-full md:w-1/3 flex-shrink-0",children:(0,n.jsx)("div",{className:"aspect-[4/3] relative rounded-lg overflow-hidden",children:(0,n.jsx)(i.default,{src:"/images/monthly.webp",alt:"이달의계원",fill:!0,className:"object-cover"})})}),(0,n.jsxs)("div",{className:"flex-1",children:[(0,n.jsx)("h2",{className:"text-xl font-bold mb-4",children:"프로그램 소개"}),(0,n.jsx)("p",{className:"text-gray-600 mb-4",children:"핑계고에 출연한 계원이 흘린 아이템으로 판을 벌린 뜬뜬의 웹예능."}),(0,n.jsxs)("div",{className:"grid sm:grid-cols-2 gap-6",children:[(0,n.jsxs)("div",{children:[(0,n.jsx)("h3",{className:"font-medium mb-2",children:"방송 정보"}),(0,n.jsxs)("div",{className:"space-y-2 text-sm text-gray-600",children:[(0,n.jsxs)("div",{className:"flex gap-2",children:[(0,n.jsx)("span",{className:"text-gray-400 w-20",children:"방영 기간"}),(0,n.jsx)("span",{children:"2024년 01월 31일 ~ 2024년 09월 30일"})]}),(0,n.jsxs)("div",{className:"flex gap-2",children:[(0,n.jsx)("span",{className:"text-gray-400 w-20",children:"방송 시간"}),(0,n.jsx)("span",{children:"매월 한 편"})]}),(0,n.jsxs)("div",{className:"flex gap-2",children:[(0,n.jsx)("span",{className:"text-gray-400 w-20",children:"제작"}),(0,n.jsx)("span",{children:"안테나 플러스"})]})]})]}),(0,n.jsxs)("div",{children:[(0,n.jsx)("h3",{className:"font-medium mb-2",children:"출연진"}),(0,n.jsxs)("div",{className:"flex items-center gap-3",children:[(0,n.jsx)("div",{className:"w-10 h-10 rounded-full bg-gray-200"}),(0,n.jsxs)("div",{children:[(0,n.jsx)("p",{className:"font-medium",children:"유재석"}),(0,n.jsx)("p",{className:"text-sm text-gray-500",children:"MC"})]})]})]})]})]})]}),(0,n.jsxs)("div",{className:"flex flex-wrap gap-2",children:[(0,n.jsx)("span",{className:"px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full",children:"#웹예능"}),(0,n.jsx)("span",{className:"px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full",children:"#토크쇼"}),(0,n.jsx)("span",{className:"px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full",children:"#밥친구"})]})]}),videos:()=>{let[e,t]=(0,r.useState)([]),[s,i]=(0,r.useState)(!0),[l,o]=(0,r.useState)(null),[c,u]=(0,r.useState)("monthly");return((0,r.useEffect)(()=>{(async()=>{try{i(!0);let e=await fetch("/api/videos/monthly");if(!e.ok)throw Error("데이터를 불러오는데 실패했습니다");let s=await e.json();t(s)}catch(e){console.error("Error:",e),o(e instanceof Error?e.message:"알 수 없는 오류가 발생했습니다")}finally{i(!1)}})()},[]),s)?(0,n.jsx)("div",{className:"flex justify-center items-center min-h-[400px]",children:(0,n.jsx)(a.A,{className:"animate-spin h-8 w-8 text-pink-500"})}):l?(0,n.jsxs)("div",{className:"text-center py-8 text-gray-500",children:[(0,n.jsx)("p",{children:l}),(0,n.jsx)("button",{onClick:()=>window.location.reload(),className:"mt-4 text-pink-500 hover:underline focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 rounded",children:"다시 시도하기"})]}):(0,n.jsx)("div",{className:"gap-8",children:(0,n.jsx)(d,{videos:e,category:c})})},cast:()=>(0,n.jsx)("div",{className:"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6",children:(0,n.jsxs)("div",{className:"bg-white rounded-lg p-4 shadow-sm text-center",children:[(0,n.jsx)("div",{className:"w-24 h-24 mx-auto rounded-full bg-gray-200 mb-4"}),(0,n.jsx)("h3",{className:"font-medium",children:"유재석"}),(0,n.jsx)("p",{className:"text-sm text-gray-500",children:"MC"})]})}),comments:()=>{let[e,t]=(0,r.useState)([]);return(0,n.jsxs)("div",{className:"bg-white rounded-lg p-6 shadow-sm",children:[(0,n.jsxs)("div",{className:"mb-6",children:[(0,n.jsx)("textarea",{placeholder:"댓글을 작성해주세요",className:"w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500",rows:3}),(0,n.jsx)("div",{className:"flex justify-end mt-2",children:(0,n.jsx)("button",{className:"px-4 py-2 bg-pink-500 text-white rounded-lg",children:"작성하기"})})]}),(0,n.jsx)("div",{className:"space-y-4",children:(0,n.jsxs)("div",{className:"border-b pb-4",children:[(0,n.jsxs)("div",{className:"flex items-center mb-2",children:[(0,n.jsx)("div",{className:"w-8 h-8 rounded-full bg-gray-200 mr-3"}),(0,n.jsxs)("div",{children:[(0,n.jsx)("p",{className:"font-medium",children:"계원123"}),(0,n.jsx)("p",{className:"text-sm text-gray-500",children:"2시간 전"})]})]}),(0,n.jsx)("p",{className:"text-gray-600",children:"재미있게 보고 있습니다!"})]})})]})}};function h(){let{t:e}=(0,c.B)(),[t,s]=(0,r.useState)("intro"),i=[{id:"intro",label:e("tabs.intro")},{id:"videos",label:e("tabs.videos")},{id:"cast",label:e("tabs.cast")},{id:"comments",label:e("tabs.comments")}],a=u[t];return(0,n.jsxs)("div",{className:"min-h-screen",children:[(0,n.jsx)("div",{className:"w-full bg-white border-b",children:(0,n.jsxs)("div",{className:"max-w-6xl mx-auto px-4",children:[(0,n.jsxs)("div",{className:"py-8",children:[(0,n.jsx)("h1",{className:"text-3xl font-bold mb-2",children:e("monthly.title")}),(0,n.jsx)("p",{className:"text-gray-600",children:e("monthly.description")})]}),(0,n.jsx)("div",{className:"flex space-x-1 border-b",children:i.map(e=>{let{id:r,label:i}=e;return(0,n.jsx)("button",{onClick:()=>s(r),className:"px-6 py-3 text-sm font-medium focus:outline-none ".concat(t===r?"border-b-2 border-pink-500 text-pink-600":"text-gray-500 hover:text-gray-700"),children:i},r)})})]})}),(0,n.jsx)("div",{className:"max-w-6xl mx-auto px-4 py-8",children:(0,n.jsx)(a,{})})]})}},297:(e,t,s)=>{"use strict";s.d(t,{B:()=>l});var n=s(3446),r=s(2683);let i=JSON.parse('{"en":{"login":"Sign In","logout":"Sign Out","title":"DDenDDen Community","description":"Good people, Good stories, Good reviews, Let\'s be DDenDDen together","series":{"title":"DDenDDen Series","filter":{"all":"All","ongoing":"Ongoing","ended":"Ended"}},"date":{"present":"Present"},"sidebar":{"category":"Category","sortLabel":"Sort By","periodLabel":"Period","sortOptions":{"latest":"Latest","popular":"Popular","views":"Most Viewed"},"periodOptions":{"all":"All Time","month":"This Month","year":"This Year"}},"monthly":{"title":"Gyewon of the Month","description":"Excuse and spin-off project"},"pinggyego":{"title":"Pinggyego","description":"Food Friends"},"tabs":{"intro":"Introduction","videos":"Videos","cast":"Cast","comments":"Comments"},"navigation":{"home":"Home","about":"About","pinggyego":"Pinggyego","mini-pinggyego":"Mini Pinggyego","pinggyego-live":"Pinggyego Live","monthly":"Gyewon of the Month","award":"Award Ceremony"}},"ko":{"login":"로그인","logout":"로그아웃","title":"뜬뜬 커뮤니티","description":"좋은 사람, 좋은 이야기, 좋은 후기, 우리 뜬뜬한 사이 돼요","series":{"title":"뜬뜬 시리즈","filter":{"all":"전체보기","ongoing":"방영중","ended":"종영"}},"date":{"present":"현재"},"sidebar":{"category":"카테고리","sortLabel":"정렬","periodLabel":"기간","sortOptions":{"latest":"최신순","popular":"인기순","views":"조회수순"},"periodOptions":{"all":"전체 기간","month":"이번 달","year":"이번 해"}},"monthly":{"title":"이달의 계원","description":"핑계고 스핀오프 프로젝트"},"pinggyego":{"title":"핑계고","description":"밥 친구"},"tabs":{"intro":"소개","videos":"동영상","cast":"출연진","comments":"댓글"},"navigation":{"home":"홈","about":"소개","pinggyego":"핑계고","mini-pinggyego":"Mini 핑계고","pinggyego-live":"핑계고 라이브","monthly":" 이달의 계원","award":"시상식"}}}');var a=s(4032);function l(){let e=(0,r.useParams)(),{language:t,setLanguage:s}=(0,a.n)();return(0,n.useEffect)(()=>{(null==e?void 0:e.lang)&&e.lang!==t&&s(e.lang)},[null==e?void 0:e.lang,t,s]),{t:e=>(function(e,t){let s=t.split("."),n=i[e];for(let e of s){if((null==n?void 0:n[e])===void 0)return t;n=n[e]}return n})(t,e),locale:t}}},4032:(e,t,s)=>{"use strict";s.d(t,{n:()=>i});var n=s(2504),r=s(9440);let i=(0,n.v)()((0,r.Zr)(e=>({language:"ko",setLanguage:t=>e({language:t})}),{name:"language-storage"}))},7175:(e,t,s)=>{"use strict";s.d(t,{Y:()=>i,Z:()=>a});var n=s(5663),r=s.n(n);let i=e=>r()(e).format("YYYY. MM. DD."),a=e=>e>=1e4?"".concat(Math.floor(e/1e4),"만"):e>=1e3?"".concat(Math.floor(e/1e3),"천"):e}},e=>{var t=t=>e(e.s=t);e.O(0,[288,898,707,955,358],()=>t(3426)),_N_E=e.O()}]);