const { newAqlPayload } = require('@aqls/server');

function newColor(parent, args, { db, pubsub, traql }, info) {
  db.color.cssColor = args.colorArg;
  const payload = {
    updatedColor: {
      ...db.color,
    },
  };
  pubsub.publish('COLOR_MUTATED', newAqlPayload(payload, args, traql, pubsub));
  return db.color;
}

function newLuckyNumber(parent, args, { db, pubsub, traql }, info) {
  db.number.luckyNum = args.numberArg;
  const payload = {
    updatedNumber: {
      ...db.number,
    },
  };
  pubsub.publish('NUMBER_MUTATED', newAqlPayload(payload, args, traql, pubsub));
  return db.number;
}

module.exports = { newColor, newLuckyNumber };
