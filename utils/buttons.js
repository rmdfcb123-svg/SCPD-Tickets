const config = require("../config/config");
const { createTranscript } = require("discord-html-transcripts");

module.exports = async (interaction) => {

    // Claim
    // Claim
if (interaction.customId === "claim_ticket") {

    if (!interaction.member.roles.cache.some(role => config.POLICE_ROLES.includes(role.id))) {
        return interaction.reply({
            content: "❌ You don't have permission.",
            ephemeral: true
        });
    }

    // إذا كانت التذكرة مستلمة بالفعل
    if (interaction.channel.name.startsWith("claimed-")) {
        return interaction.reply({
            content: "❌ This ticket has already been claimed.",
            ephemeral: true
        });
    }

    await interaction.channel.setName(`claimed-${interaction.channel.name}`);

    return interaction.reply({
        content: `🟢 Ticket claimed by ${interaction.user}.`
    });

}

    // Close
    // Close
if (interaction.customId === "close_ticket") {

    if (!interaction.member.roles.cache.some(role => config.POLICE_ROLES.includes(role.id))) {
        return interaction.reply({
            content: "❌ You don't have permission.",
            ephemeral: true
        });
    }

    await interaction.reply("🔒 Closing ticket in 5 seconds...");

    setTimeout(async () => {

        const log = interaction.guild.channels.cache.get(config.LOG_CHANNEL);

        const transcript = await createTranscript(interaction.channel, {
            filename: `${interaction.channel.name}.html`
        });

        if (log) {

            await log.send({
                content:
`📁 Ticket Closed

👤 Staff: ${interaction.user.tag}
📄 Ticket: ${interaction.channel.name}`,
                files: [transcript]
            });

        }

        await interaction.channel.delete();

    }, 5000);

    return;

}

    // Delete
    if (interaction.customId === "delete_ticket") {

        if (!interaction.member.roles.cache.some(role => config.POLICE_ROLES.includes(role.id))) {
            return interaction.reply({
                content: "❌ You don't have permission.",
                ephemeral: true
            });
        }

        await interaction.reply("🗑️ Deleting ticket...");

        setTimeout(async () => {
            await interaction.channel.delete();
        }, 2000);

    }

};