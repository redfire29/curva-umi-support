import{_ as d}from"./BuVhmpWz.js";import{u as f,B as m,o as a,c as i,a as t,b as p,w as _,d as x,q as r,F as g,p as b,t as v,C as h,_ as w}from"./DsuFhlXZ.js";const $={class:"fixed left-0 right-0 top-0 bg-[rgba(255,255,255,0.5)] flex items-center justify-between px-[20px] py-[10px] z-40"},k={class:"flex items-center"},C={class:"flex items-center"},y={class:"px-[10px]"},A={class:"flex items-center"},L={__name:"AppHeader",setup(c){const{setLocale:o}=f(),l=m(),e=[{url:"/songlist",title:"Song List"}];return(P,s)=>{const u=d;return a(),i("header",$,[t("div",null,[p(u,{to:r(l)("/")},{default:_(()=>s[2]||(s[2]=[x("LOGO")])),_:1},8,["to"])]),t("div",k,[t("ul",C,[(a(),i(g,null,b(e,n=>t("li",y,[p(u,{to:r(l)(n.url)},{default:_(()=>[x(v(n.title),1)]),_:2},1032,["to"])])),64))]),t("ul",A,[t("li",{class:"lang-btn",onClick:s[0]||(s[0]=n=>r(o)("ja"))},s[3]||(s[3]=[t("p",null,"日本語",-1)])),t("li",{class:"lang-btn",onClick:s[1]||(s[1]=n=>r(o)("zh"))},s[4]||(s[4]=[t("p",null,"繁中",-1)]))])])])}}},z={class:"bg-[#8cc2ec] p-[10px_20px] text-[#102355] text-right relative z-20"},B={__name:"AppFooter",setup(c){const o=()=>{window.scroll({top:0,left:0,behavior:"smooth"})};return(l,e)=>(a(),i("footer",z,[t("div",{class:"max-w-[1450px] mx-auto"},[t("div",{class:"absolute bottom-full right-[20px] cursor-pointer group z-40 bg-blue-400 rounded-full aspect-square p-[10px] flex items-center justify-center hover:bg-blue-500",onClick:o},e[0]||(e[0]=[t("p",{class:"text-[10px] text-white tracking-widest"},"TOP",-1)])),e[1]||(e[1]=t("div",{class:"pb-[5px] text-[14px]"},[t("p",null,"以上圖片皆有經過持有者的同意才使用")],-1)),e[2]||(e[2]=t("p",{class:"text-[12px]"},"Copyright © 2024 DIANAxAKKO",-1))])]))}},N={class:"flex flex-col h-full"},O={class:"flex-1"},j={class:"w-full mx-auto"};function F(c,o){const l=L,e=B;return a(),i("div",N,[p(l),t("div",O,[t("div",j,[h(c.$slots,"default")])]),p(e)])}const I={},V=w(I,[["render",F]]);export{V as default};