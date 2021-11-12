const Database = require('../db/config')

module.exports = {
  async create(req, res) {
    const db = await Database()
    const pass = req.body.password
    let roomId 
    let isRoom = true
    while(isRoom){
    
    /*Gerando número da sala*/

      for(let i = 0; i < 6; i++) {      
        i == 0 ? roomId = Math.floor(Math.random() * 10).toString() : roomId += Math.floor(Math.random() * 10).toString()
    }  
    /* Verificando se esse número já existe*/

      const verifiedRoom = await db.all('SELECT id FROM rooms')
      isRoom = verifiedRoom.some(verifiedRoom => verifiedRoom === roomId)

      if(! isRoom){
        await db.run(`
        INSERT INTO rooms(id, pass) 
      
        VALUES (${parseInt(roomId)}, ${pass})`) 
    }
    }
    await db.close()

    res.redirect(`/room/${roomId}`)
  },
  
  async open(req, res){
    const db = await Database()
    const roomId = req.params.room 

    /*Configurei a minha sala para trabalhar somente com as perguntas que forem de acordo com o id dela. Nessa sala só apareceram as perguntas da própria*/
    const questions = await db.all(`SELECT * FROM questions WHERE room = ${roomId} and read = 0`)
    const questionsRead = await db.all(`SELECT * FROM questions WHERE room = ${roomId} and read = 1`)
    let isNoQuestions

    if (questions.length == 0) {
      if(questionsRead == 0){
        isNoQuestions = true
      }
    }

    /* Sempre que eu quiser importar um arquivo direto para o ejs feito no back-end, eu coloco no render entre {} o nome da variável e o valor dela*/
    res.render('room', {roomId: roomId, questions: questions, questionsRead: questionsRead, isNoQuestions: isNoQuestions})
  },

  enter(req, res){
    const roomId = req.body.roomid

    res.redirect(`/room/${roomId}`)
  }
  
}