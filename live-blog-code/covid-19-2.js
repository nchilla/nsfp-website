var allupdates=false;
var allcoverage=false;
var maxUp=4;
var maxCov=3;
var imgheight;
var pageLoc=0;
var skipThis=0;
var param=new URLSearchParams();

function fixHeight(){
  var imgheight=(d3.select('#coverage').node().getBoundingClientRect().width+24)*0.75;
  document.documentElement.style.setProperty('--imgheight', imgheight+'px');
  var bWidth=document.querySelector('#header').getBoundingClientRect().width;
  if (bWidth>700){
    d3.select('#logo').attr('src',flogo);
  }else{
    d3.select('#logo').attr('src',slogo);
  }
}
fixHeight();

function fixStuff(){
  fixHeight();
  checkH();
}

window.onresize=fixStuff;
//where f0 was
resPT=thispage.post_content;
while(resPT!==resPT.replace('</p>','</span>')){
  resPT=resPT.replace('<p>','<span>');
  resPT=resPT.replace('<a h','<a target="_blank" h');
  resPT=resPT.replace('</p>','</span>');
}
d3.select('#resources').append('div').html(resPT);

function checkH(){
  var upD=document.querySelector('#updates h3').getBoundingClientRect().y;
  var covD=document.querySelector('#coverage h3').getBoundingClientRect().y;
  var resD=document.querySelector('#resources h3').getBoundingClientRect().y;
  if(resD<130){
    document.querySelector('#header h3').innerHTML='Resources';
    seeLatest('#mobhead',0);
    pageLoc=2;
  }else if(covD<130){
    document.querySelector('#header h3').innerHTML='Our Coverage';
    seeLatest('#mobhead',0);
    pageLoc=1;
  }else if(upD<130){
    document.querySelector('#header h3').innerHTML='Live Updates';
    pageLoc=0;
    seeLatest('#mobhead',skipThis);
  }
  if (document.querySelector('#header').getBoundingClientRect().width>600){
    pageLoc=0;
  }
};

startUp();
document.body.addEventListener('scroll', checkH);

document.querySelector('#copylink').onclick=function(){
  var locs=['#updates','#coverage','#resources'];
  var copLink=pagelink+locs[pageLoc];
  navigator.clipboard.writeText(copLink).then(function() {
    /* clipboard successfully set */
    console.log('doot');
  }, function() {
    /* clipboard write failed */
    console.log('clipboard write failed');
  });
};

function startUp(){
  var urlS=new URLSearchParams(window.location.search);
  var starting;
  if(urlS.get('upd')!==null){
    starting=urlS.get('upd');
  }else{
    starting=postids[0].ID;
  }
  expand(starting);
  coverage();
  checkH();
}


function updates(){
  d3.select('#upd-box').selectAll('span').remove();

  if (allupdates==true){
    var limit=maxUp;
    allupdates=false;
  }else{
    var limit=dates.length;
    allupdates=true;
  }
  for(var i=0;i<limit;i++){
    if(i==skipThis){
    }else{
      d3.select('#upd-box').append('span').classed('upd'+postids[i].ID,true).html(`<span class="date">${dates[i]}</span>: `+titles[i]+' ').classed('upds',true);
      if(links[i]!==''){
        d3.select('.upds:last-child').append('a').attr('href',links[i]).attr('target','_blank').html('Read');
      }else{
        d3.select('.upds:last-child').append('a').html('Expand').attr('onclick','expand('+postids[i].ID+')');
      }//end of link or expand
    }//end of skipthis
  };
  if(limit<dates.length){
    d3.select('#upd-box').append('span').html('Show more').classed('showmore',true).attr('onclick','updates()');
  }else if(dates.length>maxUp){
    d3.select('#upd-box').append('span').html('Show less').classed('showmore',true).attr('onclick','updates()');
  }
}
function coverage(){
  var limit;
  d3.select('#coverage').selectAll('.covholder').remove();
  d3.select('#coverage').selectAll('.showmore').remove();
  function increaseCov(){
    if (maxCov<covdata.length){
      limit=maxCov;
      maxCov=maxCov+3;
    }else{
      limit=covdata.length;
    }
  }
  if (allcoverage==false){
    increaseCov();
  }else{
    maxCov=3;
    limit=maxCov;
    maxCov=maxCov+3;
  }

  for (var i=0;i<limit;i++){
    d3.select('#coverage')
    .append('a').classed('covholder',true).attr('href',cov_links[i]).attr('target','_blank');
    covholder=d3.select('.covholder:last-child');
    covholder.append('div').classed('imgwrap',true).append('img').attr('src',cov_images[i]).property('alt',cov_titles[i]);
    covholder.append('span').html(cov_titles[i]+`<span style='display:inline-block;'> | ${cov_anames[i]}</span>`).classed('covs',true);
  }

  if(limit<covdata.length){
    d3.select('#coverage').append('span').html('Show more').classed('showmore',true).attr('onclick','coverage()');
    allcoverage=false;
  }else{
    allcoverage=true;
    d3.select('#coverage').append('span').html('Show less').classed('showmore',true).attr('onclick','coverage()');
  }
}

function expand(x){
  var htmlInd=idToInd(x);
  d3.select('#fdate').html(dates[htmlInd]);
  d3.select('#fh2').html(titles[htmlInd]).attr('class','upd'+x);
  d3.select('#fdek').html(deks[htmlInd]+' ');
  if(links[htmlInd]!==''){
    d3.select('#fdek').append('a').attr('href',links[0]).attr('target','_blank').html('Read more');
  }else if(upAuthors[htmlInd]!==null){
    d3.select('#fdek').append('span').classed('authors',true)
    var aut=upAuthors[htmlInd];
    var newStr='';
    var l=aut.length;
    if(l>1){
      for(var q=0; q<aut.length;q++){
        newStr=newStr+' '+aut[q].display_name;
        if(q<l-2&&l>2){
          newStr=newStr+',';
        }
        if(q==l-2){
          newStr=newStr+' and';
        }
      }//end of for loop
    }else{
      newStr=upAuthors[htmlInd][0].display_name;
    }//end of if more than one author
    d3.select('.authors').html(newStr);
  }//end of if author
  seeLatest('#deskhead',htmlInd);
  seeLatest('#mobhead',htmlInd);
  if (allupdates==true){
    allupdates=false;
  }else{
    allupdates=true;
  }
  skipThis=htmlInd;
  updates();
  param.set('upd',x);
  window.history.replaceState({}, '', `${location.pathname}?${param}`);
  document.querySelector('body').scroll(0, 0);
};

function idToInd(id){
  var pTest=(element)=>{return element.ID==id};
  var postInd=postids.findIndex(pTest);
  var fTest=(element)=>{return element==postids[postInd].post_title};
  return titles.findIndex(fTest);
}


//url handling


function seeLatest(id,num){
  if(num!==0){
    d3.select(id).classed('seelatest',true)
    .on('click',function(){
      expand(postids[0].ID);
    })
  }else{
    d3.select(id).classed('seelatest',false)
    .on('click',null);
  }
}







//end
