import{_ as x}from"./WV0dbsHo.js";import{u as m,o as s,c as l,a as e,b as r,w as p,d as c,n as d,F as $,p as g,t as v,_ as f,q as b}from"./DhrqIJt8.js";const k={class:"fixed left-0 right-0 top-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-between px-[20px] py-[10px]"},h={class:"flex items-center"},w={class:"px-[10px]"},A={__name:"AppHeader",setup(a){const{setLocale:n}=m(),_=[{url:"/about",title:"About"},{url:"/songlist",title:"Song List"}];return(i,t)=>{const u=x;return s(),l("header",k,[e("div",null,[r(u,{to:"/"},{default:p(()=>t[2]||(t[2]=[c("LOGO")])),_:1})]),e("div",{onClick:t[0]||(t[0]=o=>d(n)("ja"))},t[3]||(t[3]=[e("p",null,"JA",-1)])),e("div",{onClick:t[1]||(t[1]=o=>d(n)("zh"))},t[4]||(t[4]=[e("p",null,"ZH",-1)])),e("ul",h,[(s(),l($,null,g(_,o=>e("li",w,[r(u,{to:o.url},{default:p(()=>[c(v(o.title),1)]),_:2},1032,["to"])])),64))])])}}};function F(a,n){return s(),l("footer",null,n[0]||(n[0]=[e("h1",null,"Footer",-1)]))}const L={},j=Object.assign(f(L,[["render",F]]),{__name:"AppFooter"}),y={class:"flex flex-col h-full"},B={class:"flex-1 pt-[50px]"},C={class:"w-full mx-auto"};function N(a,n){const _=A,i=j;return s(),l("div",y,[r(_),e("div",B,[e("div",C,[b(a.$slots,"default")])]),r(i)])}const O={},H=f(O,[["render",N]]);export{H as default};
