const { db } = require("../cnn")  

//consultas
const getNotas = async (req, res) => {
    const consulta = "SELECT * FROM notas;"
    const response = await db.query(consulta)
    res.status(200).json(response)
    
}

const getNotasNombres = async (req, res) => {
    const consulta = "Select * from vw_notas_nombre_apellidos ORDER BY concat;"
    const response = await db.query(consulta)
    res.status(200).json(response)

}

const getNotasByID = async (req,res) =>{
    const consulta = "Select * from notas where not_id = $1;"
    try {
        const ID = req.params.ID
        const response = await db.one(consulta,[ID])
        res.status(200).json({
            response
        })
    } catch (e) {
        res.status(400).json({
            code: e.code,
            message: "No se ha encontrado un registro de notas con este ID ("
                + req.params.ID + ")."
        })
    }

}

const postNotas = async (req,res) =>{
    const consulta = "INSERT INTO public.notas("+
       " not_proyectos, not_deberes, not_examenes, not_est_cedula)"+
        "VALUES ($1, $2, $3, $4);"
    try {
      const notas = req.body;
      const response = await db.one(consulta, [
        notas.proyectos,        
        notas.deberes,        
        notas.examenes,
        notas.cedula
      ]);
      res.status(201).json({
        message: "Notas ingresado correctamente",
        body: response,
      });
    } catch (e) {
        res.status(400).json({
            code: e.code,
            message: e.message
        })
    }    
}   

const putNotas = async (req,res) => {
    const consulta = "UPDATE notas SET not_proyectos = $2, not_deberes = $3, not_examenes = $4,"+ 
	    "not_est_cedula = $5 where not_id = $1 RETURNING *;"
    try {
      const notas = req.body;
      const response = await db.one(consulta, [
        notas.id,
        notas.proyectos,
        notas.deberes,
        notas.examenes,
        notas.cedula,
      ]);
      res.status(200).json({
        message: "Notas actualizadas correctamente",
        body: response,
      });
    } catch (e) {
        res.status(400).json({
            code: e.code,
            message: e.message
        })
    }
}

const deleteNotas = async (req,res) =>{
    
    const consulta = "DELETE from notas WHERE not_id = $1; ;"
    try {
        const ID = req.params.ID
        const response = await db.query(consulta,[ID])
        res.status(200).json({
            message: "El estudiante con ID " + ID + " se ha eliminado "+
                "correctamente."
        })
    } catch (e) {
        res.status(400).json({
            code: e.code,
            message: "No se ha encontrado un estudiante con esta ID ("
                + req.params.cedula + ")."
        })
    }
}





module.exports = {
    getNotas,getNotasNombres, getNotasByID, postNotas, putNotas, deleteNotas
}