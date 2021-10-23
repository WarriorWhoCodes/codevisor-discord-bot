const client = require("../index");
const { Permissions, MessageEmbed } = require("discord.js");
client.on("messageCreate", async (message) => {
  if (
    message.author.bot ||
    !message.guild ||
    !message.content.toLowerCase().startsWith(client.config.prefix)
  )
    return;

  const [cmd, ...args] = message.content
    .slice(client.config.prefix.length)
    .trim()
    .split(" ");

  const command =
    client.commands.get(cmd.toLowerCase()) ||
    client.commands.find((c) => c.aliases?.includes(cmd.toLowerCase()));
  if (command) {
    if (!message.guild.me.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) {
      errEmbed = new MessageEmbed()
        .setDescription(
          "⚠️ **I dont have permission to manage messages** \n please give MANAGE_MESSAGES permission to me"
        )
        .setColor(config.errorColor)
        .setFooter(
          `© CodeVisor |this message will be deleted in 5 seconds`
        );
      return message.channel
        .send({ embeds: [errEmbed] })
        .then((msg) => setTimeout(() => msg.delete(), 5000));
    }
  }
  if (!command) return;

  await command.run(client, message, args);
});
