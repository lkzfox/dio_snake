let canvas = document.getElementById("jogo")
let contexto = canvas.getContext("2d")

let tam = 30;
let snake = []
snake[0] = {
    x: 10 * tam,
    y: 10 * tam
}

let comida = {
    existe: false
}

let direcao = 'dir'

function background() {
    contexto.fillStyle = 'lightblue';
    contexto.fillRect(0,0,600,600)

}

function iniciarSnake() {
    snake.forEach(e => {
        contexto.fillStyle = "blue"
        contexto.fillRect(e.x, e.y, tam, tam)
    });
}

function gerarComida() {
    if (!comida.existe) {
        comida = {
            x: Math.round(Math.random() * 19) * tam,
            y: Math.round(Math.random() * 19) * tam,
            existe: true
        }        
    }
    contexto.fillStyle = "red"
    contexto.fillRect(comida.x, comida.y, tam, tam)
}

function mover() {

    let vX = 0, vY = 0;

    switch(direcao) {
        case 'dir':
            vX = tam;
            break;
        case 'esq':
            vX = -tam;
            break;
        case 'cim':
            vY = -tam;
            break;
        default:
            vY = tam;
    }
    
    let {x, y} = snake[0]
    
    snake.pop()

    x += vX;
    y += vY;
    
    let cabeca = {
        x: x >= 0 ? Math.abs(x % 600) : 600 - Math.abs(x % 600),
        y: y >= 0 ? Math.abs(y % 600) : 600 - Math.abs(y % 600)
    }

    checarColisao(cabeca)

    snake.unshift(cabeca)
}

function checarColisao(cabeca) {
    let encontrou = snake.find(i => i.x == cabeca.x && i.y == cabeca.y)
    if (encontrou) {
        clearInterval(loop_fps)
        console.warn("FIM DE JOGO");
    }
}

function checarComeu() {
    if (snake[0].x == comida.x && snake[0].y == comida.y) {
        switch(direcao) {
            case 'dir':
                comida.x +=  tam;
                break;
            case 'esq':
                comida.x -= tam;
                break;
            case 'cim':
                comida.y -= tam;
                break;
            default:
                comida.y += tam;
        }
        snake.unshift(comida);
        comida.existe = false;
    }
}

function loop() {
    background();
    iniciarSnake();
    gerarComida()
    mover();
    checarComeu()
}

let loop_fps
function fps() {
    loop_fps = setInterval(loop, 50)
}

fps();

document.addEventListener('keydown', mudarDirecao)

function mudarDirecao(event) {
    if (event.keyCode == 37 && direcao != 'dir') direcao = 'esq'
    if (event.keyCode == 38 && direcao != 'bai') direcao = 'cim'
    if (event.keyCode == 39 && direcao != 'esq') direcao = 'dir'
    if (event.keyCode == 40 && direcao != 'cim') direcao = 'bai'
}