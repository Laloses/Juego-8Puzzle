<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8"/>
		<title>Registro 8Puzzle</title>
        <script type="text/javascript" src="puzzle.js">
            function registro(){
                nac=<?php echo $fechaI ?>;
                document.write('<p id="parrafo">'+<?php echo $nombreU ?>+' has concluido el juego !<br>Te enviaremos tus datos de participacion a'+<?php echo $email ?>+' pero de todas formas aqui las tienes:<br>Fecha de inscripcion: '+nac.toLocaleString()+'</p>');
            }
        </script>
        <link href="puzzle.css" rel="stylesheet" type="text/css">
	</head>
    <?php
        use PHPMailer\PHPMailer\PHPMailer;
        use PHPMailer\PHPMailer\Exception;
        require 'C:\wamp64\composer\vendor\autoload.php';
        $seEnvioDatos=$exito=false;
    
        if(isset($_POST['nombre'])){
            $nombreU=$_POST['nombre'];
        }
        
        if(!empty($nombreU)){
            $link = new mysqli("localhost", "root", "", "8puzzle");	
			# comprobar la conexión 
			if($link->connect_error){
			    echo "Falló la conexión ".$link->connect_error."<br/>";
			}
        
            //Verificamos que no este repetido el nombre
            $result0 = $link->query("SELECT nombreUsuario FROM datos_usuario");
            while($row0 = $result0->fetch_array(MYSQLI_ASSOC)){
                if($nombreU==$row0['nombreUsuario']){
                    $bandera=true;
                    break;
                }else $bandera=false;
            }
            $result0->free();
        
            if(@ $bandera){ //si está repetido
                echo "<script>
                    alert('El nombre de usuario que ingresó ya está ocupado. No se puede ingresar.');
                    history.back();
                    </script>";
                $link->close();
            }else{ //Si no está repetido entonces lo insertamos
                $nombreU= $_POST['nombre'];
                $email= $_POST['mail'];
                $fechaI= $_POST['fechaN'];
                
                $insertarDatos="INSERT INTO datos_usuario (nombreUsuario, email, fechaInscripcion) VALUES ('$nombreU','$email','$fechaI')";
                
                if($link->query($insertarDatos)){
                    $seEnvioDatos=true;
                    
                    $result=$link->query("SELECT MAX(id_cliente) id_cliente FROM datos_usuario WHERE nombreUsuario='$nombreU'");
                    $row=mysqli_fetch_array($result);
                    $id_cliente=$row[0];

                }else {
                    $seEnvioDatos=false;
                    die ($link->error);
                }
                
                try{
                    $mail = new PHPMailer(true);
                    
                    $mail->SMTPDebug = 0;                                 // Enable verbose debug output 0 off, 1 client, 2 client and server
                    $mail->isSMTP();                                      // Set mailer to use SMTP
                    $mail->Host = 'smtp.sendgrid.net';  // Specify main and backup SMTP servers
                    $mail->SMTPAuth = true;                               // Enable SMTP authentication
                    $mail->Username = 'apikey';                 // SMTP username
                    $mail->Password = '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';                           // SMTP password
                    $mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
                    $mail->Port = 587;                           // TCP port to connect to

                    //Recipients
                    $mail->setFrom('lalosesgmes@gmail.com', '8Puzzle Online');
                    $mail->addAddress($email,"".$nombreU."");               // Name is optional

                    //Content
                    $mail->isHTML(true);                                  // Set email format to HTML
                    $mail->Subject = 'Confirmacion de registro en 8Puzzle';
                    $mail->Body = " <ul>
                                    <li><em>Nombre de Usuario: </em> $nombreU </li>
                                    <li><em>Fecha de Inscricion</em> $fechaI</li>
                                </ul>
                                <p> Has completado correctamente el juego, felicidades!";
                    $mail->AltBody ="Nombre de Usuario: $nombreU
                                    Has completado correctamente el juego, felicidades!";
                    $mail->CharSet='UTF-8';
                    
                    $exito= $mail->send();
                }
                catch (Exception $e) {
                    echo 'No se pudo enviar correo. Error: '.$mail->ErrorInfo;  
                }
                
                if($seEnvioDatos && $exito){
                    echo'<script>
                        alert("Datos guardados correctamente.");
                        registro();
                        window.close();
                         </script>';
                }
                else{
                    echo "<script> alert('Hubo un inconveniente al guardar los datos. Contacta a un administrador.'); </script>";
                }
                $link->close();
                
                echo "<script> close(); </script>";
            }
        }
    ?>
	<body>
    <center>
        <h1>¡Felicidades has acabado el juego!</h1>
        <h4>Registrate si quieres mantener tu puntaje.</h4>
        <div id="formulario">
        <h1>Registro</h1>
            <form id="formulario" method="post" action="acabado.php">
                <input class="formu" type="text" id="nombre" name="nombre" required placeholder="Nombre de usuario">
                <br>
                <input class="formu" type="date" id="fechaN" name="fechaN" required>
                <br>
                <input class="formu" type="email" id="mail" name="mail" required placeholder="ejemplo@correo.com"><br>
                <input class="formu" type="submit" id="Confirmar" value="Confirmar" onclick="return verificarEntrada()">
            </form>
        </div>
        <script> registro();</script>
    </center>
	</body>
</html>