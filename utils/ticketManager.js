const {
    ChannelType,
    PermissionFlagsBits,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    EmbedBuilder
} = require("discord.js");

const robberyData = require("./robberyData");
const config = require("../config/config");

module.exports = async (interaction, robbery) => {

    const info = robberyData[robbery];

    if (!info) {
        return interaction.reply({
            content: "❌ Invalid ticket type.",
            ephemeral: true
        });
    }

    const member = interaction.member;

// اسمح للجميع بفتح Help
if (
    robbery !== "help" &&
    !member.roles.cache.has(config.CRIMINAL_ROLE)
) {
    return interaction.reply({
        content: "❌ You don't have permission to open this ticket.",
        ephemeral: true
    });
}

    // منع فتح أكثر من تذكرة
    const exists = interaction.guild.channels.cache.find(c =>
        c.topic === interaction.user.id
    );

    if (exists) {
        return interaction.reply({
            content: `❌ You already have an open ticket: ${exists}`,
            ephemeral: true
        });
    }


    const ticket = await interaction.guild.channels.create({
        name: `${info.channel}-${interaction.user.username}`.toLowerCase(),

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

    const buttons = new ActionRowBuilder().addComponents(

    new ButtonBuilder()
        .setCustomId("claim_ticket")
        .setLabel("Claim")
        .setEmoji("🟢")
        .setStyle(ButtonStyle.Success),

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

let embed;

if (robbery === "help") {

    embed = new EmbedBuilder()
        .setColor(info.color)
        .setTitle(info.title)
        .setDescription(
`Welcome ${interaction.user}

━━━━━━━━━━━━━━━━━━

📌 **Subject:**

📝 Please describe your issue clearly.

━━━━━━━━━━━━━━━━━━

👮 A member of the High Grade team will assist you shortly.`
        )
        .setImage(info.image)
        .setFooter({
            text: config.BOT_NAME
        })
        .setTimestamp();

} else {

    embed = new EmbedBuilder()
        .setColor(info.color)
        .setTitle(info.title)
        .setDescription(
`Welcome ${interaction.user}

Please complete the following information before waiting for High Grade approval.

━━━━━━━━━━━━━━━━━━

👤 **Member:**

🔫 **Weapons:**

👥 **Gang / Mafia:**

⏰ **Time of Heist:**

📝 **Description:**

━━━━━━━━━━━━━━━━━━

⚠️ **Do NOT start the robbery before High Grade approval.**`
        )
        .setImage(info.image)
        .setFooter({
            text: config.BOT_NAME
        })
        .setTimestamp();

}

await ticket.send({
    embeds: [embed],
    components: [buttons]
});

    await interaction.reply({
        content: `✅ Ticket created: ${ticket}`,
        ephemeral: true
    });

};