const {
    PermissionFlagsBits,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    EmbedBuilder
} = require("discord.js");

const logManager = require("./logManager");
module.exports = async (interaction) => {

    // =========================
    // RULES
    // =========================
    if (interaction.customId === "rules") {

        return interaction.reply({
            content: "📖 Please check the robbery rules: <#1521548373902233800>",
            ephemeral: true
        });

    }

    // =========================
    // CLAIM
    // =========================
    if (interaction.customId === "claim_ticket") {

        const claimedEmbed = new EmbedBuilder()
            .setColor("#57F287")
            .setDescription(`✅ This ticket has been claimed by ${interaction.user}.`)
            .setTimestamp();

        const row = new ActionRowBuilder().addComponents(

            new ButtonBuilder()
                .setCustomId("claimed")
                .setLabel(`Claimed by ${interaction.user.username}`)
                .setEmoji("✅")
                .setStyle(ButtonStyle.Success)
                .setDisabled(true),

            new ButtonBuilder()
                .setCustomId("close_ticket")
                .setLabel("Close")
                .setEmoji("🔒")
                .setStyle(ButtonStyle.Secondary),

            new ButtonBuilder()
                .setCustomId("delete_ticket")
                .setLabel("Delete")
                .setEmoji("🗑️")
                .setStyle(ButtonStyle.Danger)

        );

        await interaction.update({
            components: [row]
        });

        return interaction.followUp({
            embeds: [claimedEmbed]
        });

    }

    // =========================
    // CLOSE
    // =========================
    if (interaction.customId === "close_ticket") {

        await interaction.channel.permissionOverwrites.edit(interaction.channel.topic, {
            SendMessages: false
        });

        const embed = new EmbedBuilder()
            .setColor("#FEE75C")
            .setDescription(`🔒 Ticket closed by ${interaction.user}.`)
            .setTimestamp();

        return interaction.reply({
            embeds: [embed]
        });

    }

    // =========================
// DELETE
// =========================
if (interaction.customId === "delete_ticket") {

    await interaction.reply({
        content: "🗑️ Creating transcript...\n⏳ Ticket will be deleted in **5 seconds**."
    });

    await logManager(interaction.channel, interaction.user);

    setTimeout(() => {
        interaction.channel.delete().catch(console.error);
    }, 5000);

    return;
}

};