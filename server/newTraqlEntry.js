function newTraqlEntry(traql, args, pubsub) {
  traql[args.aql.mutationId] = {
    resolver: args.aql.resolver,
    openedTime: Date.now(),
    expectedNumberOfAqls: Math.floor(
      Object.keys(pubsub.subscriptions).length / traql.subResolvers
    ),
    aqlsReceivedBack: [],
    userToken: traql.userToken,
  };
}

module.exports = newTraqlEntry;
