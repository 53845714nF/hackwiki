/*!
* modernizr v3.6.0
* Build https://modernizr.com/download?-touchevents-setclasses-dontmin
*
* Copyright (c)
* Faruk Ates
* Paul Irish
* Alex Sexton
* Ryan Seddon
* Patrick Kettner
* Stu Cox
* Richard Herrera
* MIT License
*/;(function(window,document,undefined){var classes=[];var tests=[];var ModernizrProto={_version:'3.6.0',_config:{'classPrefix':'','enableClasses':true,'enableJSClass':true,'usePrefixes':true},_q:[],on:function(test,cb){var self=this;setTimeout(function(){cb(self[test]);},0);},addTest:function(name,fn,options){tests.push({name:name,fn:fn,options:options});},addAsyncTest:function(fn){tests.push({name:null,fn:fn});}};var Modernizr=function(){};Modernizr.prototype=ModernizrProto;Modernizr=new Modernizr();function is(obj,type){return typeof obj===type;};function testRunner(){var featureNames;var feature;var aliasIdx;var result;var nameIdx;var featureName;var featureNameSplit;for(var featureIdx in tests){if(tests.hasOwnProperty(featureIdx)){featureNames=[];feature=tests[featureIdx];if(feature.name){featureNames.push(feature.name.toLowerCase());if(feature.options&&feature.options.aliases&&feature.options.aliases.length){for(aliasIdx=0;aliasIdx<feature.options.aliases.length;aliasIdx++){featureNames.push(feature.options.aliases[aliasIdx].toLowerCase());}}}
result=is(feature.fn,'function')?feature.fn():feature.fn;for(nameIdx=0;nameIdx<featureNames.length;nameIdx++){featureName=featureNames[nameIdx];featureNameSplit=featureName.split('.');if(featureNameSplit.length===1){Modernizr[featureNameSplit[0]]=result;}else{if(Modernizr[featureNameSplit[0]]&&!(Modernizr[featureNameSplit[0]]instanceof Boolean)){Modernizr[featureNameSplit[0]]=new Boolean(Modernizr[featureNameSplit[0]]);}
Modernizr[featureNameSplit[0]][featureNameSplit[1]]=result;}
classes.push((result?'':'no-')+featureNameSplit.join('-'));}}}};var docElement=document.documentElement;var isSVG=docElement.nodeName.toLowerCase()==='svg';function setClasses(classes){var className=docElement.className;var classPrefix=Modernizr._config.classPrefix||'';if(isSVG){className=className.baseVal;}
if(Modernizr._config.enableJSClass){var reJS=new RegExp('(^|\\s)'+classPrefix+'no-js(\\s|$)');className=className.replace(reJS,'$1'+classPrefix+'js$2');}
if(Modernizr._config.enableClasses){className+=' '+classPrefix+classes.join(' '+classPrefix);if(isSVG){docElement.className.baseVal=className;}else{docElement.className=className;}}};var prefixes=(ModernizrProto._config.usePrefixes?' -webkit- -moz- -o- -ms- '.split(' '):['','']);ModernizrProto._prefixes=prefixes;function createElement(){if(typeof document.createElement!=='function'){return document.createElement(arguments[0]);}else if(isSVG){return document.createElementNS.call(document,'http://www.w3.org/2000/svg',arguments[0]);}else{return document.createElement.apply(document,arguments);}};function getBody(){var body=document.body;if(!body){body=createElement(isSVG?'svg':'body');body.fake=true;}
return body;};function injectElementWithStyles(rule,callback,nodes,testnames){var mod='modernizr';var style;var ret;var node;var docOverflow;var div=createElement('div');var body=getBody();if(parseInt(nodes,10)){while(nodes--){node=createElement('div');node.id=testnames?testnames[nodes]:mod+(nodes+1);div.appendChild(node);}}
style=createElement('style');style.type='text/css';style.id='s'+mod;(!body.fake?div:body).appendChild(style);body.appendChild(div);if(style.styleSheet){style.styleSheet.cssText=rule;}else{style.appendChild(document.createTextNode(rule));}
div.id=mod;if(body.fake){body.style.background='';body.style.overflow='hidden';docOverflow=docElement.style.overflow;docElement.style.overflow='hidden';docElement.appendChild(body);}
ret=callback(div,rule);if(body.fake){body.parentNode.removeChild(body);docElement.style.overflow=docOverflow;docElement.offsetHeight;}else{div.parentNode.removeChild(div);}
return!!ret;};var testStyles=ModernizrProto.testStyles=injectElementWithStyles;/*!
{
"name": "Touch Events",
"property": "touchevents",
"caniuse" : "touch",
"tags": ["media", "attribute"],
"notes": [{
"name": "Touch Events spec",
"href": "https://www.w3.org/TR/2013/WD-touch-events-20130124/"
}],
"warnings": [
"Indicates if the browser supports the Touch Events spec, and does not necessarily reflect a touchscreen device"
],
"knownBugs": [
"False-positive on some configurations of Nokia N900",
"False-positive on some BlackBerry 6.0 builds – https://github.com/Modernizr/Modernizr/issues/372#issuecomment-3112695"
]
}
!*/Modernizr.addTest('touchevents',function(){var bool;if(('ontouchstart'in window)||window.DocumentTouch&&document instanceof DocumentTouch){bool=true;}else{var query=['@media (',prefixes.join('touch-enabled),('),'heartz',')','{#modernizr{top:9px;position:absolute}}'].join('');testStyles(query,function(node){bool=node.offsetTop===9;});}
return bool;});testRunner();setClasses(classes);delete ModernizrProto.addTest;delete ModernizrProto.addAsyncTest;for(var i=0;i<Modernizr._q.length;i++){Modernizr._q[i]();}
window.Modernizr=Modernizr;;})(window,document);