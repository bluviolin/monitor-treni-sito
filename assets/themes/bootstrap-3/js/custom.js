$(document).ready(function(){
    $(document).tooltip({
        items: ".barra, .barravert, [title]",
        content: function(){
            var element = $(this);

            if (element.is('.barra') || element.is('.barravert')) {
                var perc = element.data('perc').split('-');
                var num = element.data('num').split('-');
                var media = element.data('mediaritardi');

                ret = '<div>Corse monitorate: ' + num[0] + '</div>';
                ret += '<div>Ritardo medio: ' + media + ' minuti</div>';
                ret += '<div class="rit0-5">0-5 min.: ' + num[1] + ' (' + perc[0] + '%)</div>';
                ret += '<div class="rit5-10">5-10 min.: ' + num[2] + ' (' + perc[1] + '%)</div>';
                ret += '<div class="rit10-20">10-20 min.: ' + num[3] + ' (' + perc[2] + '%)</div>';
                ret += '<div class="rit20">Oltre 20 min.: ' + num[4] + ' (' + perc[3] + '%)</div>';
                ret += '<div class="soppressioni">Soppressi: ' + num[5] + ' (' + perc[4] + '%)</div>';

                return ret;
            }
            if (element.is ('[title]')){
                return element.attr( "title" );

            }
        }
    });
});
