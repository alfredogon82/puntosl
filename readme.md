Se realizo la creación de los servicios de acuerdo al pdf con el enunciado de la prueba. se trabajo la autenticación con jwt, la base de datos en mysql (no me vino en el correo ningún archivo de base de datos ni el otro que dice en el enunciado, solo el pdf, por lo tanto lo cree con la estructura indicada en el archivo).


/login:
para el acceso del usuario retorna un token, el cual debe ser utilizado para consumir los otros servicios, un usuario de prueba alfredogon82@yahoo.com contraseña: 1q2w3e4r5T

/register:
para el registro de usuario, valida que no hayan usuarios duplicados por el correo y el user_id es el md5 del correo la autenticación del password está en md5  (solo para propósitos de esta prueba, en la vida real se utiliza otro tipo de autenticación) valida que el correo tenga un formato de correo real con una pequeña función por medio de una expresión regular y que todos los campos existan, no aceptan campos vacios.

/getTransactionHistory
trae el listado de transacciones asociadas al usuario desencriptando el correo en el token, y buscandolas según el user_id al encriptarlo con md5.

/getPoints
trae la sumatoria de los puntos de un usuario en especifico de acuerdo a sus transacciones, lo hice con el SUM de mysql aunque pude haberlo hecho con puro javascript tambien.

/exportTransactionsToExcel
exporta las transacciones asociadas a un usuario utilizando node-excel-export si se quieren exportar TODAS las transacciones solo basta con modificar la consulta para que no tenga filtro.

/createTransaction
crea una transacción con el usuario asociado al token. 

/inactivateTransaction
cambia el campo status a 1 o 0 según sea el caso que se envíe. se puede utilizar para desactivar o activar dependiendo del valor que se le envie a pesar de que el nombre sugiere que es solo para desactivar.

Incluyo una colección de postman con el template para consumir cada uno y un archivo .sql. Los parámetros de configuración se encuentran en el archivo controllers/apiController.js y la llave en config/config.js

Cualquier duda / sugerencia estoy a la orden, gracias por la oportunidad.

Alfredo González
alfredogon82@yahoo.com








