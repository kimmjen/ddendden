(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[520],{7758:(e,t,r)=>{Promise.resolve().then(r.bind(r,6107))},2683:(e,t,r)=>{"use strict";var n=r(435);r.o(n,"useParams")&&r.d(t,{useParams:function(){return n.useParams}}),r.o(n,"usePathname")&&r.d(t,{usePathname:function(){return n.usePathname}}),r.o(n,"useRouter")&&r.d(t,{useRouter:function(){return n.useRouter}})},6107:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>l});var n=r(5878),s=r(3446),a=r(2683),i=r(6182);function l(){let e=(0,a.useRouter)(),t=(0,i.n)(e=>e.login),[r,l]=(0,s.useState)({email:"",password:""}),[u,o]=(0,s.useState)(""),d=async n=>{n.preventDefault();try{let n=await fetch("/api/auth/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)}),s=await n.json();if(s.success)switch(t(s.user),s.user.type){case"superAdmin":e.push("/admin-super");break;case"admin":e.push("/admin");break;default:e.push("/")}else o(s.message)}catch(e){o("로그인 처리 중 오류가 발생했습니다.")}};return(0,n.jsx)("div",{className:"min-h-screen flex items-center justify-center",children:(0,n.jsxs)("div",{className:"w-[400px] p-8",children:[(0,n.jsx)("h2",{className:"text-2xl font-bold mb-8 text-center",children:"로그인"}),u&&(0,n.jsx)("div",{className:"bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4",children:u}),(0,n.jsxs)("form",{onSubmit:d,className:"space-y-4",children:[(0,n.jsxs)("div",{children:[(0,n.jsx)("label",{className:"block text-sm mb-2",children:"이메일"}),(0,n.jsx)("input",{type:"email",className:"w-full p-2 border rounded",value:r.email,onChange:e=>l({...r,email:e.target.value})})]}),(0,n.jsxs)("div",{children:[(0,n.jsx)("label",{className:"block text-sm mb-2",children:"비밀번호"}),(0,n.jsx)("input",{type:"password",className:"w-full p-2 border rounded",value:r.password,onChange:e=>l({...r,password:e.target.value})})]}),(0,n.jsx)("button",{type:"submit",className:"w-full bg-[#ff6b6b] text-white py-2 rounded mt-4",children:"로그인"})]})]})})}},6182:(e,t,r)=>{"use strict";r.d(t,{n:()=>a});var n=r(2504),s=r(9440);let a=(0,n.v)()((0,s.Zr)(e=>({user:null,isAuthenticated:!1,login:t=>e({user:t,isAuthenticated:!0}),logout:()=>e({user:null,isAuthenticated:!1})}),{name:"auth-storage"}))},9440:(e,t,r)=>{"use strict";r.d(t,{Zr:()=>s});let n=e=>t=>{try{let r=e(t);if(r instanceof Promise)return r;return{then:e=>n(e)(r),catch(e){return this}}}catch(e){return{then(e){return this},catch:t=>n(t)(e)}}},s=(e,t)=>(r,s,a)=>{let i,l={storage:function(e,t){let r;try{r=e()}catch(e){return}return{getItem:e=>{var t;let n=e=>null===e?null:JSON.parse(e,void 0),s=null!=(t=r.getItem(e))?t:null;return s instanceof Promise?s.then(n):n(s)},setItem:(e,t)=>r.setItem(e,JSON.stringify(t,void 0)),removeItem:e=>r.removeItem(e)}}(()=>localStorage),partialize:e=>e,version:0,merge:(e,t)=>({...t,...e}),...t},u=!1,o=new Set,d=new Set,c=l.storage;if(!c)return e((...e)=>{console.warn(`[zustand persist middleware] Unable to update item '${l.name}', the given storage is currently unavailable.`),r(...e)},s,a);let m=()=>{let e=l.partialize({...s()});return c.setItem(l.name,{state:e,version:l.version})},h=a.setState;a.setState=(e,t)=>{h(e,t),m()};let f=e((...e)=>{r(...e),m()},s,a);a.getInitialState=()=>f;let p=()=>{var e,t;if(!c)return;u=!1,o.forEach(e=>{var t;return e(null!=(t=s())?t:f)});let a=(null==(t=l.onRehydrateStorage)?void 0:t.call(l,null!=(e=s())?e:f))||void 0;return n(c.getItem.bind(c))(l.name).then(e=>{if(e){if("number"!=typeof e.version||e.version===l.version)return[!1,e.state];if(l.migrate){let t=l.migrate(e.state,e.version);return t instanceof Promise?t.then(e=>[!0,e]):[!0,t]}console.error("State loaded from storage couldn't be migrated since no migrate function was provided")}return[!1,void 0]}).then(e=>{var t;let[n,a]=e;if(r(i=l.merge(a,null!=(t=s())?t:f),!0),n)return m()}).then(()=>{null==a||a(i,void 0),i=s(),u=!0,d.forEach(e=>e(i))}).catch(e=>{null==a||a(void 0,e)})};return a.persist={setOptions:e=>{l={...l,...e},e.storage&&(c=e.storage)},clearStorage:()=>{null==c||c.removeItem(l.name)},getOptions:()=>l,rehydrate:()=>p(),hasHydrated:()=>u,onHydrate:e=>(o.add(e),()=>{o.delete(e)}),onFinishHydration:e=>(d.add(e),()=>{d.delete(e)})},l.skipHydration||p(),i||f}},2504:(e,t,r)=>{"use strict";r.d(t,{v:()=>u});var n=r(3446);let s=e=>{let t;let r=new Set,n=(e,n)=>{let s="function"==typeof e?e(t):e;if(!Object.is(s,t)){let e=t;t=(null!=n?n:"object"!=typeof s||null===s)?s:Object.assign({},t,s),r.forEach(r=>r(t,e))}},s=()=>t,a={setState:n,getState:s,getInitialState:()=>i,subscribe:e=>(r.add(e),()=>r.delete(e))},i=t=e(n,s,a);return a},a=e=>e?s(e):s,i=e=>e,l=e=>{let t=a(e),r=e=>(function(e,t=i){let r=n.useSyncExternalStore(e.subscribe,()=>t(e.getState()),()=>t(e.getInitialState()));return n.useDebugValue(r),r})(t,e);return Object.assign(r,t),r},u=e=>e?l(e):l}},e=>{var t=t=>e(e.s=t);e.O(0,[707,955,358],()=>t(7758)),_N_E=e.O()}]);