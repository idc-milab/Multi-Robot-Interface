(this["webpackJsonp@fed-exam/client"]=this["webpackJsonp@fed-exam/client"]||[]).push([[0],{135:function(t,e,a){"use strict";a.r(e);var n=a(0),o=a.n(n),l=a(22),i=a.n(l),r=(a(91),a(29)),c=a(77),s=a(78),u=a(85),m=a(83),p=(a(92),a(39)),f=a(32),d=a.n(f),h=a(79),b=a(84),E=a(140),I=a(147),y=a(80);function v(t){var e=t.butterClient,a=t.onRemove,l=Object(n.useState)([]),i=Object(b.a)(l,2),r=i[0],c=i[1];Object(n.useEffect)((function(){s()}),[]);var s=function(){var t=Object(h.a)(d.a.mark((function t(){var a,n;return d.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return setTimeout((function(){}),5e3),t.next=3,e.getAvailableAnimations();case 3:if(200===(a=t.sent).status){t.next=7;break}return console.error("Failed to get robot animations",a),t.abrupt("return");case 7:n=a.data.response.data.replace("[","").replace("]","").replace(/\\s+/,"").split(","),console.log(n),c(n);case 10:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();return o.a.createElement(E.a,{className:"robot-card"},o.a.createElement(I.a,null,o.a.createElement(I.a.Header,null,o.a.createElement("div",{style:{display:"flex",alignItems:"center"}},o.a.createElement("p",{style:{marginBottom:0}},e.ip),o.a.createElement(y.a,{type:"button",className:"remove btn",variant:"outline-danger","aria-hidden":"true",onClick:function(){return a(e.ip)},style:{marginLeft:"auto"}},"\ud83d\uddd1"))),o.a.createElement(I.a.Body,null,o.a.createElement("div",{key:e.ip,className:"robot-object"},0===r.length?"There was a problem connecting to the robot.. please try again..":r.map((function(t){return o.a.createElement(y.a,{variant:"secondary",className:"animation-button",key:t,onClick:function(){return function(t){e.playAnimation(t.trim())}(t)}},t)}))))))}var A=a(146),k=a(148),g=a(143),w=a(145),H=a(144),_=a(149),C=a(141),T=a(142),S=a(82),F=(a(127),a(43)),P=a(8),N=new p.HttpClient("192.168.57.30"),O=new p.HttpClient("192.168.56.188");N.timeout=240,O.timeout=240;var B=new Map([["In-Group",{start:function(){N.playAnimation("kip_45_Full"),O.playAnimation("kip_45_Full")},breathFull:function(){N.playAnimation("kip_Full_Breath",!0),O.playAnimation("kip_Full_Breath",!0)},fullToHalf:function(){N.stopAnimation(),O.stopAnimation(),N.clearAnimation(),O.clearAnimation(),setTimeout((function(){N.playAnimation("kip_FullToHalf",!0)}),500),setTimeout((function(){O.playAnimation("kip_FullToHalf",!0)}),500)},breathHalf:function(){N.playAnimation("kip_Half_Breath"),O.playAnimation("kip_Half_Breath")},halfToFull:function(){N.stopAnimation(),O.stopAnimation(),N.clearAnimation(),O.clearAnimation(),setTimeout((function(){N.playAnimation("kip_HalfToFull",!0)}),500),setTimeout((function(){O.playAnimation("kip_HalfToFull",!0)}),500)},stopFull:function(){N.stopAnimation(),O.stopAnimation(),N.clearAnimation(),O.clearAnimation(),setTimeout((function(){N.playAnimation("kip_45_FullStop",!0)}),500),setTimeout((function(){O.playAnimation("kip_45_FullStop",!0)}),500)},stopHalf:function(){N.stopAnimation(),O.stopAnimation(),N.clearAnimation(),O.clearAnimation(),setTimeout((function(){N.playAnimation("kip_45_HalfStop",!0)}),500),setTimeout((function(){O.playAnimation("kip_45_HalfStop",!0)}),500)}}],["Out-Group",{start:function(){N.playAnimation("kip_45_Full"),O.playAnimation("kip_72_Full")},breathFull:function(){N.playAnimation("kip_Full_Breath",!0),O.playAnimation("kip_Full_Breath",!0)},fullToHalf:function(){N.stopAnimation(),O.stopAnimation(),N.clearAnimation(),O.clearAnimation(),setTimeout((function(){N.playAnimation("kip_FullToHalf",!0)}),500),setTimeout((function(){O.playAnimation("kip_FullToHalf",!0)}),500)},breathHalf:function(){N.playAnimation("kip_Half_Breath"),O.playAnimation("kip_Half_Breath")},halfToFull:function(){N.stopAnimation(),O.stopAnimation(),N.clearAnimation(),O.clearAnimation(),setTimeout((function(){N.playAnimation("kip_HalfToFull",!0)}),500),setTimeout((function(){O.playAnimation("kip_HalfToFull",!0)}),500)},stopFull:function(){N.stopAnimation(),O.stopAnimation(),N.clearAnimation(),O.clearAnimation(),setTimeout((function(){N.playAnimation("kip_45_FullStop",!0)}),500),setTimeout((function(){O.playAnimation("kip_70_FullStop",!0)}),500)},stopHalf:function(){N.stopAnimation(),O.stopAnimation(),N.clearAnimation(),O.clearAnimation(),setTimeout((function(){N.playAnimation("kip_45_HalfStop",!0)}),500),setTimeout((function(){O.playAnimation("kip_70_HalfStop",!0)}),500)}}]]),R=function(t){var e=t.scenario,a=B.get(e),n=a.start,l=a.breathFull,i=a.fullToHalf,r=a.breathHalf,c=a.halfToFull,s=a.stopFull,u=a.stopHalf;return o.a.createElement("div",null,o.a.createElement(E.a,{className:"scenario-component"},o.a.createElement(I.a,null,o.a.createElement(I.a.Header,null,e),o.a.createElement(I.a.Body,null,o.a.createElement(y.a,{onClick:n,variant:"success"},"Start"),o.a.createElement(y.a,{onClick:l,variant:"warning"},"Breath Full"),o.a.createElement(y.a,{onClick:i,variant:"warning"},"Full To Half"),o.a.createElement(y.a,{onClick:r,variant:"warning"},"Breath Half"),o.a.createElement(y.a,{onClick:c,variant:"warning"},"Half To Full"),o.a.createElement(y.a,{onClick:s,variant:"danger"},"Stop Full"),o.a.createElement(y.a,{onClick:u,variant:"danger"},"Stop Half")))))},j=function(t){Object(u.a)(a,t);var e=Object(m.a)(a);function a(){var t;Object(c.a)(this,a);for(var n=arguments.length,l=new Array(n),i=0;i<n;i++)l[i]=arguments[i];return(t=e.call.apply(e,[this].concat(l))).state={dayNightStatus:!1,NewIPInput:"",currentButterClients:[],showInst:!1,showNewIP:!1,labCurrentIPs:["192.168.57.27","192.168.57.32","192.168.57.34","192.168.56.188","192.168.56.193","192.168.56.206"],IPdeleteState:Array(6).fill(!1)},t.SetDayNightStatus=function(){t.setState({dayNightStatus:!t.state.dayNightStatus})},t.onAddRobotObject=function(e){var a=new p.HttpClient(e);a.timeout=240,t.state.currentButterClients.map((function(t){return t.ip})).some((function(t){return t===e}))||t.setState({currentButterClients:[].concat(Object(r.a)(t.state.currentButterClients),[a]),showNewIP:!t.state.showNewIP})},t.onRemoveRobotObject=function(e){t.setState({currentButterClients:t.state.currentButterClients.filter((function(t){return t.ip!==e}))})},t.onRemoveRobotIP=function(e){var a=Object(r.a)(t.state.labCurrentIPs),n=Object(r.a)(t.state.IPdeleteState),o=a.indexOf(e);a.splice(o,1),n.splice(o,1),t.setState({labCurrentIPs:a}),t.setState({IPdeleteState:n})},t.onToggleInstructions=function(){t.setState({showInst:!t.state.showInst})},t.onToggleIPadd=function(){t.setState({showNewIP:!t.state.showNewIP,IPdeleteState:t.state.IPdeleteState.fill(!1)})},t.NewIpADDED=function(){var e=/^[0-9]+[.][0-9]+[.][0-9]+[.][0-9]+$/g.test(t.state.NewIPInput),a=t.state.labCurrentIPs.indexOf(t.state.NewIPInput);e?(-1===a&&t.setState({labCurrentIPs:[].concat(Object(r.a)(t.state.labCurrentIPs),[t.state.NewIPInput]),IPdeleteState:[].concat(Object(r.a)(t.state.IPdeleteState),[!1])}),t.setState({NewIPInput:""})):alert("Incorrect Input")},t.handleChange=function(e){t.setState({NewIPInput:e.target.value})},t.handlePress=function(e){"Enter"===e.key&&t.NewIpADDED()},t.renderRobotObjects=function(){return o.a.createElement("ul",{className:"robot-objects"},t.state.currentButterClients.map((function(e){return o.a.createElement(v,{key:e.ip,butterClient:e,onRemove:t.onRemoveRobotObject})})))},t}return Object(s.a)(a,[{key:"renderButtons",value:function(t){var e=this,a=Object(r.a)(this.state.labCurrentIPs),n=Object(r.a)(this.state.IPdeleteState),l=a.indexOf(t);return this.state.IPdeleteState[l]?(n[l]=!1,o.a.createElement(o.a.Fragment,null,o.a.createElement(y.a,{variant:"secondary",disabled:!0},"Delete ",t,"?"),o.a.createElement(y.a,{variant:"outline-danger",onClick:function(){return e.setState((function(){return e.onRemoveRobotIP(t)}))}},"\ud83d\uddf8"),o.a.createElement(y.a,{variant:"outline-secondary",onClick:function(){return e.setState({IPdeleteState:n})}},"\u2717"))):(n[l]=!0,o.a.createElement(o.a.Fragment,null,o.a.createElement(y.a,{variant:"secondary",onClick:function(){return e.onAddRobotObject(t)}},"Connect to: ",t),o.a.createElement(y.a,{variant:"outline-danger",onClick:function(){return e.setState({IPdeleteState:n})}},"\ud83d\uddd1")))}},{key:"render",value:function(){var t=this,e=this.state.currentButterClients;return o.a.createElement(F.a,null,o.a.createElement("div",null,o.a.createElement(F.a,null,o.a.createElement(A.a,{bg:"dark",variant:"dark"},o.a.createElement(A.a.Brand,{href:"/home"},"Multi Robot Operator"),o.a.createElement(k.a.Link,{href:"/home",style:{color:"#FFF"}},"Home"),o.a.createElement(g.a,{title:"HHRRI",id:"basic-nav-dropdown",style:{color:"#FFF"}},o.a.createElement(g.a.Item,null,o.a.createElement(F.b,{to:"/HHRRI/In-Group"},"In-Group")),o.a.createElement(g.a.Divider,null),o.a.createElement(g.a.Item,null,o.a.createElement(F.b,{to:"/HHRRI/Out-Group"},"Out-Group")))),o.a.createElement(A.a,{collapseOnSelect:!0,expand:"lg",className:"robot-search navbar-collapse",bg:"dark",variant:"dark"},o.a.createElement(A.a.Toggle,{"aria-controls":"responsive-navbar-nav"}),o.a.createElement(w.a,{inline:!0},o.a.createElement(y.a,{variant:"outline-info",onClick:this.onToggleIPadd},"Connect to a Robot"),o.a.createElement(H.a,{show:this.state.showNewIP,onHide:this.onToggleIPadd},o.a.createElement(H.a.Header,{translate:"true"},o.a.createElement(H.a.Title,null,"Robots List:")),o.a.createElement(H.a.Body,null,o.a.createElement(_.a,{className:"navbar-brand"},this.state.labCurrentIPs.map((function(e){return o.a.createElement(_.a.Item,null,o.a.createElement(C.a,{"aria-label":"Basic example"},t.renderButtons(e)))}))),o.a.createElement("p",null),o.a.createElement(T.a,{className:"mb-3"},o.a.createElement(S.a,{placeholder:"New Robot's IP","aria-label":"New Robot's IP","aria-describedby":"basic-addon2",value:this.state.NewIPInput,onChange:this.handleChange,onKeyPress:this.handlePress}),o.a.createElement(y.a,{variant:"outline-secondary",id:"button-addon2",onClick:this.NewIpADDED},"Add"))),o.a.createElement(H.a.Footer,null,o.a.createElement(y.a,{variant:"secondary",onClick:this.onToggleIPadd},"\ud83e\udc46")))),o.a.createElement(A.a.Collapse,{id:"responsive-navbar-nav"},o.a.createElement(k.a,{className:"ml-auto"},o.a.createElement(y.a,{variant:"secondary",onClick:this.onToggleInstructions},"Instructions"),o.a.createElement(y.a,{className:"mx-2",onClick:function(){document.body.classList.toggle("background-night"),t.SetDayNightStatus()},variant:"outline-info"},this.state.dayNightStatus?"Bright":"Dark"),o.a.createElement(H.a,{show:this.state.showInst,onHide:this.onToggleInstructions},o.a.createElement(H.a.Header,{translate:"true"},o.a.createElement(H.a.Title,null,'Manual for the "Robot-Operator"')),o.a.createElement(H.a.Body,null,o.a.createElement("p",null,"1. Make sure that your robot in connected to a ButterComposer on some laptop around the lab"),o.a.createElement("p",null,"2. Make sure that this computer is connected to milab_idc wifi network (password: milabspirit)"),o.a.createElement("p",null,"3. Try to remove and then add the robot card from the screen if there are no available animations buttons apeering on screen"),"4. Once you have done steps 1,2,3 - try again!"),o.a.createElement(H.a.Footer,null,o.a.createElement(y.a,{variant:"secondary",onClick:this.onToggleInstructions},"I'm ready! go back")))))),o.a.createElement(P.c,null,o.a.createElement(P.a,{path:"/HHRRI/In-Group"},o.a.createElement(R,{scenario:"In-Group"})),o.a.createElement(P.a,{path:"/HHRRI/Out-Group"},o.a.createElement(R,{scenario:"Out-Group"}))),e!==[]?this.renderRobotObjects():o.a.createElement("h2",null,"loading.."))))}}]),a}(o.a.PureComponent);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(o.a.createElement(j,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()}))},86:function(t,e,a){t.exports=a(135)},91:function(t,e,a){},92:function(t,e,a){}},[[86,1,2]]]);
//# sourceMappingURL=main.4c58541a.chunk.js.map