
					
		function guardarContacto() {
				
			//var autos="Compass"
			var autos=document.getElementById("autos").value;
			
			var nombre = document.getElementById("nombre").value;
			var email = document.getElementById("email").value;
			var dni=document.getElementById("dni").value;
			var telefono=document.getElementById("telefono").value;
			
			if (nombre==""){
				alert("Por favor, Ingrese su nombre.");
				document.getElementById("nombre").focus();
				return;
			}
			if (dni==""){
				alert("Por favor, su Nro DNI.");
				document.getElementById("dni").focus();
				return;
			}
			if (email==""){
				alert("Por favor, Ingrese su E-Mail.");
				document.getElementById("email").focus();
				return;
			}
			if (telefono==""){
				alert("Por favor, Ingrese su Nro. de Telefono.");
				document.getElementById("telefono").focus();
				return;
			}
			
			var enviado="0";
			var d = new Date();
			var fecha = d.getFullYear()+"/"+(d.getMonth()+1)+"/"+d.getDate();
			
			
			var db = html5rocks.webdb.db;
			db.transaction(function(tx){
				tx.executeSql("INSERT INTO usuarios (nombre, dni, email, telefono, autos, fecha, enviado) VALUES (?,?,?,?,?,?,?)" ,[nombre, dni, email, telefono, autos,fecha,enviado],
				function(){
					//alert("Datos guardados");
					document.location="gracias.html";
				},
				function(){
					alert("ERROR");
				}
				);
		   });
		   
		}
		
		var html5rocks = {};
		html5rocks.webdb = {};
		html5rocks.webdb.db = null;
		
		html5rocks.webdb.open = function() {
		  var dbSize = 5 * 1024 * 1024; // 5MB
		  html5rocks.webdb.db = openDatabase("chrysler", "1.0", "Todo manager", dbSize);
		}
		
		html5rocks.webdb.createTable = function() {
		  var db = html5rocks.webdb.db;
		  db.transaction(function(tx) {
			  //tx.executeSql("drop table usuarios", []); // borra la tabla
			  
				tx.executeSql("CREATE TABLE IF NOT EXISTS usuarios(id INTEGER PRIMARY KEY ASC, nombre TEXT, email TEXTg, fecha DATETIME, enviado TEXT, autos TEXT,dni TEXT, telefono TEXT)", [] );
		  });
		}
		
		
		html5rocks.webdb.open();
		html5rocks.webdb.createTable();
