
var html5rocks = {};
html5rocks.webdb = {};
html5rocks.webdb.db = null;

var cant_s=-1; // cantidad total de suscriptores
var index=-1; // posicion del array que se envia
var suscriptores=""; // array con las id para enviar

html5rocks.webdb.open = function() {
	var dbSize = 5 * 1024 * 1024; // 5MB
	html5rocks.webdb.db = openDatabase("chrysler", "1.0", "Todo manager", dbSize);
}

cargarListaUsuarios = function(pag) {
	
	$("#progress_bar").html("0/0");
	
	var db = html5rocks.webdb.db;
	db.transaction(function(tx) {
		tx.executeSql("SELECT * FROM usuarios where enviado=0", [],
		function (tx,rs){
			
			if(rs.rows.length > 0){
				cant_s=rs.rows.length;
				$("#progress_bar").html("0/"+ cant_s);
			}else{
				$("#progress_bar").html("0/0");
			}
			
			
			for(var j=0 ; j<cant_s ; j++){
				if(j==0){
					suscriptores+=rs.rows.item(j).id;
				}else{
					suscriptores+=","+rs.rows.item(j).id;
				}
			}			
		},
		html5rocks.webdb.onError
			
		);
	});
}

actualiza_s = function(s) {
	var db = html5rocks.webdb.db;
	db.transaction(function(tx) {
		tx.executeSql("update usuarios set enviado='1' where id=?",[s] ); // ERROR NO ACTUALIZA, 
	});
}

function enviar_ficha(p){
	var array_suscriptores=suscriptores.split(",");
	var id=array_suscriptores[p]
	//alert(id);
	
	if (id == ""){
		return;
	}
	var f_nombre,f_email,f_autos,f_telefono, f_dni, f_fecha;
	
	 var db = html5rocks.webdb.db;
	 db.transaction(function(tx){
		//tx.executeSql("select * from usuarios where id=?",[id_envio],
		tx.executeSql("select * from usuarios where id=?",[id],
		
		function(tx, rs){
			
			//for(var i=0 ; i<cant_s ; i++){
				
				f_nombre=rs.rows.item(0).nombre;
				f_dni=rs.rows.item(0).dni;
				f_email=rs.rows.item(0).email;
				f_telefono=rs.rows.item(0).telefono;
				f_autos=rs.rows.item(0).autos;
				f_fecha=rs.rows.item(0).fecha;
				
				//alert(f_nombre);
				//alert(f_telefono);
				//return;
				
				$.ajax({
					async:	true,
					url:	"http://www.chrarg.com.ar/envia_fichas/enviar_fichas.asp",
					dataType:"jsonp",
					
					data:"nombre="+f_nombre+"&email="+f_email+"&autos="+f_autos+"&dni="+f_dni+"&telefono="+f_telefono+"&fecha="+f_fecha, //la variable callback, va automatico
					success: function(resp){
						
						 //var json = resp;
						 //alert(id);
						 
						 if (resp.informe=="OK"){
							//alert("actualizar base");
							actualiza_progress(cant_s, (index+1)) // actualiza la barra de progreso
							actualiza_s (id); // actualiza la base del explorador
							index+=1; // posicion del vector del proximo que se enviara
							if(index < cant_s){
								enviar_ficha(index); // funcion de enviar mail, con la posicion del vector que se enviara
							}
							
						 }else{
							 alert('Error: Por favor Verifique su coneccion de internet\nO intenten mas tarde.');
						 }
						 
					},
					error:function(data){
						 alert('Error: Por favor Verifique su coneccion de internet\nO intenten mas tarde.');
					}
				});	 // end ajax
			
			//} // end for
	
		}
		,
		function(tx, e){
			alert(e.message);
		});
	 });
	
}

function comenzar(){
	//alert(cant_s);
	if(cant_s == -1){
		alert("No hay Suscriptores Nuevos para enviar e-Mails");
		return;
	}
	if(index >= cant_s){
		alert("El envio ha Finalizado.");
	}else{
		index+=1;
		enviar_ficha(index)
	}
}
function actualiza_progress(total, actual){
	
	porc=((actual*100)/total)
	$("#progress_bar").css("width",porc+"%");
	
	if(actual>= total){
		$("#progress_bar").html(actual+"/"+ total + " (FINALIZADO)");
		alert("El envio de e-Mail ha Finalizado");
	}else{
		$("#progress_bar").html(actual+"/"+ total);
	}
	
}

html5rocks.webdb.open();
cargarListaUsuarios();