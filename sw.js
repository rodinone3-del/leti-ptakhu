var CACHE='leti-ptakhu-v1.7.0';
var FILES=['./','./index.html','./manifest.webmanifest','./firebase-config.js','./game-config.js','./icon-192.png','./icon-512.png','./apple-touch-icon.png'];
self.addEventListener('install',function(e){e.waitUntil(caches.open(CACHE).then(function(c){return c.addAll(FILES)}).then(function(){return self.skipWaiting()}))});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(k){return Promise.all(k.filter(function(n){return n!==CACHE}).map(function(n){return caches.delete(n)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener('fetch',function(e){
  var r=e.request;
  if(r.method!=='GET')return;
  var u=new URL(r.url);
  /* музику сервіс-воркер не чіпає (аудіо запитується частинами), окрім списку треків */
  if(u.origin===location.origin&&u.pathname.indexOf('/music/')>=0&&!/playlist\.json$/.test(u.pathname))return;
  if(u.origin===location.origin){
    /* свої файли: спершу мережа (щоб оновлення доходили одразу), без мережі береться кеш */
    e.respondWith(fetch(r,{cache:'no-cache'}).then(function(res){
      if(res&&res.ok){var cp=res.clone();caches.open(CACHE).then(function(c){c.put(r,cp)})}
      return res;
    }).catch(function(){return caches.match(r).then(function(h){return h||caches.match('./index.html')})}));
  }else if(u.hostname==='fonts.googleapis.com'||u.hostname==='fonts.gstatic.com'){
    e.respondWith(caches.match(r).then(function(h){return h||fetch(r).then(function(res){var cp=res.clone();caches.open(CACHE).then(function(c){c.put(r,cp)});return res})}));
  }
  /* Firebase та інші зовнішні запити сервіс-воркер не чіпає */
});
