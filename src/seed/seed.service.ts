import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance, AxiosStatic } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';

@Injectable()
export class SeedService {

  constructor(
    // I want to inject the MongoDB model (yes, a model is a dependency)
    // but... where does it come from?
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>
  ) { }

  private readonly axios: AxiosStatic = axios;

  async executeSeed() {
    try {
      const { data } = await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=10')
      const pokemonList = data.results.map(({ name, url }) => {
        const segments = url.split('/');
        const no: number = +segments[segments.length - 2]
        return { name, no }
      })

      const operations = pokemonList.map(pokemon => ({
        updateOne: {
          filter: { no: pokemon.no },
          update: { $set: pokemon },
          upsert: true
        },
      }));

      await this.pokemonModel.bulkWrite(operations);

      return { message: 'Seed completed', count: operations.length };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

}
