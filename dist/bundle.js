"use strict";var _slicedToArray=function(){function a(a,b){var c=[],d=!0,e=!1,f=void 0;try{for(var g,h=a[Symbol.iterator]();!(d=(g=h.next()).done)&&(c.push(g.value),!(b&&c.length===b));d=!0);}catch(a){e=!0,f=a}finally{try{!d&&h["return"]&&h["return"]()}finally{if(e)throw f}}return c}return function(b,c){if(Array.isArray(b))return b;if(Symbol.iterator in Object(b))return a(b,c);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}();(function(a){function b(d){if(c[d])return c[d].exports;var e=c[d]={i:d,l:!1,exports:{}};return a[d].call(e.exports,e,e.exports,b),e.l=!0,e.exports}var c={};return b.m=a,b.c=c,b.d=function(a,c,d){b.o(a,c)||Object.defineProperty(a,c,{configurable:!1,enumerable:!0,get:d})},b.n=function(a){var c=a&&a.__esModule?function(){return a["default"]}:function(){return a};return b.d(c,"a",c),c},b.o=function(a,b){return Object.prototype.hasOwnProperty.call(a,b)},b.p="",b(b.s=1)})([function(a,b){"use strict";function c(a){for(var b,d=a.fill,e=a.size,f=_slicedToArray(e,3),g=f[0],h=f[1],i=f[2],j=[],k=0;k<g;k++){b=[];for(var l=0;l<h;l++)b.push(Array(i).fill(d));j.push(b)}return j.get=function(a){var b=_slicedToArray(a,3),c=b[0],d=b[1],e=b[2];return j[c][d][e]},j.set=function(a,b){var c=_slicedToArray(a,3),d=c[0],e=c[1],f=c[2];j[d][e][f]=b},j.clone=function(){for(var a=new c({fill:d,size:e}),b=0;b<g;b++)for(var f=0;f<h;f++)a[b][f]=j[b][f].slice();return a},j}b.a=c},function(a,b,c){"use strict";Object.defineProperty(b,"__esModule",{value:!0});var d=c(2),e=c(0),f=c(4),g=[4,4,4],h=g[0],i=g[1],j=g[2],k=Object(d.a)({size:g,tileGenesisList:[2,4,8,16]});k.addRandomTiles(8);var l=document.createElement("div");l.className="container";var m=document.createElement("main"),n=function(a,b){for(var c,d=[a[0].length,a.length],e=d[0],f=d[1],g=document.createElement("table"),h=document.createElement("tbody"),i=0;i<f;i++){c=document.createElement("tr");for(var j=0;j<e;j++)c.appendChild(b(a[i][j]));h.appendChild(c)}return g.appendChild(h),g},o=function(a){var b=document.createElement("td");return""!==a&&(b.textContent=a,b.className=a),b},p=n([["u"],[""],["d"]],o);p.className="controls elevation";var q=n([["","n",""],["w","","e"],["","s",""]],o);q.className="controls cardinal";for(var r,s=Object(e.a)({size:g}),t=0;t<j;t++){r=document.createElement("table"),r.className="t"+t;var u=document.createElement("tbody");r.appendChild(u);for(var v,w=0;w<i;w++){v=document.createElement("tr");for(var y,z=0;z<h;z++)y=document.createElement("td"),v.appendChild(y),s[z][w][t]=y;r.appendChild(v)}m.appendChild(r)}var x=function(){for(var a=0;a<j;a++)for(var b=0;b<i;b++)for(var c=0;c<h;c++){var d=k.getMapValue([c,b,a]),e=s[c][b][a];e.className="d"+d,e.textContent=d||""}};l.appendChild(p),l.appendChild(m),l.appendChild(q),document.body.appendChild(l),x();var A=function(a){var b=_slicedToArray({w:[0,0],e:[0,1],n:[1,0],s:[1,1],u:[2,0],d:[2,1]}[a],2),c=b[0],d=b[1];k.isValidMove(c,d)&&(k.move(c,d),k.addRandomTiles(2),x())};Object(f.a)(document.body,function(a){if(0===a.button){var b=a.target,c="parentElement";"TD"===b.tagName&&""!==b.className&&b[c]&&b[c][c]&&b[c][c][c]&&b[c][c][c].classList.contains("controls")&&A(b.className)}}),window.addEventListener("keydown",function(a){var b={n:["ArrowUp","w"],e:["ArrowRight","d"],s:["ArrowDown","s"],w:["ArrowLeft","a"],u:["r"],d:["f"]},c=!0,d=!1,e=void 0;try{for(var f,g,h=Object.keys(b)[Symbol.iterator]();!(c=(f=h.next()).done);c=!0)if(g=f.value,b[g].includes(a.key)){A(g);break}}catch(a){d=!0,e=a}finally{try{!c&&h.return&&h.return()}finally{if(d)throw e}}})},function(a,b,c){"use strict";b.a=function(a){var b=a.size,c=a.tileGenesisList,f=_slicedToArray(b,3),g=f[0],h=f[1],j=f[2],i=Object(e.a)({fill:0,size:b}),k=function(b,c){var d=_slicedToArray(b,3),e=d[0],f=d[1],g=d[2];return{0:[g,f,e],1:[e,g,f],2:[e,f,g]}[c]},l=function(c,d){for(var e=function(a){return k(a,c)},f=e([g,h,j]),l=_slicedToArray(f,3),o=l[0],p=l[1],q=l[2],r=0;r<o;r++)for(var m=0;m<p;m++){for(var n=[],s=!1,t=0;t<q;t++){var a=1===d?q-1-t:t,b=e([r,m,a]),u=_slicedToArray(b,3),v=u[0],w=u[1],x=u[2];if(0===i[v][w][x]&&(s=!0),0!==i[v][w][x]){if(s)return!0;n.push(i[v][w][x])}}for(var y=0;y<n.length-1&&!(0===n[y]||0===n[y+1]);){if(n[y]===n[y+1])return!0;y++}}return!1},m=function(){for(var a=[],b=0;b<g;b++)for(var c=0;c<h;c++)for(var d=0;d<j;d++)0===i[b][c][d]&&a.push([b,c,d]);return a},n=function(){var a=m();if(0!==a.length){var b=Object(d.b)(c),e=Object(d.a)(0,a.length),f=_slicedToArray(a[e],3),g=f[0],h=f[1],j=f[2];return i[g][h][j]=b,!0}};return{isValidMove:l,hasValidMoves:function(){for(var a=0;a<3;a++)for(var b=0;b<2;b++)if(l(a,b))return!0;return!1},getValidMoves:function(){for(var a=[],b=0;b<3;b++)for(var c=0;c<2;c++)l(b,c)&&a.push([b,c]);return a},move:function(c,d){for(var e=function(a){return k(a,c)},f=e([g,h,j]),l=_slicedToArray(f,3),o=l[0],p=l[1],q=l[2],r=0;r<o;r++)for(var m,s=0;s<p;s++){m=[];for(var n=0;n<q;n++){var a=1===d?q-1-n:n,b=e([r,s,a]),t=_slicedToArray(b,3),u=t[0],v=t[1],w=t[2];0!==i[u][v][w]&&m.push(i[u][v][w])}for(var x=0;x<m.length-1&&!(0===m[x]||0===m[x+1]);)m[x]===m[x+1]&&(m[x]*=2,m.splice(x+1,1)),x++;for(var y=0;y<q;y++){var z=1===d?q-1-y:y,A=e([r,s,z]),B=_slicedToArray(A,3),C=B[0],D=B[1],E=B[2];i[C][D][E]=y<m.length?m[y]:0}}},getBlanks:m,addRandomTile:n,addRandomTiles:function a(b){n()&&1<b&&a(b-1)},getMapValue:function(a){var b=_slicedToArray(a,3),c=b[0],d=b[1],e=b[2];return i[c][d][e]}}};var d=c(3),e=c(0)},function(a,b){"use strict";function c(a,b,c){var e=b-a+(c?1:0);return d(Math.random()*e)+a}var d=Math.floor;b.a=c,b.b=function(a){var b=c(0,a.length);return a[b]}},function(a,b){"use strict";b.a=function(a,b){var c={el:a,active:!0},d=function(a){c.active&&b(a)},e=function(a){a.preventDefault(),d(a)};return c.bind=function(){a.addEventListener("mousedown",d),a.addEventListener("touchstart",e)},c.unbind=function(){a.removeEventListener("mousedown",d),a.removeEventListener("touchstart",e)},c.bind(),c}}]);