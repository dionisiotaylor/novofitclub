(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[606],{892:function(e,t,r){Promise.resolve().then(r.bind(r,6294)),Promise.resolve().then(r.bind(r,3677))},6294:function(e,t,r){"use strict";r.d(t,{default:function(){return i}});var o,n=r(7437);r(2265);var a=r(9376),u=r(4746);function s(){return(s=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var o in r)({}).hasOwnProperty.call(r,o)&&(e[o]=r[o])}return e}).apply(null,arguments)}var c=function(e){return u.createElement("svg",s({xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 13 21"},e),o||(o=u.createElement("path",{stroke:"currentColor",strokeLinecap:"round",strokeWidth:2,d:"M12 1 2 10.5 12 20"})))};function i(){let e=(0,a.useRouter)();return(0,n.jsx)("button",{onClick:()=>e.back(),className:"back-button",children:(0,n.jsxs)("span",{children:[(0,n.jsx)(c,{}),"Atr\xe1s"]})})}},3677:function(e,t,r){"use strict";var o=r(7437),n=r(2265);t.default=e=>{let{videoId:t}=e;return(0,n.useEffect)(()=>{function e(){new window.YT.Player("youtube-player-".concat(t),{height:"360",width:"640",videoId:t,playerVars:{autoplay:1,mute:1,controls:1,loop:1,playlist:t},events:{onReady:e=>{e.target.playVideo()}}})}if(window.YT)e();else{let t=document.createElement("script");t.src="https://www.youtube.com/iframe_api",document.body.appendChild(t),window.onYouTubeIframeAPIReady=e}},[t]),(0,o.jsx)("div",{id:"youtube-player-".concat(t)})}},9376:function(e,t,r){"use strict";var o=r(5475);r.o(o,"useRouter")&&r.d(t,{useRouter:function(){return o.useRouter}}),r.o(o,"useSearchParams")&&r.d(t,{useSearchParams:function(){return o.useSearchParams}})},4264:function(e,t){"use strict";var r=Symbol.for("react.element"),o=(Symbol.for("react.portal"),Symbol.for("react.fragment"),Symbol.for("react.strict_mode"),Symbol.for("react.profiler"),Symbol.for("react.provider"),Symbol.for("react.context"),Symbol.for("react.forward_ref"),Symbol.for("react.suspense"),Symbol.for("react.memo"),Symbol.for("react.lazy"),{isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}}),n=Object.assign,a={};function u(e,t,r){this.props=e,this.context=t,this.refs=a,this.updater=r||o}function s(){}function c(e,t,r){this.props=e,this.context=t,this.refs=a,this.updater=r||o}u.prototype.isReactComponent={},u.prototype.setState=function(e,t){if("object"!=typeof e&&"function"!=typeof e&&null!=e)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")},u.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")},s.prototype=u.prototype;var i=c.prototype=new s;i.constructor=c,n(i,u.prototype),i.isPureReactComponent=!0;var f=Object.prototype.hasOwnProperty,l={key:!0,ref:!0,__self:!0,__source:!0};t.createElement=function(e,t,o){var n,a={},u=null,s=null;if(null!=t)for(n in void 0!==t.ref&&(s=t.ref),void 0!==t.key&&(u=""+t.key),t)f.call(t,n)&&!l.hasOwnProperty(n)&&(a[n]=t[n]);var c=arguments.length-2;if(1===c)a.children=o;else if(1<c){for(var i=Array(c),p=0;p<c;p++)i[p]=arguments[p+2];a.children=i}if(e&&e.defaultProps)for(n in c=e.defaultProps)void 0===a[n]&&(a[n]=c[n]);return{$$typeof:r,type:e,key:u,ref:s,props:a,_owner:null}}},4746:function(e,t,r){"use strict";e.exports=r(4264)}},function(e){e.O(0,[971,117,744],function(){return e(e.s=892)}),_N_E=e.O()}]);