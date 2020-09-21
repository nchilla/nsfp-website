<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="UTF-8" name="viewport" content="initial-scale=1">
    <link rel="icon" href="https://www.newschoolfreepress.com/wp-content/uploads/2019/10/cropped-ratio_favicon-192x192.png" sizes="192x192">
    <title>Live Blog | The New School Free Press</title>
    <!--typefaces-->
    <link rel="stylesheet" href="https://use.typekit.net/kje5dnd.css">
    <!--css-->
    <link rel="stylesheet" href="<?php echo get_bloginfo('template_directory'); ?>/clearstyles.css" type="text/css">
    <link rel="stylesheet" href="<?php echo get_bloginfo('template_directory'); ?>/covid-19-2.css" type="text/css">
    <!--local css link while nico builds on his comp-->
    <!-- <link rel="stylesheet" href="covid-19.css" type="text/css"> -->


  </head>
  <body>
    <!--PHP calls-->
    <script>
      <?php
        $updateargs = array(
          'numberposts'		=> -1,
          'post_type'		=> 'covid_19',
          'orderby' 		=> 'post_date',
        );

        $updates=get_posts($updateargs);
        $titles=array();
        $deks=array();
        $links=array();
        $dates=array();
        $up_authors=array();
        $p_id=array();
        foreach ($updates as $i){
          array_push($p_id,$i);
          array_push($titles,get_the_title($i));
          array_push($deks,get_field('dek',$i));
          array_push($dates,get_the_date('F j',$i));
          array_push($links,get_field('article_link',$i));
          array_push($up_authors,get_field('update_author',$i));
        };
        $p_id=json_encode($p_id);
        $updates=json_encode($updates);
        $titles=json_encode($titles);
        $deks=json_encode($deks);
        $links=json_encode($links);
        $dates=json_encode($dates);
        $up_authors=json_encode($up_authors);
        echo "var titles=$titles;";
        echo "var deks=$deks;";
        echo "var links=$links;";
        echo "var dates=$dates;";
        echo "var upAuthors=$up_authors;";
        echo "var postids=$p_id;";
        $coverageargs=array(
          'numberposts'		=> -1,
          'tag'		=> 'c19-our-coverage',
          'orderby' 	=> 'post_date',
        );
        $coverage=get_posts($coverageargs);
        $cov_titles=array();
        $cov_images=array();
        $cov_authors=array();
        $cov_anames=array();
        $cov_links=array();
        foreach ($coverage as $x){
          array_push($cov_titles,get_the_title($x));
          array_push($cov_images,get_the_post_thumbnail_url($x,'large'));
          array_push($cov_authors,get_post_field('post_author',$x));
          array_push($cov_links,get_permalink($x));
        };
        foreach($cov_authors as $e){
          array_push($cov_anames,get_the_author_meta('display_name',$e));
        };
        $coverage=json_encode($coverage);
        $cov_titles=json_encode($cov_titles);
        $cov_anames=json_encode($cov_anames);
        $cov_links=json_encode($cov_links);
        $cov_images=json_encode($cov_images);
        echo "var covdata=$coverage;";
        echo "var cov_titles=$cov_titles;";
        echo "var cov_anames=$cov_anames;";
        echo "var cov_links=$cov_links;";
        echo "var cov_images=$cov_images;";

        $thispage=get_post(19929);
        $thispage=json_encode($thispage);
        echo "var thispage=$thispage;";
      ?>
      var pagelink='<?php echo get_page_link();?>';
      var slogo='<?php echo get_bloginfo('template_directory');?>/logosmall.svg';
      var flogo='<?php echo get_bloginfo('template_directory');?>/logofull.svg';
      console.log(pagelink);
    </script>
    <!--page skeleton-->
    <div id='header'>
      <div id='topline'></div>
      <div class='hline1'>
        <img id='logo' src='<?php echo get_bloginfo('template_directory');?>/logosmall.svg'>
        <h1>Live Blog</h1>
        <img id='copylink' src='<?php echo get_bloginfo('template_directory');?>/linkicon.svg'>
      </div>
      <h3 id='mobhead' class='mobile-only seelatest'>Updates</h3>
    </div>
    <div id='contain'>
      <div id='updates' class='block'>
        <h3 id='deskhead' class='desktop-only seelatest'>Updates</h3>
        <span id='fdate' class='date'></span>
        <h2 id='fh2'></h2>
        <span id='fdek'></span>
        <div id='upd-box'>
          <div class='boxline'></div>
        </div>
      </div>
      <div id='coverage' class='block'>
        <h3>Our Coverage</h3>
        <div class='boxline'></div>
      </div>
      <div id='resources' class='block'>
        <h3>Resources</h3>
        <div class='boxline'></div>
      </div>

    </div>





    <!--external js-->
    <script src="https://d3js.org/d3.v5.min.js"></script>
    <script
    src="https://code.jquery.com/jquery-3.4.1.min.js"
    integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo="
    crossorigin="anonymous"></script>

    <!--nico's js-->
    <script src="<?php echo get_bloginfo('template_directory'); ?>/covid-19-2.js"></script>
    <!--nico's local js-->
    <!-- <script src="covid-19.js"></script> -->
  </body>
</html>
