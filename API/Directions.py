#Importacion de librerías
from flask import Flask,jsonify,request
from flask_cors import CORS, cross_origin
import BackEnd.Functions as CallMethod
import BackEnd.GlobalInfo.ResponseMessages as ResponseMessage

#Instancia
app=Flask(__name__)
CORS(app)

#Definición de rutas

@app.route('/auth', methods=['GET','POST'])
@cross_origin(allow_headers=['Content-Type'])
def authPost():
    try:
        user=request.json['user']
        password=request.json['password']
        print(user,password)
        objResult=CallMethod.fnAuthPost(user,password)
        return objResult
    except Exception as e:
        print("Error en auth",e)
        return jsonify(ResponseMessage.err500)
    
@app.route('/getUser/<id>', methods=['GET'])
@cross_origin(allow_headers=['Content-Type'])
def getUser(id):
    try:
        objResult=CallMethod.fnGetUser(id)
        return objResult
    except Exception as e:
        print("Error en getUser",e)
        return jsonify(ResponseMessage.err500)

@app.route('/getUserByRole/<role>', methods=['GET'])
@cross_origin(allow_headers=['Content-Type'])
def getUserByRole(role):
    try:
        objResult=CallMethod.fnGetUserByRole(role)
        return objResult
    except Exception as e:
        print("Error en getUserByRole",e)
        return jsonify(ResponseMessage.err500)

app.after_request
def after_request(response):
  response.headers.add('Access-Control-Allow-Origin', 'http://localhost:4200')
  response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
  response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  response.headers.add('Access-Control-Allow-Credentials', 'true')
  return response

if __name__=='__main__':
    app.run(host="0.0.0.0", port=5000, debug=True, threaded=True)