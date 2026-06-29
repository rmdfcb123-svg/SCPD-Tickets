const {
    SlashCommandBuilder,
    PermissionFlagsBits
} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("panel")
        .setDescription("Send a ticket panel")
        .addStringOption(option =>
            option
                .setName("type")
                .setDescription("Select the panel type")
                .setRequired(true)
                .addChoices(
                    { name: "Major Robberies", value: "major-robberies" },
                    { name: "Support", value: "support" },
                    { name: "Staff", value: "staff" }
                )
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction) {

        const type = interaction.options.getString("type");

        await interaction.reply({
            content: `✅ Panel selected: **${type}**`,
            ephemeral: true
        });

    }
};