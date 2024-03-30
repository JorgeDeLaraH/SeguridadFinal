from bson import ObjectId,json_util as j
from flask import jsonify
from pymongo import MongoClient
import BackEnd.GlobalInfo.ResponseMessages as ResponseMessage
import BackEnd.GlobalInfo.Keys as ColabsKey

#Conexion a la base de datos
if ColabsKey.dbconn==None:
    mongoConnect=MongoClient(ColabsKey.strConnection)
    ColabsKey.dbconn=mongoConnect[ColabsKey.strDBConnection]
    dbUsers=ColabsKey.dbconn["clUsers"]
#Esta funcion trae todos los datos de clColabs formateados
#Funcion de post clientes
def fnAuthPost(user,password):
    try:
        print("Comprobacion de credenciales")
        objQuery=dbUsers.find_one({"UserName":user,"password":password})
        id=str(objQuery.get('_id'))
        if(user==objQuery.get('UserName') and password==objQuery.get('password')):
            objResponse=ResponseMessage.succ200.copy()
            objResponse['Prueba']=id
            objResponse['Estatus_Acreditado']=True
            return jsonify(objResponse)
    except Exception as e:
        objResponse=ResponseMessage.err500
        objResponse["Estatus_Acreditado"]=False
        return jsonify(objResponse,e)
    
def fnPostNewUser(user,password,curp,rol,fullname):
    try:
        print("Insercion de datos")
        dbUsers.insert_one({"UserName":user,"fullName":fullname,"password":password,"Curp":curp,"Role":rol})        
        objResponse=ResponseMessage.succ200.copy()
        objResponse['Estatus_Guardado']=True
        return jsonify(objResponse)
    except Exception as e:
        objResponse=ResponseMessage.err500
        objResponse["Estatus_Guardado"]=False
        return jsonify(objResponse,e)
    
def fnGetUser(id):
    try:
        print("Comprobacion de credenciales")
        objQuery=dbUsers.find_one({"_id":ObjectId(id)})
        nombre=objQuery.get('fullName')
        Role=objQuery.get('Role')
        curp=objQuery.get('Curp')
        user=objQuery.get('UserName')
        objResponse=ResponseMessage.succ200.copy()
        objResponse['Nombre']=nombre
        objResponse['Curp']=curp
        objResponse['Rol']=Role
        objResponse['user']=user
        objResponse['Estatus_Acreditado']=True
        print(objResponse)
        return jsonify(objResponse)
    except Exception as e:
        objResponse=ResponseMessage.err500
        objResponse["Estatus_Acreditado"]=False
        return jsonify(objResponse,e)
    
def fnGetUserByRole(role):
    try:
        arrFinalColab=[]
        objQuery=dbUsers.find({"Role": role})
        listColabs=list(objQuery)
        if len(listColabs)!=0:
            for objColab in listColabs:
                print(objColab)
                objFormateado={
                    "_id":str(objColab['_id']),
                    "fullName":objColab["fullName"],
                    "Role":objColab['Role'],
                    "Curp":objColab['Curp']
                }
                arrFinalColab.append(objFormateado)
        objResponse=ResponseMessage.succ200.copy()
        objResponse['Respuesta']=arrFinalColab
        return jsonify(objResponse)
    except Exception as e:
        print("Error en fngetcolabs",e)
        return jsonify(ResponseMessage.err500)