<!DOCTYPE html>
<html lang="en" dir="ltr">
  <?php
    //page content
    $thepost=20457;
    $thispage=get_post($thepost);
    $thispagejson=json_encode($thispage);
    //subtitle
    $post_meta = get_post_meta($thepost, 'td_post_theme_settings', true);
    $subtitle=$post_meta[td_subtitle];

    // authors
    $authors=get_coauthors($thepost);
    $authordata=array();

    foreach($authors as $a){
      array_push($authordata,new stdClass());
      end($authordata);
      $k=$authordata[key($authordata)];
      $k->name=$a->data->display_name;
      $k->url=get_author_posts_url($a->ID);
    }
    $byline="By";
    $length=count($authordata);
    foreach($authordata as $i=>$d){
      $name=$d->name;
      $url=$d->url;
      if($i==$length-1){
        $byline .= " and";
      };
      $byline .= " <a target=\"blank\" href=\"$url\">$name</a>";
      if($i!=$length-1 && $length>2){
        $byline .= ",";
      };
    }
    $authors_json=json_encode($authordata);
    //date
    $date=get_the_date("",$thepost);
    $datejson=json_encode($date);

    //feature image
    $thumbID = get_post_thumbnail_id($thepost);
    $featured_image_sizes = get_all_image_sizes($thumbID);
    $featurejson=json_encode($featured_image_sizes);
    $imagehtml = '<img src="'. $featured_image_sizes['sizes']['large'] .'" alt="">';



    // $image=get_the_post_thumbnail(20498);
    // $imagejson=json_encode($image);
    // echo "var image=$imagejson;"
  ?>
  <head>
    <meta http-equiv="Content-Type" content="text/html;" charset="utf-8" >
    <meta name="viewport" charset="UTF-8" content="width=device-width, initial-scale=1">
    <title><?php echo $thispage->post_title; ?></title>
    <!-- stylesheets -->
    <link rel="stylesheet" href="<?php echo get_bloginfo('template_directory'); ?>/css-custom/clearstyle.css">
    <link rel="stylesheet" href="<?php echo get_bloginfo('template_directory'); ?>/css-custom/article-reader.css">
    <link rel="stylesheet" href="<?php echo get_bloginfo('template_directory'); ?>/css-custom/typography.css">
    <!-- typography -->
    <link rel="stylesheet" href="https://use.typekit.net/lha0tgs.css">
    <link href="https://fonts.googleapis.com/css2?family=PT+Serif:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet">
  </head>
  <body>
    <script type="text/javascript">
      <?php
        echo "var thispage=$thispagejson;";
        echo "var image=$featurejson;";
        echo "var date=$datejson;";
        echo "var authors=$authors_json;";
       ?>
      console.log(thispage,image,date,authors);
    </script>
    <div class="fixed">
      <div class="banner">
        <div class="hamburger">
          <svg>
            <line class="line" x1="0%" x2="100%" y1="30%" y2="30%"></line>
            <line class="line" x1="0%" x2="100%" y1="65%" y2="65%"></line>
            <line class="line" x1="0%" x2="100%" y1="99%" y2="99%"></line>
          </svg>
        </div>
        <h3 id='logo'>THE NEW SCHOOL<br>FREE PRESS</h3>
      </div>
    </div>
    </div>
    <div class="content-wrap grid">
      <div class="lede-wrap content-zone">
        <h1><?php echo $thispage->post_title; ?></h1>
        <h2><?php echo $subtitle; ?></h2>
        <span class='date'><?php echo $date ?></span><br>
        <span class='byline'><?php echo $byline ?></span>
      </div>
      <div class="imgwrap-large">
        <?php echo $imagehtml; ?>
      </div>
      <?php echo $thispage->post_content;?>
    </div>
    <script src="<?php echo get_bloginfo('template_directory'); ?>/js-custom/smoothscroll.min.js"></script>
    <script src="<?php echo get_bloginfo('template_directory'); ?>/js-custom/article-function.js" charset="utf-8"></script>
  </body>
</html>
