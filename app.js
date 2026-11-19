/* Artistry by Sweta J — shared shop behaviour: cards, bag, WhatsApp order */
(function(){
var S=window.ART_SETTINGS||{};var WA=S.waNumber||"919244632644";
function inr(n){return "₹"+Number(n).toLocaleString("en-IN");}
function esc(s){return String(s||"").replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c];});}
window.ARTfmt=inr;window.ARTesc=esc;
var bag=[];try{bag=JSON.parse(localStorage.getItem("art_bag_v1")||"[]");}catch(e){bag=[];}
function saveBag(){try{localStorage.setItem("art_bag_v1",JSON.stringify(bag));}catch(e){}renderBag();}
function products(){return (window.ART_PRODUCTS||[]).filter(function(p){return p.visible!==false;});}
function byId(id){return products().filter(function(p){return p.id===Number(id);})[0];}
window.ARTbyId=byId;window.ARTproducts=products;
function card(p){return '<article class="card"><a class="ph" href="product.html?id='+p.id+'"><img src="'+p.img+'" alt="'+esc(p.alt)+'"></a><div class="card-body"><a class="card-name" href="product.html?id='+p.id+'">'+esc(p.name)+'</a><span class="card-price">'+inr(p.price)+'</span><button class="btn-add" data-add="'+p.id+'">Add to Bag</button></div></article>';}
window.ARTcard=card;
function toast(msg){var t=document.querySelector(".toast");if(!t){t=document.createElement("div");t.className="toast";document.body.appendChild(t);}t.textContent=msg;t.classList.add("show");setTimeout(function(){t.classList.remove("show");},1900);}
window.ARTtoast=toast;
function bagCount(){return bag.reduce(function(a,i){return a+i.qty;},0);}
function bagTotal(){return bag.reduce(function(a,i){var p=byId(i.id);return a+(p?p.price*i.qty:0);},0);}
function renderBag(){var n=bagCount();document.querySelectorAll(".bag-count").forEach(function(b){b.textContent=n;b.hidden=n===0;});var fb=document.querySelector(".float-bag");if(fb){fb.hidden=n===0;fb.querySelector("span").textContent="Bag · "+inr(bagTotal());}
var list=document.querySelector(".bag-items");if(!list)return;
if(!bag.length){list.innerHTML='<p style="color:var(--muted)">Your bag is empty. Add a piece you like.</p>';}
else{list.innerHTML=bag.map(function(i){var p=byId(i.id);if(!p)return"";return '<div class="bag-item"><img src="'+p.img+'" alt=""><div style="flex:1"><div class="n">'+esc(p.name)+'</div><div style="color:var(--muted);font-size:13px">'+inr(p.price)+' each</div><div class="qty"><button data-dec="'+p.id+'">−</button><b>'+i.qty+'</b><button data-inc="'+p.id+'">+</button></div></div><b>'+inr(p.price*i.qty)+'</b></div>';}).join("");}
var tot=document.querySelector(".bag-total");if(tot)tot.textContent=inr(bagTotal());}
window.ARTsaveBag=saveBag;window.ARTrenderBag=renderBag;
document.addEventListener("click",function(e){
var add=e.target.closest("[data-add]");if(add){var id=Number(add.getAttribute("data-add"));var f=bag.filter(function(i){return i.id===id;})[0];if(f)f.qty++;else bag.push({id:id,qty:1});saveBag();toast("Added to bag");return;}
var inc=e.target.closest("[data-inc]");if(inc){bag.forEach(function(i){if(i.id===Number(inc.getAttribute("data-inc")))i.qty++;});saveBag();return;}
var dec=e.target.closest("[data-dec]");if(dec){bag=bag.map(function(i){if(i.id===Number(dec.getAttribute("data-dec")))i.qty--;return i;}).filter(function(i){return i.qty>0;});saveBag();return;}
if(e.target.closest(".float-bag")||e.target.closest("[data-open-bag]")){var d=document.querySelector(".drawer");if(d)d.classList.add("open");return;}
if(e.target.closest("[data-close-bag]")||e.target.classList.contains("drawer-bg")){var d2=document.querySelector(".drawer");if(d2)d2.classList.remove("open");return;}
});
function sendOrder(){if(!bag.length){toast("Your bag is empty");return;}
var name=(document.querySelector("#cust-name")||{}).value||"";var city=(document.querySelector("#cust-city")||{}).value||"";
var lines=bag.map(function(i){var p=byId(i.id);return "• "+p.name+" × "+i.qty+" — "+inr(p.price*i.qty);});
var total=bagTotal();
if(window.ARTStore){window.ARTStore.addOrder({ref:"Site order",who:(name||"Website buyer")+(city?" · "+city:""),phone:"",city:city,item:bag.map(function(i){var p=byId(i.id);return p.name+" × "+i.qty;}).join(" · "),total:total,notes:"Sent from sample website bag"});}
var msg="Hi Sweta, I saw your website and I want to order:\n"+lines.join("\n")+"\nTotal: "+inr(total)+(name?"\nName: "+name:"")+(city?"\nCity: "+city:"")+"\nPlease confirm availability and delivery.";
window.open("https://wa.me/"+WA+"?text="+encodeURIComponent(msg),"_blank");}
window.ARTsendOrder=sendOrder;
document.addEventListener("DOMContentLoaded",renderBag);
})();

/* Reveal motion (design system: one entrance, JS-set initial state so no-JS keeps content visible) */
(function(){if(!("IntersectionObserver" in window))return;var els=[];function collect(){document.querySelectorAll("section,.card,.cat,.strip figure,.hero-img").forEach(function(e){if(!e.dataset.rv){e.dataset.rv="1";e.classList.add("rv-init");els.push(e);}});}
var io=new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting){en.target.classList.add("rv-in");io.unobserve(en.target);}});},{threshold:.08});
function init(){collect();els.forEach(function(e,i){e.style.transitionDelay=(Math.min(i%4,3)*70)+"ms";io.observe(e);});}
if(document.readyState==="loading"){document.addEventListener("DOMContentLoaded",init);}else{init();}
new MutationObserver(function(){collect();els.forEach(function(e){io.observe(e);});}).observe(document.body,{childList:true,subtree:true});
})();
