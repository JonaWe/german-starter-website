<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://german-starter.de">
    <img src="https://logos-world.net/wp-content/uploads/2021/02/Rust-Logo.png" alt="Logo" height="200">
  </a>

<h3 align="center">German Starter Website</h3>

  <p align="center">
    The whole Web enviroment of the Germen Starter Server. 
    <br />
    <a href="https://github.com/JonaWe/german-starter-website"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://german-starter.de">View Website</a>
  </p>
</div>

## Maintenance

### Domain change

If the domain is changed it must also be changed in the CONSTANTS file. Some functionality may be dependent on this setting.

## Setup

### Secrets

- **PROJECT_ID**: firebase-admin project id
- **CLIENT_EMAIL**: firebase-admin client id
- **PRIVATE_KEY**: firebase admin private key
- **STEAM_API_KEY**: Steam API key
- **SESSION_KEY**: Random secret with a min length of 32 for [iron session](https://github.com/vvo/iron-session)
- **DATABASE_URL**: Database URL for Prisma
- **DISCORD_WEBHOOK_URL**: Webhook URL from discord

### Database

[Add full text search](https://www.mysqltutorial.org/activating-full-text-searching.aspx)
