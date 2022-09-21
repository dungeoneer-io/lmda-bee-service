# lmda-bee-service
Lambda service invoked in response to all new Blizzard Entity Events (newly mined classes, races, realms, crealms, affixes, dungeons, periods, specs appearing) -- This is a realtime feed handoff between the Zephyr Data Zone to the Forge

### Working With This
- Clone, `npm i`
- `npm run local` to fire the lambda method locally
- `npm run test` to run through jest tests written
- Deploys to lambda on commit push to `main` branch on github

### What to Have
- AWS Account, Access to create Lambda Functions
- Github Account to deploy and use Github Actions

### What Happens?
- Receives Full Document contents inserted into the BlizzardEntityEvents collection on Mongo within the Zephyr Data Zone
- Sends message to monitoring Discord channel
- Available as the initial realtime ingress point for any Forge operations that need to be kicked off in response to BEEs


`Mongo EventBridge Object`:
```json
{
    "version": "0",
    "id": "b0ffb7c3-a8de-afef-0651-9da778d212af",
    "detail-type": "MongoDB Database Trigger for US.BlizzEntityEvents",
    "source": "aws.partner/mongodb.com/stitch.trigger/6319224591235bfc07cc4020",
    "account": "368857813451",
    "time": "2022-09-21T00:50:52Z",
    "region": "us-east-1",
    "resources": [
        "arn:aws:events:us-east-1::event-source/aws.partner/mongodb.com/stitch.trigger/6319224591235bfc07cc4020"
    ],
    "detail": {
        "_id": {
            "_data": "82632A5FEC000000642B022C0100296E5A1004CC8D91B59A7940908198111A15A1667746645F69640064632A5FECAFCD5A9D600303B40004"
        },
        "operationType": "insert",
        "clusterTime": {
            "T": 1663721452,
            "I": 100
        },
        "fullDocument": {
            "_id": "632a5fecafcd5a9d600303b4",
            "stamp": 1663721452446,
            "entity": {
                "id": "100",
                "type": "CREALM"
            },
            "event": "ADDED"
        },
        "ns": {
            "db": "US",
            "coll": "BlizzEntityEvents"
        },
        "documentKey": {
            "_id": "632a5fecafcd5a9d600303b4"
        }
    }
}
```


### Resource Usage
Lambda Function Using:
- 128MB Memory (~100MB used)
~~- Billable Duration over snapshot: ~4260ms~~

### Plugging into the Cloud
- Deploy to github to leverage GitHub Actions written in .github\workflows
- Add projects secrets to github repo `AWS_ACCESS_KEY_ID`, `DISCORD_NOTIFICATION_WEBHOOK`, and `AWS_SECRET_ACCESS_KEY`
- Will need to have a named lambda function already created by the name in deploy yml. `lmda-bee-service` here
- Pre-made lambda is going to need environment variables on board, also make local uncommitted .env with those same values. It'll make sure local runs work


        Much of this will be in a Terraform file so it doesn't need to be done manually
- Pre-made lambda timeout increased to like 15 seconds
