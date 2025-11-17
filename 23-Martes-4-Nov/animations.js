// ============================================
// Configuracion de la escena
// ============================================

let scene, camera, renderer;
let geometries = [];
let meshControllers = [];
let meshData = [];
let raycaster;
let pointer;
let hoveredController = null;
let isAnimating = false;
const clock = new THREE.Clock();

const CANVAS_ID = 'three-canvas';
const TEXTURE_PATH = './text/silver-ue/gold-nugget-ue/';
const TOTAL_TEXTURES = 5;
const TEXTURE_FILES = {
    albedo: 'gold-nugget1_albedo.png',
    normal: 'gold-nugget1_normal-dx.png',
    metallic: 'gold-nugget1_metallic.png',
    roughness: 'gold-nugget1_roughness.png',
    ao: 'gold-nugget1_ao.png'
};

// =============================
// Funciones auxiliares
// =============================

function createScene() {
    const newScene = new THREE.Scene();
    newScene.background = new THREE.Color(0x111111);
    return newScene;
}

function createCamera() {
    const newCamera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    newCamera.position.set(0, 0.4, 7);
    newCamera.lookAt(0, 0, 0);
    return newCamera;
}
function updateCameraPosition(contentWidth = 0) {
    if (!camera) return;
    const width = window.innerWidth;
    let baseSettings;
    if (width >= 1600) baseSettings = { y: 0.24, z: 7.6 };
    else if (width >= 1300) baseSettings = { y: 0.22, z: 7.1 };
    else if (width >= 1000) baseSettings = { y: 0.2, z: 6.7 };
    else if (width >= 768) baseSettings = { y: 0.18, z: 6.3 };
    else if (width >= 560) baseSettings = { y: 0.16, z: 6.0 };
    else baseSettings = { y: 0.14, z: 5.8 };

    const zAdjustment = THREE.MathUtils.clamp(contentWidth * 0.04, 0.15, 0.6);
    camera.position.set(0, baseSettings.y, baseSettings.z + zAdjustment);
    camera.lookAt(0, 0, 0);
}

function createRenderer(canvas) {
    const newRenderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true
    });
    newRenderer.setSize(window.innerWidth, window.innerHeight);
    newRenderer.setPixelRatio(window.devicePixelRatio);
    newRenderer.shadowMap.enabled = true;
    newRenderer.shadowMap.type = THREE.PCFSoftShadowMap;
    newRenderer.toneMapping = THREE.ACESFilmicToneMapping;
    newRenderer.toneMappingExposure = 1.25;
    newRenderer.outputColorSpace = THREE.SRGBColorSpace;
    return newRenderer;
}

function setupLights(targetScene, activeCamera) {
    const hemiLight = new THREE.HemisphereLight(0xfff8dc, 0x08090f, 5);
    hemiLight.position.set(5, 5, 5);
    targetScene.add(hemiLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 5);
    targetScene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 100);
    directionalLight.position.copy(activeCamera.position.clone().add(new THREE.Vector3(1.5, 1.5, 0)));
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    directionalLight.shadow.camera.near = 5;
    directionalLight.shadow.camera.far = 50;
    directionalLight.shadow.camera.left = -10;
    directionalLight.shadow.camera.right = 10;
    directionalLight.shadow.camera.top = 10;
    directionalLight.shadow.camera.bottom = -10;
    targetScene.add(directionalLight);

    const frontLight = new THREE.PointLight(0xfff8e1, 100, 180);
    frontLight.position.copy(activeCamera.position.clone().add(new THREE.Vector3(0, 1, 2)));
    targetScene.add(frontLight);

    const warmSideLight = new THREE.PointLight(0xffd27f, 100, 140);
    warmSideLight.position.copy(activeCamera.position.clone().add(new THREE.Vector3(-3, 0.5, -1)));
    targetScene.add(warmSideLight);

    const rimLight = new THREE.PointLight(0x8fc7ff, 100, 150);
    rimLight.position.set(5, 4, -4);
    targetScene.add(rimLight);
}

function updateProgressUI(progress) {
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');

    if (progressFill) {
        progressFill.style.width = `${progress}%`;
    }

    if (progressText) {
        progressText.textContent = `${Math.round(progress)}%`;
    }
}

function createTextureLoadTracker(totalTextures) {
    let texturesLoaded = 0;
    updateProgressUI(0);

    return function handleTextureLoaded() {
        texturesLoaded++;
        const progress = (texturesLoaded / totalTextures) * 100;
        updateProgressUI(progress);

        if (texturesLoaded === totalTextures && !isAnimating) {
            isAnimating = true;
            setTimeout(() => {
                hideLoader();
                animate();
            }, 300);
        }
    };
}

function loadTexture(loader, fileName, label, onTextureLoaded) {
    return loader.load(
        `${TEXTURE_PATH}${fileName}`,
        onTextureLoaded,
        undefined,
        () => {
            console.error(`Error al cargar la textura ${label}`);
            onTextureLoaded();
        }
    );
}

function loadGoldTextures(onTextureLoaded) {
    const loader = new THREE.TextureLoader();
    return {
        albedo: loadTexture(loader, TEXTURE_FILES.albedo, 'albedo', onTextureLoaded),
        normal: loadTexture(loader, TEXTURE_FILES.normal, 'normal', onTextureLoaded),
        metallic: loadTexture(loader, TEXTURE_FILES.metallic, 'metallic', onTextureLoaded),
        roughness: loadTexture(loader, TEXTURE_FILES.roughness, 'roughness', onTextureLoaded),
        ao: loadTexture(loader, TEXTURE_FILES.ao, 'ao', onTextureLoaded)
    };
}

function configureTextures(textures) {
    Object.entries(textures).forEach(([key, texture]) => {
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(1, 1);

        if (key === 'albedo' && texture.colorSpace !== undefined) {
            texture.colorSpace = THREE.SRGBColorSpace;
        }
    });
}

function createGoldMaterial(textures) {
    const { albedo, normal, metallic, roughness, ao } = textures;
    return new THREE.MeshStandardMaterial({
        color: new THREE.Color('#f6d267'), // tono dorado calido
        map: albedo,
        normalMap: normal,
        normalScale: new THREE.Vector2(1.2, 1.2),
        metalnessMap: metallic,
        roughnessMap: roughness,
        aoMap: ao,
        aoMapIntensity: 1.1,
        metalness: 1.0, // metal completo para simular oro
        roughness: 0.3, // rugosidad ligera para hacerlo realista
        emissive: new THREE.Color(0x000000), // sin emision
        emissiveIntensity: 0
    });
}

function createMeshes(targetScene, material) {
    const meshConfigs = [
        { key: 'cube', geometry: new THREE.BoxGeometry(2, 2, 2), position: new THREE.Vector3(-4, 0, 0) },
        { key: 'sphere', geometry: new THREE.SphereGeometry(1.5, 32, 32), position: new THREE.Vector3(0, 0, 0) },
        { key: 'torus', geometry: new THREE.TorusGeometry(1.2, 0.5, 16, 100), position: new THREE.Vector3(4, 0, 0) }
    ];

    return meshConfigs.map(({ key, geometry, position }) => {
        const mesh = new THREE.Mesh(geometry, material);
        const bbox = new THREE.Box3().setFromObject(mesh);
        const centerX = (bbox.max.x + bbox.min.x) / 2;
        const anchor = new THREE.Vector3(centerX, bbox.min.y, bbox.max.z);
        mesh.position.sub(anchor);
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        const group = new THREE.Group();
        group.position.copy(position);
        group.add(mesh);
        targetScene.add(group);

        return { key, mesh, group, baseScale: 1 };
    });
}

function createMeshControllers(meshData) {
    return meshData.map(({ key, mesh, group, baseScale }) => ({
        key,
        mesh,
        group,
        baseScale,
        animation: null
    }));
}

function setGroupScale(group, scaleValue) {
    group.scale.set(scaleValue, scaleValue, scaleValue);
}

function getLayoutSettings() {
    const width = window.innerWidth;
    if (width >= 1600) return { baseScale: 1.05, spacing: 0.34, verticalOffset: -0.05 };
    if (width >= 1300) return { baseScale: 0.98, spacing: 0.32, verticalOffset: -0.045 };
    if (width >= 1000) return { baseScale: 0.9, spacing: 0.3, verticalOffset: -0.04 };
    if (width >= 768) return { baseScale: 0.82, spacing: 0.28, verticalOffset: -0.03 };
    if (width >= 560) return { baseScale: 0.72, spacing: 0.26, verticalOffset: -0.025 };
    return { baseScale: 0.62, spacing: 0.24, verticalOffset: -0.02 };
}

function layoutMeshGroups(meshDataArr) {
    if (!meshDataArr.length) return;
    const { baseScale, spacing, verticalOffset } = getLayoutSettings();

    const widths = meshDataArr.map(({ mesh }) => {
        const bbox = new THREE.Box3().setFromObject(mesh);
        return (bbox.max.x - bbox.min.x) * baseScale;
    });

    const actualSpacing = spacing * baseScale;
    const totalWidth = widths.reduce((sum, width) => sum + width, 0) + actualSpacing * (meshDataArr.length - 1);
    let currentX = -totalWidth / 2;

    meshDataArr.forEach((data, index) => {
        const width = widths[index];
        const centerX = currentX + width / 2;
        data.group.position.set(centerX, verticalOffset, 0);
        data.group.rotation.set(0, 0, 0);
        setGroupScale(data.group, baseScale);
        data.baseScale = baseScale;
        currentX += width;
        if (index < meshDataArr.length - 1) {
            currentX += actualSpacing;
        }
    });

    if (meshControllers.length) {
        meshControllers.forEach((controller, index) => {
            controller.baseScale = meshDataArr[index].baseScale;
            controller.animation = null;
            controller.group.rotation.set(0, 0, 0);
            setGroupScale(controller.group, controller.baseScale);
        });
    }
    updateCameraPosition(totalWidth);
}

function easeOutBounce(t) {
    const n1 = 7.5625;
    const d1 = 2.75;
    if (t < 1 / d1) {
        return n1 * t * t;
    } else if (t < 2 / d1) {
        t -= 1.5 / d1;
        return n1 * t * t + 0.75;
    } else if (t < 2.5 / d1) {
        t -= 2.25 / d1;
        return n1 * t * t + 0.9375;
    }
    t -= 2.625 / d1;
    return n1 * t * t + 0.984375;
}

function easeInBounce(t) {
    return 1 - easeOutBounce(1 - t);
}

function easeOutElastic(t) {
    const c4 = (2 * Math.PI) / 3;
    return t === 0
        ? 0
        : t === 1
            ? 1
            : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
}

function easeInOutQuad(t) {
    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

function getEasingValue(easing, t) {
    switch (easing) {
        case 'easeInBounce':
            return easeInBounce(t);
        case 'easeOutBounce':
            return easeOutBounce(t);
        case 'easeOutElastic':
            return easeOutElastic(t);
        case 'easeInOutQuad':
            return easeInOutQuad(t);
        default:
            return t;
    }
}

function startTransformAnimation(
    controller,
    { scaleFactor = 1, scale, rotationX = 0 },
    duration = 450,
    easing = 'easeOutElastic'
) {
    if (!controller) return;
    const baseScale = controller.baseScale ?? controller.group.scale.x;
    const targetScale = scale !== undefined ? scale : baseScale * scaleFactor;

    controller.animation = {
        startScale: controller.group.scale.x,
        targetScale,
        startRotationX: controller.group.rotation.x,
        targetRotationX: rotationX,
        duration,
        easing,
        startTime: performance.now()
    };
}

function updateMeshAnimations() {
    const now = performance.now();
    meshControllers.forEach(controller => {
        const anim = controller.animation;
        if (!anim) return;

        const elapsed = now - anim.startTime;
        const progress = Math.min(elapsed / anim.duration, 1);
        const easedProgress = getEasingValue(anim.easing, progress);

        const scaleValue = THREE.MathUtils.lerp(
            anim.startScale,
            anim.targetScale,
            easedProgress
        );
        const rotationX = THREE.MathUtils.lerp(
            anim.startRotationX,
            anim.targetRotationX,
            easedProgress
        );
        setGroupScale(controller.group, scaleValue);
        controller.group.rotation.x = rotationX;

        if (progress >= 1) {
            setGroupScale(controller.group, anim.targetScale);
            controller.group.rotation.x = anim.targetRotationX;
            controller.animation = null;
        }
    });
}

function initInteraction(canvas) {
    if (!canvas) return;
    raycaster = new THREE.Raycaster();
    pointer = new THREE.Vector2();

    canvas.addEventListener('mousemove', handlePointerMove);
    canvas.addEventListener('mouseleave', handlePointerLeave);
}

function handlePointerMove(event) {
    if (!raycaster || !pointer || meshControllers.length === 0) return;

    const rect = event.currentTarget.getBoundingClientRect();
    pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);

    raycaster.setFromCamera(pointer, camera);
    const intersects = raycaster.intersectObjects(meshControllers.map(controller => controller.mesh));
    const newController = intersects.length ? meshControllers.find(controller => controller.mesh === intersects[0].object) : null;

    if (newController !== hoveredController) {
        if (hoveredController) {
            startTransformAnimation(hoveredController, { scaleFactor: 1, rotationX: 0 }, 520, 'easeInOutQuad');
        }
        if (newController) {
            const targetRotation = newController.key === 'sphere' ? 0.35 : -0.35;
            startTransformAnimation(newController, { scaleFactor: 0.92, rotationX: targetRotation }, 700, 'easeOutElastic');
        }
        hoveredController = newController;
    }
}

function handlePointerLeave() {
    if (hoveredController) {
        startTransformAnimation(hoveredController, { scaleFactor: 1, rotationX: 0 }, 520, 'easeInOutQuad');
        hoveredController = null;
    }
    meshControllers.forEach(controller =>
        startTransformAnimation(controller, { scaleFactor: 1, rotationX: 0 }, 520, 'easeInOutQuad')
    );
}

// Inicializa la escena
function init() {
    scene = createScene();
    camera = createCamera();
    const canvas = document.getElementById(CANVAS_ID);
    renderer = createRenderer(canvas);

    setupLights(scene, camera);

    const handleTextureLoaded = createTextureLoadTracker(TOTAL_TEXTURES);
    const textures = loadGoldTextures(handleTextureLoaded);
    configureTextures(textures);

    const material = createGoldMaterial(textures);
    meshData = createMeshes(scene, material);
    meshControllers = createMeshControllers(meshData);
    layoutMeshGroups(meshData);
    geometries = meshData.map(item => item.group);
    initInteraction(canvas);

    // Maneja el redimensionamiento de la ventana
    window.addEventListener('resize', onWindowResize);
}

// Bucle de animacion
function animate() {
    requestAnimationFrame(animate);

    // Mantiene las geometrias en su posicion base (sin rotacion continua)

    updateMeshAnimations();

    // Renderiza la escena
    renderer.render(scene, camera);
}

// Maneja el redimensionamiento
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    layoutMeshGroups(meshData);
}

// Oculta el loader con una transicion suave
function hideLoader() {
    const loaderElement = document.getElementById('loader');
    if (loaderElement && !loaderElement.classList.contains('hidden')) {
        // Agrega un efecto de desvanecimiento
        loaderElement.style.transition = 'opacity 0.8s ease, visibility 0.8s ease';
        loaderElement.style.opacity = '0';
        
        setTimeout(() => {
            loaderElement.classList.add('hidden');
        }, 800);
    }
}

// Inicializa cuando el DOM esta listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

