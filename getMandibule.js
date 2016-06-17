/**
 * @author Houssam KARRACH
 * @define Main qui fait le traitement de la mandibule qui permet de selectionner 
 *         2 parties de la mandibule, ensuite on change la couleur de toute la partie entre les 2 objets séléctionnés
 */
/**
 * Initialisation des variables
 */
var renderer , scene , camera  , geometry , controls, mesh ,raycaster,mousevar ,intersected;
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var groupe = new THREE.Object3D();
var objects = [];
var number_mandibule = [];
var number_vide = [];
var intersectColor = 0x00D66B;
var baseColor = 0xFFFFFF;
var foundColor = 0x12C0E3;
var selectionner = false;
/**
     * Remplacer ;
     *  width_div : width du div mandibule
     *  height_div  : height du div mandibule
     */
var width_div = document.getElementById("mandibule").clientWidth;
var height_div = 600;
/**
 * @function : permet l'initialisation de la scène et le chargement de l'image
 * @description : utilisation de la fonction affichageMandibule() pour  l'affichage de 16 objets de la mandibules
 */
function init() { 
    /**
     * Initialisation du render 
     */
    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setPixelRatio(window.devicePixelRatio);  
    renderer.setSize(width_div, height_div);
    document.getElementById("mandibule").appendChild(renderer.domElement);
   /**
    * Initialisation de la scene
    */
    scene = new THREE.Scene();
    var ambient = new THREE.AmbientLight(0x404040,0.7);
    scene.add(ambient);    
    var hemiLight =  new THREE.HemisphereLight( 0xffffff, 0xffffff, 1 );
    hemiLight.color.set(0xd3d3d3);
	hemiLight.groundColor.setHSL( 0, 0, 0 );
	scene.add( hemiLight );
   /**
    * Initialisation du camera
    */
    camera = new THREE.PerspectiveCamera( 60, width_div / height_div, 1, 20000 );
        camera.position.z = 100;
        camera.position.y = 0;
        camera.position.x = 0;
        scene.add(camera);   
        affichageMandibuleV2();       
     
    // window.addEventListener('resize', onWindowResize, false);  
     //window.addEventListener( 'click', onMouseMove, false );
}

/**
 * @description : permet de reduire la taille de l'objet en fonction de la taille de l'ecran
 */

/**
 * @description : permet de boucler infinement la scene 
 */
var array =  mandibuleMaxMin();
        var max = array[0];
        var min = array[1];

function render(){
    controls.update();
	requestAnimationFrame(render);
	renderer.render(scene,camera);	
}
init();
render();
