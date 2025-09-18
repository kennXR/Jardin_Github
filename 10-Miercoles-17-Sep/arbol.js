// Escena
class Escena {
    constructor(canvas) {
        this.escena = new THREE.Scene();
        this.escena.background = new THREE.Color(0xaadfff);

        this.camara = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
        this.camara.position.set(0, 2, 8);

        this.render = new THREE.WebGLRenderer({ canvas, antialias: true });
        this.render.setSize(canvas.clientWidth, canvas.clientHeight);
    }

    animar(dibujar) {
        const ciclo = () => {
            requestAnimationFrame(ciclo);
            dibujar();
            this.render.render(this.escena, this.camara);
        };
        ciclo();
    }
}

// Luces
class Luces {
    constructor(escena) {
        const luzDireccional = new THREE.DirectionalLight(0xffffff, 1.2);
        luzDireccional.position.set(5, 10, 5);
        escena.add(luzDireccional);

        const luzPuntual = new THREE.PointLight(0xffaa55, 0.6, 50);
        luzPuntual.position.set(-4, 3, 4);
        escena.add(luzPuntual);

        escena.add(new THREE.AmbientLight(0x404040, 0.8));
    }
}

// Árbol
class Arbol {
    constructor(escena, texFollaje, texTronco) {
        this.grupo = new THREE.Group();
        escena.add(this.grupo);

        // Materiales con colores originales
        this.matFollaje = new THREE.MeshStandardMaterial({ map: texFollaje, color: 0x2e8b57 });
        this.matTronco  = new THREE.MeshStandardMaterial({ map: texTronco,  color: 0x8B5A2B });
        this.colores = { follaje: 0x2e8b57, tronco: 0x8B5A2B };
        this.cambiado = false;

        this.crearFollaje();
        this.crearTronco();
    }

    crearFollaje() {
        const esfera = new THREE.SphereGeometry(1, 32, 32);
        const capas = 5;
        const esferasPorCapa = 20;
        const radioBase = 1.6;

        for (let capa = 0; capa < capas; capa++) {
            const altura = 1 + capa * 0.5;
            const radio = radioBase - capa * 0.25;

            for (let i = 0; i < esferasPorCapa; i++) {
                const angulo = (i / esferasPorCapa) * Math.PI * 2;
                const x = Math.cos(angulo) * radio;
                const y = altura;
                const z = Math.sin(angulo) * radio;

                const bola = new THREE.Mesh(esfera, this.matFollaje);
                bola.scale.set(0.3, 0.3, 0.3);
                bola.position.set(x, y, z);
                this.grupo.add(bola);
            }
        }

        // Esfera en la cima
        const cima = new THREE.Mesh(esfera, this.matFollaje);
        cima.scale.set(0.28, 0.28, 0.28);
        cima.position.set(0, 1 + capas * 0.5, 0);
        this.grupo.add(cima);
    }

    crearTronco() {
        const tronco = new THREE.Mesh(
            new THREE.CylinderGeometry(0.3, 0.35, 2, 16),
            this.matTronco
        );
        tronco.position.y = 0;
        this.grupo.add(tronco);
    }

    girar() {
        this.grupo.rotation.y += 0.002;
    }

    cambiarColores() {
        if (this.cambiado) {
            this.matFollaje.color.set(this.colores.follaje);
            this.matTronco.color.set(this.colores.tronco);
        } else {
            this.matFollaje.color.set(0xff0000); // rojo
            this.matTronco.color.set(0x800080);  // morado
        }
        this.cambiado = !this.cambiado;
    }
}

// App
class AppArbol {
    constructor() {
        const canvas = document.getElementById("lienzo");
        this.escenaObj = new Escena(canvas);
        new Luces(this.escenaObj.escena);

        const loader = new THREE.TextureLoader();
        loader.load('./textura/t1.png', texF => {
            loader.load('./textura/t2.png', texT => {
                this.arbol = new Arbol(this.escenaObj.escena, texF, texT);
                this.escenaObj.animar(() => this.arbol.girar());
            });
        });
    }
}

// Crear la app
const app = new AppArbol();
const boton = document.getElementById("boton");

// Click → alterna colores
boton.addEventListener("click", () => {
    if (app.arbol) app.arbol.cambiarColores();
});