"use strict";(self.webpackChunkdocusaurus=self.webpackChunkdocusaurus||[]).push([[897],{8745:(e,t,l)=>{l.d(t,{n:()=>P,Z:()=>N});var o,a=l(9501),n=l(9953);function i(){return i=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var l=arguments[t];for(var o in l)Object.prototype.hasOwnProperty.call(l,o)&&(e[o]=l[o])}return e},i.apply(this,arguments)}const s=e=>{let{title:t,titleId:l,...a}=e;return n.createElement("svg",i({fill:"#25c2a0",width:64,height:64,viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg","aria-labelledby":l},a),void 0===t?n.createElement("title",{id:l},"RunKit icon"):t?n.createElement("title",{id:l},t):null,o||(o=n.createElement("path",{d:"M23.97 14.8a3 3 0 0 1-1.47 3.02l-9 5.2a3 3 0 0 1-3 0l-9-5.2A3 3 0 0 1 .03 14.8l1.32-7.2a3 3 0 0 1 .98-1.82 2.96 2.96 0 0 1 .49-.35l7.55-4.37a3.01 3.01 0 0 1 3.28.02l7.53 4.35c.1.05.19.1.28.17a3 3 0 0 1 1.19 2zM14.43 4.03 6.71 5.62c-.43.08-.51.64-.14.86l5.6 3.23c.23.13.5.07.63-.19l1.58-3.6.53-1.22c.16-.35-.11-.75-.5-.67z"})))};var r=l(76),c=l(4923),d=l(2002),u=l(4919),m=l(5454);const p={noMarginCodeBlockContainer:"noMarginCodeBlockContainer_R_6h"};function h(e){let{as:t,...l}=e;const o=(0,d.p)(),i=(0,m.QC)(o),s=t;return n.createElement(s,(0,a.Z)({},l,{style:i,className:(0,c.Z)(l.className,p.noMarginCodeBlockContainer,u.k.common.codeBlock)}))}const g={codeBlockContent:"codeBlockContent_PVZI",codeBlockTitle:"codeBlockTitle_PBxQ",codeBlock:"codeBlock_XBLg",codeBlockStandalone:"codeBlockStandalone_fwuF",codeBlockLines:"codeBlockLines_sJh2",codeBlockLinesWithNumbering:"codeBlockLinesWithNumbering_dTV3",buttonGroup:"buttonGroup_s26V"};function y(e){let{children:t,className:l}=e;return n.createElement(h,{as:"pre",tabIndex:0,className:(0,c.Z)(g.codeBlockStandalone,"thin-scrollbar",l)},n.createElement("code",{className:g.codeBlockLines},t))}var k=l(4621),b=l(7818),v=l(2710),f=l(4548),B=l(9691),E=l(4111);function w(e){let{children:t,className:l="",metastring:o,title:i,showLineNumbers:s,language:r}=e;const{prism:{defaultLanguage:u,magicComments:p}}=(0,k.L)(),y=r??(0,m.Vo)(l)??u,w=(0,d.p)(),N=(0,b.F)(),P=(0,m.bc)(o)||i,{lineClassNames:C,code:T}=(0,m.nZ)(t,{metastring:o,language:y,magicComments:p}),L=s??(0,m.nt)(o);return n.createElement(h,{as:"div",className:(0,c.Z)(l,y&&!l.includes(`language-${y}`)&&`language-${y}`)},P&&n.createElement("div",{className:g.codeBlockTitle},P),n.createElement("div",{className:g.codeBlockContent},n.createElement(v.ZP,(0,a.Z)({},v.lG,{theme:w,code:T,language:y??"text"}),(e=>{let{className:t,tokens:l,getLineProps:o,getTokenProps:a}=e;return n.createElement("pre",{tabIndex:0,ref:N.codeBlockRef,className:(0,c.Z)(t,g.codeBlock,"thin-scrollbar")},n.createElement("code",{className:(0,c.Z)(g.codeBlockLines,L&&g.codeBlockLinesWithNumbering)},l.map(((e,t)=>n.createElement(f.Z,{key:t,line:e,getLineProps:o,getTokenProps:a,classNames:C[t],showLineNumbers:L})))))})),n.createElement("div",{className:g.buttonGroup},(N.isEnabled||N.isCodeScrollable)&&n.createElement(E.Z,{className:g.codeButton,onClick:()=>N.toggle(),isEnabled:N.isEnabled}),n.createElement(B.Z,{className:g.codeButton,code:T}))))}function N(e){let{children:t,runkitUrl:l,...o}=e;const i=(0,r.Z)(),s=function(e){return n.Children.toArray(e).some((e=>(0,n.isValidElement)(e)))?e:Array.isArray(e)?e.join(""):e}(t),c="string"==typeof s?w:y;return n.createElement("div",null,n.createElement(c,(0,a.Z)({key:String(i)},o),s),n.createElement("div",{style:{textAlign:"start",marginBottom:"16px"}},n.createElement("text",{fontSize:"2.75"},n.createElement("b",null,n.createElement("a",{href:l,target:"_blank"}," Try this on ",n.createElement(P,null))))))}function P(){return n.createElement("text",null,n.createElement(s,{role:"img",style:{width:"15",height:"15",verticalAlign:"middle",marginRight:"1px"}}),"RunKit")}},4472:(e,t,l)=>{l.r(t),l.d(t,{assets:()=>c,contentTitle:()=>s,default:()=>p,frontMatter:()=>i,metadata:()=>r,toc:()=>d});var o=l(9501),a=(l(9953),l(7485)),n=l(8745);const i={sidebar_position:1},s="Working with Playlists",r={unversionedId:"tutorial/tutorial-basics/working-with-playlists",id:"tutorial/tutorial-basics/working-with-playlists",title:"Working with Playlists",description:"Playlists are lists of videos and a some metadata including a title, description, etc. They have some unique behaviors, especially pertaining to the completeness of videos fetched from these objects.",source:"@site/docs/tutorial/tutorial-basics/working-with-playlists.md",sourceDirName:"tutorial/tutorial-basics",slug:"/tutorial/tutorial-basics/working-with-playlists",permalink:"/popyt/docs/tutorial/tutorial-basics/working-with-playlists",draft:!1,editUrl:"https://github.com/brandonbothell/popyt/tree/master/docusaurus/templates/shared/docs/tutorial/tutorial-basics/working-with-playlists.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"tutorialSidebar",previous:{title:"Tutorial - Basics",permalink:"/popyt/docs/category/tutorial---basics"},next:{title:"Congratulations!",permalink:"/popyt/docs/tutorial/tutorial-basics/congratulations"}},c={},d=[{value:"Getting started",id:"getting-started",level:2},{value:"Fetch your first playlist",id:"fetch-your-first-playlist",level:2},{value:"Fetch a playlist&#39;s videos",id:"fetch-a-playlists-videos",level:2}],u={toc:d},m="wrapper";function p(e){let{components:t,...l}=e;return(0,a.kt)(m,(0,o.Z)({},u,l,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"working-with-playlists"},"Working with Playlists"),(0,a.kt)("p",null,"Playlists are lists of videos and a some metadata including a title, description, etc. They have some unique behaviors, especially pertaining to the completeness of videos fetched from these objects."),(0,a.kt)("h2",{id:"getting-started"},"Getting started"),(0,a.kt)("p",null,"If you haven't already, check out ",(0,a.kt)("a",{parentName:"p",href:"../intro"},"the introduction"),".",(0,a.kt)("br",{parentName:"p"}),"\n","Check out the ",(0,a.kt)("b",null,(0,a.kt)("a",{href:"https://runkit.com/brandonbothell/fetch-a-playlist",target:"_blank"},(0,a.kt)(n.n,{mdxType:"RunkitText"})))," for a quick ",(0,a.kt)("strong",{parentName:"p"},"example\nthat you can run online and download"),"."),(0,a.kt)("h2",{id:"fetch-your-first-playlist"},"Fetch your first playlist"),(0,a.kt)(n.Z,{language:"js",runkitUrl:"https://runkit.com/brandonbothell/fetch-a-playlist",mdxType:"RunkitCodeBlock"},"const playlistById = youtube.getPlaylist('PLOnQsl0GcqfbrO4-KsJQp7ecp5T16frBI')\nconst playlistByUrl = youtube.getPlaylist('https://www.youtube.com/playlist?list=PLOnQsl0GcqfbrO4-KsJQp7ecp5T16frBI')\nconst playlistByTitleSearch = youtube.getPlaylist('Never Gonna Give You Up Parodies')\n\n\nconsole.log(`Playlist title: ${playlistById.title}`)\nconsole.log(`Playlist length: ${playlistById.length} videos`)"),(0,a.kt)("admonition",{title:"CHILD OBJECTS MUST BE FETCHED EXPLICITLY",type:"tip"},(0,a.kt)("p",{parentName:"admonition"},"To save your quota, Popyt doesn't fetch child objects of classes automatically.\nInstead, you can fetch them as you need them using convenient methods right on the class objects or the main YouTube class methods.")),(0,a.kt)("h2",{id:"fetch-a-playlists-videos"},"Fetch a playlist's videos"),(0,a.kt)("admonition",{title:"PROPERTIES AREN'T GUARANTEED",type:"caution"},(0,a.kt)("p",{parentName:"admonition"},"Playlists are unique because they contain ",(0,a.kt)("a",{parentName:"p",href:"https://developers.google.com/youtube/v3/docs/playlistItems#resource-representation"},"playlist items")," rather than videos.")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"const videos = await playlist.fetchVideos() // or use .then()\n\nconsole.log(`First video: ${playlist.videos[0].title}`) // available through the original object\nconsole.log(`Last video: ${videos[videos.length - 1].title}`) // or from the return value of the method\n")),(0,a.kt)("p",null,"Playlist items contain less information than videos, but since they are similar, these types have been merged in Popyt. Search results have similar behavior."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-js"},"const video = playlist.videos[0]\n\nconsole.log(video.full) // false\nconsole.log(video.commentCount) // undefined\n\nawait video.fetch()\n\nconsole.log(video.full) // true\nconsole.log(video.commentCount) // the number of comments on the video\n")))}p.isMDXComponent=!0}}]);