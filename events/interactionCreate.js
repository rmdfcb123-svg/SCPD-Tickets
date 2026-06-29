const { Events } = require("discord.js");
const createTicket = require("../utils/ticketManager");
const handleButtons = require("../utils/buttons");
const config = require("../config/config");

module.exports = {
    name: Events.InteractionCreate,

    async execute(interaction) {

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

        if (interaction.isStringSelectMenu()) {

            if (interaction.customId !== "major_robberies") return;

            await createTicket(interaction, interaction.values[0]);

            return;
        }

        if (interaction.isButton()) {

        if (interaction.isButton()) {
    return await handleButtons(interaction);
}    // سنضيف Claim / Close / Delete هنا في الخطوة القادمة

        }

    }
};