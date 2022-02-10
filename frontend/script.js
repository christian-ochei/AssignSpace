//eel.expose(graph_table);

class GraphTable {
    constructor(name) {
        let bodyElement = document.body;
        let cardElement = document.createElement('div');
        let graphContainer = document.createElement('graphC');
        let infoContainer  = document.createElement('inf');

        let title = document.createElement('h5');
        let meta  = document.createElement('p');
        let type  = document.createElement('type');
        let graph = document.createElement('canvas');

        cardElement.className = "card";
        bodyElement.className = "body";
        cardElement.className = "card";
        graphContainer.className = "graphC";
        infoContainer.className  = "info";
        title.className = "title";
        meta.className  = "meta";
        type.className  = "type";
        graph.className = "canvas";

        title.innerText = "__variable__";
        meta.innerText = "void";
        type.innerText = 'static';

        cardElement.append(
            infoContainer
            , title
            , graphContainer
            , meta
            , type
        );

        bodyElement.appendChild(cardElement);
        cardElement.appendChild(graph);
        graph.id = "chart";

        var dataPoints = [];

        var chart = new Chart(graph, {
            theme: "light2",
            title: {
                text: "Live Data"
            },
            data: [{
                type: "line",
                dataPoints: dataPoints
            }]
        });
        updateData();

        // Initial Values
        var xValue = 0;
        var yValue = 10;
        var newDataCount = 6;

        function addData(data) {
            if(newDataCount != 1) {
                $.each(data, function(key, value) {
                    dataPoints.push({x: value[0], y: parseInt(value[1])});
                    xValue++;
                    yValue = parseInt(value[1]);
                });
            } else {
                //dataPoints.shift();
                dataPoints.push({x: data[0][0], y: parseInt(data[0][1])});
                xValue++;
                yValue = parseInt(data[0][1]);
            }

            newDataCount = 1;
            chart.render();
            setTimeout(updateData, 1500);
        }

        function updateData() {
            $.getJSON("https://canvasjs.com/services/data/datapoints.php?xstart="+xValue+"&ystart="+yValue+"&length="+newDataCount+"type=json", addData);
        }
    }
    append(value){
        this.c_frame += 1;
        this.x.push(this.c_frame);
        this.y.push(value);
        this.chart.refresh = true;
        this.chart.render();
        // console.log(this.data.datasets[0].data)

    }
}
let table = new GraphTable('var');
// while (true){
//     table.append(20);
// }

// table.append(113);
// table.append(20);
// table.append(20);
// table.append(2424);
// table.append(20);
// table.append(13131);
// table.graph_table('var','table');
// table.graph_table('var','table');
