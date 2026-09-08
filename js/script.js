$(function () {
  var projects = {
    corporate: { title: 'Horizon Advisory', category: 'Business · 2025', description: 'A confident digital home for a strategy team helping ambitious businesses find their next horizon.', tech: 'HTML5 · CSS3 · JavaScript', features: 'Editorial layout, service architecture, responsive case studies', visual: 'visual-window' },
    restaurant: { title: 'Maru Kitchen', category: 'Hospitality · 2025', description: 'A warm, tactile restaurant experience designed to make a table for two feel close at hand.', tech: 'HTML5 · CSS3 · jQuery', features: 'Menu system, booking flow, location-first mobile design', visual: 'plate' },
    commerce: { title: 'Field Notes Supply', category: 'E-commerce · 2024', description: 'A considered storefront for everyday objects chosen for their usefulness and story.', tech: 'Bootstrap · JavaScript · MySQL', features: 'Product discovery, collections, conversion-led checkout', visual: 'shop-window' },
    landing: { title: 'Onda Mobility', category: 'Landing page · 2024', description: 'A focused launch page for a new way to move through the city.', tech: 'HTML5 · CSS3 · JavaScript', features: 'Campaign storytelling, waitlist capture, motion system', visual: 'launch-window' },
    personal: { title: 'Anika Rao', category: 'Portfolio · 2024', description: 'A quiet portfolio that lets a photographer’s work lead and the interface disappear.', tech: 'HTML5 · CSS3 · jQuery', features: 'Image-led navigation, project archive, accessible gallery', visual: 'folio-window' },
    studio: { title: 'Nexus Digital', category: 'Agency · 2023', description: 'A new identity and digital presence for a studio that builds things that matter.', tech: 'JavaScript · Bootstrap · Spring Boot', features: 'Flexible CMS foundation, brand system, performance pass', visual: 'studio-window' }
  };

  function hidePreloader() { $('#preloader').addClass('hidden'); }
  setTimeout(hidePreloader, 1200);
  $(window).on('load', function () { setTimeout(hidePreloader, 350); });

  $('#menu-toggle').on('click', function () {
    var isOpen = $('#nav-menu').toggleClass('open').hasClass('open');
    $(this).attr('aria-expanded', isOpen).attr('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
  });
  $('.nav-menu a').on('click', function () { $('#nav-menu').removeClass('open'); $('#menu-toggle').attr('aria-expanded', 'false').attr('aria-label', 'Open navigation'); });
  $('a[href^="#"]').on('click', function (event) { var target = $(this.getAttribute('href')); if (target.length) { event.preventDefault(); $('html, body').animate({ scrollTop: target.offset().top - 65 }, 650); } });

  function updateScrollState() { var scrollTop = $(window).scrollTop(); $('.site-header').toggleClass('scrolled', scrollTop > 30); $('#to-top').toggleClass('visible', scrollTop > 500); $('.nav-menu a[href^="#"]').each(function () { var section = $(this.getAttribute('href')); if (section.length && scrollTop >= section.offset().top - 100 && scrollTop < section.offset().top + section.outerHeight()) { $('.nav-menu a').removeClass('active'); $(this).addClass('active'); } }); }
  $(window).on('scroll', updateScrollState); updateScrollState();
  $('#to-top').on('click', function () { $('html, body').animate({ scrollTop: 0 }, 650); });

  function revealOnScroll() { $('.reveal, .reveal-left, .reveal-right, .reveal-scale').each(function () { if ($(this).offset().top < $(window).scrollTop() + $(window).height() - 70) $(this).addClass('visible'); }); }
  $(window).on('scroll', revealOnScroll); revealOnScroll();
  $('.counter').each(function () { var counter = $(this), target = Number(counter.data('target')); $({ count: 0 }).animate({ count: target }, { duration: 1300, easing: 'swing', step: function () { counter.text(Math.floor(this.count)); }, complete: function () { counter.text(target + '+'); } }); });

  $('.filter-btn').on('click', function () { var filter = $(this).data('filter'); $('.filter-btn').removeClass('active'); $(this).addClass('active'); $('.project-card').each(function () { var visible = filter === 'all' || $(this).data('category') === filter; $(this).toggleClass('hide', !visible); }); });
  $('.project-view').on('click', function () { var project = projects[$(this).data('project')]; if (!project) return; $('#modal-title').text(project.title); $('#modal-category').text(project.category); $('#modal-description').text(project.description); $('#modal-tech').text(project.tech); $('#modal-features').text(project.features); $('#modal-visual').attr('class', 'modal-visual').html('<div class="' + project.visual + '"></div>'); $('#project-modal').addClass('open').attr('aria-hidden', 'false'); $('body').addClass('modal-open'); });
  function closeModal() { $('#project-modal').removeClass('open').attr('aria-hidden', 'true'); $('body').removeClass('modal-open'); }
  $('#modal-close').on('click', closeModal); $('#project-modal').on('click', function (event) { if (event.target === this) closeModal(); }); $(document).on('keydown', function (event) { if (event.key === 'Escape') closeModal(); });

  var slideIndex = 0, slides = $('.testimonial-slide'), dots = $('#slider-dots button');
  function showSlide(index) { slideIndex = (index + slides.length) % slides.length; slides.removeClass('active').eq(slideIndex).addClass('active'); dots.removeClass('active').eq(slideIndex).addClass('active'); }
  $('#testimonial-next').on('click', function () { showSlide(slideIndex + 1); }); $('#testimonial-prev').on('click', function () { showSlide(slideIndex - 1); }); dots.on('click', function () { showSlide($(this).index()); });
  var sliderTimer = setInterval(function () { showSlide(slideIndex + 1); }, 6000); $('#testimonials').on('mouseenter', function () { clearInterval(sliderTimer); }).on('mouseleave', function () { sliderTimer = setInterval(function () { showSlide(slideIndex + 1); }, 6000); });

  $('.faq-question').on('click', function () { var item = $(this).closest('.faq-item'); $('.faq-item').not(item).removeClass('active').find('.faq-question').attr('aria-expanded', 'false').end().find('.faq-answer').stop(true, true).slideUp(250); var opening = !item.hasClass('active'); item.toggleClass('active', opening); $(this).attr('aria-expanded', opening); item.find('.faq-answer').stop(true, true)[opening ? 'slideDown' : 'slideUp'](250); }); $('.faq-item:not(.active) .faq-answer').hide();

  function fieldError(field, message) { field.closest('.field').find('.field-error').text(message); return !message; }
  $('#contact-form').on('submit', function (event) { event.preventDefault(); var valid = true, name = $('#name'), email = $('#email'), phone = $('#phone'), service = $('#service'), message = $('#message'); valid = fieldError(name, name.val().trim() ? '' : 'Please enter your name.') && valid; valid = fieldError(email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.val().trim()) ? '' : 'Enter a valid email address.') && valid; valid = fieldError(phone, /^[+\d][\d\s()-]{7,}$/.test(phone.val().trim()) ? '' : 'Enter a valid phone number.') && valid; valid = fieldError(service, service.val() ? '' : 'Choose a service.') && valid; valid = fieldError(message, message.val().trim().length >= 20 ? '' : 'Tell us a little more (20 characters minimum).') && valid; if (valid) { $('#form-success').text('Thank you! Your project request has been validated successfully. Connect the form to your email service or backend to receive submissions.'); this.reset(); } else { $('#form-success').text(''); } });
  $('#contact-form input, #contact-form select, #contact-form textarea').on('input change', function () { $(this).closest('.field').find('.field-error').text(''); });
});