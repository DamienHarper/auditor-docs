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
            $(this).addClass('group flex whitespace-pre-wrap');
            $(this).prepend(' <a href="' + url + '" class="absolute after:hash opacity-0 group-hover:opacity-100" style="margin-left:-1em;padding-right:0.5em;box-shadow:none;color:#a1a1aa" aria-label="Anchor"></a>');

            // populate in-page-menu
            var caption = $(this).text().substr(1);
            var classes = '';

            switch ($(this)[0].nodeName) {
                case 'H2':
                    classes += '';
                    break;
                case 'H3':
                    classes += ' ml-4';
                    break;
                case 'H4':
                    classes += ' ml-6';
                    break;
                case 'H5':
                    classes += ' ml-8';
                    break;
            }

            $('#in-page-menu ul').append('<li class="'+classes+'"><a class="block transform transition-colors duration-200 py-2 hover:text-gray-900" href="#' + $(this).attr('id') + '">' + caption + '</a></li>');

            // move tags to previous Hx DOM node
            var tag = $('#' + $(this).attr('id') + ' + p > span.tag');
            if (tag.length > 0) {
                var p = tag[0].parentNode;
                tag.detach().appendTo('#' + $(this).attr('id'));
                p.remove();
            }
        });
    });
});