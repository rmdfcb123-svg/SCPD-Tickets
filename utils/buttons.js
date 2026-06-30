const {
    ChannelType,
    PermissionFlagsBits,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} = require("discord.js");

const config = require("../config/config");

module.exports = async (interaction) => {

    if (!interaction.isButton()) return;

    // =========================
    // HELP BUTTON
    // =========================
    if (interaction.customId === "help") {

        const exists = interaction.guild.channels.cache.find(
            c => c.topic === interaction.user.id && c.name.startsWith("help")
        );

        if (exists) {
            return interaction.reply({
                content: `❌ You already have a support ticket: ${exists}`,
                ephemeral: true
            });
        }

        const channel = await interaction.guild.channels.create({
            name: `help-${interaction.user.username}`,
            type: ChannelType.GuildText,
            parent: config.CATEGORY_ID,
            topic: interaction.user.id,

            permissionOverwrites: [
                {
                    id: interaction.guild.roles.everyone,
                    deny: [PermissionFlagsBits.ViewChannel]
                },
                {
                    id: interaction.user.id,
                    allow: [
                        PermissionFlagsBits.ViewChannel,
                        PermissionFlagsBits.SendMessages,
                        PermissionFlagsBits.ReadMessageHistory
                    ]
                },
                ...config.POLICE_ROLES.map(role => ({
                    id: role,
                    allow: [
                        PermissionFlagsBits.ViewChannel,
                        PermissionFlagsBits.SendMessages,
                        PermissionFlagsBits.ReadMessageHistory
                    ]
                }))
            ]
        });

        const embed = new EmbedBuilder()
            .setColor("#3B82F6")
            .setTitle("🛟 Police Support")
            .setDescription(
`Welcome ${interaction.user}

━━━━━━━━━━━━━━━━━━

📌 **Subject:**
📝 Please describe your issue clearly.

━━━━━━━━━━━━━━━━━━

👮 A staff member will assist you soon.`
            )
            .setFooter({
                text: config.BOT_NAME
            })
            .setTimestamp();

        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId("close_ticket")
                .setLabel("Close")
                .setEmoji("🔒")
                .setStyle(ButtonStyle.Secondary)
        );

        await channel.send({
            embeds: [embed],
            components: [row]
        });

        return interaction.reply({
            content: `✅ Support ticket created: ${channel}`,
            ephemeral: true
        });
    }

    // =========================
    // RULES BUTTON
    // =========================
    if (interaction.customId === "rules") {

        return interaction.reply({
            content: "📖 Please check the rules channel: <#1521548373902233800>",
            ephemeral: true
        });
    }
};