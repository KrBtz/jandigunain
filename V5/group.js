const {
	MessageType
} = require("@adiwajshing/baileys");
const fs = require("fs-extra")
const { color, bgcolor } = require('../V2/color')
const { getGroupAdmins, getBuffer } = require('../V2/functions')

module.exports = welcome = async (Akira, anu) => {
	    const welkom = JSON.parse(fs.readFileSync('./V3/welcome.json'))
	    const isWelcome = welkom.includes(anu.jid)
	    if (!isWelcome) return
		try {
			    groupMet = await Akira.groupMetadata(anu.jid)
                groupMembers = groupMet.participants
                groupAdmins = getGroupAdmins(groupMembers)
			    mem = anu.participants[0]
			    console.log(anu)
                try {
               pic = await Akira.getProfilePicture(mem)
                } catch (e) {
                pic = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60'
            }
            try {
                pp_grup = await Akira.getProfilePicture(anu.jid)
                } catch (e) {
                pp_grup = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60'
             }
            if (anu.action == 'add' && mem.includes(Akira.user.jid)) {
            Akira.sendMessage(anu.jid, 'Halo! Terima Kasih sudah Mengundangku, Jika ingin Menggunakan Bot, Tolong Jadikan Admin Ya, Ketik .menu', 'conversation')
            }
             if (anu.action == 'add' && !mem.includes(Akira.user.jid)) {
             if (!welkom.includes(anu.jid)) return
                mdata = await Akira.groupMetadata(anu.jid)
                memeg = mdata.participants.length
            	num = anu.participants[0]
               groupName = mdata.subject
                let v = Akira.contacts[num] || { notify: num.replace(/@.+/, '') }
                anu_user = v.vname || v.notify || num.split('@')[0]
              teks = `ππΌπππ ππΌπ *@${mem.split('@')[0]}*
*ππππΎπππ ππ ππππ *${groupName}*
*ππΌπππΌπ ππππΌ πππππ*
*β Ι΄α΄α΄α΄ :*
*β α΄α΄α΄Κ :*
*β Κα΄ΚΚΚ :*
*β Ι’α΄Ι΄α΄α΄Κ :*
*β α΄κ±α΄Κ α΄α΄α΄α΄ :*
*β Ι΄α΄α΄α΄Κ :* ${mem.replace('@s.whatsapp.net', '')}
*πΏπ ππππ πππ~~*`
              buff = await getBuffer(pic)
               Akira.sendMessage(mdata.id, { contentText: `${teks}`, footerText: `*πΆπππ­πππκͺΆπ£κ«*`, buttons: [{buttonId: `.selamatdatang`,buttonText:{displayText: 'WELCOME KAKπ'},type:1}],headerType: 'LOCATION', locationMessage: { degreesLatitude: '', degreesLongitude: '', jpegThumbnail: buff, contextInfo: {"mentionedJid": [num]}}}, 'buttonsMessage')
		}
            if (anu.action == 'remove' && !mem.includes(Akira.user.jid)) {
            if (!welkom.includes(anu.jid)) return
                mdata = await Akira.groupMetadata(anu.jid)
            	num = anu.participants[0]
                let w = Akira.contacts[num] || { notify: num.replace(/@.+/, '') }
                anu_user = w.vname || w.notify || num.split('@')[0]
                memeg = mdata.participants.length
                out = `ππππΌππΌπ ππππππΌπ\n  @${num.split('@')[0]}\nππΌπππΌπ π½πΌπππ ππΌππ ππΌπ`
               buff = await getBuffer(pic)
               Akira.sendMessage(mdata.id, { contentText: `${out}`, footerText: `*πΆπππ­πππκͺΆπ£κ«*`, buttons: [{buttonId: `.bay`,buttonText:{displayText: 'BYE KAKπ'},type:1}],headerType: 'LOCATION', locationMessage: { degreesLatitude: '', degreesLongitude: '', jpegThumbnail: buff, contextInfo: {"mentionedJid": [num]}}}, 'buttonsMessage')
            }
		} catch (e) {
			console.log('Error : %s', color(e, 'pink'))
		}
	}
