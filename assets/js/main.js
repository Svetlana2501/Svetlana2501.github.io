;
'use strict';
(function() {
    function getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

    function reloadAsGet(search)
    {
        var loc = window.location;
        window.location = loc.protocol + '//' + loc.host + loc.pathname + search;
    }
    function generateRateLink(el) {
        var link = '?';
        var index = 0;
        $('.rat_btn.btn-primary, select.rat_sel').each(function () {

            if($(this).hasClass('rat_btn')) {
                if(!($(this).data('type') === 'com_cup' && $(el).data('type') === 'type_team')) {
                    if (index !== 0) {
                        link = link + '&';
                    }
                    link = link + $(this).data('type') + '=' + $(this).data('value');
                }
            } else if($(this).hasClass('rat_sel')) {
                if(!($(this).data('type') === 'stage' && $(el).data('type') === 'type') && !($(this).data('type') === 'distance' && $(el).data('type') === 'gender') && !($(this).data('type') === 'distance' && $(el).data('type') === 'stage'))
                {
                    if(index !== 0) {
                        link = link + '&';
                    }
                    link = link + $(this).data('type') + '=' + $(this).selectpicker('val');
                }
            }
            index++;
        });
        return link;
    }
    $(document).ready(function() {
        $('.rat_btn:not(.btn-primary)').on('click', function() {
            $(this).parent().find('.rat_btn').removeClass('btn-primary').addClass('btn-default');
            $(this).addClass('btn-primary');

            var link = generateRateLink($(this));
            reloadAsGet(link);
        });
        $('.rat_sel').on('changed.bs.select', function() {
            var link = generateRateLink($(this));
            reloadAsGet(link);
        });
        $('.news_link').on('click', function () {
            $('.news_link').removeClass('active');
            $(this).addClass('active');
            $('.news-content').addClass('hide');
            $('.news-content[data-news='+$(this).data('news')+']').removeClass('hide');
        });
    });
})();