import { Resource } from "../../items.service";

// Class of planets
export class Planet {
  id:string
  name:string
  img:string
  resources:Resource[]
  constructor(id:string, name:string, img:string, resources:Resource[]) {
    this.id = id;
    this.name = name;
    this.img = img;
    this.resources = resources;
  }
}