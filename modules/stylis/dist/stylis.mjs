var e="-ms-";var r="-moz-";var a="-webkit-";var n="comm";var c="rule";var s="decl";var t="@page";var u="@media";var i="@import";var f="@charset";var o="@viewport";var l="@supports";var v="@document";var p="@namespace";var h="@keyframes";var b="@font-face";var w="@counter-style";var d="@font-feature-values";var g="@layer";var k="@scope";var $=Math.abs;var m=String.fromCharCode;var x=Object.assign;function y(e,r){return A(e,0)^45?(((r<<2^A(e,0))<<2^A(e,1))<<2^A(e,2))<<2^A(e,3):0}function j(e){return e.trim()}function z(e,r){return(e=r.exec(e))?e[0]:e}function C(e,r,a){return e.replace(r,a)}function O(e,r,a){return e.indexOf(r,a)}function A(e,r){return e.charCodeAt(r)|0}function M(e,r,a){return e.slice(r,a)}function S(e){return e.length}function q(e){return e.length}function B(e,r){return r.push(e),e}function D(e,r){return e.map(r).join("")}function E(e,r){return e.filter((function(e){return!z(e,r)}))}var F=1;var G=1;var H=0;var I=0;var J=0;var K="";function L(e,r,a,n,c,s,t,u){return{value:e,root:r,parent:a,type:n,props:c,children:s,line:F,column:G,length:t,return:"",siblings:u}}function N(e,r){return x(L("",null,null,"",null,null,0,e.siblings),e,{length:-e.length},r)}function P(e){while(e.root)e=N(e.root,{children:[e]});B(e,e.siblings)}function Q(){return J}function R(){J=I>0?A(K,--I):0;if(G--,J===10)G=1,F--;return J}function T(){J=I<H?A(K,I++):0;if(G++,J===10)G=1,F++;return J}function U(){return A(K,I)}function V(){return I}function W(e,r){return M(K,e,r)}function X(e){switch(e){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function Y(e){return F=G=1,H=S(K=e),I=0,[]}function Z(e){return K="",e}function _(e){return j(W(I-1,ce(e===91?e+2:e===40?e+1:e)))}function ee(e){return Z(ae(Y(e)))}function re(e){while(J=U())if(J<33)T();else break;return X(e)>2||X(J)>3?"":" "}function ae(e){while(T())switch(X(J)){case 0:B(te(I-1),e);break;case 2:B(_(J),e);break;default:B(m(J),e)}return e}function ne(e,r){while(--r&&T())if(J<48||J>102||J>57&&J<65||J>70&&J<97)break;return W(e,V()+(r<6&&U()==32&&T()==32))}function ce(e){while(T())switch(J){case e:return I;case 34:case 39:if(e!==34&&e!==39)ce(J);break;case 40:if(e===41)ce(e);break;case 92:T();break}return I}function se(e,r){while(T())if(e+J===47+10)break;else if(e+J===42+42&&U()===47)break;return"/*"+W(r,I-1)+"*"+m(e===47?e:T())}function te(e){while(!X(U()))T();return W(e,I)}function ue(e){return Z(ie("",null,null,null,[""],e=Y(e),0,[0],e))}function ie(e,r,a,n,c,s,t,u,i){var f=0;var o=0;var l=t;var v=0;var p=0;var h=0;var b=1;var w=1;var d=1;var g=0;var k="";var x=c;var y=s;var j=n;var z=k;while(w)switch(h=g,g=T()){case 40:if(h!=108&&A(z,l-1)==58){if(O(z+=C(_(g),"&","&\f"),"&\f",$(f?u[f-1]:0))!=-1)d=-1;break}case 34:case 39:case 91:z+=_(g);break;case 9:case 10:case 13:case 32:z+=re(h);break;case 92:z+=ne(V()-1,7);continue;case 47:switch(U()){case 42:case 47:B(oe(se(T(),V()),r,a,i),i);break;default:z+="/"}break;case 123*b:u[f++]=S(z)*d;case 125*b:case 59:case 0:switch(g){case 0:case 125:w=0;case 59+o:if(d==-1)z=C(z,/\f/g,"");if(p>0&&S(z)-l)B(p>32?le(z+";",n,a,l-1,i):le(C(z," ","")+";",n,a,l-2,i),i);break;case 59:z+=";";default:B(j=fe(z,r,a,f,o,c,u,k,x=[],y=[],l,s),s);if(g===123)if(o===0)ie(z,r,j,j,x,s,l,u,y);else switch(v===99&&A(z,3)===110?100:v){case 100:case 108:case 109:case 115:ie(e,j,j,n&&B(fe(e,j,j,0,0,c,u,k,c,x=[],l,y),y),c,y,l,u,n?x:y);break;default:ie(z,j,j,j,[""],y,0,u,y)}}f=o=p=0,b=d=1,k=z="",l=t;break;case 58:l=1+S(z),p=h;default:if(b<1)if(g==123)--b;else if(g==125&&b++==0&&R()==125)continue;switch(z+=m(g),g*b){case 38:d=o>0?1:(z+="\f",-1);break;case 44:u[f++]=(S(z)-1)*d,d=1;break;case 64:if(U()===45)z+=_(T());v=U(),o=l=S(k=z+=te(V())),g++;break;case 45:if(h===45&&S(z)==2)b=0}}return s}function fe(e,r,a,n,s,t,u,i,f,o,l,v){var p=s-1;var h=s===0?t:[""];var b=q(h);for(var w=0,d=0,g=0;w<n;++w)for(var k=0,m=M(e,p+1,p=$(d=u[w])),x=e;k<b;++k)if(x=j(d>0?h[k]+" "+m:C(m,/&\f/g,h[k])))f[g++]=x;return L(e,r,a,s===0?c:i,f,o,l,v)}function oe(e,r,a,c){return L(e,r,a,n,m(Q()),M(e,2,-2),0,c)}function le(e,r,a,n,c){return L(e,r,a,s,M(e,0,n),M(e,n+1,-1),n,c)}function ve(n,c,s){switch(y(n,c)){case 5103:return a+"print-"+n+n;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 6391:case 5879:case 5623:case 6135:case 4599:case 4855:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:return a+n+n;case 4789:return r+n+n;case 5349:case 4246:case 4810:case 6968:case 2756:return a+n+r+n+e+n+n;case 5936:switch(A(n,c+11)){case 114:return a+n+e+C(n,/[svh]\w+-[tblr]{2}/,"tb")+n;case 108:return a+n+e+C(n,/[svh]\w+-[tblr]{2}/,"tb-rl")+n;case 45:return a+n+e+C(n,/[svh]\w+-[tblr]{2}/,"lr")+n}case 6828:case 4268:case 2903:return a+n+e+n+n;case 6165:return a+n+e+"flex-"+n+n;case 5187:return a+n+C(n,/(\w+).+(:[^]+)/,a+"box-$1$2"+e+"flex-$1$2")+n;case 5443:return a+n+e+"flex-item-"+C(n,/flex-|-self/g,"")+(!z(n,/flex-|baseline/)?e+"grid-row-"+C(n,/flex-|-self/g,""):"")+n;case 4675:return a+n+e+"flex-line-pack"+C(n,/align-content|flex-|-self/g,"")+n;case 5548:return a+n+e+C(n,"shrink","negative")+n;case 5292:return a+n+e+C(n,"basis","preferred-size")+n;case 6060:return a+"box-"+C(n,"-grow","")+a+n+e+C(n,"grow","positive")+n;case 4554:return a+C(n,/([^-])(transform)/g,"$1"+a+"$2")+n;case 6187:return C(C(C(n,/(zoom-|grab)/,a+"$1"),/(image-set)/,a+"$1"),n,"")+n;case 5495:case 3959:return C(n,/(image-set\([^]*)/,a+"$1"+"$`$1");case 4968:return C(C(n,/(.+:)(flex-)?(.*)/,a+"box-pack:$3"+e+"flex-pack:$3"),/s.+-b[^;]+/,"justify")+a+n+n;case 4200:if(!z(n,/flex-|baseline/))return e+"grid-column-align"+M(n,c)+n;break;case 2592:case 3360:return e+C(n,"template-","")+n;case 4384:case 3616:if(s&&s.some((function(e,r){return c=r,z(e.props,/grid-\w+-end/)}))){return~O(n+(s=s[c].value),"span",0)?n:e+C(n,"-start","")+n+e+"grid-row-span:"+(~O(s,"span",0)?z(s,/\d+/):+z(s,/\d+/)-+z(n,/\d+/))+";"}return e+C(n,"-start","")+n;case 4896:case 4128:return s&&s.some((function(e){return z(e.props,/grid-\w+-start/)}))?n:e+C(C(n,"-end","-span"),"span ","")+n;case 4095:case 3583:case 4068:case 2532:return C(n,/(.+)-inline(.+)/,a+"$1$2")+n;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(S(n)-1-c>6)switch(A(n,c+1)){case 109:if(A(n,c+4)!==45)break;case 102:return C(n,/(.+:)(.+)-([^]+)/,"$1"+a+"$2-$3"+"$1"+r+(A(n,c+3)==108?"$3":"$2-$3"))+n;case 115:return~O(n,"stretch",0)?ve(C(n,"stretch","fill-available"),c,s)+n:n}break;case 5152:case 5920:return C(n,/(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/,(function(r,a,c,s,t,u,i){return e+a+":"+c+i+(s?e+a+"-span:"+(t?u:+u-+c)+i:"")+n}));case 4949:if(A(n,c+6)===121)return C(n,":",":"+a)+n;break;case 6444:switch(A(n,A(n,14)===45?18:11)){case 120:return C(n,/(.+:)([^;\s!]+)(;|(\s+)?!.+)?/,"$1"+a+(A(n,14)===45?"inline-":"")+"box$3"+"$1"+a+"$2$3"+"$1"+e+"$2box$3")+n;case 100:return C(n,":",":"+e)+n}break;case 5719:case 2647:case 2135:case 3927:case 2391:return C(n,"scroll-","scroll-snap-")+n}return n}function pe(e,r){var a="";for(var n=0;n<e.length;n++)a+=r(e[n],n,e,r)||"";return a}function he(e,r,a,t){switch(e.type){case g:if(e.children.length)break;case i:case s:return e.return=e.return||e.value;case n:return"";case h:return e.return=e.value+"{"+pe(e.children,t)+"}";case c:if(!S(e.value=e.props.join(",")))return""}return S(a=pe(e.children,t))?e.return=e.value+"{"+a+"}":""}function be(e){var r=q(e);return function(a,n,c,s){var t="";for(var u=0;u<r;u++)t+=e[u](a,n,c,s)||"";return t}}function we(e){return function(r){if(!r.root)if(r=r.return)e(r)}}function de(n,t,u,i){if(n.length>-1)if(!n.return)switch(n.type){case s:n.return=ve(n.value,n.length,u);return;case h:return pe([N(n,{value:C(n.value,"@","@"+a)})],i);case c:if(n.length)return D(u=n.props,(function(c){switch(z(c,i=/(::plac\w+|:read-\w+)/)){case":read-only":case":read-write":P(N(n,{props:[C(c,/:(read-\w+)/,":"+r+"$1")]}));P(N(n,{props:[c]}));x(n,{props:E(u,i)});break;case"::placeholder":P(N(n,{props:[C(c,/:(plac\w+)/,":"+a+"input-$1")]}));P(N(n,{props:[C(c,/:(plac\w+)/,":"+r+"$1")]}));P(N(n,{props:[C(c,/:(plac\w+)/,e+"input-$1")]}));P(N(n,{props:[c]}));x(n,{props:E(u,i)});break}return""}))}}function ge(e){switch(e.type){case c:e.props=e.props.map((function(r){return D(ee(r),(function(r,a,n){switch(A(r,0)){case 12:return M(r,1,S(r));case 0:case 40:case 43:case 62:case 126:return r;case 58:if(n[++a]==="global")n[a]="",n[++a]="\f"+M(n[a],a=1,-1);case 32:return a===1?"":r;default:switch(a){case 0:e=r;return q(n)>1?"":r;case a=q(n)-1:case 2:return a===2?r+e+e:r+e;default:return r}}}))}))}}export{f as CHARSET,n as COMMENT,w as COUNTER_STYLE,s as DECLARATION,v as DOCUMENT,b as FONT_FACE,d as FONT_FEATURE_VALUES,i as IMPORT,h as KEYFRAMES,g as LAYER,u as MEDIA,r as MOZ,e as MS,p as NAMESPACE,t as PAGE,c as RULESET,k as SCOPE,l as SUPPORTS,o as VIEWPORT,a as WEBKIT,$ as abs,Y as alloc,B as append,x as assign,V as caret,Q as char,J as character,K as characters,A as charat,G as column,D as combine,oe as comment,se as commenter,ue as compile,N as copy,Z as dealloc,le as declaration,_ as delimit,ce as delimiter,ne as escaping,E as filter,m as from,y as hash,te as identifier,O as indexof,H as length,P as lift,F as line,z as match,be as middleware,ge as namespace,T as next,L as node,ie as parse,U as peek,I as position,ve as prefix,de as prefixer,R as prev,C as replace,fe as ruleset,we as rulesheet,pe as serialize,q as sizeof,W as slice,he as stringify,S as strlen,M as substr,X as token,ee as tokenize,ae as tokenizer,j as trim,re as whitespace};
//# sourceMappingURL=stylis.mjs.map