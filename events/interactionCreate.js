const { Events } = require("discord.js");
const createTicket = require("../utils/ticketManager");
const handleButtons = require("../utils/buttons");

module.exports = {
    name: Events.InteractionCreate,

    async execute(interaction) {

        // Slash Commands
        if (interaction.isChatInputCommand()) {

            const command = interaction.client.commands.get(interaction.commandName);

            if (!command) return;

            try {
                await command.execute(interaction);
            } catch (error) {
                console.error(error);

                if (interaction.replied || interaction.deferred) {
                    await interaction.followUp({
                        content: "❌ حدث خطأ.",
                        ephemeral: true
                    });
                } else {
                    await interaction.reply({
                        content: "❌ حدث خطأ.",
                        ephemeral: true
                    });
                }
            }

            return;
        }

        // Select Menu
        if (interaction.isStringSelectMenu()) {

            if (interaction.customId !== "major_robberies") return;

            await createTicket(interaction, interaction.values[0]);

            return;
        }

        // Buttons
        if (interaction.isButton()) {

            // Help Ticket
            if (interaction.customId === "help") {
                return await createTicket(interaction, "help");
            }

            // Rules Button
            if (interaction.customId === "rules") {

                return interaction.reply({
                    content: "📖 Robbery Rules: <#1521548373902233800>",
                    ephemeral: true
                });

            }

            // Claim / Close / Delete
            return await handleButtons(interaction);

        }

    }
};