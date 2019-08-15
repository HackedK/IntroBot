const commando = require('discord.js-commando');
const bot = new commando.Client();

bot.registry.registerGroup('voice', 'Voice');
//registers a group of default commands such as 'help'
bot.registry.registerDefaults();
// register the folder where commands files are stored
bot.registry.registerCommandsIn(__dirname + "/commands");

bot.on('voiceStateUpdate', (oldMember, newMember) => {
    let newUserChannel = newMember.voiceChannel;
    let oldUserChannel = oldMember.voiceChannel;

    if (oldUserChannel === undefined && newUserChannel !== undefined) {
        //user joins a voice channel
        console.log(newMember.user.username + " joined");
        // only care about incoming user
        newUserChannel
            .join()
            .then(connection => {
                let file = './musicFiles/' + newMember.user.username + '.mp3';
                const dispatcher = connection.playFile(file);
            })
            .catch(err => console.log(err));
    } else if (newUserChannel === undefined) {
        //user leaves a voice channel
        console.log(oldMember.user.username + " leaves the channel");
    };
});

bot.login('NjA4MzY3MzIwMTM3NDY1ODc2.XUsaCQ.LmgbENESUFYR1W8wDg7Z7QKxw3g');


// var isReady = true;
// bot.on('message', message => {
//   if (isReady && message.content === 'Gotcha Bitch')
//   {
//   isReady = false;
//   var voiceChannel = message.member.voiceChannel;
//   voiceChannel.join().then(connection =>
//   {
//      let file = './musicFiles/testFile.mp3';
//      const dispatcher = connection.playFile(file);
//      dispatcher.on("end", end => {
//        voiceChannel.leave();
//         });
//    }).catch(err => console.log(err));
//    isReady = true;
//   }
// });