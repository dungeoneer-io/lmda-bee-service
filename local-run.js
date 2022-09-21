require('dotenv').config();
const { handler } = require('./src/index');

console.log('    ____                                                      _     ');
console.log('   / __ \\__  ______  ____  ___  ____  ____  ___  ___  _____  (_)___ ');
console.log('  / / / / / / / __ \\/ __ `/ _ \\/ __ \\/ __ \\/ _ \\/ _ \\/ ___/ / / __ \\ ');
console.log(' / /_/ / /_/ / / / / /_/ /  __/ /_/ / / / /  __/  __/ /    / / /_/ /');
console.log('/_____/\\__,_/_/ /_/\\__, /\\___/\\____/_/ /_/\\___/\\___/_/ (_)/_/\\____/ ');
console.log('                  /____/               Scan to Mongo Local Utility');

const doProcess = async () => {
    
    console.log('starting.');
    const exampleEvent = {
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
    };

    await handler(exampleEvent);

    console.log('success.');
    process.exit(0);
};

doProcess();
