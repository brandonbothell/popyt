"use strict";(self.webpackChunkdocusaurus=self.webpackChunkdocusaurus||[]).push([[597],{7485:(e,t,a)=>{a.d(t,{Zo:()=>u,kt:()=>g});var n=a(6687);function o(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function r(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function i(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?r(Object(a),!0).forEach((function(t){o(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):r(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function s(e,t){if(null==e)return{};var a,n,o=function(e,t){if(null==e)return{};var a,n,o={},r=Object.keys(e);for(n=0;n<r.length;n++)a=r[n],t.indexOf(a)>=0||(o[a]=e[a]);return o}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(n=0;n<r.length;n++)a=r[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(o[a]=e[a])}return o}var p=n.createContext({}),l=function(e){var t=n.useContext(p),a=t;return e&&(a="function"==typeof e?e(t):i(i({},t),e)),a},u=function(e){var t=l(e.components);return n.createElement(p.Provider,{value:t},e.children)},c="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var a=e.components,o=e.mdxType,r=e.originalType,p=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),c=l(a),m=o,g=c["".concat(p,".").concat(m)]||c[m]||d[m]||r;return a?n.createElement(g,i(i({ref:t},u),{},{components:a})):n.createElement(g,i({ref:t},u))}));function g(e,t){var a=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var r=a.length,i=new Array(r);i[0]=m;var s={};for(var p in t)hasOwnProperty.call(t,p)&&(s[p]=t[p]);s.originalType=e,s[c]="string"==typeof e?e:o,i[1]=s;for(var l=2;l<r;l++)i[l]=a[l];return n.createElement.apply(null,i)}return n.createElement.apply(null,a)}m.displayName="MDXCreateElement"},9255:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>p,contentTitle:()=>i,default:()=>d,frontMatter:()=>r,metadata:()=>s,toc:()=>l});var n=a(9501),o=(a(6687),a(7485));const r={id:"index",title:"Documentation",sidebar_label:"Readme",sidebar_position:0,custom_edit_url:null},i="Getting Started",s={unversionedId:"api/index",id:"api/index",title:"Documentation",description:"Want to access data from the YouTube Data v3 API? Want a Node.js YouTube API wrapper with typings, promises, and caching? No problem! We've got ya covered. npm i popyt",source:"@site/docs/api/index.md",sourceDirName:"api",slug:"/api/",permalink:"/popyt/docs/api/",draft:!1,editUrl:null,tags:[],version:"current",sidebarPosition:0,frontMatter:{id:"index",title:"Documentation",sidebar_label:"Readme",sidebar_position:0,custom_edit_url:null},sidebar:"documentationSidebar",next:{title:"Table of Contents",permalink:"/popyt/docs/api/modules"}},p={},l=[{value:"Examples",id:"examples",level:2},{value:"Development/Contributing",id:"developmentcontributing",level:2}],u={toc:l},c="wrapper";function d(e){let{components:t,...a}=e;return(0,o.kt)(c,(0,n.Z)({},u,a,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"getting-started"},"Getting Started"),(0,o.kt)("p",null,"Want to access data from the YouTube Data v3 API? Want a Node.js YouTube API wrapper with typings, promises, and caching? No problem! We've got ya covered. ",(0,o.kt)("inlineCode",{parentName:"p"},"npm i popyt")),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://github.com/jasonhaxstuff/popyt/issues"},(0,o.kt)("img",{parentName:"a",src:"https://img.shields.io/github/issues/jasonhaxstuff/popyt.svg",alt:"GitHub issues"})),"\n",(0,o.kt)("a",{parentName:"p",href:"https://github.com/jasonhaxstuff/popyt/stargazers"},(0,o.kt)("img",{parentName:"a",src:"https://img.shields.io/github/stars/jasonhaxstuff/popyt.svg",alt:"GitHub stars"})),"\n",(0,o.kt)("a",{parentName:"p",href:"https://github.com/jasonhaxstuff/popyt/blob/master/LICENSE"},(0,o.kt)("img",{parentName:"a",src:"https://img.shields.io/github/license/jasonhaxstuff/popyt.svg",alt:"GitHub license"})),"\n",(0,o.kt)("a",{parentName:"p",href:"https://codecov.io/gh/brandonbothell/popyt"},(0,o.kt)("img",{parentName:"a",src:"https://codecov.io/gh/brandonbothell/popyt/branch/master/graph/badge.svg?token=OAV13MIW6S",alt:"Coverage status"})),"\n",(0,o.kt)("a",{parentName:"p",href:"https://github.com/jasonhaxstuff/popyt/actions"},(0,o.kt)("img",{parentName:"a",src:"https://github.com/jasonhaxstuff/popyt/workflows/Test/badge.svg",alt:"Actions status"})),"\n",(0,o.kt)("a",{parentName:"p",href:"https://deepscan.io/dashboard#view=project&tid=13038&pid=16072&bid=335663"},(0,o.kt)("img",{parentName:"a",src:"https://deepscan.io/api/teams/13038/projects/16072/branches/335663/badge/grade.svg",alt:"DeepScan grade"})),"\n",(0,o.kt)("a",{parentName:"p",href:"https://www.npmjs.com/package/popyt"},(0,o.kt)("img",{parentName:"a",src:"https://img.shields.io/npm/dt/popyt.svg",alt:"Downloads"})),"\n",(0,o.kt)("a",{parentName:"p",href:"https://www.npmjs.com/package/popyt"},(0,o.kt)("img",{parentName:"a",src:"https://img.shields.io/npm/v/popyt.svg",alt:"Version"}))),(0,o.kt)("h2",{id:"examples"},"Examples"),(0,o.kt)("admonition",{title:"QUESTION? CHECK THE DOCS",type:"tip"},(0,o.kt)("p",{parentName:"admonition"},"See the ",(0,o.kt)("a",{parentName:"p",href:"./api/classes/Library_Exports.YouTube"},"main class documentation"),"\nor the ",(0,o.kt)("a",{parentName:"p",href:"./tutorial/intro"},"tutorial")," to get started.")),(0,o.kt)("p",null,"Here are some basic methods:"),(0,o.kt)("p",null,"Instantiate the object:"),(0,o.kt)("font",{size:"2.5"},(0,o.kt)("b",null,(0,o.kt)("a",{href:"https://runkit.com/brandonbothell/fetch-a-video"},"Try this on RunKit"))),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"const { YouTube } = require('popyt')\nconst youtube = new YouTube(apiKey)\n")),(0,o.kt)("p",null,"Instantiate the object without caching:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"const { YouTube } = require('popyt')\nconst youtube = new YouTube(apiKey, undefined, { cache: false })\n")),(0,o.kt)("p",null,"Get a video by ID:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"const video = await youtube.getVideo('dQw4w9WgXcQ')\nconsole.log(video)\n")),(0,o.kt)("p",null,"You can do the same thing with playlists, channels, and comments by replacing ",(0,o.kt)("inlineCode",{parentName:"p"},"Video")," with any of them.  "),(0,o.kt)("p",null,"Get a video by URL:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"const video = await youtube.getVideo('https://youtube.com/watch?v=dQw4w9WgXcQ')\nconsole.log(video)\n")),(0,o.kt)("p",null,"Get a video by title (or similar title):"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"const video = await youtube.getVideo('never gonna give you up')\nconsole.log(video)\n")),(0,o.kt)("p",null,"Search videos:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"const videos = await youtube.searchVideos('never gonna give you up', 12)\nconsole.log(videos) // array of 12 partial video objects\n")),(0,o.kt)("p",null,"Note: This wrapper does not implement every feature of the YouTube API. If you would like anything added, feel free to open an issue. The limits imposed by the wrapper are not imposed by YouTube."),(0,o.kt)("h2",{id:"developmentcontributing"},"Development/Contributing"),(0,o.kt)("p",null,"Before committing:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Run ",(0,o.kt)("inlineCode",{parentName:"li"},"yarn lint"),"."),(0,o.kt)("li",{parentName:"ul"},"Run ",(0,o.kt)("inlineCode",{parentName:"li"},"yarn coverage")," or ",(0,o.kt)("inlineCode",{parentName:"li"},"npm run coverage")," to check if you've added enough tests. It should display 100% statement, line, and branch coverage."),(0,o.kt)("li",{parentName:"ul"},"Also, make sure that every test passes.")))}d.isMDXComponent=!0}}]);