# NSFP website design/development

This repo will store/track all programming files related to the redesign of the New School Free Press website!

You can see a draft of the article page, AKA "reader" [here](https://nchilla.github.io/nsfp-website/reader/).

The live blog is, well, live [here](https://www.newschoolfreepress.com/covid-19/)



## Notes:

### Wordpress plugins that will break the site if deactivated

**Advanced Custom Fields** is used to fetch data for the Live Blog updates and other posts.

**Co-Authors Plus** is self explanatory. It is used in the new post template's php gets. Look for `get_coauthors($thepost);`

**Really Simple SSL** is self explanatory.


### The Live Blog

The live blog is built as a custom single page (page-19929.php) in Wordpress. It has three sections, which are edited in different areas:

**Live Updates** uses a custom post type added through functions.php. Look for the `create_post_wp_covid()` and `add_action( 'init', 'create_post_wp_covid' );` functions.

**Our Coverage** pulls from regular posts that have the `c19-our-coverage` tag.

**Resources** pull directly from the Live Blog page content editor in Pages

For more information about the design and purpose of these sections, see this [design concept document](https://paper.dropbox.com/doc/NSFP-COVID-19-Custom-Page--A~2Y4ml62KtQQF~Mst31JIh3AQ-TQUIl3GJhBi875GUSnrvR).
