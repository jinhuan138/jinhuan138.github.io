import{s as G,w as X,x as Y,h as k,d as m,j as d,i as b,r as w,u as F,D as se,f as A,g as R,B as z,F as Z,G as le,H as ne,I as ae,J as ce,S as re,l as M,a as N,m as j,c as O,n as ue,Q as me,e as q,P as x}from"./scheduler.0543d4e7.js";import{S as H,i as J,a as $,t as v,b as V,d as W,m as B,k as _e,e as P,g as oe,c as fe}from"./index.e5411902.js";import{t as S}from"./Link.svelte_svelte_type_style_lang.ea3ae61b.js";import{f as pe}from"./Link.e6a56650.js";import{C as de}from"./0.023ea066.js";const $e=()=>({needRefresh:!1,updateServiceWorker:!1,offlineReady:!1});function he(a){let t,l;return{c(){t=X("svg"),l=X("path"),this.h()},l(e){t=Y(e,"svg",{xmlns:!0,width:!0,height:!0,viewBox:!0});var s=k(t);l=Y(s,"path",{fill:!0,d:!0}),k(l).forEach(m),s.forEach(m),this.h()},h(){d(l,"fill","currentColor"),d(l,"d","M10 3v2a5 5 0 0 0-3.54 8.54l-1.41 1.41A7 7 0 0 1 10 3zm4.95 2.05A7 7 0 0 1 10 17v-2a5 5 0 0 0 3.54-8.54l1.41-1.41zM10 20l-4-4l4-4v8zm0-12V0l4 4l-4 4z"),d(t,"xmlns","http://www.w3.org/2000/svg"),d(t,"width","1em"),d(t,"height","1em"),d(t,"viewBox","0 0 20 20")},m(e,s){b(e,t,s),w(t,l)},p:F,i:F,o:F,d(e){e&&m(t)}}}class ve extends H{constructor(t){super(),J(this,t,null,he,G,{})}}function ge(a){let t,l,e,s;const n=a[3].default,f=se(n,a,a[2],null);return{c(){t=A("div"),f&&f.c(),this.h()},l(r){t=R(r,"DIV",{role:!0,class:!0,tabindex:!0});var i=k(t);f&&f.l(i),i.forEach(m),this.h()},h(){d(t,"role","button"),d(t,"class","btn svelte-1btitu1"),d(t,"tabindex","0"),z(t,"primary",!a[0]),z(t,"flat",a[0])},m(r,i){b(r,t,i),f&&f.m(t,null),l=!0,e||(s=[Z(t,"click",a[1]),Z(t,"keyup",a[1])],e=!0)},p(r,[i]){f&&f.p&&(!l||i&4)&&le(f,n,r,r[2],l?ae(n,r[2],i,null):ne(r[2]),null),(!l||i&1)&&z(t,"primary",!r[0]),(!l||i&1)&&z(t,"flat",r[0])},i(r){l||($(f,r),l=!0)},o(r){v(f,r),l=!1},d(r){r&&m(t),f&&f.d(r),e=!1,ce(s)}}}function we(a,t,l){let{$$slots:e={},$$scope:s}=t,{flat:n=!1}=t;const f=re();function r(){f("click")}return a.$$set=i=>{"flat"in i&&l(0,n=i.flat),"$$scope"in i&&l(2,s=i.$$scope)},[n,r,s,e]}class ie extends H{constructor(t){super(),J(this,t,we,ge,G,{flat:0})}}function be(a){var f,r,i;let t=(((i=(r=(f=S)==null?void 0:f.i18n)==null?void 0:r.pwa)==null?void 0:i.close)||Ae)+"",l,e,s,n;return s=new de({}),{c(){l=M(t),e=N(),V(s.$$.fragment)},l(o){l=j(o,t),e=O(o),W(s.$$.fragment,o)},m(o,u){b(o,l,u),b(o,e,u),B(s,o,u),n=!0},p:F,i(o){n||($(s.$$.fragment,o),n=!0)},o(o){v(s.$$.fragment,o),n=!1},d(o){o&&(m(l),m(e)),P(s,o)}}}function ke(a){var T,L,I;let t,l,e=(((I=(L=(T=S)==null?void 0:T.i18n)==null?void 0:L.pwa)==null?void 0:I.tip)||Ee)+"",s,n,f,r,i,o,u,D,h,C,g;const E=a[2].default,_=se(E,a,a[3],null);return h=new ie({props:{flat:!0,$$slots:{default:[be]},$$scope:{ctx:a}}}),h.$on("click",a[1]),{c(){t=A("div"),l=A("div"),s=M(e),n=N(),f=A("div"),r=A("span"),i=M(a[0]),o=N(),u=A("div"),_&&_.c(),D=N(),V(h.$$.fragment),this.h()},l(c){t=R(c,"DIV",{class:!0,role:!0});var p=k(t);l=R(p,"DIV",{class:!0});var y=k(l);s=j(y,e),y.forEach(m),n=O(p),f=R(p,"DIV",{class:!0});var K=k(f);r=R(K,"SPAN",{});var Q=k(r);i=j(Q,a[0]),Q.forEach(m),K.forEach(m),o=O(p),u=R(p,"DIV",{class:!0});var U=k(u);_&&_.l(U),D=O(U),W(h.$$.fragment,U),U.forEach(m),p.forEach(m),this.h()},h(){d(l,"class","pwa-title svelte-d5pmgn"),d(f,"class","message svelte-d5pmgn"),d(u,"class","actions svelte-d5pmgn"),d(t,"class","pwa-toast svelte-d5pmgn"),d(t,"role","alert")},m(c,p){b(c,t,p),w(t,l),w(l,s),w(t,n),w(t,f),w(f,r),w(r,i),w(t,o),w(t,u),_&&_.m(u,null),w(u,D),B(h,u,null),g=!0},p(c,[p]){(!g||p&1)&&ue(i,c[0]),_&&_.p&&(!g||p&8)&&le(_,E,c,c[3],g?ae(E,c[3],p,null):ne(c[3]),null);const y={};p&8&&(y.$$scope={dirty:p,ctx:c}),h.$set(y)},i(c){g||($(_,c),$(h.$$.fragment,c),c&&(C||me(()=>{C=_e(t,pe,{}),C.start()})),g=!0)},o(c){v(_,c),v(h.$$.fragment,c),g=!1},d(c){c&&m(t),_&&_.d(c),P(h)}}}const Ee="Tip",Ae="Close";function Re(a,t,l){let{$$slots:e={},$$scope:s}=t,{message:n}=t;const f=re();function r(){f("close")}return a.$$set=i=>{"message"in i&&l(0,n=i.message),"$$scope"in i&&l(3,s=i.$$scope)},[n,r,e,s]}class De extends H{constructor(t){super(),J(this,t,Re,ke,G,{message:0})}}function ee(a){let t,l;return t=new De({props:{message:a[1],$$slots:{default:[Te]},$$scope:{ctx:a}}}),t.$on("close",a[6]),{c(){V(t.$$.fragment)},l(e){W(t.$$.fragment,e)},m(e,s){B(t,e,s),l=!0},p(e,s){const n={};s&2&&(n.message=e[1]),s&2049&&(n.$$scope={dirty:s,ctx:e}),t.$set(n)},i(e){l||($(t.$$.fragment,e),l=!0)},o(e){v(t.$$.fragment,e),l=!1},d(e){P(t,e)}}}function te(a){let t,l;return t=new ie({props:{$$slots:{default:[Ce]},$$scope:{ctx:a}}}),t.$on("click",a[8]),{c(){V(t.$$.fragment)},l(e){W(t.$$.fragment,e)},m(e,s){B(t,e,s),l=!0},p(e,s){const n={};s&2048&&(n.$$scope={dirty:s,ctx:e}),t.$set(n)},i(e){l||($(t.$$.fragment,e),l=!0)},o(e){v(t.$$.fragment,e),l=!1},d(e){P(t,e)}}}function Ce(a){var f,r,i;let t=(((i=(r=(f=S)==null?void 0:f.i18n)==null?void 0:r.pwa)==null?void 0:i.reload)||Fe)+"",l,e,s,n;return s=new ve({}),{c(){l=M(t),e=N(),V(s.$$.fragment)},l(o){l=j(o,t),e=O(o),W(s.$$.fragment,o)},m(o,u){b(o,l,u),b(o,e,u),B(s,o,u),n=!0},p:F,i(o){n||($(s.$$.fragment,o),n=!0)},o(o){v(s.$$.fragment,o),n=!1},d(o){o&&(m(l),m(e)),P(s,o)}}}function Te(a){let t,l,e=a[0]&&te(a);return{c(){e&&e.c(),t=q()},l(s){e&&e.l(s),t=q()},m(s,n){e&&e.m(s,n),b(s,t,n),l=!0},p(s,n){s[0]?e?(e.p(s,n),n&1&&$(e,1)):(e=te(s),e.c(),$(e,1),e.m(t.parentNode,t)):e&&(oe(),v(e,1,1,()=>{e=null}),fe())},i(s){l||($(e),l=!0)},o(s){v(e),l=!1},d(s){s&&m(t),e&&e.d(s)}}}function Le(a){let t,l,e=a[2]&&ee(a);return{c(){e&&e.c(),t=q()},l(s){e&&e.l(s),t=q()},m(s,n){e&&e.m(s,n),b(s,t,n),l=!0},p(s,[n]){s[2]?e?(e.p(s,n),n&4&&$(e,1)):(e=ee(s),e.c(),$(e,1),e.m(t.parentNode,t)):e&&(oe(),v(e,1,1,()=>{e=null}),fe())},i(s){l||($(e),l=!0)},o(s){v(e),l=!1},d(s){s&&m(t),e&&e.d(s)}}}const Ie="App ready to work offline",ye="New content available, click on reload button to update",Fe="Reload";function Ne(a,t,l){var g,E,_,T,L,I;let e,s,n,f;const{needRefresh:r,updateServiceWorker:i,offlineReady:o}=$e();x(a,r,c=>l(0,f=c)),x(a,o,c=>l(7,n=c));function u(){o.set(!1),r.set(!1)}const D=((_=(E=(g=S)==null?void 0:g.i18n)==null?void 0:E.pwa)==null?void 0:_.appReadyToWorkOffline)||Ie,h=((I=(L=(T=S)==null?void 0:T.i18n)==null?void 0:L.pwa)==null?void 0:I.newContentAvailable)||ye,C=()=>i(!0);return a.$$.update=()=>{a.$$.dirty&129&&l(2,e=n||f),a.$$.dirty&128&&l(1,s=n?D:h)},[f,s,e,r,i,o,u,n,C]}class Pe extends H{constructor(t){super(),J(this,t,Ne,Le,G,{})}}export{Pe as default};
