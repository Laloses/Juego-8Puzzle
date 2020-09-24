let cuadro = ["b0","b1","b2","b3","b4","b5","b6","b7","b8"];
var cuadroVacioId;
var flag;
var horaF;
var horaI;


var nom;
var nac;
var email;

function recarga(){
    history.back();
    location.reload(true);
}
function iniciarJuego(){
    if(flag==undefined){
        let hora = new Date();
        hora=hora.toLocaleString();
        {
        var iframe = document.getElementById('if'+1);
        var iframedoc = iframe.document; 

                 if (iframe.contentDocument)        //paso 2: se obtiene el documento asociado con la etiqueta iframe
                 iframedoc = iframe.contentDocument;// la mayoría de los navegadores soportan "document", algunos
                 else                               // "contentDocumet" y otros "contentWindow.document"
                 if (iframe.contentWindow)
                 iframedoc = iframe.contentWindow.document;
        //paso 3: se asigna el contenido correspondiente
                if (iframedoc){
                 iframedoc.open();
                iframedoc.writeln("Hora inicial: "+hora.substring(10,hora.length)+'<br>');
                iframedoc.close();
                 }
                else{
                    document.write("No es posible insertar el contenido dinámicamente en el iframe");
                 alert('No es posible insertar el contenido dinámicamente en el iframe.');
                 }
            } //Escribir en el iframe
        flag=false;
    }
}

function finalizarJuego(){
    horaF=new Date();
    horaF=horaF.toLocaleString();
    var bandera;
    var btn=[];
    
    for(var i=0; i<9; i++) btn[i]= document.getElementById(cuadro[i]);
    var i=1;
    while(i<9){
        if(btn[i-1].firstChild.data != i){
            bandera=false;
            break;
        }else bandera=true;
        i++;
    }
    
    if(bandera){
        alert('Felicidades! lo has logrado!');
        abrirPagina("acabado.php");
        
        var iframe = document.getElementById('if'+2);
        var iframedoc = iframe.document; 

                 if (iframe.contentDocument)        //paso 2: se obtiene el documento asociado con la etiqueta iframe
                 iframedoc = iframe.contentDocument;// la mayoría de los navegadores soportan "document", algunos
                 else                               // "contentDocumet" y otros "contentWindow.document"
                 if (iframe.contentWindow)
                 iframedoc = iframe.contentWindow.document;
        //paso 3: se asigna el contenido correspondiente
                if (iframedoc){
                 iframedoc.open();
                iframedoc.writeln('Hora inicial: '+horaI.substring(10,horaI.length)+
                                 '<br/>Hora final: '+horaF.substring(10,horaF.length));
                iframedoc.close();
                 }
                else{
                    document.write("No es posible insertar el contenido dinámicamente en el iframe");
                 alert('No es posible insertar el contenido dinámicamente en el iframe.');
                 }
    } //Escribir en el iframe
    else alert('No se ha completado correctamente el juego.');
}

function ordenar(){
    var val;
    for(var i=0; i<cuadro.length-1; i++){
        val=i.toString();
        document.getElementById(cuadro[i]).firstChild.data=val;
    }
    document.getElementById(cuadro.length).firstChild.data=" ";
}

function buscarCuadro(val){
    for (i = 0; i < cuadro.length; i++) { 
            if(document.getElementById(cuadro[i]).firstChild.data == val){
                return(cuadro[i]);
            }
        }
}

function selecCV(id){ //Buscamos el cuadro vacio
    var selecto= document.getElementById(id);
    for (i = 0; i < cuadro.length; i++) { 
            if(document.getElementById(cuadro[i]).firstChild.data ==" "){ //Encontrado
                if(document.getElementById(cuadro[i]) == selecto){//Coindide con el que se hizo click?
                return(cuadro[i]);
                } //Entonces es uno no vacio
                else alert("Seleccione primero el cuadro vacio para mover.");
            }
        }
}

function seleccion2(id){
    if(cuadroVacioId!=undefined){ //es undefined cuando no ha sido encontrado
        var btn = document.getElementById(id);
        if(vMover(id, cuadroVacioId) == false) return;//Si el elemento cliqueado no esta cerca del cuadro vacio, no hacer nada
        document.getElementById(cuadroVacioId).firstChild.data = btn.firstChild.data;
        btn.firstChild.data = " "
        cuadroVacioId=undefined; //Volvemos  dejarlo indefinido después del hacer el cambio;
    }else cuadroVacioId=selecCV(id);
}


function vMover(id, cuadroVacioId){//Verifica si se puede mover o no
    let cerca = [];
    if([2,5,8].includes(parseInt(cuadroVacioId[1]))){ //Si el cuadro vacio esta en la columna derecha de la matriz
        cerca = [+3,-3,-1]; //Se compara arriba, abajo y a la izquierda
    }else if([0,3,6].includes(parseInt(cuadroVacioId[1]))){//Si el cuadroVacio esta en la columna izquierda
        cerca = [+3,-3,+1]; //Se comparar arriba, abajo y a la derecha
    }else{ //Entonces esta en medio
        cerca = [+3,+1,-3,-1]; //se compara en todas las direcciones
    }
    for(i = 0; i < cuadro.length; i++){ //Si el cuadro vacio está cerca del id que se quiere vMover
        //En el if se compara si coinciden las posiciones con el id
        if(parseInt(cuadroVacioId[1])+parseInt(cerca[i]) == parseInt(id[1])){
            return(true);
        }
    }
    return(false); //solo si no esa cerca
}

function solucion(rndList){ //Metodo que elimina ceros y cuenta cuantos numeros quedan
    var count = 0;
    for(i=0;i<rndList.length-1;i++){
        if(rndList[i] == 0){
            continue;
        }
        for(j=i+1;j<rndList.length;j++){
            if(rndList[j] == 0){
                continue;
            }else if(rndList[i]>rndList[j]){
                count++;
            }
        }
        
    }
    
    if(count%2 == 0){//Tiene que salir count=8 
        return(true);
    }else{
        return(false);
    }
}

function revolver(){
    horaI=new Date();
    horaI=horaI.toLocaleString();
    var rndList = [];
    while(true){
        rndList = [];
        while(rndList.length < 9){//Con cada cliclo va crecienco el lenght
            var randomnumber = Math.ceil(Math.random()*9)-1;
            if(rndList.indexOf(randomnumber) > -1) continue;
            rndList[rndList.length] = randomnumber;//lenght crece cada ciclo
        }
        if(solucion(rndList)){ //Coprueba que los 9 numeros sean correctos
            break;
        }
    }
    for (i = 0; i < cuadro.length; i++){//Asignamos los valores a los cuadros
        if(rndList[i] == 8){ 
            val = " "
        }else{
            val = rndList[i].toString();
        }
        document.getElementById(cuadro[i]).firstChild.data = val;
    }
}

function abrirPagina(pagina){
    if(window.confirm('¿Esta siendo redirigido para guardar su partida, desea ir?')){
        window.open(pagina,"Registro","width=500px, height=500px");
    }
}

function verificarEntrada(){
    if(document.getElementById('nombre').value!='') nom=document.getElementById("nombre").value;
    if(document.getElementById('fechaN').value!='') nac=document.getElementById("fechaN").value;
    if(document.getElementById('passwd').value!='') email=document.getElementById("mail").value;
}

function cerrar(){
    var flag=false;
    var count=document.getElementsByTagName("input").length-2;
    //alert("los inputs son: "+count);
    var conf= document.getElementsByTagName("input");
    //alert("Valor: "+conf[3].getAttribute("value"));
    while(count>-1){
        if(conf[count].value == '') flag=false;
        else flag=true;
        count--;
    }
    if(flag){
        alert("Todo correcto, cerrará la pagina"); close();
    }else alert("Faltan datos de ingresar.");
}