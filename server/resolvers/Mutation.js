const newAqlPayload = require('../newAqlPayload');

// interface AqlArgInput {
//   mutationSendTime: string;
//   mutationReceived: string;
//   subscriberReceived: string;
//   mutationId: string;
//   resolver: string;
//   userToken: string;
// }

// interface NewColorArg {
//   colorArg: string;
//   aql: AqlArgInput;
// }

function newColor(parent, args, { db, pubsub, traql }, info) {
  db.color.cssColor = args.colorArg;
  const payload = { 
    updatedColor: {
      ...db.color,
    }
  };
  pubsub.publish('COLOR_MUTATED', newAqlPayload(payload, args, traql, pubsub));
  //console.log("CLIENT IP ADDRESS", context.request.connection.remoteAddress)
  return db.color;
}

function newLuckyNumber(parent, args, { db, pubsub, traql }, info) {
  db.number.luckyNum = args.numberArg;
  const payload = { 
    updatedNumber: {
      ...db.number,
    }
  };
  pubsub.publish('NUMBER_MUTATED', newAqlPayload(payload, args, traql, pubsub));
  return db.number;
}

module.exports = { newColor, newLuckyNumber };
