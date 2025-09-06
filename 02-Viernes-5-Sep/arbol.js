console.log("Segundo ejercicio: Árbol frondoso");
console.log("THREE: ", THREE);

// --- Scene Manager ---
class SceneManager {
    constructor(canvas) {
        this.canvas = canvas;
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xaadfff); // 🔹 Cielo claro

        this.camera = new THREE.PerspectiveCamera(
            45,
            canvas.clientWidth / canvas.clientHeight,
            0.1,
            1000
        );
        this.camera.position.set(0, 2, 8);

        this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true });
        this.renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    }

    getScene() {
        return this.scene;
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

// --- Lighting ---
class Lighting {
    constructor(scene) {
        this.scene = scene;
        this.lights = {};
        this.addLights();
    }

    addLights() {
        // Luz superior blanca
        const topLight = new THREE.DirectionalLight(0xffffff, 1.2);
        topLight.position.set(5, 10, 5);
        this.scene.add(topLight);
        this.lights["topLight"] = topLight;

        // Luz de relleno cálida
        const warmLight = new THREE.PointLight(0xffaa55, 0.6, 50);
        warmLight.position.set(-4, 3, 4);
        this.scene.add(warmLight);
        this.lights["warmLight"] = warmLight;

        // Luz ambiente suave
        const ambient = new THREE.AmbientLight(0x404040, 0.8);
        this.scene.add(ambient);
        this.lights["ambient"] = ambient;
    }

    toggleLight(name, enabled) {
        if (this.lights[name]) this.lights[name].visible = enabled;
    }

    updateLightIntensity(name, intensity) {
        if (this.lights[name]) this.lights[name].intensity = intensity;
    }

    dispose() {
        Object.values(this.lights).forEach(light => this.scene.remove(light));
    }
}

// --- Texture Loader ---
class TextureLoader {
    constructor() {
        this.loader = new THREE.TextureLoader();
    }

    loadTexture(path, onLoad, onError) {
        this.loader.load(path, onLoad, undefined, onError);
    }

    getDefaultMaterial() {
        return new THREE.MeshStandardMaterial({
            color: 0x228b22,
            flatShading: true
        });
    }
}

// --- Tree (Copa + Tronco escalonado) ---
class Tree {
    constructor(scene, texture) {
        this.scene = scene;
        this.meshes = [];
        this.texture = texture;
        this.createFoliage();
        this.createTrunk();
    }

    createFoliage() {
        const geometry = new THREE.SphereGeometry(1, 32, 32);
        const material = new THREE.MeshStandardMaterial({
            map: this.texture || null,
            color: 0x2e8b57,
            roughness: 0.8,
            metalness: 0.1,
            flatShading: true
        });

        const capas = 3;
        const esferasPorCapa = 14;
        const radioBase = 1.4;

        for (let j = 0; j < capas; j++) {
            const altura = 1.5 + j * 0.6;
            const radio = radioBase - j * 0.25;

            for (let i = 0; i < esferasPorCapa; i++) {
                const mesh = new THREE.Mesh(geometry, material);
                mesh.scale.set(0.35, 0.35, 0.35);

                const angle = (i / esferasPorCapa) * Math.PI * 2;
                const x = Math.cos(angle) * (radio + Math.random() * 0.1);
                const y = altura + (Math.random() * 0.1 - 0.05);
                const z = Math.sin(angle) * (radio + Math.random() * 0.1);

                mesh.position.set(x, y, z);
                this.scene.add(mesh);
                this.meshes.push(mesh);
            }
        }

        // Esfera en la punta
        const punta = new THREE.Mesh(geometry, material);
        punta.scale.set(0.3, 0.3, 0.3);
        punta.position.set(0, 1.5 + capas * 0.6, 0);
        this.scene.add(punta);
        this.meshes.push(punta);
    }

    createTrunk() {
        const troncoMaterial = new THREE.MeshStandardMaterial({
            color: 0x8B5A2B,
            roughness: 1,
            flatShading: true
        });

        const segmentosTronco = 5;
        const alturaCilindro = 0.7;
        const radioBase = 0.35;

        for (let t = 0; t < segmentosTronco; t++) {
            const radioInferior = radioBase * (1 - (t * 0.08));
            const radioSuperior = radioBase * (1 - ((t + 1) * 0.08));

            const troncoGeo = new THREE.CylinderGeometry(
                radioSuperior,
                radioInferior,
                alturaCilindro,
                16
            );

            const tronco = new THREE.Mesh(troncoGeo, troncoMaterial);
            tronco.position.set(0, (alturaCilindro / 2) + (t * alturaCilindro) - 1, 0);

            this.scene.add(tronco);
            this.meshes.push(tronco);
        }
    }

    animate() {
        this.meshes.forEach(m => {
            m.rotation.y += 0.002; // 🌿 movimiento lento
        });
    }

    dispose() {
        this.meshes.forEach(m => this.scene.remove(m));
        this.meshes = [];
    }
}

// --- Main App ---
class TreeApp {
    constructor() {
        this.canvas = document.getElementById("lienzo");
        this.sceneManager = null;
        this.tree = null;
        this.lighting = null;
        this.textureLoader = null;
        this.init();
    }

    init() {
        this.setupSceneManager();
        this.setupLighting();
        this.setupTextureLoader();
        this.loadTree();
    }

    setupSceneManager() {
        this.sceneManager = new SceneManager(this.canvas);
    }

    setupLighting() {
        this.lighting = new Lighting(this.sceneManager.getScene());
    }

    setupTextureLoader() {
        this.textureLoader = new TextureLoader();
    }

    loadTree() {
        const texturePath = './textura/t1.png';
        this.textureLoader.loadTexture(
            texturePath,
            (texture) => this.createTree(texture),
            () => this.createTreeWithFallback()
        );
    }

    createTree(texture) {
        this.tree = new Tree(this.sceneManager.getScene(), texture);
        this.startAnimation();
    }

    createTreeWithFallback() {
        console.warn("⚠️ Usando material por defecto (sin textura)");
        this.tree = new Tree(this.sceneManager.getScene(), null);
        this.startAnimation();
    }

    startAnimation() {
        this.sceneManager.startAnimation(() => {
            if (this.tree) this.tree.animate();
        });
    }

    dispose() {
        if (this.tree) this.tree.dispose();
        if (this.lighting) this.lighting.dispose();
        if (this.sceneManager) this.sceneManager.dispose();
    }
}

// --- Inicializar la aplicación ---
const app = new TreeApp();
window.TreeApp = TreeApp;
