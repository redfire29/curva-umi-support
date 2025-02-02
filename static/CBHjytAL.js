import{_ as lt}from"./BHkb1QLb.js";import{u as ft,E as dt,o as X,c as Z,a as x,b as ot,w as it,d as at,k as K,t as ut,g as st,G as pt,H as mt,e as bt,I as vt}from"./DNFiVkXm.js";import{_ as gt}from"./DHC_6SAR.js";const yt={class:"fixed left-0 right-0 top-0 bg-[rgba(255,255,255,0.8)] flex items-center justify-between px-[20px] py-[10px] z-40"},ht={class:"flex items-center"},wt={class:"flex items-center"},xt={class:"px-[10px]"},kt={class:"flex items-center"},_t={__name:"AppHeader",setup(tt){const{setLocale:F,t:y,locale:r}=ft(),n=dt();return(e,i)=>{const p=lt;return X(),Z("header",yt,[x("div",null,[ot(p,{to:K(n)("/")},{default:it(()=>i[2]||(i[2]=[at("Home")])),_:1},8,["to"])]),x("div",ht,[x("ul",wt,[x("li",xt,[ot(p,{class:"text-[#1B4965] block relative after:h-[1px] after:absolute after:top-full after:bg-[#1B4965] after:left-0 after:right-full after:transition-all after:duration-300 md:hover:after:right-0",to:K(n)("/songlist")},{default:it(()=>[at(ut(e.$t("song-list")),1)]),_:1},8,["to"])])]),x("ul",kt,[K(r)!="ja"?(X(),Z("li",{key:0,class:"lang-btn",onClick:i[0]||(i[0]=h=>K(F)("ja"))},i[3]||(i[3]=[x("p",null,"日本語",-1)]))):st("",!0),K(r)!="zh"?(X(),Z("li",{key:1,class:"lang-btn",onClick:i[1]||(i[1]=h=>K(F)("zh"))},i[4]||(i[4]=[x("p",null,"繁中",-1)]))):st("",!0)])])])}}},jt={class:"bg-[#62B6CB] p-[20px_20px] text-[#102355] text-right relative z-20"},Ot={class:"max-w-[1450px] mx-auto"},Mt={class:"flex items-center justify-between max-md:flex-col-reverse"},St={class:"pb-[5px] text-[14px]"},zt={__name:"AppFooter",setup(tt){const F=()=>{window.scroll({top:0,left:0,behavior:"smooth"})};return(y,r)=>(X(),Z("footer",jt,[x("div",Ot,[x("div",{class:"absolute bottom-[calc(100%+10px)] right-[20px] cursor-pointer group z-40 bg-blue-400 rounded-full aspect-square p-[10px] flex items-center justify-center hover:bg-blue-500",onClick:F},r[0]||(r[0]=[x("p",{class:"text-[10px] text-white tracking-widest"},"TOP",-1)])),x("div",Mt,[r[1]||(r[1]=x("a",{class:"group flex items-center max-md:mt-[10px]",href:"https://t.co/oKazNascfC",target:"_blank"},[x("div",{class:"flex items-center justify-center w-[30px] h-[30px] bg-[#CAE9FF] rounded-full md:group-hover:bg-[#1B4965]"},[x("img",{class:"md:group-hover:invert md:group-hover:grayscale w-[16px]",src:gt})]),x("p",null,"うみサポ Discord")],-1)),x("div",St,[x("p",null,ut(y.$t("directions")),1)])])])]))}};var ct={exports:{}};(function(tt,F){(function(y,r){tt.exports=r()})(pt,function(){return function(y){function r(e){if(n[e])return n[e].exports;var i=n[e]={exports:{},id:e,loaded:!1};return y[e].call(i.exports,i,i.exports,r),i.loaded=!0,i.exports}var n={};return r.m=y,r.c=n,r.p="dist/",r(0)}([function(y,r,n){function e(a){return a&&a.__esModule?a:{default:a}}var i=Object.assign||function(a){for(var _=1;_<arguments.length;_++){var N=arguments[_];for(var D in N)Object.prototype.hasOwnProperty.call(N,D)&&(a[D]=N[D])}return a},p=n(1),h=(e(p),n(6)),s=e(h),m=n(7),u=e(m),l=n(8),c=e(l),b=n(9),j=e(b),M=n(10),V=e(M),J=n(11),Q=e(J),R=n(14),Y=e(R),S=[],G=!1,v={offset:120,delay:0,easing:"ease",duration:400,disable:!1,once:!1,startEvent:"DOMContentLoaded",throttleDelay:99,debounceDelay:50,disableMutationObserver:!1},A=function(){var a=arguments.length>0&&arguments[0]!==void 0&&arguments[0];if(a&&(G=!0),G)return S=(0,Q.default)(S,v),(0,V.default)(S,v.once),S},P=function(){S=(0,Y.default)(),A()},o=function(){S.forEach(function(a,_){a.node.removeAttribute("data-aos"),a.node.removeAttribute("data-aos-easing"),a.node.removeAttribute("data-aos-duration"),a.node.removeAttribute("data-aos-delay")})},t=function(a){return a===!0||a==="mobile"&&j.default.mobile()||a==="phone"&&j.default.phone()||a==="tablet"&&j.default.tablet()||typeof a=="function"&&a()===!0},f=function(a){v=i(v,a),S=(0,Y.default)();var _=document.all&&!window.atob;return t(v.disable)||_?o():(v.disableMutationObserver||c.default.isSupported()||(console.info(`
      aos: MutationObserver is not supported on this browser,
      code mutations observing has been disabled.
      You may have to call "refreshHard()" by yourself.
    `),v.disableMutationObserver=!0),document.querySelector("body").setAttribute("data-aos-easing",v.easing),document.querySelector("body").setAttribute("data-aos-duration",v.duration),document.querySelector("body").setAttribute("data-aos-delay",v.delay),v.startEvent==="DOMContentLoaded"&&["complete","interactive"].indexOf(document.readyState)>-1?A(!0):v.startEvent==="load"?window.addEventListener(v.startEvent,function(){A(!0)}):document.addEventListener(v.startEvent,function(){A(!0)}),window.addEventListener("resize",(0,u.default)(A,v.debounceDelay,!0)),window.addEventListener("orientationchange",(0,u.default)(A,v.debounceDelay,!0)),window.addEventListener("scroll",(0,s.default)(function(){(0,V.default)(S,v.once)},v.throttleDelay)),v.disableMutationObserver||c.default.ready("[data-aos]",P),S)};y.exports={init:f,refresh:A,refreshHard:P}},function(y,r){},,,,,function(y,r){(function(n){function e(t,f,a){function _(d){var O=E,B=T;return E=T=void 0,H=d,k=t.apply(B,O)}function N(d){return H=d,w=setTimeout(I,f),C?_(d):k}function D(d){var O=d-z,B=d-H,rt=f-O;return L?P(rt,q-B):rt}function W(d){var O=d-z,B=d-H;return z===void 0||O>=f||O<0||L&&B>=q}function I(){var d=o();return W(d)?et(d):void(w=setTimeout(I,D(d)))}function et(d){return w=void 0,g&&E?_(d):(E=T=void 0,k)}function nt(){w!==void 0&&clearTimeout(w),H=0,E=z=T=w=void 0}function U(){return w===void 0?k:et(o())}function $(){var d=o(),O=W(d);if(E=arguments,T=this,z=d,O){if(w===void 0)return N(z);if(L)return w=setTimeout(I,f),_(z)}return w===void 0&&(w=setTimeout(I,f)),k}var E,T,q,k,w,z,H=0,C=!1,L=!1,g=!0;if(typeof t!="function")throw new TypeError(l);return f=m(f)||0,p(a)&&(C=!!a.leading,L="maxWait"in a,q=L?A(m(a.maxWait)||0,f):q,g="trailing"in a?!!a.trailing:g),$.cancel=nt,$.flush=U,$}function i(t,f,a){var _=!0,N=!0;if(typeof t!="function")throw new TypeError(l);return p(a)&&(_="leading"in a?!!a.leading:_,N="trailing"in a?!!a.trailing:N),e(t,f,{leading:_,maxWait:f,trailing:N})}function p(t){var f=typeof t>"u"?"undefined":u(t);return!!t&&(f=="object"||f=="function")}function h(t){return!!t&&(typeof t>"u"?"undefined":u(t))=="object"}function s(t){return(typeof t>"u"?"undefined":u(t))=="symbol"||h(t)&&v.call(t)==b}function m(t){if(typeof t=="number")return t;if(s(t))return c;if(p(t)){var f=typeof t.valueOf=="function"?t.valueOf():t;t=p(f)?f+"":f}if(typeof t!="string")return t===0?t:+t;t=t.replace(j,"");var a=V.test(t);return a||J.test(t)?Q(t.slice(2),a?2:8):M.test(t)?c:+t}var u=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},l="Expected a function",c=NaN,b="[object Symbol]",j=/^\s+|\s+$/g,M=/^[-+]0x[0-9a-f]+$/i,V=/^0b[01]+$/i,J=/^0o[0-7]+$/i,Q=parseInt,R=(typeof n>"u"?"undefined":u(n))=="object"&&n&&n.Object===Object&&n,Y=(typeof self>"u"?"undefined":u(self))=="object"&&self&&self.Object===Object&&self,S=R||Y||Function("return this")(),G=Object.prototype,v=G.toString,A=Math.max,P=Math.min,o=function(){return S.Date.now()};y.exports=i}).call(r,function(){return this}())},function(y,r){(function(n){function e(o,t,f){function a(g){var d=$,O=E;return $=E=void 0,z=g,q=o.apply(O,d)}function _(g){return z=g,k=setTimeout(W,t),H?a(g):q}function N(g){var d=g-w,O=g-z,B=t-d;return C?A(B,T-O):B}function D(g){var d=g-w,O=g-z;return w===void 0||d>=t||d<0||C&&O>=T}function W(){var g=P();return D(g)?I(g):void(k=setTimeout(W,N(g)))}function I(g){return k=void 0,L&&$?a(g):($=E=void 0,q)}function et(){k!==void 0&&clearTimeout(k),z=0,$=w=E=k=void 0}function nt(){return k===void 0?q:I(P())}function U(){var g=P(),d=D(g);if($=arguments,E=this,w=g,d){if(k===void 0)return _(w);if(C)return k=setTimeout(W,t),a(w)}return k===void 0&&(k=setTimeout(W,t)),q}var $,E,T,q,k,w,z=0,H=!1,C=!1,L=!0;if(typeof o!="function")throw new TypeError(u);return t=s(t)||0,i(f)&&(H=!!f.leading,C="maxWait"in f,T=C?v(s(f.maxWait)||0,t):T,L="trailing"in f?!!f.trailing:L),U.cancel=et,U.flush=nt,U}function i(o){var t=typeof o>"u"?"undefined":m(o);return!!o&&(t=="object"||t=="function")}function p(o){return!!o&&(typeof o>"u"?"undefined":m(o))=="object"}function h(o){return(typeof o>"u"?"undefined":m(o))=="symbol"||p(o)&&G.call(o)==c}function s(o){if(typeof o=="number")return o;if(h(o))return l;if(i(o)){var t=typeof o.valueOf=="function"?o.valueOf():o;o=i(t)?t+"":t}if(typeof o!="string")return o===0?o:+o;o=o.replace(b,"");var f=M.test(o);return f||V.test(o)?J(o.slice(2),f?2:8):j.test(o)?l:+o}var m=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(o){return typeof o}:function(o){return o&&typeof Symbol=="function"&&o.constructor===Symbol&&o!==Symbol.prototype?"symbol":typeof o},u="Expected a function",l=NaN,c="[object Symbol]",b=/^\s+|\s+$/g,j=/^[-+]0x[0-9a-f]+$/i,M=/^0b[01]+$/i,V=/^0o[0-7]+$/i,J=parseInt,Q=(typeof n>"u"?"undefined":m(n))=="object"&&n&&n.Object===Object&&n,R=(typeof self>"u"?"undefined":m(self))=="object"&&self&&self.Object===Object&&self,Y=Q||R||Function("return this")(),S=Object.prototype,G=S.toString,v=Math.max,A=Math.min,P=function(){return Y.Date.now()};y.exports=e}).call(r,function(){return this}())},function(y,r){function n(m){var u=void 0,l=void 0;for(u=0;u<m.length;u+=1)if(l=m[u],l.dataset&&l.dataset.aos||l.children&&n(l.children))return!0;return!1}function e(){return window.MutationObserver||window.WebKitMutationObserver||window.MozMutationObserver}function i(){return!!e()}function p(m,u){var l=window.document,c=e(),b=new c(h);s=u,b.observe(l.documentElement,{childList:!0,subtree:!0,removedNodes:!0})}function h(m){m&&m.forEach(function(u){var l=Array.prototype.slice.call(u.addedNodes),c=Array.prototype.slice.call(u.removedNodes),b=l.concat(c);if(n(b))return s()})}Object.defineProperty(r,"__esModule",{value:!0});var s=function(){};r.default={isSupported:i,ready:p}},function(y,r){function n(l,c){if(!(l instanceof c))throw new TypeError("Cannot call a class as a function")}function e(){return navigator.userAgent||navigator.vendor||window.opera||""}Object.defineProperty(r,"__esModule",{value:!0});var i=function(){function l(c,b){for(var j=0;j<b.length;j++){var M=b[j];M.enumerable=M.enumerable||!1,M.configurable=!0,"value"in M&&(M.writable=!0),Object.defineProperty(c,M.key,M)}}return function(c,b,j){return b&&l(c.prototype,b),j&&l(c,j),c}}(),p=/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i,h=/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i,s=/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i,m=/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i,u=function(){function l(){n(this,l)}return i(l,[{key:"phone",value:function(){var c=e();return!(!p.test(c)&&!h.test(c.substr(0,4)))}},{key:"mobile",value:function(){var c=e();return!(!s.test(c)&&!m.test(c.substr(0,4)))}},{key:"tablet",value:function(){return this.mobile()&&!this.phone()}}]),l}();r.default=new u},function(y,r){Object.defineProperty(r,"__esModule",{value:!0});var n=function(i,p,h){var s=i.node.getAttribute("data-aos-once");p>i.position?i.node.classList.add("aos-animate"):typeof s<"u"&&(s==="false"||!h&&s!=="true")&&i.node.classList.remove("aos-animate")},e=function(i,p){var h=window.pageYOffset,s=window.innerHeight;i.forEach(function(m,u){n(m,s+h,p)})};r.default=e},function(y,r,n){function e(s){return s&&s.__esModule?s:{default:s}}Object.defineProperty(r,"__esModule",{value:!0});var i=n(12),p=e(i),h=function(s,m){return s.forEach(function(u,l){u.node.classList.add("aos-init"),u.position=(0,p.default)(u.node,m.offset)}),s};r.default=h},function(y,r,n){function e(s){return s&&s.__esModule?s:{default:s}}Object.defineProperty(r,"__esModule",{value:!0});var i=n(13),p=e(i),h=function(s,m){var u=0,l=0,c=window.innerHeight,b={offset:s.getAttribute("data-aos-offset"),anchor:s.getAttribute("data-aos-anchor"),anchorPlacement:s.getAttribute("data-aos-anchor-placement")};switch(b.offset&&!isNaN(b.offset)&&(l=parseInt(b.offset)),b.anchor&&document.querySelectorAll(b.anchor)&&(s=document.querySelectorAll(b.anchor)[0]),u=(0,p.default)(s).top,b.anchorPlacement){case"top-bottom":break;case"center-bottom":u+=s.offsetHeight/2;break;case"bottom-bottom":u+=s.offsetHeight;break;case"top-center":u+=c/2;break;case"bottom-center":u+=c/2+s.offsetHeight;break;case"center-center":u+=c/2+s.offsetHeight/2;break;case"top-top":u+=c;break;case"bottom-top":u+=s.offsetHeight+c;break;case"center-top":u+=s.offsetHeight/2+c}return b.anchorPlacement||b.offset||isNaN(m)||(l=m),u+l};r.default=h},function(y,r){Object.defineProperty(r,"__esModule",{value:!0});var n=function(e){for(var i=0,p=0;e&&!isNaN(e.offsetLeft)&&!isNaN(e.offsetTop);)i+=e.offsetLeft-(e.tagName!="BODY"?e.scrollLeft:0),p+=e.offsetTop-(e.tagName!="BODY"?e.scrollTop:0),e=e.offsetParent;return{top:p,left:i}};r.default=n},function(y,r){Object.defineProperty(r,"__esModule",{value:!0});var n=function(e){return e=e||document.querySelectorAll("[data-aos]"),Array.prototype.map.call(e,function(i){return{node:i}})};r.default=n}])})})(ct);var Et=ct.exports;const At=mt(Et),Nt={class:"flex flex-col h-full text-[#1B4965]"},$t={class:"flex-1"},Tt={class:"w-full mx-auto"},Dt={__name:"default",setup(tt){return bt(()=>{At.init()}),(F,y)=>{const r=_t,n=zt;return X(),Z("div",Nt,[ot(r),x("div",$t,[x("div",Tt,[vt(F.$slots,"default")])]),ot(n)])}}};export{Dt as default};
