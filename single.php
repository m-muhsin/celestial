<?php
/**
 * Template part for displaying posts
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package WordPress
 * @subpackage Aseel
 * @since 1.0
 * @version 1.2
 */

get_header(); ?>

<div id="content">
    <div id="post">
        <div class="loader-gif">
            <img src="<?php echo site_url() ?>/wp-content/themes/celestial/dist/images/loader.gif" alt="Loader">
        </div>
    </div>
</div>

<?php get_footer(); ?>