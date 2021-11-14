import { gql } from "apollo-server-express";

import Club from "./models/Club";
import Player from "./models/Player";

const typeDefs = gql`
  type Query {
    hello: String
    clubs: [Club]
    club(id: ID!): Club
    players: [Player]
    player(id: ID!): Player
  }

  type Club {
    id: ID!
    name: String!
    founded: Int!
    stadium: String!
    capacity: Int!
    league: String!
    website: String
    players: [Player]!
  }

  type Player {
    id: ID!
    name: String!
    age: Int!
    position: String!
    club: Club!
    country: String!
  }

  input ClubInput {
    name: String!
    founded: Int!
    stadium: String!
    capacity: Int!
    league: String!
    website: String
  }

  input ClubUpdateInput {
    name: String
    founded: Int
    stadium: String
    capacity: Int
    league: String
    website: String
  }

  input PlayerInput {
    name: String!
    age: Int!
    position: String!
    clubId: ID!
    country: String!
  }

  input PlayerUpdateInput {
    name: String
    age: Int
    position: String
    clubId: ID
    country: String
  }

  type Mutation {
    createClub(club: ClubInput): Club
    updateClub(id: ID!, club: ClubUpdateInput): Club
    deleteClub(id: ID!): Club

    createPlayer(player: PlayerInput): Player
    updatePlayer(id: ID!, player: PlayerUpdateInput): Player
    deletePlayer(id: ID!): Player
  }
`;

const resolvers = {
  Query: {
    hello: () => "Hello World!",
    clubs: async () => await Club.find(),
    club: async (_, args) => await Club.findById(args.id),
    players: async () => await Player.find(),
    player: async (_, args) => await Player.findById(args.id),
  },

  Club: {
    players: async (club) => await Player.find({ clubId: club.id }),
  },

  Player: {
    club: async (player) => await Club.findById(player.clubId),
  },

  Mutation: {
    createClub: async (_, args) => {
      const club = new Club(args.club);
      return await club.save();
    },
    updateClub: async (_, args) => await Club.findByIdAndUpdate(args.id, args.club),
    deleteClub: async (_, args) => await Club.findByIdAndDelete(args.id),

    createPlayer: async (_, args) => {
      const player = new Player(args.player);
      return await player.save();
    },
    updatePlayer: async (_, args) => await Player.findByIdAndUpdate(args.id, args.player),
    deletePlayer: async (_, args) => await Player.findByIdAndDelete(args.id),
  },
};

export { typeDefs, resolvers };
