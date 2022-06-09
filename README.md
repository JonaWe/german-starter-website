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
    <a href="https://german-starter-website.vercel.app/">View Website (Preview)</a>
  </p>
</div>

## Maintenance

### Domain change

If the domain is changed it must also be changed in the CONSTANTS file. Some functionality may be dependent on this setting.

## Setup

### Secrets

The following secrets must be set as environment variables.

- **PROJECT_ID**: firebase-admin project id
- **CLIENT_EMAIL**: firebase-admin client id
- **PRIVATE_KEY**: firebase admin private key
- **STEAM_API_KEY**: Steam API key
- **SESSION_KEY**: Random secret with a min length of 32 for [iron session](https://github.com/vvo/iron-session)
- **DATABASE_URL**: Database URL for Prisma
- **DISCORD_WEBHOOK_URL**: Webhook URL from discord
- **GS_SERVER_WEB_API_KEY**: Key to access protected api under `playerstats.german-starter.de:5000` from the GS web server.

### Database

[Add full text search](https://www.mysqltutorial.org/activating-full-text-searching.aspx)

```mysql
CREATE FULLTEXT INDEX text_search ON players(name)
```

## Ideas

- [ ] Show if player is in the rise or on the fall indicated with a red/green arrow in stats table and user plage.
- [ ] Show top player of the day instead of random player in spotlight on the stats page. Maybe indicated with a flame.
- [ ] Send state from Py Script to this page via Webhook and then save in firebase. For example last Player Update SUCCESS/ERROR or Can not Update Player data. Also show the state from the user table to the user (Uptodate / updating and show last update)
- [ ] Calendar that shows wipes. Automatically show forced Wipes and option to add custom wipes in Dashboard
- [x] Show related profiles on user profile page (Social Media like) and show friends on server
- [ ] Show highest kill streak.
- [ ] show overall rust stats. If not public show demo graphs blured like vercel
- [ ] Add image to discord annoumce. Default grab first url from text.
- [ ] show player log with nice design like github ink name changes, kills, deaths, pve deaths.
- [ ] Calculate skill value or levle for player based of stats
- [ ] Option to ban player from comments
- [x] Option to report comment
- [ ] Add watch player option. If some one wathces a player he always sees him on the main page (or some whare else)
- [ ] Add someting to the header like the current players "We have **13000+** active players"

## Questions
- Force steam sign in?
- Convert names of pve deaths back do ids on dont convert new ones in python script? Format in frontend instead. maybe display additional info (Frontend logic implementation is done)
