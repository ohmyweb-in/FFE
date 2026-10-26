<?php
/**
 * Search results page for the FFE mu-plugin (ffe-header.php): header, a list of matching pages, footer.
 * Deployed to wp-content/mu-plugins/ffe/search-results.php (a subfolder: WordPress loads every .php directly in
 * mu-plugins/); this copy in scripts/elementor/ is the record.
 */
get_header();
global $wp_query;
$q = get_search_query();
$n = (int) $wp_query->found_posts;
?>
<main class="ffe-results">
	<h1>Search</h1>
	<p class="ffe-count"><?php echo $n ? sprintf(_n('%1$d result for “%2$s”', '%1$d results for “%2$s”', $n), $n, esc_html($q)) : sprintf('No results for “%s”', esc_html($q)); ?></p>
	<?php if ($n) : ?>
	<ol>
		<?php while (have_posts()) : the_post();
			$text = get_the_content(null, false);
			$pos = $q !== '' ? stripos($text, $q) : false;
			$from = max(0, ($pos === false ? 0 : $pos) - 60);
			if ($from) $from = (int) strpos($text . ' ', ' ', $from) + 1; // start on a word boundary
			$ex = ($from ? '… ' : '') . wp_html_excerpt(substr($text, $from), 180, '…');
			if ($q !== '') $ex = preg_replace('/(' . preg_quote(esc_html($q), '/') . ')/i', '<mark>$1</mark>', esc_html($ex)); else $ex = esc_html($ex); ?>
		<li><a href="<?php the_permalink(); ?>"><h2><?php the_title(); ?></h2><p><?php echo $ex; ?></p></a></li>
		<?php endwhile; ?>
	</ol>
	<?php the_posts_pagination(); ?>
	<?php else : ?>
	<div class="ffe-empty">
		<p>We couldn’t find anything matching your search. Try a different word, or <a href="<?php echo esc_url(home_url('/')); ?>">head back to the homepage</a>.</p>
	</div>
	<?php endif; ?>
</main>
<?php get_footer();
