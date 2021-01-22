const Discord = require('discord.js');
const client = new Discord.Client();

const genies = ['1.jpg','2.png','3.png','4.jpg','5.jpg','6.jpg','7.jpg','8.jpg','9.png','10.png','11.jpg','12.jpg','13.png','14.png','15.jpg','16.jpg','17.jpg','18.jpg'];
const users = {};

const token = process.env.BOT_TOKEN; //set to: process.env.BOT_TOKEN for Heroku deployment, set to: config.LOCAL_TOKEN for local testing

client.on('ready', () => {
    console.log('Genie up!');
});

client.on('message', message => { //this event is fired, whenever the bot sees a new message
    try {
        if(message.content.toLowerCase().includes('i wish')) {
            let text = 'whoops! blame the programmer, cuz something is wrong.'
            if(message.content.toLowerCase().includes('wishes')) {
                const id = message.author.id;
                if(id in users && users[id] > 0) {
                    users[id] += 3;
                    text = 'consider yourself lucky. you have been granted 3 additional wishes for a total of ' + users[message.author.id] + '.';
                } else {
                    users[id] = 3;
                    text = 'of course dear. you have been granted 3 wishes.';
                }
            } else {
                if(message.author.id in users) {
                    if(users[message.author.id] == 0) {
                        text = 'you do not have enough wishes, my friend.';
                    } else {
                        users[message.author.id] -= 1;
                        text = 'your wish has been granted!';
                    }
                } else {
                    users[message.author.id] = 0;
                    text = 'your wish has been granted!';
                }
            }
            message.reply(text,{files: ['./assets/' + genies[Math.floor(Math.random() * genies.length)]]});
        }
    } catch(err) {
        console.log(err.message);
    }
    
});

process.on('unhandledRejection', error => {
	console.error('Unhandled promise rejection:', error);
});

// THIS  MUST  BE  THIS  WAY
client.login(token); // BOT_TOKEN is the Client Secret