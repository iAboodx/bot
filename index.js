const Discord = require('discord.js');
const { Client, Intents, MessageEmbed } = require("discord.js");
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.GUILD_MESSAGES] });
module.exports = client;

client.login('')

const express = require('express')
const Topgg = require('@top-gg/sdk')
const fetch = require('node-fetch')
const app = express()

const webhook = new Topgg.Webhook('topggauth123')

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});


app.post('/vote', webhook.listener(vote => {
    console.log("User with id - " + vote.user + " Voted!")
    client.users.fetch(vote.user).then(async user => {
        console.log(`Found ${user.tag}.`);
        let guildid = client.guilds.cache.get('947244928285687908')
        let role = guildid.roles.cache.get("947244928340197444")
        console.log(role.name + " is the role")
        if (!role) return console.log("role not found")
        // let member = guildid.members.fetch(user.id).then(member => {
        //     member.roles.add(role).catch(e => { console.log('Something went wrong, i cant add roles') })
        // })
        let member = await guildid.members.fetch(user.id).catch(e => { console.log('Something went wrong, i cant add roles') })
        if (!member) {
            console.log("member not found")
            let value = JSON.stringify({
                embeds: [
                    {
                        title: "Thanks for voting for Sguard",
                        description: `**${user.tag}** | (${vote.user}) Just Voted For \`Sguard\``,
                        thumbnail: {
                            url: "https://media.discordapp.net/attachments/956609223465242786/963544876694274069/sguardshadow.png"
                        },
                        footer: {
                            text: "Thanks for the support!"
                        },
                        color: "4963525",
                        timestamp: new Date(),
    
                    }
                ]
            })
            fetch("https://discord.com/api/webhooks/959899139322282034/i3EYORP4-GIusRpSRgxvT3pmn18u2_op2TnCxDJsgjvW_R8DlywrXXBCjoX1OOcwk49k", {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: value
            }).catch(e => console.log('Error occured while posting webhook : ' + e))

        } else {
            let value = JSON.stringify({
                content:`${member}`,
                embeds: [
                    {
                        title: "Thanks for voting for Sguard",
                        description: `**${member.user.tag}** | (${vote.user}) Just Voted For \`Sguard\`\nYou'll Keep ${role} role for \`12h\` Vote again at [Top.gg](https://top.gg/bot/929387724463570954/vote)`,
                        thumbnail: {
                            url: "https://media.discordapp.net/attachments/956609223465242786/963544876694274069/sguardshadow.png"
                        },
                        footer: {
                            text: "Thanks for the support!"
                        },
                        color: "4963525",
                        timestamp: new Date(),
    
                    }
                ]
            })
             // thanks for who noticed me about the webhook url <3
            fetch("webhool_url", {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: value
            }).catch(e => console.log('Error occured while posting webhook : ' + e))
            member.roles.add(role).catch(e => { console.log('Something went wrong, i cant add roles') })
        }
    }).catch(error => {
        console.log(error)
        console.log("Couldn't find the user.");
    });

}))
app.listen(3003)
console.log("Your app is ready to log votes :D")


client.on('message', message => {
    if (message.content === 'ping') {
        message.channel.send(`${client.ws.ping}ms Pong!`);
    }
});
