function startUp(){
  pullQuoteDemo();
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





window.addEventListener('load',startUp);
