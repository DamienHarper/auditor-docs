$.when($.ready).then(function() {
    // Close sidebar (mobile)
    $(document).on('click', '#sidebar-close', function () {
        $('#sidebar').addClass('hidden')
        $('#sidebar-close').addClass('hidden')
        $('#sidebar-open').removeClass('hidden')
        $('#content-wrapper').removeClass('overflow-hidden max-h-screen fixed')
    })

    // Show sidebar (mobile)
    $(document).on('click', '#sidebar-open', function () {
        $('#sidebar-open').addClass('hidden')
        $('#sidebar').removeClass('hidden')
        $('#sidebar-close').removeClass('hidden')
        $('#content-wrapper').addClass('overflow-hidden max-h-screen fixed')
    })

    // TOC
    $(function() {
        let elts = $('.markdown h2, .markdown h3, .markdown h4, .markdown h5');
        if (elts.length > 0) {
            $('#in-page-menu').removeClass('hidden');
        }

        elts.each(function () {
            // prepend # to each section
            var url = document.URL.replace(/#.*$/, "") + '#' + $(this).attr('id');
            $(this).prepend(' <a class="title-anchor" href="' + url + '">#</a>');

            // populate in-page-menu
            var caption = $(this).text().substr(2);
            var classes = 'mb-4 lg:mb-1';

            switch ($(this)[0].nodeName) {
                case 'H2':
                    classes += ' toc-title';
                    break;
                case 'H3':
                    classes += ' ml-4 lg:ml-2';
                    break;
                case 'H4':
                    classes += ' ml-6 lg:ml-4';
                    break;
                case 'H5':
                    classes += ' ml-8 lg:ml-6';
                    break;
            }

            $('#in-page-menu ul').append('<li class="'+classes+'"><a class="block transition-fast hover:translate-r-2px hover:text-gray-900 text-gray-600" href="#' + $(this).attr('id') + '">' + caption + '</a></li>');
        });
    });
});