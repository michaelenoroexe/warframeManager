import { FullResPlusNum } from "./arsenal/crafting-table/craft-item/craft-Item-classes";

export class Resource {
  public id:string = "";
  public name:string = "";
  public location:string[] | undefined;
  public type:string[] =[];
  public masterable:boolean = false;
  public owned:number = 0;
  public img:string = "src/assets/resources/95x95.png";

  constructor(id:string = "", name:string = "", type:string[] = []) {
    this.id = id;
    this.name = name;
    this.type = type;
  }
  static cast(res:any) {
    let re = new Resource();
    re.id = res.strId;
    re.name = res.name;
    re.type = res.type;
    if (res.location != null) re.location = res.location;
    re.masterable = res.mastery;
    if (res.owned != 0)
      re.owned = res.owned;
    return re;
  }
}

export class Component extends Resource {
  public creationTime:number = 0;
  public credits:number = 0;
  public neededResources:{ [id: string]: string; } = {} ;
  FullRes:FullResPlusNum[] | undefined;
  constructor(id:string = "", name:string = "", type:string[] = [], credits = 0) {
    super(id, name, type);
    this.credits = credits;
  }
  static override cast(res:{strId:string, name:string, type:string[], mastery:boolean, credits:number,
                    creationTime:number, neededResources:{ [id: string]: string; }, owned:number}) {
    let re = new Component();
    re.id = res.strId;
    re.name = res.name;
    re.type = res.type;
    re.masterable = res.mastery;
    re.credits = res.credits;
    re.creationTime = res.creationTime;
    re.neededResources = res.neededResources;
    if (res.owned != 0)
    re.owned = res.owned;
    return re;
  }

  static castArray(res:Array<any>) {
    let re: Resource[] = [];
    res.forEach(x => {
      if (x.credits > 0)
      re.push(Component.cast(x));
      else
      re.push(Resource.cast(x));
    })
    return re
  }
}
