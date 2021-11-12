const database = require('../db/config')

module.exports = {
  async index(req, res){
  //Quando salvar os excluir o modal
    const db = await database()
  /* Quando eu for passar algo que pela minha url eu uso o req.params e o o que eu quero que apareça, quando eu não quiser que apareça e venha por outra rota eu uso o req.body */
    const roomId = req.params.room
    const questionId = req.params.question
    const action = req.params.action
    const password = req.body.password

    /* Verificando se a senha da sala estar certa */

    const verifyRoom = await db.get(`SELECT * FROM rooms WHERE id = ${roomId}`)

    if(verifyRoom.pass == password){
    
      if(action == 'delete'){
      await db.run(`DELETE FROM questions WHERE id = ${questionId}`)
    
    }else if(action == 'check'){
      await db.run(`UPDATE questions SET read = 1 WHERE id = ${questionId}`)
    } 
    res.redirect(`/room/${roomId}`)
    } else {
      res.render('error', {roomId : roomId})
    }
  },

  async create(req, res){
  //Quando eu salvar uma pergunta
    const db = await database()
    const roomId = req.params.room
    const question = req.body.question

    await db.run(`
    INSERT INTO questions(title, read, room)
    VALUES("${question}", 0, ${roomId})`)

    res.redirect(`/room/${roomId}`)
  }
  
}

