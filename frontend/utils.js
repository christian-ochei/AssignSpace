//eel.expose(graph_table);
function buildElement(name,classname,innertext){
    let element  = document.createElement(name);
    if (classname){
        element.className = classname;
    }

    if (innertext){
        element.innerText = innertext;
    }
    return element
}
function buildout(consoleElement){
    let pre  = buildElement('pre','','')
    let codeblock =  buildElement('code', 'python', "> class T:" +
        "\n\n\tif True")
    consoleElement.appendChild(pre)
    pre.appendChild(codeblock)
    return codeblock
}

function buildIcon(){
    return buildElement('div','icon')
}

print = console.log
let bodyElement = document.body;
bodyElement.className = "body"

let container = buildElement('div','container')
let container2   = buildElement('div','container c2')
let header    = buildElement('div','header')
let navbar    = buildElement('div','navbar')

let save      = buildIcon()
let pause     = buildIcon()
let play      = buildIcon()
let stop      = buildIcon()
let c         = buildIcon()
let speed     = buildIcon()
let title     = buildIcon()
let center    = buildIcon()
title.innerText = 'AssignSpace'
navbar.appendChild(title)
navbar.appendChild(center)
center.style.setProperty('width','100%')
title.style.setProperty('width','30rem')

navbar.appendChild(save)
navbar.appendChild(pause)
navbar.appendChild(play)
navbar.appendChild(c)
navbar.appendChild(stop)
navbar.appendChild(speed)

// header.innerText = 'AssignSpace'
// container.innerText = 'Graphs will appear here'
header.appendChild(navbar)
bodyElement.appendChild(container)
bodyElement.appendChild(container2)
bodyElement.appendChild(header)

function buildMeta(realSelf){
    let cardElement = document.createElement('div');
    let graphContainer = document.createElement('graphC');
    let infoContainer  = document.createElement('inf');

    let title = document.createElement('h5')
    let meta  = document.createElement('p')
    let type  = document.createElement('type')
    let top   = document.createElement('top')
    let graph = document.createElement('canvas')

    let consoleElement = buildElement('div','console','')

    let controlPanel   = buildElement('div','controlPanel','Console')
    let textInput      = buildElement('div','textInput','>')
    let textField      = buildElement('input','textField','')
    let btn            = buildElement('button','send','>')
    realSelf.textField = textField

    let a = realSelf
    let b = function (){a.consoleSend(a)}
    window.addEventListener('resize', function (){refresh(realSelf)})

    btn.addEventListener("click", b);

    textField.addEventListener("keyup", function(event) {
        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
            // Cancel the default action, if needed
            // event.preventDefault();
            btn.click()
        }
    });

    textField.type = "text"
    textField.placeholder = "Write to console"
    textInput.appendChild(btn)
    textInput.appendChild(textField)

    cardElement.className = "card"
    cardElement.className = "card"
    graphContainer.className = "graphC"
    infoContainer.className  = "info"
    top.className   = "top"
    title.className = "title"
    meta.className  = "meta"
    type.className  = "type"
    graph.className = "canvas"

    title.innerText = realSelf.name;
    meta.innerText  = "void";
    type.innerText  = 'static';

    realSelf.consoleVisible = true


    top.append(type)

    cardElement.append(
        infoContainer
        , title
        , meta
        , graphContainer
        , top
    );

    container.appendChild(cardElement);
    cardElement.appendChild(graph);

    realSelf.consoleElement = consoleElement
    realSelf.codeblock = buildout(consoleElement)

    cardElement.appendChild(consoleElement);
    cardElement.appendChild(controlPanel);
    cardElement.appendChild(textInput);

    realSelf.controlPanel = controlPanel
    realSelf.textInput    = textInput

    graph.id = "chart";
    realSelf.graph = graph
    realSelf.graphContainer = graphContainer

    realSelf.consoleSend = function (real_self){
        // real_self.append(200)
        real_self.codeblock.innerText += '\n\n> '+real_self.textField.value
        console.log(real_self.textField.value)
        real_self.textField.value = ''
        hljs.initHighlighting()
    }
    realSelf.cardElement = cardElement
    realSelf.meta = meta
    refresh(realSelf)

}


class VariableDiv{
    constructor({name,value}) {
        this.div    = buildElement('div','variablediv')
        this.nameE  = buildElement('h6')
        this.valueE = buildElement('h6')
        this.nameE.innerText = name+':'
        this.valueE.innerText = 'None'

        this.div.append(this.nameE)
        this.div.append(this.valueE)


    }

}
class ScopeDiv{
    constructor(key,name) {
        this.div = buildElement('div','scopediv')
        this.nameE = buildElement('h6')
        this.valueE = buildElement('h6')
        this.nameE.innerText = name
        // console.log(name)
        // this.valueE.innerText = 'None'
        this.div.append(this.nameE)
        this.div.append(this.valueE)
    }

}