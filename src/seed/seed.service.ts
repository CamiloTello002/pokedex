import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance, AxiosStatic } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly http: AxiosAdapter
  ) { }


  async executeSeed() {
    try {
      await this.pokemonModel.deleteMany({});

      const data = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=10')
      const pokemonList = data.results.map(({ name, url }) => {
        const segments = url.split('/');
        const no: number = +segments[segments.length - 2]
        return { name, no }
      })

      await this.pokemonModel.insertMany(pokemonList);

      return { message: 'Seed completed', count: pokemonList.length };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

}
