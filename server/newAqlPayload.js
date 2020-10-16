const newTraqlEntry = require('./newTraqlEntry');
/* Creates a copy of the received AQL, adds a mutationReceived property of the current time, 
and returns copy to subscription payload to travel to subscribers. */

function newAqlPayload(payload, args, traql, pubsub) {
  const newPayload = {...payload};
  for(let key in newPayload) {
    newPayload[key].aql = {
      ...args.aql,
      mutationReceived: Date.now(),
      userToken: traql.userToken,
    };
  }
  newTraqlEntry(traql, args, pubsub);
  return newPayload;
}

module.exports = newAqlPayload;