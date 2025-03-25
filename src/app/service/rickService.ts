import { inject, Inject, Injectable } from "@angular/core";
import { RequestService } from "./RequestService";
import { PersonagemModel } from "../models/apiModel";

@Injectable({ providedIn: 'root' })
export class RickService {
    private requestService = inject(RequestService)

    consultar_por_id = async (pId: number): Promise<PersonagemModel> => await this.requestService.get<PersonagemModel>(`/character/${pId}`)

}