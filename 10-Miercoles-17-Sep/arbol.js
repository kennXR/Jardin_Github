class SceneManager {
    constructor(canvas) {
        // Configurar escena básica
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xaadfff);
        
        // Configurar cámara
        this.camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
        this.camera.position.set(0, 2, 8);
        
        // Configurar renderer
        this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
        this.renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    }

    startAnimation(callback) {
        const animate = () => {
            requestAnimationFrame(animate);
            callback();
            this.renderer.render(this.scene, this.camera);
        };
        animate();
    }

    dispose() {
        this.renderer.dispose();
    }
}

// Configuración de iluminación
class Lighting {
    constructor(scene) {
        this.scene = scene;
        
        const topLight = new THREE.DirectionalLight(0xffffff, 1.2);
        topLight.position.set(5, 10, 5);
        scene.add(topLight);
        
        const warmLight = new THREE.PointLight(0xffaa55, 0.6, 50);
        warmLight.position.set(-4, 3, 4);
        scene.add(warmLight);
        
        const ambient = new THREE.AmbientLight(0x404040, 0.8);
        scene.add(ambient);
    }
}

// Cargador de texturas simplificado
class TextureLoader {
    constructor() {
        this.loader = new THREE.TextureLoader();
    }
    
    load(path, onLoad) {
        this.loader.load(path, onLoad, undefined, () => console.warn(`No se pudo cargar: ${path}`));
    }
}

// Creación del árbol 3D
class Tree {
    constructor(scene, foliageTexture, trunkTexture) {
        this.scene = scene;
        this.group = new THREE.Group();
        scene.add(this.group);

        // Materiales del árbol
        this.foliageMaterial = new THREE.MeshStandardMaterial({
            map: foliageTexture,
            color: 0x2e8b57,
            roughness: 0.8,
            flatShading: true
        });

        this.trunkMaterial = new THREE.MeshStandardMaterial({
            map: trunkTexture,
            color: 0x8B5A2B,
            roughness: 1,
            flatShading: true
        });

        this.createTree();
    }

    createTree() {
        this.createFoliage();
        this.createTrunk();
    }

    createFoliage() {
        const geometry = new THREE.SphereGeometry(1, 32, 32);
        const layers = 5;
        const spheresPerLayer = 22;
        const baseRadius = 1.8;

        for (let layer = 0; layer < layers; layer++) {
            const height = 1.2 + layer * 0.55;
            const radius = baseRadius - layer * 0.25;
            
            for (let i = 0; i < spheresPerLayer; i++) {
                const mesh = new THREE.Mesh(geometry, this.foliageMaterial);
                mesh.scale.set(0.32, 0.32, 0.32);
                
                const angle = (i / spheresPerLayer) * Math.PI * 2;
                const x = Math.cos(angle) * (radius + Math.random() * 0.2 - 0.1);
                const y = height + (Math.random() * 0.2 - 0.1);
                const z = Math.sin(angle) * (radius + Math.random() * 0.2 - 0.1);
                
                mesh.position.set(x, y, z);
                this.group.add(mesh);
            }
        }

        const top = new THREE.Mesh(geometry, this.foliageMaterial);
        top.scale.set(0.28, 0.28, 0.28);
        top.position.set(0, 1.2 + layers * 0.55, 0);
        this.group.add(top);
    }

    createTrunk() {
        const segments = 5;
        const segmentHeight = 0.7;
        const baseRadius = 0.35;

        for (let i = 0; i < segments; i++) {
            const bottomRadius = baseRadius * (1 - (i * 0.08));
            const topRadius = baseRadius * (1 - ((i + 1) * 0.08));
            
            const trunkGeo = new THREE.CylinderGeometry(topRadius, bottomRadius, segmentHeight, 16);
            const trunk = new THREE.Mesh(trunkGeo, this.trunkMaterial);
            
            trunk.position.set(0, (segmentHeight / 2) + (i * segmentHeight) - 1, 0);
            this.group.add(trunk);
        }
    }

    animate() {
        this.group.rotation.y += 0.002;
    }
}

// Aplicación principal simplificada
class TreeApp {
    constructor() {
        const canvas = document.getElementById("lienzo");
        const textureLoader = new TextureLoader();
        
        this.sceneManager = new SceneManager(canvas);
        new Lighting(this.sceneManager.scene);
        
        textureLoader.load('./textura/t1.png', (foliageTexture) => {
            textureLoader.load('./textura/t2.png', (trunkTexture) => {
                this.tree = new Tree(this.sceneManager.scene, foliageTexture, trunkTexture);
                this.startAnimation();
            });
        });
    }

    startAnimation() {
        this.sceneManager.startAnimation(() => {
            if (this.tree) this.tree.animate();
        });
    }
}

// Inicializar la aplicación
const app = new TreeApp();

// Referencia al botón
const boton = document.getElementById("boton");

// Evento de click para cambiar color del follaje y tronco
boton.addEventListener("click", () => {
    if (app.tree) {
        app.tree.foliageMaterial.color.set(0xff0000); // rojo
        app.tree.trunkMaterial.color.set(0x800080);   // morado
    }
});