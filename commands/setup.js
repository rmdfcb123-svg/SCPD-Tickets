const {
    SlashCommandBuilder,
    PermissionFlagsBits,
    EmbedBuilder,
    ActionRowBuilder,
    StringSelectMenuBuilder
} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("setup")
        .setDescription("Create the Major Robberies Panel")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction) {

        const embed = new EmbedBuilder()
            .setColor("#2b2d31")
            .setTitle("🚨 Major Robberies")
            .setDescription(
`Open a ticket to request approval for a major robbery.

Choose the robbery from the menu below.

⚠️ Wait for High Grade approval before starting the robbery.`
            )
            .setFooter({
                text: "SCPD Ticket System"
            });

        const menu = new StringSelectMenuBuilder()
            .setCustomId("major_robberies")
            .setPlaceholder("🏦 Select a robbery...")
            .addOptions(
                {
                    label: "Yacht",
                    description: "Request approval for Yacht Robbery",
                    emoji: "🛥️",
                    value: "yacht"
                },
                {
                    label: "Central Bank",
                    description: "Request approval for Central Bank",
                    emoji: "🏦",
                    value: "centralbank"
                },
                {
                    label: "Museum",
                    description: "Request approval for Museum",
                    emoji: "🏛️",
                    value: "museum"
                },
                {
                    label: "Maze Bank",
                    description: "Request approval for Maze Bank",
                    emoji: "🏢",
                    value: "mazebank"
                }
            );

        const row = new ActionRowBuilder().addComponents(menu);

        await interaction.channel.send({
            embeds: [embed],
            components: [row]
        });

        await interaction.reply({
            content: "✅ Panel created successfully.",
            ephemeral: true
        });

    }
};