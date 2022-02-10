
class VariableController{
    constructor(parent) {
        // this.keyid = 0
        this.btncont   = buildElement('div','btncont')

        this.upbtn   = buildElement('div','arrowbutton','▲')
        this.downbtn = buildElement('div','arrowbutton','▼')
        this.incT    = buildElement('div','arrowbutton','w')
        this.decT    = buildElement('div','arrowbutton','s')
        this.decT    = buildElement('div','arrowbutton','s')
        this.star    = buildElement('div','arrowbutton','*')

        this.incT.innerText = parent.keycode[0][parent.KEYID]
        this.decT.innerText = parent.keycode[1][parent.KEYID]

        this.upbtn.onmouseover="this.style.background='gray";
        this.downbtn.onmouseover="this.style.background='gray";

        this.downbtn.style.setProperty('top','2.4rem')
        this.incT   .style.setProperty('top','4.8rem')
        this.decT   .style.setProperty('top','7rem')
        this.star   .style.setProperty('top','10.5rem')

        this.btncont.appendChild(this.upbtn)
        this.btncont.appendChild(this.downbtn)
        this.btncont.appendChild(this.incT)
        this.btncont.appendChild(this.decT)
        this.btncont.appendChild(this.star)

        // parent.cardElement.append(this.btncont)
        parent.graphContainer.appendChild(this.btncont)
        hideconsole(parent)

    }
}

function hideconsole(parent){
    // parent.cardElement.style.setProperty('min-width','25rem')
    // parent.cardElement.style.setProperty('max-width','25rem')
    // parent.cardElement.style.setProperty('max-height','25rem')
    // parent.textField.style.setProperty('min-width','25rem')
    parent.codeblock.style.display      = 'none'
    parent.consoleElement.style.display = 'none'
    parent.textInput.style.display      = 'none'
    parent.controlPanel.style.display   = 'none'
    parent.consoleVisible               = false
    refresh(parent)

}
function refresh(parent){
    // print(parent.graph.clientHeight)
    // print(parent.graph.clientHeight)
    // print(parent.graph.clientHeight)
    let d = parent.graph.clientHeight+35
    if (parent.consoleVisible){
        d+=251
    }
    parent.cardElement.style.setProperty('height',d.toString()+'px')
}

class GraphTable {

    constructor(name) {
        this.name = name
        buildMeta(this)

        this.x = [];
        this.y = [];

        this.canvas = this.graph;
        this.data = {
            type:'line',
            labels: this.x,
            datasets: [{
                label: name,
                data: this.y,
                backgroundColor: "#4E69DE"
            }]
        };
        this.option = {
            scales: {
                yAxes: [{
                    stacked: true,
                    gridLines: {
                        display: true,
                        color: "#313131"
                    }
                }],
                xAxes: [{
                    gridLines: {
                        display: true,
                        color: "#313131"
                    }
                }]
            }
        };

        this.chart = Chart.Line(this.canvas, {
            data: this.data,
            options: this.option
        });
        this.c_frame = 0;

    }

    append(values){
        // console.log('Worked')
        let value = values[0]
        this.meta.innerText  = value;
        this.c_frame += 1;
        this.x.push(this.c_frame);
        this.y.push(value);


        for(var i = this.x.length;i>300;i--){
            let v = Math.floor(Math.random()*this.x.length)
            this.x.splice(v, 1);
            this.y.splice(v, 1);
            // console.log(array);
        }
        this.chart.render();
        this.chart.data.labels = this.x
        this.chart.data.datasets.forEach((dataset) => {
            dataset.data = this.y;
        });
        this.chart.update();
    }
}

class ImageTable{
    constructor(name) {
        buildMeta(this)
        let img = buildElement('img','renderimg')
        this.graphContainer.appendChild(img)
        // this.graphContainer.insertAdjacentElement (0, img);
        // this.graphContainer.appendChild(img, 0)
        // appendChild(img)
        img.src = 'https://images.pexels.com/photos/60597/dahlia-red-blossom-bloom-60597.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260'
        this.cardElement.style.setProperty('min-width','30rem')
        this.cardElement.style.setProperty('min-height','30rem')
    }

}

class BarTable {

    constructor(names) {
        this.name = names[0]
        buildMeta(this)

        this.x = [];
        this.y = [];

        this.canvas = this.graph;
        this.data = {
            labels: this.x,
            datasets: [
            ]
        };
        let colors = [
            '#00cb84aa',
            '#0800ffaa',
            '#cb5500aa',
            '#cb005baa',
            '#ffb500aa',
            '#dfff00aa',
        ]

        for (let x = 0;x<names.length;x++){
            // eel.jp
            this.data.datasets.push(
                {
                    label: names[x],
                    data: this.y,
                    backgroundColor: colors[x],
                    stack: 'Stack 0',
                },
            );
            this.y.push([]);

        }
        // eel.jprint()
        this.option = {
            type: 'bar',
            data: this.data,
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: 'Chart.js Bar Chart - Stacked'
                    },
                },
                responsive: true,
                interaction: {
                    intersect: false,
                },
                scales: {
                    x: {
                        stacked: true,
                    },
                    y: {
                        stacked: true
                    }
                }
            }
        };



        this.chart = Chart.Line(this.canvas, {
            data: this.data,
            options: this.option
        });
        this.c_frame = 7;

    }
    append(tensors){

        this.meta.innerText  = 'Tensor';
        this.x = [...Array(tensors[0].length).keys()];


        this.chart.render();
        this.chart.data.labels = this.x

        for(let x = 0;x<tensors.length;x++) {

            this.y[x] = tensors[x];
            this.chart.data.datasets[x].data = this.y[x];
        }

        this.chart.update();
    }
        // console.log('Worked')
}

class VarControl extends GraphTable{
    constructor(name,keycode,KEYID) {
        // eel.jprint(KEYID)
        super(name);
        this.keycode    = keycode
        this.KEYID      = KEYID
        this.controller = new VariableController(this)

    }

}
//
class TensorTable extends BarTable {
    constructor(name) {
        super(name);
    }
    // append(value) {
    //     super.append(value);
    // }
}
// }
class TensorControl extends TensorTable{
    constructor(name) {
        super(name);
        this.controller = new VariableController(this)

    }
}
class StringControl{
    constructor() {
        buildMeta(this)
        this.graph.className = 'input'
        this.graph.style.setProperty('background-color','#141417')
        this.graph.style.setProperty('width','100%')
        let  textF = buildElement('textarea','stringE','')
        this.meta.innerText = ''

        this.graph.style.display = 'none'
        this.graphContainer.appendChild(textF)
    }


}

class VariableScope{
    constructor() {
        let cardElement = buildElement('div',"card");
        let board       = buildElement('div',"board");
        let cvars       = buildElement('div',"cvars");
        let scopes      = buildElement('div',"scopes");
        let section = [new VariableDiv(''),new VariableDiv(''),new VariableDiv('')]
        let aScopes = [new ScopeDiv(''),new ScopeDiv(''),new ScopeDiv('')]

        this.aScopes = aScopes

        section.forEach((x) => {
            cvars.append(x.div);
        })
        aScopes.forEach((x) => {
            scopes.append(x.div);
        })
        let title = buildElement('h5','title',);
        // Not safe change it
        title.innerHTML = 'Variable Scope' + '<h4 style="color: #58A6FF">'+'__main__.py'+'</h4>'.italics()
        cardElement.appendChild(title)
        cardElement.appendChild(board)
        cardElement.style.setProperty('height','calc()')
        // cardElement.style.setProperty('min-height','100%')
        board.appendChild(cvars)
        board.appendChild(scopes)
        this.scopes = scopes

        container2.appendChild(cardElement);

    }
    reset(){
        this.aScopes.forEach((x) => {
            x.div.remove()
        })
        this.aScopes = []
    }
    init(key,value) {
        let x = new ScopeDiv(key,value)

        this.aScopes.push(x)
        this.scopes.appendChild(x.div);
    }

}
class Panel{



}
class RecoveryTree{
    constructor() {
        let cardElement = buildElement('div',"card");
        let board       = buildElement('div',);
        let graph       = buildElement('div');

        let title = buildElement('h5','title');
        // Not safe change it
        title.innerHTML = 'Recovery Tree'
        graph.id = 'tree-simple'

        board.appendChild(graph)

        cardElement.appendChild(title)
        cardElement.appendChild(board)
        cardElement.style.setProperty('height','38rem')
        container2.appendChild(cardElement)

        let simple_chart_config = {
            chart: {
                container: "#tree-simple"
            },

            nodeStructure: {
                text: { name: "Parent node" },
                children: [
                    {
                        text: { name: "First child" }
                    },
                    {
                        text: { name: "Second child" }
                    }
                ]
            }
        };

        let my_chart = new Treant(simple_chart_config);

    }

}


//
// var table   = new BarTable('var');
// var table2  = new TensorControl('graph');
// var table3  = new ImageTable('graph');
let tables2 = [new RecoveryTree('graph'),new VariableScope('graph')]
let tables  = []
let KEYID   = 0
// let tablesC = []


eel.expose(emplace_card);
function emplace_card(type,graph,values,names,keycodes) {
    let name = names[0]
    eel.jprint(name)
    // let id = 'qnoghg9892'
    if (graph) {
        switch (type) {
            case 'scalar':
                tables.push(new GraphTable(name));
                break;
            case 'tensor':
                tables.push(new TensorTable(names));
                break;
            case 'string':
                tables.push(new StringControl(name));
                break;
            default:
                break;

        }
    } else {
        switch (type) {
            case 'scalar':
                tables.push(new VarControl(name,keycodes,KEYID));
                KEYID++
                break;
            case 'tensor':
                tables.push(new TensorControl(name,keycodes,KEYID));
                KEYID++
                break;
            case 'string':
                tables.push(new StringControl(name,keycodes,KEYID));
                KEYID++
                break;
            default:
                break;

        }

    }
}

eel.expose(append_at_idx);
function append_at_idx(index,value){
    tables[index].append(value)
}

eel.expose(updatescopes);
function updatescopes(dict){
    tables2[1].reset()
    for (const [key, value] of Object.entries(dict)) {
        tables2[1].init(key,value[1])
    }

}

document.onkeypress = function (e) {
    e = e || window.event;
    eel.keypress(String.fromCharCode(e.keyCode),KEYID)
    // use e.keyCode
};


//var table43  = new GraphTable('graph');
//var table44  = new BarTable('graph');
//var table45  = new TensorControl('graph');
//var table46  = new TensorControl('graph');
//var table47  = new StringControl('graph');
//var table48  = new VarControl('graph');
//var table49  = new ImageTable('graph');
