const {
    SlashCommandBuilder,
    PermissionFlagsBits,
    EmbedBuilder,
    ActionRowBuilder,
    StringSelectMenuBuilder,
    ButtonBuilder,
    ButtonStyle
} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("setup")
        .setDescription("Create the Major Robberies Panel")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction) {

        const embed = new EmbedBuilder()
    .setColor("#1E1F22")
    .setAuthor({
        name: "🚨 Major Robberies"
    })
    .setDescription(
`Open a ticket to request approval for a major robbery.

Choose the robbery from the menu below.

⚠️ **Wait for High Grade approval before starting the robbery.**`
    )
    .setImage("https://cdn.discordapp.com/attachments/1521162083968749710/1521543853579178014/ChatGPT_Image_30_juin_2026_16_51_24.png?ex=6a4537a3&is=6a43e623&hm=ef60e58f204396657634b16e0ab33f7c6d209a4c0daf448331685befc2c3bace&")
    .setFooter({
        text: "✦ SCPD Ticket System ✦"
    });

        const menu = new StringSelectMenuBuilder()
    .setCustomId("major_robberies")
    .setPlaceholder("🏛️ Select a robbery...")
    .addOptions([
        {
            label: "Yacht",
            description: "Request approval for Yacht",
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
            label: "Maze Bank",
            description: "Request approval for Maze Bank",
            emoji: "🏢",
            value: "mazebank"
        },
        {
            label: "Museum",
            description: "Request approval for Museum",
            emoji: "🏛️",
            value: "museum"
        }
    ]);

        const menuRow = new ActionRowBuilder().addComponents(menu);

        const buttons = new ActionRowBuilder().addComponents(

    new ButtonBuilder()
        .setCustomId("help")
        .setLabel("Help / Support")
        .setEmoji("🛟")
        .setStyle(ButtonStyle.Primary),

    new ButtonBuilder()
        .setCustomId("rules")
        .setLabel("Rules")
        .setEmoji("📚")
        .setStyle(ButtonStyle.Secondary)

);

        await interaction.channel.send({
    embeds: [embed],
    components: [menuRow, buttons]
});

        await interaction.reply({
            content: "✅ Major Robberies panel created successfully.",
            ephemeral: true
        });

    }
};