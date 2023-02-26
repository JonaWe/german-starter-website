use db_stats;

WITH data_differences AS (
  SELECT 
    UNIX_TIMESTAMP(time) - UNIX_TIMESTAMP(LAG(time) OVER (ORDER BY time)) AS time_difference
  FROM 
    pvplog where killer_steamid = 76561198798760147 and time >= DATE_ADD(NOW(), INTERVAL -20 DAY)
)
SELECT AVG(time_difference) AS average_time, sum(time_difference)
FROM 
  data_differences;

SELECT COUNT(killer_steamid) AS kills, target_steamid, name FROM pvplog
JOIN players on target_steamid = players.steamid
WHERE killer_steamid = 76561198798760147
GROUP BY target_steamid
ORDER BY kills DESC
LIMIT 5;

SELECT * from players where steamid = 76561198798760147;

SELECT * FROM pvplog;

WITH cte AS (
  SELECT 
    killer_steamid AS steamid,
    time,
    ROW_NUMBER() OVER (PARTITION BY killer_steamid ORDER BY time) AS kill_count,
    ROW_NUMBER() OVER (PARTITION BY target_steamid ORDER BY time) AS death_count,
    ROW_NUMBER() OVER (PARTITION BY killer_steamid ORDER BY time) - ROW_NUMBER() OVER (PARTITION BY target_steamid ORDER BY time) AS killstreak
  FROM 
    pvplog
),
cte2 AS (
  SELECT 
    steamid,
    time,
    killstreak,
    SUM(killstreak) OVER (PARTITION BY steamid ORDER BY time) AS running_total
  FROM 
    cte
)
SELECT 
  steamid,
  MAX(running_total) AS highest_killstreak
FROM 
  cte2
WHERE 
  steamid = 76561198798760147 -- replace the "?" with the actual steam id of the player you're interested in
GROUP BY 
  steamid;

/* AVG KIlls */
SELECT AVG(kills) FROM player_wipe_stats WHERE kills > 0;

/* AVG KD */
SELECT AVG(kills / pvpdeaths) FROM player_wipe_stats WHERE kills > 0;

-- AVG Kills of user per day
SELECT AVG(d.kills) from (SELECT COUNT(killer_steamid) as kills FROM pvplog WHERE killer_steamid = 76561198276507650  GROUP BY DATE_FORMAT(time, '%Y-%m-%d')) as d;

SELECT count(killer_steamid) as kills FROM pvplog WHERE killer_steamid = 76561198798760147 AND target_steamid = 76561198276507650;

-- Same enemy ratio
SELECT count(killer_steamid) as kills,  killer_steamid, target_steamid from pvplog where (killer_steamid = 76561198798760147 or killer_steamid = 76561198276507650) and target_steamid = 76561197976691133  group by killer_steamid;

SELECT sum(kills), target from (SELECT count(killer_steamid) as kills,  killer_steamid, target_steamid from pvplog where (killer_steamid = 76561198798760147 or killer_steamid = 76561198276507650) and target_steamid = 76561197976691133  group by killer_steamid) as d;

SELECT count(killer_steamid) as kills, killer_steamid, target_steamid from pvplog where (killer_steamid = 76561198798760147 or killer_steamid = 76561198276507650)  group by target_steamid;