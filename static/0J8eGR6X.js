var S=typeof global=="object"&&global&&global.Object===Object&&global,U=typeof self=="object"&&self&&self.Object===Object&&self,$=S||U||Function("return this")(),g=$.Symbol,w=Object.prototype,R=w.hasOwnProperty,G=w.toString,u=g?g.toStringTag:void 0;function L(r){var t=R.call(r,u),e=r[u];try{r[u]=void 0;var o=!0}catch{}var i=G.call(r);return o&&(t?r[u]=e:delete r[u]),i}var _=Object.prototype,q=_.toString;function C(r){return q.call(r)}var K="[object Null]",X="[object Undefined]",m=g?g.toStringTag:void 0;function y(r){return r==null?r===void 0?X:K:m&&m in Object(r)?L(r):C(r)}function j(r){return r!=null&&typeof r=="object"}var D="[object Symbol]";function V(r){return typeof r=="symbol"||j(r)&&y(r)==D}var P=Array.isArray,W=/\s/;function k(r){for(var t=r.length;t--&&W.test(r.charAt(t)););return t}var H=/^\s+/;function Y(r){return r&&r.slice(0,k(r)+1).replace(H,"")}function T(r){var t=typeof r;return r!=null&&(t=="object"||t=="function")}var l=NaN,z=/^[-+]0x[0-9a-f]+$/i,J=/^0b[01]+$/i,Q=/^0o[0-7]+$/i,Z=parseInt;function rr(r){if(typeof r=="number")return r;if(V(r))return l;if(T(r)){var t=typeof r.valueOf=="function"?r.valueOf():r;r=T(t)?t+"":t}if(typeof r!="string")return r===0?r:+r;r=Y(r);var e=J.test(r);return e||Q.test(r)?Z(r.slice(2),e?2:8):z.test(r)?l:+r}var A=1/0,tr=17976931348623157e292;function gt(r){if(!r)return r===0?r:0;if(r=rr(r),r===A||r===-A){var t=r<0?-1:1;return t*tr}return r===r?r:0}function er(r){return r}var nr="[object AsyncFunction]",or="[object Function]",ar="[object GeneratorFunction]",ir="[object Proxy]";function sr(r){if(!T(r))return!1;var t=y(r);return t==or||t==ar||t==nr||t==ir}function fr(r,t){for(var e=-1,o=r==null?0:r.length;++e<o&&t(r[e],e,r)!==!1;);return r}var cr=9007199254740991,ur=/^(?:0|[1-9]\d*)$/;function br(r,t){var e=typeof r;return t=t??cr,!!t&&(e=="number"||e!="symbol"&&ur.test(r))&&r>-1&&r%1==0&&r<t}function yt(r,t){return r===t||r!==r&&t!==t}var pr=9007199254740991;function v(r){return typeof r=="number"&&r>-1&&r%1==0&&r<=pr}function F(r){return r!=null&&v(r.length)&&!sr(r)}var gr=Object.prototype;function yr(r){var t=r&&r.constructor,e=typeof t=="function"&&t.prototype||gr;return r===e}function jr(r,t){for(var e=-1,o=Array(r);++e<r;)o[e]=t(e);return o}var dr="[object Arguments]";function h(r){return j(r)&&y(r)==dr}var B=Object.prototype,Tr=B.hasOwnProperty,mr=B.propertyIsEnumerable,lr=h(function(){return arguments}())?h:function(r){return j(r)&&Tr.call(r,"callee")&&!mr.call(r,"callee")};function Ar(){return!1}var N=typeof exports=="object"&&exports&&!exports.nodeType&&exports,O=N&&typeof module=="object"&&module&&!module.nodeType&&module,hr=O&&O.exports===N,x=hr?$.Buffer:void 0,Or=x?x.isBuffer:void 0,xr=Or||Ar,Ir="[object Arguments]",Er="[object Array]",Sr="[object Boolean]",$r="[object Date]",wr="[object Error]",Pr="[object Function]",vr="[object Map]",Fr="[object Number]",Br="[object Object]",Nr="[object RegExp]",Mr="[object Set]",Ur="[object String]",Rr="[object WeakMap]",Gr="[object ArrayBuffer]",Lr="[object DataView]",_r="[object Float32Array]",qr="[object Float64Array]",Cr="[object Int8Array]",Kr="[object Int16Array]",Xr="[object Int32Array]",Dr="[object Uint8Array]",Vr="[object Uint8ClampedArray]",Wr="[object Uint16Array]",kr="[object Uint32Array]",n={};n[_r]=n[qr]=n[Cr]=n[Kr]=n[Xr]=n[Dr]=n[Vr]=n[Wr]=n[kr]=!0;n[Ir]=n[Er]=n[Gr]=n[Sr]=n[Lr]=n[$r]=n[wr]=n[Pr]=n[vr]=n[Fr]=n[Br]=n[Nr]=n[Mr]=n[Ur]=n[Rr]=!1;function Hr(r){return j(r)&&v(r.length)&&!!n[y(r)]}function Yr(r){return function(t){return r(t)}}var M=typeof exports=="object"&&exports&&!exports.nodeType&&exports,b=M&&typeof module=="object"&&module&&!module.nodeType&&module,zr=b&&b.exports===M,d=zr&&S.process,I=function(){try{var r=b&&b.require&&b.require("util").types;return r||d&&d.binding&&d.binding("util")}catch{}}(),E=I&&I.isTypedArray,Jr=E?Yr(E):Hr,Qr=Object.prototype,Zr=Qr.hasOwnProperty;function rt(r,t){var e=P(r),o=!e&&lr(r),i=!e&&!o&&xr(r),a=!e&&!o&&!i&&Jr(r),f=e||o||i||a,c=f?jr(r.length,String):[],p=c.length;for(var s in r)Zr.call(r,s)&&!(f&&(s=="length"||i&&(s=="offset"||s=="parent")||a&&(s=="buffer"||s=="byteLength"||s=="byteOffset")||br(s,p)))&&c.push(s);return c}function tt(r,t){return function(e){return r(t(e))}}var et=tt(Object.keys,Object),nt=Object.prototype,ot=nt.hasOwnProperty;function at(r){if(!yr(r))return et(r);var t=[];for(var e in Object(r))ot.call(r,e)&&e!="constructor"&&t.push(e);return t}function it(r){return F(r)?rt(r):at(r)}function st(r){return function(t,e,o){for(var i=-1,a=Object(t),f=o(t),c=f.length;c--;){var p=f[++i];if(e(a[p],p,a)===!1)break}return t}}var ft=st();function ct(r,t){return r&&ft(r,t,it)}function ut(r,t){return function(e,o){if(e==null)return e;if(!F(e))return r(e,o);for(var i=e.length,a=-1,f=Object(e);++a<i&&o(f[a],a,f)!==!1;);return e}}var bt=ut(ct);function pt(r){return typeof r=="function"?r:er}function jt(r,t){var e=P(r)?fr:bt;return e(r,pt(t))}export{g as S,F as a,br as b,P as c,V as d,yt as e,jt as f,sr as g,lr as h,T as i,y as j,it as k,xr as l,Jr as m,j as n,v as o,er as p,$ as r,gt as t};
