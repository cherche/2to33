"use strict";var _slicedToArray=function(){function a(a,b){var c=[],d=!0,e=!1,f=void 0;try{for(var g,h=a[Symbol.iterator]();!(d=(g=h.next()).done)&&(c.push(g.value),!(b&&c.length===b));d=!0);}catch(a){e=!0,f=a}finally{try{!d&&h["return"]&&h["return"]()}finally{if(e)throw f}}return c}return function(b,c){if(Array.isArray(b))return b;if(Symbol.iterator in Object(b))return a(b,c);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}();(function(a){function b(d){if(c[d])return c[d].exports;var e=c[d]={i:d,l:!1,exports:{}};return a[d].call(e.exports,e,e.exports,b),e.l=!0,e.exports}var c={};return b.m=a,b.c=c,b.d=function(a,c,d){b.o(a,c)||Object.defineProperty(a,c,{configurable:!1,enumerable:!0,get:d})},b.n=function(a){var c=a&&a.__esModule?function(){return a["default"]}:function(){return a};return b.d(c,"a",c),c},b.o=function(a,b){return Object.prototype.hasOwnProperty.call(a,b)},b.p="",b(b.s=1)})([function(a,b){"use strict";function c(a){for(var b,d=a.fill,e=a.size,f=_slicedToArray(e,3),g=f[0],h=f[1],i=f[2],j=[],k=0;k<g;k++){b=[];for(var l=0;l<h;l++)b.push(Array(i).fill(d));j.push(b)}return j.get=function(a){var b=_slicedToArray(a,3),c=b[0],d=b[1],e=b[2];return j[c][d][e]},j.set=function(a,b){var c=_slicedToArray(a,3),d=c[0],e=c[1],f=c[2];j[d][e][f]=b},j.clone=function(){for(var a=new c({fill:d,size:e}),b=0;b<g;b++)for(var f=0;f<h;f++)a[b][f]=j[b][f].slice();return a},j}b.a=c},function(a,b,c){"use strict";Object.defineProperty(b,"__esModule",{value:!0});var d=c(2),e=c(0),f=[4,4,4],g=f[0],h=f[1],i=f[2],j=Object(d.a)({size:f});j.addRandomTile(),j.addRandomTile();for(var k=document.body.querySelector("main"),l=Object(e.a)({size:f}),m=0;m<i;m++){var n=document.createElement("table"),o=document.createElement("tbody");n.appendChild(o);for(var p,q=0;q<h;q++){p=document.createElement("tr");for(var r,s=0;s<g;s++)r=document.createElement("td"),p.appendChild(r),l[s][q][m]=r;n.appendChild(p)}k.appendChild(n)}var t=function(){for(var a=0;a<i;a++)for(var b=0;b<h;b++)for(var c=0;c<g;c++){var d=j.getMapValue([c,b,a]),e=l[c][b][a];e.className="d"+d,e.textContent=d||""}};t();var u=function(a){var b=_slicedToArray({w:[0,0],e:[0,1],n:[1,0],s:[1,1],u:[2,0],d:[2,1]}[a],2),c=b[0],d=b[1];j.isValidMove(c,d)&&(j.move(c,d),j.addRandomTile(),t())};document.body.addEventListener("mousedown",function(a){if(0===a.button){var b=a.target;"TD"===b.tagName&&b.className&&u(b.className)}})},function(a,b,c){"use strict";b.a=function(a){var b=a.size,c=_slicedToArray(b,3),f=c[0],g=c[1],h=c[2],i=Object(e.a)({fill:0,size:b}),j=function(b,c){var d=_slicedToArray(b,3),e=d[0],f=d[1],g=d[2];return{0:[g,f,e],1:[e,g,f],2:[e,f,g]}[c]},k=function(c,d){for(var e=function(a){return j(a,c)},k=e([f,g,h]),l=_slicedToArray(k,3),o=l[0],p=l[1],q=l[2],r=0;r<o;r++)for(var m=0;m<p;m++){for(var n=[],s=!1,t=0;t<q;t++){var a=1===d?q-1-t:t,b=e([r,m,a]),u=_slicedToArray(b,3),v=u[0],w=u[1],x=u[2];if(0===i[v][w][x]&&(s=!0),0!==i[v][w][x]){if(s)return!0;n.push(i[v][w][x])}}for(var y=0;y<n.length-1&&!(0===n[y]||0===n[y+1]);){if(n[y]===n[y+1])return!0;y++}}return!1};return{isValidMove:k,hasValidMoves:function(){for(var a=0;a<3;a++)for(var b=0;b<2;b++)if(k(a,b))return!0;return!1},getValidMoves:function(){for(var a=[],b=0;b<3;b++)for(var c=0;c<2;c++)k(b,c)&&a.push([b,c]);return a},move:function(b,c){for(var d=function(a){return j(a,b)},e=d([f,g,h]),k=_slicedToArray(e,3),l=k[0],o=k[1],p=k[2],q=0;q<l;q++)for(var m,r=0;r<o;r++){m=[];for(var n=0;n<p;n++){var a=d([q,r,n]),s=_slicedToArray(a,3),t=s[0],u=s[1],v=s[2];0!==i[t][u][v]&&m.push(i[t][u][v])}1===c&&m.reverse();for(var w=0;w<m.length-1&&!(0===m[w]||0===m[w+1]);)m[w]===m[w+1]&&(m[w]*=2,m.splice(w+1,1)),w++;for(var x=m;x.length<p;)x.push(0);1===c&&x.reverse();for(var y=0;y<p;y++){var z=d([q,r,y]),A=_slicedToArray(z,3),B=A[0],C=A[1],D=A[2];i[B][C][D]=x[y]}}},addRandomTile:function(){var a=!1,b=Object(d.b)([2,4]);do{var c=[Object(d.a)(0,f),Object(d.a)(0,g),Object(d.a)(0,h)],e=c[0],j=c[1],k=c[2];0===i[e][j][k]&&(i[e][j][k]=b,a=!0)}while(!a)},getMapValue:function(a){var b=_slicedToArray(a,3),c=b[0],d=b[1],e=b[2];return i[c][d][e]}}};var d=c(3),e=c(0)},function(a,b){"use strict";function c(a,b,c){var e=b-a+(c?1:0);return d(Math.random()*e)+a}var d=Math.floor;b.a=c,b.b=function(a){var b=c(0,a.length);return a[b]}}]);