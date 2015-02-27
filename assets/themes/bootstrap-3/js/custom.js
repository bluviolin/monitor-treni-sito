$(document).ready(function(){
	$(document).tooltip({
		items: ".barra, .barravert, [title]",
        
        open: function (event, ui) {
            ui.tooltip.css('max-width', '370px');
        },
        
		content: function(){
			var element = $(this);
			
            if (element.is('.barra') || element.is('.barravert')) {
                var avg = parseFloat(element.data('mediaritardi'));
                var num = element.data('num').split('-');
                var perc = element.data('perc').split('-');
                var labels = [
                    '< 5 min.',
                    '5-10 min.',
                    '10-15 min.',
                    '>= 15 min.',
                    'Soppressi'
                ];
                var colors = ['green', 'yellow', 'orange', 'red', 'black'];
                data = new google.visualization.DataTable();
                data.addColumn('string', 'class');
                data.addColumn('number', 'perc');

                var val, lbl;
                perc.forEach(function(val, index){
                    val = parseFloat(val);
                    lbl = labels[index] + ': ' + num[index+1] + ' (' + val.toFixed(1) + '%)';
                    data.addRow([lbl, val]);
                });
                
                var wrapper = $('<div>');
                if (element.is ('[title]')){
                    $('<div>').text(element.attr( "title" )).appendTo(wrapper);
                }
                
                $('<div>').text('Corse misurate: ' + num[0]).appendTo(wrapper);
                if (num.length > 5) {
                    $('<div>').text('Corse con dati non disp.: ' + num[6]).appendTo(wrapper);
                }
                $('<div>').text('Ritardo medio: ' + avg.toFixed(1)).appendTo(wrapper);
                
                var div = document.createElement('div');
                wrapper.append(div);
                var chart = new google.visualization.PieChart(div);
                var options = {
                    is3D: true,
                    pieSliceText: 'none',
                    chartArea:{left: 0, top: 0, width:'90%', height:'100%'},
                    width: 320, height: 180,
                    colors: colors,
                };
                chart.draw(data, options);

                return wrapper.html();
            }
			
			// TODO: delete
			if (element.is('.__barra') || element.is('.__barravert')) {
				var perc = element.data('perc').split('-');
				var num = element.data('num').split('-');
				var media = element.data('mediaritardi');

				ret = '<div>Corse monitorate: ' + num[0] + '</div>';
				if (num.length > 6) {
					ret += '<div>Corse con dati non disp.: ' + num[6] + '</div>';
				}
				ret += '<div>Ritardo medio: ' + media + ' minuti</div>';
				ret += '<div class="rit0-5">&lt; 5 minuti: ' + num[1] + ' (' + perc[0] + '%)</div>';
				ret += '<div class="rit5-10">5-10 minuti: ' + num[2] + ' (' + perc[1] + '%)</div>';
				ret += '<div class="rit10-15">10-15 minuti: ' + num[3] + ' (' + perc[2] + '%)</div>';
				ret += '<div class="rit15">&ge; 15 minuti: ' + num[4] + ' (' + perc[3] + '%)</div>';
				ret += '<div class="soppressioni">Soppressi: ' + num[5] + ' (' + perc[4] + '%)</div>';

				return ret;
			}
			
			if (element.is ('[title]')){
				return element.attr( "title" );
			}
		}
	});
});
google.load("visualization", "1", {packages: ["corechart"]});
