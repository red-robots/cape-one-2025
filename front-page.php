<?php 
get_header(); 
?>
  <div id="primary" class="homepage-content">
    <?php
      while ( have_posts() ) : the_post();
        $bottom_content = get_field('bottom_content');
    ?>
      <section class="section_home hide">
        <div class="main-content">
          <?php the_content(); ?>
        </div>

        <?php if($bottom_content){ ?>
          <div class="bottom-content">
            <?php echo $bottom_content; ?>
          </div>
        <?php } ?>
    </section>

    <?php endwhile; ?>
  </div><!-- #primary -->
<?php
get_footer();