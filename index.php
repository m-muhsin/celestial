<?php
/**
 * The main template file
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * e.g., it puts together the home page when no home.php file exists.
 *
 * Learn more: {@link https://codex.wordpress.org/Template_Hierarchy}
 *
 * @package WordPress
 * @subpackage Celestial
 * @since Celestial 1.0
 */

get_header(); ?>

<div id="content">
    <div class="loader-gif">
        <img src="<?php echo home_url() ?>/wp-content/themes/celestial/dist/images/loading-icon.gif" alt="Loader">
    </div>
</div>

<?php get_footer(); ?>