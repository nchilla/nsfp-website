let imgCounter=1;


logoCheck();
function startUp(){
  logoScrollDemo();
  firstArticle();
  // pullQuoteDemo();
  // readNewPieceDemo();
}

function firstArticle(){
  var contentwrap=document.querySelector('.content-wrap');
  contentwrap.childNodes.forEach((item, i) => {
    if(item.dataset!==undefined){
      item.dataset.post=thispage["ID"];
      let imgnow=imgdata[imgCounter];
      if(item.classList.contains('wp-block-image')&&(imgnow.user!==false||imgnow.cont!==null)){
        console.log(imgnow.user,imgnow.cont);
        let cap=imgnow.cap!==null?imgnow.cap:'';
        let credit=imgnow.user!==false?imgnow.user.name:imgnow.cont;
        let creditlink=imgnow.user!==false?imgnow.user.link:imgnow.contlink;
        let linkhtml=(creditlink!==null&&creditlink!=='')?`<a href="${creditlink}">${credit}</a>`:`${credit}`;
        let string=`${cap} <span class="attribution">${imgnow.mediatypa} ${linkhtml}</span>`;
        let figcaption=item.querySelector('figcaption')
        if(figcaption!==null){
          figcaption.innerHTML=string;
        }

        imgCounter++;
      }
    }
  });
}




function pullQuoteDemo(){
  var quote=document.querySelector('blockquote');
  var source=document.querySelector('#pullquotesource');
  quote.addEventListener('click',function(){
      var sourceRect=source.getBoundingClientRect();
      var sourceDist=sourceRect.top;
      var sourceHalfHeight=sourceRect.height/2;
      var centerScreen=window.innerHeight/2;
      window.scrollBy({
        top: sourceDist+sourceHalfHeight-centerScreen,
        left: 0,
        behavior: 'smooth'
      });
  })

}

function logoScrollDemo(){
  window.addEventListener('scroll',function(e){
    logoCheck();
  })
}

function readNewPieceDemo(){
  document.querySelector('#readmore').addEventListener('click',function(){
    //display the article content
    document.querySelectorAll('.article2').forEach((item, i) => {
      item.style.display='block';
      item.style.opacity='1';
    });
    //get rid of the preview cover
    document.querySelector('.preview-cover').style.opacity='0';
    document.querySelector('.preview-cover').style.pointerEvents='none';

    //scroll the new article up
    var ledeRect=document.querySelector('#lede2').getBoundingClientRect();
    var ledeDist=ledeRect.top;
    var root = getComputedStyle(document.documentElement);
    var topmargin=root.getPropertyValue('--topmargin').slice(0,3);
    window.scrollBy({
      top: ledeDist-topmargin,
      left: 0,
      behavior: 'smooth'
    });
  })
}

function logoCheck(){
  if(window.scrollY>100){
    document.querySelector('#logo').style.left='-300px';
  }else{
    document.querySelector('#logo').style.left='0px';
  }
}


window.addEventListener('load',startUp);
