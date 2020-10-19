exports = module.exports = function(io) {
  io.on('connection', socket => {
    console.log('sagachimono sadachi');

    socket.on('join', ({friend}, callback) => {
      console.log(friend);
    })

    socket.on('disconnect', () => {
      console.log('Tiltaste?')
    })
  })
}
