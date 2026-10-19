/* A turning sheet is a temporary exterior transition, never a replacement
   for the original video. Active video elements retain their native controls. */
(()=>{
  const originalRender=render, originalWeb=openWeb;
  let stage=null,timer=null;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  function clearTurn(){clearTimeout(timer);stage?.remove();stage=null;document.body.classList.remove('book-turning')}
  function markBook(){const s=document.getElementById('spread');s.classList.toggle('book-open',active.length===2);s.classList.toggle('book-cover',active.length===1)}
  function snapshot(a){
    const source=a.v||a.canvas,rect=a.sheet.getBoundingClientRect();
    const canvas=document.createElement('canvas');
    canvas.width=Math.max(1,Math.round(rect.width*devicePixelRatio));
    canvas.height=Math.max(1,Math.round(rect.height*devicePixelRatio));
    try{if(!source||!source.width&&!source.videoWidth)return null;canvas.getContext('2d').drawImage(source,0,0,canvas.width,canvas.height)}catch{return null}
    return {canvas,rect};
  }
  function position(el,rect){Object.assign(el.style,{left:rect.left+'px',top:rect.top+'px',width:rect.width+'px',height:rect.height+'px'})}
  render=function(target=page){
    clearTurn();
    const before=page,old=active.map(snapshot),fromWeb=mode!=='reader';
    originalRender(target);markBook();
    if(fromWeb||before===page||reduced.matches||!old.length||!old.every(Boolean))return;
    const forward=page>before,pair=old.length===2&&active.length===2;
    stage=document.createElement('div');stage.className='book-turn-stage '+(forward?'forward':'backward')+(pair?'':' single');stage.setAttribute('aria-hidden','true');
    const moving=old[forward?old.length-1:0],leaf=document.createElement('div');leaf.className='book-turn-leaf';position(leaf,moving.rect);
    const front=document.createElement('div');front.className='book-turn-face front';front.append(moving.canvas);leaf.append(front);
    if(pair){
      const back=document.createElement('div');back.className='book-turn-face back';
      const next=active[forward?0:1],image=document.createElement('img');image.alt='';image.src=pages[next.index].thumb;back.append(image);leaf.append(back);
      const oldStill=old[forward?0:1],under=document.createElement('div');under.className='book-turn-under';position(under,oldStill.rect);under.append(oldStill.canvas);stage.append(under);
      // Replace the temporary thumbnail with the exact visible frame as soon
      // as the new page has loaded. The real video continues underneath.
      const updateBack=()=>{if(!back.isConnected)return;const snap=snapshot(next);if(snap)back.replaceChildren(snap.canvas)};
      if(next.v)next.v.addEventListener('loadeddata',updateBack,{once:true});
      else {let tries=0;const poll=()=>{if(!back.isConnected)return;if(next.loaded)updateBack();else if(tries++<12)setTimeout(poll,40)};setTimeout(poll,40)}
    }
    stage.append(leaf);document.body.append(stage);document.body.classList.add('book-turning');timer=setTimeout(clearTurn,850);
  };
  openWeb=function(){clearTurn();originalWeb()};
  document.getElementById('web').onclick=openWeb;document.getElementById('tocweb').onclick=openWeb;
  document.getElementById('back').onclick=()=>{clearTurn();originalRender(page);markBook()};
  addEventListener('resize',clearTurn);addEventListener('pagehide',clearTurn);
  document.addEventListener('visibilitychange',()=>{if(document.hidden)clearTurn()});
  markBook();
})();
