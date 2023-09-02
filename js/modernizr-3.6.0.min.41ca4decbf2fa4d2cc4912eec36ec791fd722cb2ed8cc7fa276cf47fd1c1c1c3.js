/*!
 * modernizr v3.6.0
 * Build https://modernizr.com/download?-touchevents-setclasses-dontmin
 *
 * Copyright (c)
 *  Faruk Ates
 *  Paul Irish
 *  Alex Sexton
 *  Ryan Seddon
 *  Patrick Kettner
 *  Stu Cox
 *  Richard Herrera

 * MIT License
 */(function(e,t){var o,r,l,d,u,h=[],a=[],i={_version:"3.6.0",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,t){var n=this;setTimeout(function(){t(n[e])},0)},addTest:function(e,t,n){a.push({name:e,fn:t,options:n})},addAsyncTest:function(e){a.push({name:null,fn:e})}},s=function(){};s.prototype=i,s=new s;function v(e,t){return typeof e===t}function g(){var e,t,n,o,i,r,c,l;for(l in a)if(a.hasOwnProperty(l)){if(n=[],e=a[l],e.name&&(n.push(e.name.toLowerCase()),e.options&&e.options.aliases&&e.options.aliases.length))for(o=0;o<e.options.aliases.length;o++)n.push(e.options.aliases[o].toLowerCase());i=v(e.fn,"function")?e.fn():e.fn;for(r=0;r<n.length;r++)c=n[r],t=c.split("."),t.length===1?s[t[0]]=i:(s[t[0]]&&!(s[t[0]]instanceof Boolean)&&(s[t[0]]=new Boolean(s[t[0]])),s[t[0]][t[1]]=i),h.push((i?"":"no-")+t.join("-"))}}o=t.documentElement,r=o.nodeName.toLowerCase()==="svg";function m(e){var i,t=o.className,n=s._config.classPrefix||"";r&&(t=t.baseVal),s._config.enableJSClass&&(i=new RegExp("(^|\\s)"+n+"no-js(\\s|$)"),t=t.replace(i,"$1"+n+"js$2")),s._config.enableClasses&&(t+=" "+n+e.join(" "+n),r?o.className.baseVal=t:o.className=t)}d=i._config.usePrefixes?" -webkit- -moz- -o- -ms- ".split(" "):["",""],i._prefixes=d;function c(){return typeof t.createElement!="function"?t.createElement(arguments[0]):r?t.createElementNS.call(t,"http://www.w3.org/2000/svg",arguments[0]):t.createElement.apply(t,arguments)}function f(){var e=t.body;return e||(e=c(r?"svg":"body"),e.fake=!0),e}function p(e,n,s,i){var r,u,h,m,d="modernizr",l=c("div"),a=f();if(parseInt(s,10))for(;s--;)u=c("div"),u.id=i?i[s]:d+(s+1),l.appendChild(u);return r=c("style"),r.type="text/css",r.id="s"+d,(a.fake?a:l).appendChild(r),a.appendChild(l),r.styleSheet?r.styleSheet.cssText=e:r.appendChild(t.createTextNode(e)),l.id=d,a.fake&&(a.style.background="",a.style.overflow="hidden",m=o.style.overflow,o.style.overflow="hidden",o.appendChild(a)),h=n(l,e),a.fake?(a.parentNode.removeChild(a),o.style.overflow=m,o.offsetHeight):l.parentNode.removeChild(l),!!h}u=i.testStyles=p,s.addTest("touchevents",function(){if("ontouchstart"in e||e.DocumentTouch&&t instanceof DocumentTouch)n=!0;else{var n,s=["@media (",d.join("touch-enabled),("),"heartz",")","{#modernizr{top:9px;position:absolute}}"].join("");u(s,function(e){n=e.offsetTop===9})}return n}),g(),m(h),delete i.addTest,delete i.addAsyncTest;for(l=0;l<s._q.length;l++)s._q[l]();e.Modernizr=s})(window,document)