/**
 * @author Houssam KARARCH
 * affichageMandibuleV2() à modifier problème du nom de la mesh
*/
 function affichageMandibuleV2(){

           var array = mandibuleMaxMin();
           var max = array[0];
           var min = array[1];
           var manager = new THREE.LoadingManager();
                        manager.onProgress = function ( item, loaded, total ) {
                            console.log( item, loaded, total );
                        };
            var onProgress = function ( xhr ) {
                            if ( xhr.lengthComputable ) {
                                var percentComplete = xhr.loaded / xhr.total * 100;
                                console.log( Math.round(percentComplete, 2) + '% downloaded' );
                            }
                        };
            var onError = function ( xhr ) {
                        };
            controls =  new THREE.OrbitControls( camera , renderer.domElement);
            var loader = new THREE.OBJLoader(manager);
            var compteur = 1;
            for(var i=1 ; i<=26 ; i++){
                name_mesh= "img/mandible_"+i+".obj";
                loader.load(name_mesh, function(object){
                object.traverse( function (child) {
                    if( child instanceof THREE.Mesh){
                         
                        geometry = new THREE.Geometry().fromBufferGeometry(child.geometry);
                        mesh = new THREE.Mesh(geometry, child.material );                    
                        console.log("i , max , min" ,compteur , max , min);
                       
                        mesh.rotation.set(0.7,0.1,-1.46);
                        objects.push(mesh);
                        if( compteur < min && compteur >max ){                        
                            objects[compteur-1].material.color.setHex( 0xf98658 );
                            console.log("compteur",compteur);
                        }
                        else if( compteur >= min && compteur <=max ) {
                            objects[compteur-1].material.color.setHex( 0xFF0000);
                             console.log("non compteur",compteur);
                        }
                        compteur++;
                        scene.add(mesh);
                    }
                    })
                })
            }
        }
 /**
  * @author Houssam KARRACH
  * @param URl des differents objets  dans le dossier img
  * @description : affichage des différentes parties de la mandibule
  */
    function affichageMandibule(){
    var manager = new THREE.LoadingManager();
                manager.onProgress = function ( item, loaded, total ) {
                    console.log( item, loaded, total );
                };

    var onProgress = function ( xhr ) {
                    if ( xhr.lengthComputable ) {
                        var percentComplete = xhr.loaded / xhr.total * 100;
                        console.log( Math.round(percentComplete, 2) + '% downloaded' );
                    }
                };

    var onError = function ( xhr ) {
                };

    controls =  new THREE.OrbitControls( camera , renderer.domElement);
    var loader = new THREE.OBJLoader(manager);

    loader.load("img/mandible_1.obj", function(object){
        object.traverse( function (child) {
            if( child instanceof THREE.Mesh){
                geometry = new THREE.Geometry().fromBufferGeometry(child.geometry);
                 var mesh1 = new THREE.Mesh(geometry, child.material );
                 mesh1.name = 1;
                 mesh1.rotation.set(0.7,0.1,-1.46);
                 objects.push(mesh1);
                 groupe.add(mesh1);
                 scene.add(mesh1);
            }
         })
        })
        loader.load("img/mandible_2.obj", function(object){
        object.traverse( function (child) {
            if( child instanceof THREE.Mesh){
                geometry = new THREE.Geometry().fromBufferGeometry(child.geometry);
                 var mesh2 = new THREE.Mesh(geometry, child.material );
                 mesh2.name = 2;
                mesh2.rotation.set(0.7,0.1,-1.46);
                 objects.push(mesh2);
                 groupe.add(mesh2);
                 scene.add(mesh2);
            }
         })
        })
        loader.load("img/mandible_3.obj", function(object){
        object.traverse( function (child) {
            if( child instanceof THREE.Mesh){
                geometry = new THREE.Geometry().fromBufferGeometry(child.geometry);
                 var mesh3 = new THREE.Mesh(geometry, child.material );
                 mesh3.name = 3;
                 mesh3.rotation.set(0.7,0.1,-1.46);
                 objects.push(mesh3);
                 groupe.add(mesh3);
                 scene.add(mesh3);
            }
         })
        })
        loader.load("img/mandible_4.obj", function(object){
        object.traverse( function (child) {
            if( child instanceof THREE.Mesh){
                geometry = new THREE.Geometry().fromBufferGeometry(child.geometry);
                 var mesh4 = new THREE.Mesh(geometry, child.material );
                 mesh4.name = 4;
                mesh4.rotation.set(0.7,0.1,-1.46);
                 objects.push(mesh4);
                 groupe.add(mesh4);
                 scene.add(mesh4);
            }
         })
        })
        loader.load("img/mandible_5.obj", function(object){
        object.traverse( function (child) {
            if( child instanceof THREE.Mesh){
                geometry = new THREE.Geometry().fromBufferGeometry(child.geometry);
                 var mesh5 = new THREE.Mesh(geometry, child.material );
                 mesh5.name = 5;
               mesh5.rotation.set(0.7,0.1,-1.46);
                 objects.push(mesh5);
                 groupe.add(mesh5);
                 scene.add(mesh5);
            }
         })
        })
        loader.load("img/mandible_6.obj", function(object){
        object.traverse( function (child) {
            if( child instanceof THREE.Mesh){
                geometry = new THREE.Geometry().fromBufferGeometry(child.geometry);
                 var mesh6 = new THREE.Mesh(geometry, child.material );
                 mesh6.name = 6;
                 mesh6.rotation.set(0.7,0.1,-1.46);
                 objects.push(mesh6);
                 groupe.add(mesh6);
                 scene.add(mesh6);
            }
         })
        })
        loader.load("img/mandible_7.obj", function(object){
        object.traverse( function (child) {
            if( child instanceof THREE.Mesh){
                geometry = new THREE.Geometry().fromBufferGeometry(child.geometry);
                 var mesh7 = new THREE.Mesh(geometry, child.material );
                 mesh7.name = 7;
                 mesh7.rotation.set(0.7,0.1,-1.46);
                 objects.push(mesh7);
                 groupe.add(mesh7);
                 scene.add(mesh7);
            }
         })
        })
        loader.load("img/mandible_8.obj", function(object){
        object.traverse( function (child) {
            if( child instanceof THREE.Mesh){
                geometry = new THREE.Geometry().fromBufferGeometry(child.geometry);
                 var mesh8 = new THREE.Mesh(geometry, child.material );
                 mesh8.name = 8;
                mesh8.rotation.set(0.7,0.1,-1.46);
                 objects.push(mesh8);
                 groupe.add(mesh8);
                 scene.add(mesh8);
            }
         })
        })
        loader.load("img/mandible_9.obj", function(object){
        object.traverse( function (child) {
            if( child instanceof THREE.Mesh){
                geometry = new THREE.Geometry().fromBufferGeometry(child.geometry);
                 var mesh9 = new THREE.Mesh(geometry, child.material );
                 mesh9.name = 9;
                mesh9.rotation.set(0.7,0.1,-1.46);
                 objects.push(mesh9);
                 groupe.add(mesh9);
                 scene.add(mesh9);
            }
         })
        })
        loader.load("img/mandible_10.obj", function(object){
        object.traverse( function (child) {
            if( child instanceof THREE.Mesh){
                geometry = new THREE.Geometry().fromBufferGeometry(child.geometry);
                 var mesh10 = new THREE.Mesh(geometry, child.material );
                 mesh10.name = 10;
                 mesh10.rotation.set(0.7,0.1,-1.46);
                 objects.push(mesh10);
                 groupe.add(mesh10);
                 scene.add(mesh10);
            }
         })
        })
        loader.load("img/mandible_11.obj", function(object){
        object.traverse( function (child) {
            if( child instanceof THREE.Mesh){
                geometry = new THREE.Geometry().fromBufferGeometry(child.geometry);
                 var mesh11 = new THREE.Mesh(geometry, child.material );
                 mesh11.name =11;
                 mesh11.rotation.set(0.7,0.1,-1.46);
                 objects.push(mesh11);
                 groupe.add(mesh11);
                 scene.add(mesh11);
            }
         })
        })
        loader.load("img/mandible_12.obj", function(object){
        object.traverse( function (child) {
            if( child instanceof THREE.Mesh){
                geometry = new THREE.Geometry().fromBufferGeometry(child.geometry);
                 var mesh12 = new THREE.Mesh(geometry, child.material );
                 mesh12.name = 12;
                 mesh12.rotation.set(0.7,0.1,-1.46);
                 objects.push(mesh12);
                 groupe.add(mesh12);
                 scene.add(mesh12);
            }
         })
        })
        loader.load("img/mandible_13.obj", function(object){
        object.traverse( function (child) {
            if( child instanceof THREE.Mesh){
                geometry = new THREE.Geometry().fromBufferGeometry(child.geometry);
                 var mesh13 = new THREE.Mesh(geometry, child.material );
                 mesh13.name = 13;
                 mesh13.rotation.set(0.7,0.1,-1.46);
                 objects.push(mesh13);
                 groupe.add(mesh13);
                 scene.add(mesh13);
            }
         })
        })
        loader.load("img/mandible_14.obj", function(object){
        object.traverse( function (child) {
            if( child instanceof THREE.Mesh){
                geometry = new THREE.Geometry().fromBufferGeometry(child.geometry);
                 var mesh14 = new THREE.Mesh(geometry, child.material );
                 mesh14.name = 14;
                 mesh14.rotation.set(0.7,0.1,-1.46);
                 objects.push(mesh14);
                 groupe.add(mesh14);
                 scene.add(mesh14);
            }
         })
        })
        loader.load("img/mandible_15.obj", function(object){
        object.traverse( function (child) {
            if( child instanceof THREE.Mesh){
                geometry = new THREE.Geometry().fromBufferGeometry(child.geometry);
                 var mesh15 = new THREE.Mesh(geometry, child.material );
                 mesh15.name = 15;
                 mesh15.rotation.set(0.7,0.1,-1.46);
                 objects.push(mesh15);
                 groupe.add(mesh15);
                 scene.add(mesh15);
            }
         })
        })
        loader.load("img/mandible_16.obj", function(object){
        object.traverse( function (child) {
            if( child instanceof THREE.Mesh){
                geometry = new THREE.Geometry().fromBufferGeometry(child.geometry);
                 var mesh16 = new THREE.Mesh(geometry, child.material );
                 mesh16.name = 16;
                 mesh16.rotation.set(0.7,0.1,-1.46);
                 objects.push(mesh16);
                 groupe.add(mesh16);
                 scene.add(mesh16);
            }
         })
        })
        loader.load("img/mandible_17.obj", function(object){
        object.traverse( function (child) {
            if( child instanceof THREE.Mesh){
                geometry = new THREE.Geometry().fromBufferGeometry(child.geometry);
                 var mesh1 = new THREE.Mesh(geometry, child.material );
                 mesh1.name = 17;
                mesh1.rotation.set(0.7,0.1,-1.46);
                 objects.push(mesh1);
                 groupe.add(mesh1);
                 scene.add(mesh1);
            }
         })
        })
         loader.load("img/mandible_18.obj", function(object){
        object.traverse( function (child) {
            if( child instanceof THREE.Mesh){
                geometry = new THREE.Geometry().fromBufferGeometry(child.geometry);
                 var mesh1 = new THREE.Mesh(geometry, child.material );
                 mesh1.name = 18;
                 mesh1.rotation.set(0.7,0.1,-1.46);
                 objects.push(mesh1);
                 groupe.add(mesh1);
                 scene.add(mesh1);
            }
         })
        })
         loader.load("img/mandible_19.obj", function(object){
        object.traverse( function (child) {
            if( child instanceof THREE.Mesh){
                geometry = new THREE.Geometry().fromBufferGeometry(child.geometry);
                 var mesh1 = new THREE.Mesh(geometry, child.material );
                 mesh1.name = 19;
                 mesh1.rotation.set(0.7,0.1,-1.46);
                 objects.push(mesh1);
                 groupe.add(mesh1);
                 scene.add(mesh1);
            }
         })
        })
         loader.load("img/mandible_20.obj", function(object){
        object.traverse( function (child) {
            if( child instanceof THREE.Mesh){
                geometry = new THREE.Geometry().fromBufferGeometry(child.geometry);
                 var mesh1 = new THREE.Mesh(geometry, child.material );
                 mesh1.name = 20;
                 mesh1.rotation.set(0.7,0.1,-1.46);
                 objects.push(mesh1);
                 groupe.add(mesh1);
                 scene.add(mesh1);
            }
         })
        })
         loader.load("img/mandible_21.obj", function(object){
        object.traverse( function (child) {
            if( child instanceof THREE.Mesh){
                geometry = new THREE.Geometry().fromBufferGeometry(child.geometry);
                 var mesh1 = new THREE.Mesh(geometry, child.material );
                 mesh1.name = 21;
                 mesh1.rotation.set(0.7,0.1,-1.46);
                 objects.push(mesh1);
                 groupe.add(mesh1);
                 scene.add(mesh1);
            }
         })
        })
        loader.load("img/mandible_22.obj", function(object){
        object.traverse( function (child) {
            if( child instanceof THREE.Mesh){
                geometry = new THREE.Geometry().fromBufferGeometry(child.geometry);
                 var mesh1 = new THREE.Mesh(geometry, child.material );
                 mesh1.name = 22;
                 mesh1.rotation.set(0.7,0.1,-1.46);
                 objects.push(mesh1);
                 groupe.add(mesh1);
                 scene.add(mesh1);
            }
         })
        })
        loader.load("img/mandible_23.obj", function(object){
        object.traverse( function (child) {
            if( child instanceof THREE.Mesh){
                geometry = new THREE.Geometry().fromBufferGeometry(child.geometry);
                 var mesh1 = new THREE.Mesh(geometry, child.material );
                 mesh1.name = 23;
                 mesh1.rotation.set(0.7,0.1,-1.46);
                 objects.push(mesh1);
                 groupe.add(mesh1);
                 scene.add(mesh1);
            }
         })
        })
        loader.load("img/mandible_24.obj", function(object){
        object.traverse( function (child) {
            if( child instanceof THREE.Mesh){
                geometry = new THREE.Geometry().fromBufferGeometry(child.geometry);
                 var mesh1 = new THREE.Mesh(geometry, child.material );
                 mesh1.name = 24;
                 mesh1.rotation.set(0.7,0.1,-1.46);
                 objects.push(mesh1);
                 groupe.add(mesh1);
                 scene.add(mesh1);
            }
         })
        })
        loader.load("img/mandible_25.obj", function(object){
        object.traverse( function (child) {
            if( child instanceof THREE.Mesh){
                geometry = new THREE.Geometry().fromBufferGeometry(child.geometry);
                 var mesh1 = new THREE.Mesh(geometry, child.material );
                 mesh1.name = 25;
                 mesh1.rotation.set(0.7,0.1,-1.46);
                 objects.push(mesh1);
                 groupe.add(mesh1);
                 scene.add(mesh1);
            }
         })
        })
         loader.load("img/mandible_26.obj", function(object){
        object.traverse( function (child) {
            if( child instanceof THREE.Mesh){
                geometry = new THREE.Geometry().fromBufferGeometry(child.geometry);
                 var mesh1 = new THREE.Mesh(geometry, child.material );
                 mesh1.name = 26;
                 mesh1.rotation.set(0.7,0.1,-1.46);
                 objects.push(mesh1);
                 groupe.add(mesh1);
                 scene.add(mesh1);
            }
         })
        })
}
/**
 * @description: Fonction qui permet de récupérer le début et la fin de la mandibule
 * @return max and min array
 */
function mandibuleMaxMin(){
   var array =[];
   var max = sessionStorage.getItem("max_of_array");
   var min = sessionStorage.getItem("min_of_array");
   array = [max,min];
   return array;
}