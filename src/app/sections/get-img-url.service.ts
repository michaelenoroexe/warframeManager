import { Injectable } from '@angular/core';
import { Md5 } from 'ts-md5';

@Injectable({
  providedIn: 'root'
})
export class ImageGettingService {
  static GetItemImgUrl(name:string):string {
    let res = ImageGettingService.GetItemImg(name);
    let hash = Md5.hashStr(res+'.png');
    return `https://static.wikia.nocookie.net/warframe/images/${hash[0]}/${hash[0]+hash[1]}/${res}.png`
  }
  static GetItemImg(name:string):string {
    let iGs = ImageGettingService
    var res = name.split(/(?=[A-Z])/)
    var add = res.find(x => x == 'Prime')? 'Prime' : ''
    const nameLen = res.length
    // Single word names
    if (nameLen == 1) {
      if (res[0] == 'Tellurium') return 'TelluriumMarket'
      if (name.startsWith('Mk1')) {
        let re = name.split('-')[1]
        return re.charAt(0).toUpperCase() + re.substring(1)
      }
      if (res[0]=='Forma') return 'Forma2'
      
      if (name == 'Synthula') return 'Eventium'
      if (name == 'Mandachord') return 'Mandochord'
      if (name == 'Boot') return 'GrineerBoot'
      return name
    }
    // Checks for prime/notPrime items
    //Neuro+cerebrum return
    if (res[nameLen-1] == 'Neuroptics') return add + 'Helmet'
    if (name.endsWith('Systems')) {
      if (iGs.IsInList(res[0], ['Amesha', 'Elytron', 'Itzal', 'Odonata'])) return 'GenericArchwing' + res[nameLen-1]
      return add + 'Systems'
    }
    //Get Gun Chassis
    if (res[nameLen-1] == 'Chassis') return add + 'Chassis'
    //Archwing components 
    if (iGs.IsInList(res[nameLen-1], ['Harness', 'Wings'])) return 'GenericArchwing' + res[nameLen-1]
    // Excalibur swords
    if (name.startsWith('Exalted')) {
      if (res[1] == 'Umbra') return 'ExaltedUmbraBlade'
      if (res[1] == 'Prime') return 'ExaltedPrimeBlade'
      return 'ExaltedBladeWeapon'
    }
    if (name == "Crewman'sBoot") return 'CrewmensBoot'
    if (name.endsWith('Boot')) {
      if (add != '') return 'GenericWeaponPrimeGuard'
      return 'Boot' 
    }
    //Weapon parts
    if (name.startsWith('Ghoulsaw')) {
      if (res[1] == 'Blade') return 'Blade'
      if (res[1] == 'Chassis') return 'Stock'
      if (nameLen == 2) return 'Handle'
    }
    //Get Standart gun parts Image
    if (iGs.IsInList(res[nameLen-1], ['Barrel', 'Receiver', 'Stock'])) return res[nameLen-1]
    // Specific for common items
    if (add == '') {
      // Mecha
      if (iGs.IsInList(res[1], ['Moa', 'Hound'])) return res[0]
      
      // Components
      if (iGs.IsInList(res[0],['Detonite', 'Mutagen'])) return res[0]+'_'+res[1]
      // ---------------
      if (name.startsWith('DarkSplit')) return 'DarkSplitSwordDualSwords'
      
      if (res[nameLen-1] =='Fragment') return 'NavCoordinateNew'
      
      if (iGs.IsInList(res[0], ['Chroma', 'Scorched'])) return name +'64'
      
      if (res[1] == 'Umbra') return 'ExcaliburUmbraFull'
      if (name.endsWith('Aspect')) {
        if (res[1] == 'Day') return 'AnimusAspect'
        return 'AnimaAspect'
      }
      // Low Priority
      if (name == 'AyatanAmberStar') return 'OroFusexOrnamentB';
      
      if (name == 'PherliacPods') return 'BallSpawnerInfestedBait'
    }
    
    if (name.startsWith('Artemis')) return name + 'Weapon'
    if (name.startsWith('Valkyr') && name.endsWith('Talons')) return 'ValkyrTalons'
        return name
  }
  //Get urls for resources
  static GetResImgUrl(name:string):string {
    let res = ImageGettingService.GetResImg(name);
    let hash = Md5.hashStr(res+'.png');
    return `https://static.wikia.nocookie.net/warframe/images/${hash[0]}/${hash[0]+hash[1]}/${res}.png`
  }
  static GetResImg(name:string):string {
    let iGs = ImageGettingService
    var res = name.split(/(?=[A-Z])/)
    var add = res.find(x => x == 'Prime')? 'Prime' : ''
    const nameLen = res.length
    // Single word names
    if (nameLen == 1) {
      if (res[0] == 'Tellurium') return 'TelluriumMarket'
      if (name == 'Frostleaf') return 'WildGingerB'
      if (name == 'Endo') return 'EndoIconRenderLarge'
      if (name == 'Pigment') return 'PigmentPickup2'
      return name
    }
    if (name.endsWith('Systems')) {
      if (iGs.IsInList(res[0], ['Atmo', 'Gyromag', 'Repeller'])) return res[0] + '_' + 'Systems'
      return add + 'Systems'
    }
    if (res[nameLen-1] == 'Cerebrum') return add + 'Helmet'
    //Get Gun Chassis
    if (name.endsWith('GunChassis')) return 'Stock'
    if (res[nameLen-1] == 'Carapace') return add + 'Chassis'
    //Weapon part
    //Get Standart gun parts Image
    if (iGs.IsInList(res[nameLen-1], ['Barrel', 'Receiver', 'Stock'])) {
      if (add != '') return 'GenericGunPrime'+res[nameLen-1]
      return res[nameLen-1]
    }
    // Eidolons cores
    if (res.find(x=> x=='Sentient')) return 'QuillsUncommonPickup'

    if (iGs.IsInList(res[nameLen-1], ['Link', 'Heatsink', 'Ornament', 'Core', 'Subcortex', 'Rivet'])) {
      if (add != '') return 'GenericComponentPrimePlug'
      return 'Link'
    }
    if (res[nameLen-1].startsWith('Blade') || name.endsWith('Head')) {
      if (add != '') return 'GenericWeaponPrimeBlade'
      return 'Blade'
    }
    if (iGs.IsInList(res[nameLen-1], ['Handle', 'Hilt'])) {
      if (add != '') return 'GenericWeaponPrimeHilt'
      return 'Handle'
    }
    if (name.startsWith('FuraxWraith') && name.endsWith('Gauntlet')) return 'Blade'
    if (name.endsWith('Gauntlet')) {
      if (add != '') return 'GenericWeaponPrimeHilt'
      return 'Handle' 
    }
    if (name.endsWith('Disc')) {
      if (add != '') return 'GenericWeaponPrimeBlade' 
      return 'Link'
    }
    if (name == 'AyatanCyanStar') return 'OroFusexOrnamentA'
    // Specific for prime items
    if (add == 'Prime') {
      //Get Upper and Lower Limbs
      if (res[nameLen-1] == 'Limb') return 'GenericWeaponPrimeBlade'
      if (iGs.IsInList(res[nameLen-1], ['Grip', 'Pouch'])) return 'GenericComponentPrimeLatch'
      if (name.endsWith('String')) return 'GenericGunPrimeStock'
      if (name.endsWith('Stars')) return 'GenericWeaponPrimeBlade'
    }
    // Fluctus Limbs
    if (name.endsWith('Limbs')) return 'Stock'
    if (name.endsWith('Boot')) return 'GenericWeaponPrimeGuard'
    if (iGs.IsInList(res[nameLen-1],['Guard','Aegis'])) return 'Pouch'
    if (name.endsWith('Chain')) return 'GenericGunPrimeStock'
    if (name.endsWith('Motor')) return 'GenericGunStock'
    if (name.endsWith('Ducats')) return 'PrimeBucks'
    // Components
    if (name.startsWith('Fish')) return 'Icon' + name
    if (iGs.IsInList(res[0], ['Echowinder', 'Synathid', 'Tromyzon', 'Scrubber', 'Longwinder', 'Brickie', 'Recaster', 'Mirewinder', 'Eye-eye', 'Charamote', 'Kriller', 'Sapcaddy'])) {
      if (nameLen == 2) return res[1]
      if (nameLen == 3) return res[1] + res[2]
    } 
    if (name.endsWith('bond')) return res[0]+'DebtBond64'
    if (name.startsWith('Condroc')) return 'IconCondrocWing'
    if (name.startsWith('Kuaka')) return 'ForestRodentSpine'
    if (iGs.IsInList('Eidolon', [res[0], res[1]])) {
      if (nameLen == 2) return 'SentientShardCommon'
      if (res[0] == 'Radiant') return name
      return 'Sentient' + res[2] + res[0]
    }
    
    if (name.startsWith('Ocular')) return 'OcularStem-Root'
    if (name.startsWith('Hemocyte')) return 'LephantisShard'
    if (name.startsWith('Orokin') && name.endsWith('Matrix')) return res[1] + res[2]
    if (name.startsWith('Diluted')) return 'Diluted_thermia'
    if (name.startsWith('Regal')) return 'PrimeToken'
    if (name.endsWith('VenomSac')) return 'KhutKhutVenomSac'
    if (name == 'KavatGeneticCode') return 'KavatGeneStrain'
    if (name == 'NitainExtract') return 'DENitainExtract'
    if (name == 'OrokinCipher') return 'OrokinReceptor'
    if (name == 'VoidTraces') return 'Void_Traces'
    if (iGs.IsInList(res[nameLen-1],['Palpators', 'Tubercles'])) return 'Juggernaut' + res[nameLen-1]
    if (iGs.IsInList(res[nameLen-2],['Chitinous', 'Bile'])) return 'Juggernaut' + res[nameLen-2] + res[nameLen-1]
    // Plants
    if (name == 'VestanMoss') return 'MossGroundCoverA'
    if (name.startsWith('Sunlight')) {
      if (name.endsWith('Dragonlily')) return 'ForestDayUncommon'
      if (name.endsWith('Jadeleaf')) return 'ForestDayRare'
      if (name.endsWith('Threshcone')) return 'ForestDayCommon'
    }
    if (name.startsWith('Moonlight')) {
      if (name.endsWith('Dragonlily')) return 'ForestNightUncommon'
      if (name.endsWith('Jadeleaf')) return 'ForestNightRare'
      if (name.endsWith('Threshcone')) return 'ForestNightCommon'
    }
    if (name == "Ruk'sClaw") return 'GftPlantRuksClawMature'
    if (name == 'DusklightSarracenia') return 'CobraLotus'
    if (name == 'LunarPitcher') return 'ZenPitcher'
    // ------------
    if (name.startsWith('Mandachord')) {
      if (name.endsWith('Body')) return 'MandochordBridge'
      if (name.endsWith('Bridge')) return 'MandochordStrum'
      if (name.endsWith('Fret')) return 'MandochordResonator'
    }
    if (name.startsWith('Corpus')) return 'CorpusSuper' + res[nameLen-1]
    if (name.startsWith('Antiserum')) return 'Actuator'
    if (name.startsWith('Ticor')) return 'Ticor_Plate'
    if (res[0] == 'Judgement') return name +'64'
    if (iGs.IsInList(res[nameLen-1],['Coordinate', 'Archive'])) return 'NavCoordinateNew'
    if (name.endsWith('Corruptor')) return 'Warframe_' + res[0] + '_Corruptor'
    if (name.endsWith('Alu')) return 'CryptographicALU'
    return name
  }
  // Get Planet img url
  public static GetPlanetImgUrl(pl:string) {
    if (pl == 'Zariman') return 'New_Zariman'
    return pl
  }
  // Check if some string in list
  private static IsInList(item:string, list:Array<string>):boolean {
    return list.find(x => x == item) != undefined
  }
  // Ger rank img
  static GetRankImgUrl(name:string):string {
    if (name == 'Unranked') return ""
    let res = ImageGettingService.GetRankImg(name);
    let hash = Md5.hashStr(res+'.png');
    return `https://static.wikia.nocookie.net/warframe/images/${hash[0]}/${hash[0]+hash[1]}/${res}.png`
  }
  static GetRankImg(name:string):string {
    let re = name.split(' ');
    if (re[0] == 'Legendary') return `Rank${30+Number(re[1])}`;
    let res = re.join('');
    if (res.startsWith('Disciple')) return 'MRDisciple';
    if (res.startsWith('Dragon')) return 'MRDragon';
    if (res.startsWith('Middle')) return 'SilverMaster';
    if (res.startsWith('True')) return 'GoldMaster';
    return res;
  }
}
