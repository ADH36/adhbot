const { create } = require('@open-wa/wa-automate')
const msgHandler = require('./msgHandler')
const fs = require('fs-extra')
const config = JSON.parse(fs.readFileSync('./config.json'))
const serverOption = {
    headless: true,
    cacheEnabled: false,
    useChrome: true,
    chromiumArgs: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--aggressive-cache-discard',
        '--disable-cache',
        '--disable-application-cache',
        '--disable-offline-load-stale-cache',
        '--disk-cache-size=0'
    ]
}

const opsys = process.platform
if (opsys === 'win32' || opsys === 'win64') {
    serverOption.executablePath = 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
} else if (opsys === 'linux') {
    serverOption.browserRevision = '737027'
} else if (opsys === 'darwin') {
    serverOption.executablePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
}

const startServer = async (client) => {
        global.sclient = client
	    sendingSticker = []
        queueSticker = []
        botadmins = config.botadmins
        prefix = config.prefix
        botname = config.botname
    	global.sendingAnimatedSticker = []
    	global.queueAnimatedSticker = []
    	global.amdownloaden = []
    	global.queuemp3 = []
    	global.queuemp4 = []
    	spamarr = []
        console.log('[SERVER] Server Started!')
        // Force it to keep the current session
        client.onStateChanged((state) => {
                console.log('[Client State]', state)
                if (state === 'CONFLICT') client.forceRefocus()
        })
        // listening on message
        client.onMessage((message) => {
            msgHandler(client, message)
        })

       
        
        client.onAddedToGroup(async (chat) => {
	const groups = await client.getAllGroups()
	if (groups.length > 10) {
	await client.sendText(chat.id, `Sorry, the group on this Bot is full due to testing\nMax Group is: ${groupLimit}\nWill be increased in future`).then(() => {
	      client.leaveGroup(chat.id)
	      client.deleteChat(chat.id)
	  }) 
	}
            if (totalMem < 0) { 
            	client.sendText(chat.id, `This group only has ${totalMem} members, Its needs atleast 30 members to activate the services`).then(() => client.leaveGroup(chat.id))
            	client.deleteChat(chat.id)
            } else {
                client.sendText(chat.groupMetadata.id, `Thanks for adding me *${chat.contact.name}*. Use ?help to see the usable commands`)
            }
        })

        // listening on Incoming Call
        client.onIncomingCall((call) => {
            client.sendText(call.peerJid, '...')
            client.contactBlock(call.peerJid)
            ban.push(call.peerJid)
            fs.writeFileSync('./lib/banned.json', JSON.stringify(ban))
        })
    }

create({"headless": true,
        "cacheEnabled": false,
        "useChrome": true,
        "chromiumArgs": [
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--aggressive-cache-discard",
            "--disable-cache",
            "--disable-application-cache",
            "--disable-offline-load-stale-cache",
            "--disk-cache-size=0"
        ]
    })
    .then(async (client) => startServer(client))
    .catch((error) => console.log(error))
