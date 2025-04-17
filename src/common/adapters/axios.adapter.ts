import axios, { AxiosStatic } from "axios";
import { HttpAdapter } from "../interfaces/http-adapter.interface";
import { PokeResponse } from "src/seed/interfaces/poke-response.interface";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AxiosAdapter implements HttpAdapter {

	private axios: AxiosStatic = axios;
	async get<T>(url: string): Promise<T> {

		try {
			const { data } = await this.axios.get<T>(url);
			return data;
		} catch (error) {
			throw new Error('Error on axios request - check logs')
		}
	}

}
