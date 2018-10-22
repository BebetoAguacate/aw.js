function $Resize(callback){
	callback();
	window.addEventListener("resize",callback);
	window.addEventListener("load",callback)
}
Element.prototype.css=function(params,second){
	if(typeof second!="undefined"){
		this.style[params]=second;
	}else{
		for(var i=0;i<Object.keys(params).length;i++){
			this.style[Object.keys(params)[i]]=[Object.values(params)[i]];
		}
	}
}
function Message(params){
	var CloseImage=new Image();
	CloseImage.src="/img/close.png";
	// Message({
	// 	"title":"Título",
	// 	"titleCSS": {},
	// 	"html":"<p>Hola Mundo</p>",
	// 	"htmlCSS": {},
	//  "overlay": {},
	//  "fxspeed": 0.5 ,
	//  "closeIn": 5
	// });
	if(typeof params.fxspeed==="undefined"){
		params.fxspeed=0.5;
	}
	var overlay=document.createElement("div");
	overlay.css({
		"width": window.innerWidth+"px",
		"height": window.innerHeight+"px",
		"background": "rgba(0,0,0,0.5)",
		"position": "fixed",
		"left": "0px",
		"top": "0px",
		"opacity":"0",
		"transition":params.fxspeed+"s ease opacity"
	});
	if(typeof params.overlay!="undefined"){
		overlay.css(params.overlay);
	}
	var wrapper=document.createElement("div");
	if(typeof params.title!="undefined"){	
		var title=document.createElement("h3");
		title.innerHTML=params.title;
		wrapper.appendChild(title);
		title.css({
			"font-size": "1.8em",
			"border-bottom":"1px solid black",
			"margin-bottom": "10px",
			"padding-bottom": "10px"
		});
		if(typeof params.titleCSS!="undefined"){
			title.css(params.titleCSS);
		}
	}
	if(typeof params.html!="undefined"){
		var mainContent=document.createElement("div");
		var inner=document.createElement("div");
		inner.innerHTML=params.html;
		wrapper.appendChild(mainContent);
		mainContent.appendChild(inner);

		mainContent.css({
			"width":"100%",
			"height":"100%",
			"overflow":"auto"
		});
		if(typeof params.htmlCSS!="undefined"){
			inner.css(params.htmlCSS);
		}
	}
	wrapper.css(
		{
			"position":"absolute",
			"top":"50px",
			"left":"50%",
			"margin-left": "-400px",
			"color": "black",
			"background":"white",
			"padding": "10px",
			"width": "800px",
			"display": "block",
			"max-height":"700px",
			"overflow":"hidden"
		}
	);
	var closeButton=document.createElement("div");
	closeButton.css({
		"width": "20px",
		"height": "20px",
		"position": "absolute",
		"top": "0px",
		"right": "0px",
		"color": "white",
		"background":"red",
		"text-align":"center",
		"font-size":"24px",
		"cursor":"pointer"
	});
	closeButton.innerHTML="<img src='"+CloseImage.src+"'>";
	closeButton.getElementsByTagName("img")[0].css({
		"width":"100%",
		"height":"100%",
		"position":"absolute",
		"top":"0px",
		"left":"0px"
	});
	wrapper.appendChild(closeButton);

	closeButton.onclick=function(){
		overlay.css("opacity",0);
		setTimeout(function(){
			document.getElementsByTagName("body")[0].removeChild(overlay);
		},(params.fxspeed*1000));
	}

	overlay.appendChild(wrapper);
	document.getElementsByTagName("body")[0].appendChild(overlay);
	setTimeout(function(){
		overlay.css("opacity",1);
	},20);
	var initHeight=wrapper.offsetTop+wrapper.offsetHeight+(20+wrapper.offsetTop);

	if(window.innerHeight<=initHeight){
		wrapper.css({
			"height":((window.innerHeight-wrapper.offsetTop)-20)+"px"
		});
	}

	$Resize(function(){
		overlay.css({
			"width": window.innerWidth+"px",
			"height": window.innerHeight+"px"
		});
		if(window.innerWidth<900){
			wrapper.css(
				{
					"top":"50px",
					"left":"5%",
					"margin-left":"0px",
					"width": "90%"
				}
			);
		}else{
			wrapper.css(
				{
					"top":"50px",
					"left":"50%",
					"margin-left": "-400px",
					"width": "800px"
				}
			);
		}
		inner.css("height","auto");
		inner.css({
			"width":"100%",
			"height":inner.scrollHeight+"px"
		});
		wrapper.css({
			"overflow":"hidden",
			"padding-bottom":wrapper.offsetTop+20+"px"
		});
		if(window.innerHeight<=initHeight){
			wrapper.css({
				"height":((window.innerHeight-wrapper.offsetTop)-20)+"px"
			});
		}
		if(window.innerHeight<=400){
			wrapper.css("top","10px");
		}else{
			wrapper.css("top","50px");

		}
	});
	if(typeof params.closeIn!="undefined"){
		setTimeout(function(){
			closeButton.click();
		},(params.closeIn*1000));
	}
}
