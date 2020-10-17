function startUp(){
  pullQuoteDemo();
  logoScrollDemo();
  readNewPieceDemo();
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
      // source.scrollIntoView({behavior:'smooth',block:'center',inline:'nearest'});

      // source.style.backgroundColor='var(--highlight)';
      // setTimeout(function(){source.style.backgroundColor='white';},400)
  })

}

function logoScrollDemo(){
  window.addEventListener('scroll',function(e){
    if(window.scrollY>100){
      document.querySelector('#logo').style.left='-300px';
    }else{
      document.querySelector('#logo').style.left='0px';
    }
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



window.addEventListener('load',startUp);
