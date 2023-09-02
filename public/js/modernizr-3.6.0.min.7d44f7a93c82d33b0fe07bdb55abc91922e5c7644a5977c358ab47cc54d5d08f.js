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
 */(function(h,b,r){var j=[],e=[],d={_version:'3.6.0',_config:{classPrefix:'',enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(a,b){var c=this;setTimeout(function(){b(c[a])},0)},addTest:function(a,b,c){e.push({name:a,fn:b,options:c})},addAsyncTest:function(a){e.push({name:null,fn:a})}},a=function(){},c,g,k,p,i;a.prototype=d,a=new a;function m(a,b){return typeof a===b}function l(){var d,b,f,g,h,i,c,k;for(k in e)if(e.hasOwnProperty(k)){if(d=[],b=e[k],b.name)if(d.push(b.name.toLowerCase()),b.options&&b.options.aliases&&b.options.aliases.length)for(f=0;f<b.options.aliases.length;f++)d.push(b.options.aliases[f].toLowerCase());g=m(b.fn,'function')?b.fn():b.fn;for(h=0;h<d.length;h++)i=d[h],c=i.split('.'),c.length===1?a[c[0]]=g:(a[c[0]]&&!(a[c[0]]instanceof Boolean)&&(a[c[0]]=new Boolean(a[c[0]])),a[c[0]][c[1]]=g),j.push((g?'':'no-')+c.join('-'))}}c=b.documentElement,g=c.nodeName.toLowerCase()==='svg';function q(e){var b=c.className,d=a._config.classPrefix||'',f;g&&(b=b.baseVal),a._config.enableJSClass&&(f=new RegExp('(^|\\s)'+d+'no-js(\\s|$)'),b=b.replace(f,'$1'+d+'js$2')),a._config.enableClasses&&(b+=' '+d+e.join(' '+d),g?c.className.baseVal=b:c.className=b)}k=d._config.usePrefixes?' -webkit- -moz- -o- -ms- '.split(' '):['',''],d._prefixes=k;function f(){return typeof b.createElement!='function'?b.createElement(arguments[0]):g?b.createElementNS.call(b,'http://www.w3.org/2000/svg',arguments[0]):b.createElement.apply(b,arguments)}function n(){var a=b.body;return a||(a=f(g?'svg':'body'),a.fake=!0),a}function o(h,o,g,m){var j='modernizr',d=f('div'),a=n(),i,l,e,k;if(parseInt(g,10))while(g--)i=f('div'),i.id=m?m[g]:j+(g+1),d.appendChild(i);return e=f('style'),e.type='text/css',e.id='s'+j,(a.fake?a:d).appendChild(e),a.appendChild(d),e.styleSheet?e.styleSheet.cssText=h:e.appendChild(b.createTextNode(h)),d.id=j,a.fake&&(a.style.background='',a.style.overflow='hidden',l=c.style.overflow,c.style.overflow='hidden',c.appendChild(a)),k=o(d,h),a.fake?(a.parentNode.removeChild(a),c.style.overflow=l,c.offsetHeight):d.parentNode.removeChild(d),!!k}p=d.testStyles=o,a.addTest('touchevents',function(){var a,c;return'ontouchstart'in h||h.DocumentTouch&&b instanceof DocumentTouch?a=!0:(c=['@media (',k.join('touch-enabled),('),'heartz',')','{#modernizr{top:9px;position:absolute}}'].join(''),p(c,function(b){a=b.offsetTop===9})),a}),l(),q(j),delete d.addTest,delete d.addAsyncTest;for(i=0;i<a._q.length;i++)a._q[i]();h.Modernizr=a})(window,document)