import{a as w,S as v,i as n}from"./assets/vendor-tnUJPedx.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function s(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(t){if(t.ep)return;t.ep=!0;const o=s(t);fetch(t.href,o)}})();const L="https://pixabay.com/api/",S="48624871-26dc1fa3882184af001c85b14";async function C(e,r=1,s=15){const a=new URLSearchParams({key:S,q:e,image_type:"photo",orientation:"horizontal",safesearch:"true",page:r,per_page:s});try{return(await w.get(`${L}?${a}`)).data}catch(t){throw console.error("Error fetching images:",t),t}}let u;function q(e){const r=document.querySelector(".gallery"),s=document.querySelector(".loader"),a=e.map(({largeImageURL:t,webformatURL:o,tags:i,likes:g,views:h,comments:y,downloads:b})=>`
          <li class="gallery-item">
            <article class="card">
              <a class="card-link" href="${t}" target="_blank" rel="noopener noreferrer">
                <img class="card-image" src="${o}" alt="${i}" />
              </a>
              <div class="card-container">
                <div class="card-item">
                  <p class="card-title"><i class="fas fa-heart"></i> Likes</p>
                  <p class="card-count">${g}</p>
                </div>
                <div class="card-item">
                  <p class="card-title"><i class="fas fa-eye"></i> Views</p>
                  <p class="card-count">${h}</p>
                </div>
                <div class="card-item">
                  <p class="card-title"><i class="fas fa-comment"></i> Comments</p>
                  <p class="card-count">${y}</p>
                </div>
                <div class="card-item">
                  <p class="card-title"><i class="fas fa-download"></i> Downloads</p>
                  <p class="card-count">${b}</p>
                </div>
              </div>
            </article>
          </li>
        `).join("");r.insertAdjacentHTML("beforeend",a),r.parentNode.insertBefore(s,r.nextSibling),u?u.refresh():u=new v(".gallery a",{captionsData:"alt",captionDelay:250,captionPosition:"bottom"})}function m(){document.querySelector(".loader").classList.remove("is-hidden")}function E(){document.querySelector(".loader").classList.add("is-hidden")}function P(){const e=document.querySelector(".gallery");e.innerHTML=""}function c(e){const r=document.querySelector(".btn-load-more");r.style.display=e?"block":"none"}let l=1,d="",f=0;const $=document.querySelector(".search-form"),B=document.querySelector('input[name="searchQuery"]'),O=document.querySelector(".btn-load-more");$.addEventListener("submit",R);O.addEventListener("click",M);async function R(e){if(e.preventDefault(),d=B.value.trim(),!d){n.error({title:"Error",message:"Please enter a search query.",position:"topRight",backgroundColor:"red",messageColor:"white",titleColor:"white"});return}l=1,P(),c(!1),m(),await p()}async function M(){l+=1,m(),await p(),k()}async function p(){try{const e=await C(d,l);if(f=e.totalHits,e.hits.length===0){n.warning({title:"No results",message:`No images found for "${d}". Please try another query.`,position:"topRight",backgroundColor:"orange",messageColor:"white",titleColor:"white"}),c(!1);return}q(e.hits),l*15>=f?(c(!1),n.info({title:"End of results",position:"topRight",message:"We're sorry, but you've reached the end of search results.",backgroundColor:"blue",messageColor:"white",titleColor:"white"})):c(!0)}catch(e){console.error("Error fetching images:",e),n.error({title:"Error",message:`Error: ${e.message}`,position:"topRight",backgroundColor:"red",messageColor:"white",titleColor:"white"})}finally{E()}}function k(){const e=document.querySelector(".gallery a");if(e){const{height:r}=e.getBoundingClientRect();window.scrollBy({top:r*2.6,behavior:"smooth"})}}
//# sourceMappingURL=index.js.map
