const {
    ChannelType,
    PermissionFlagsBits,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    EmbedBuilder
} = require("discord.js");
const robberyInfo = {
    yacht: {
        title: "🛥️ Yacht Robbery",
        color: "#3498db",
        image: "https://cdn.discordapp.com/attachments/1521162083968749710/1521162816025919538/Screenshot_2026-06-29_153600.png?ex=6a43d4c5&is=6a428345&hm=3836619a7e99fde896fca61fef445d366c3cba6f35461071c6cfaf8e8df81c60&"
    },

    centralbank: {
        title: "🏦 Central Bank Robbery",
        color: "#f1c40f",
        image: "https://cdn.discordapp.com/attachments/1521162083968749710/1521163172256419850/image.png?ex=6a43d51a&is=6a42839a&hm=249791c3c741ac38fb01433a39717c8c73ec72b2c92d834e01b2efbf9a59e2e1&"
    },

    museum: {
        title: "🏛️ Museum Robbery",
        color: "#9b59b6",
        image: "https://cdn.discordapp.com/attachments/1521162083968749710/1521163242276126851/image.png?ex=6a43d52a&is=6a4283aa&hm=db1a8121ba86269758f49a22faa5360895b316870199d1ff95f837b6fe3884fa&"
    },

    mazebank: {
        title: "💰 Maze Bank Robbery",
        color: "#2ecc71",
        image: "https://cdn.discordapp.com/attachments/1521162083968749710/1521163369606807592/image.png?ex=6a43d549&is=6a4283c9&hm=9f67ee382933426e4e618fa7b54e225c30aa9c352671d1f8767777af14268c7b&"
    }
};

const config = require("../config/config");

module.exports = async (interaction, robbery) => {
       const info = robberyInfo[robbery];

    const member = interaction.member;

    // يسمح فقط لرتبة المجرمين
    if (!member.roles.cache.has(config.CRIMINAL_ROLE)) {
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

    // أسماء التذاكر
    const names = {
        yacht: "yacht",
        centralbank: "centralbank",
        museum: "museum",
        mazebank: "mazebank"
    };

    const ticket = await interaction.guild.channels.create({
        name: `${names[robbery]}-${interaction.user.username}`.toLowerCase(),

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

const embed = new EmbedBuilder()
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

await ticket.send({
    embeds: [embed],
    components: [buttons]
});

    await interaction.reply({
        content: `✅ Ticket created: ${ticket}`,
        ephemeral: true
    });

};