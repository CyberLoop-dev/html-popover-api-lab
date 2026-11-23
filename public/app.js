const support=document.querySelector("#support"),events=document.querySelector("#events");
const autoPanel=document.querySelector("#auto-panel"),manualPanel=document.querySelector("#manual-panel");
const supported=typeof HTMLElement.prototype.showPopover==="function"&&"popover" in HTMLElement.prototype;
support.textContent=supported?"Popover API detected in this browser.":"Popover API is not available in this browser.";
support.style.color=supported?"#a7f3d0":"#fbbf24";
function log(message){const li=document.createElement("li");li.textContent=new Date().toLocaleTimeString()+" — "+message;events.prepend(li);while(events.children.length>12)events.lastElementChild.remove();}
for(const [name,panel] of [["auto",autoPanel],["manual",manualPanel]]){
 panel.addEventListener("beforetoggle",e=>log(name+" beforetoggle: "+e.newState));
 panel.addEventListener("toggle",e=>log(name+" toggle: "+e.newState));
}
document.querySelector("#show-manual").addEventListener("click",()=>{try{manualPanel.showPopover()}catch(e){log("showPopover error: "+e.message)}});
document.querySelector("#hide-manual").addEventListener("click",()=>{try{manualPanel.hidePopover()}catch(e){log("hidePopover error: "+e.message)}});
document.querySelector("#clear").addEventListener("click",()=>{events.replaceChildren();log("Log cleared")});
if(!supported){document.querySelectorAll("button").forEach(b=>b.disabled=true);log("This browser does not implement the Popover API.");}
