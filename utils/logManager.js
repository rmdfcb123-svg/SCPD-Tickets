const {
    AttachmentBuilder,
    EmbedBuilder
} = require("discord.js");

const { createTranscript } = require("discord-html-transcripts");

const config = require("../config/config");

module.exports = async (channel, closedBy) => {

    try {

        const transcript = await createTranscript(channel, {
            limit: -1,
            returnType: "buffer",
            filename: `${channel.name}.html`
        });

        const attachment = new AttachmentBuilder(
            transcript,
            {
                name: `${channel.name}.html`
            }
        );

        const logChannel = channel.guild.channels.cache.get(config.LOG_CHANNEL);

        if (!logChannel) return;

        const embed = new EmbedBuilder()
    .setColor("#2B2D31")
    .setAuthor({
        name: "📋 SCPD Ticket Transcript"
    })
    .setDescription(
`━━━━━━━━━━━━━━━━━━━━━━

👤 **Opened By**
<@${channel.topic}>

🛡️ **Deleted By**
${closedBy}

📂 **Ticket**
\`${channel.name}\`

📅 **Date**
<t:${Math.floor(Date.now()/1000)}:F>

━━━━━━━━━━━━━━━━━━━━━━

📎 **Transcript attached below.**`
    )
    .setFooter({
        text: "SCPD Ticket System"
    })
    .setTimestamp();

        await logChannel.send({
            embeds: [embed],
            files: [attachment]
        });

    } catch (err) {
        console.error(err);
    }

};