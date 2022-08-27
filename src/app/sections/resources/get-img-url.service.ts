import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageGettingService {
  static GetImgUrl(name:string):string {
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
      //Not prime companions
      if (['Dethcube', 'Wyrm'].find(x => x == res[0])) return 'DEPet' + res[0]
      if (['Taxon', 'Carrier'].find(x => x == res[0])) return 'Pet' + res[0]
      if (res[0] == 'Diriga') return 'ArcDrone'
      if (res[0] == 'Helios') return 'PetCorpusMelee'
      if (res[0] == 'Nautilus') return 'EmpyreanSentinel'
      if (name == 'Frostleaf') return 'WildGingerB'
      if (name == 'Endo') return 'EndoIconRenderLarge'
      if (name == 'Pigment') return 'PigmentPickup2'
      if (name == 'Synthula') return 'Eventium'
      if (name == 'Mandachord') return 'Mandochord'
      if (name == 'Boot') return 'GrineerBoot'
      return name
    }
    // Checks for prime/notPrime items
    if (name.startsWith('Ghoulsaw')) {
      if (res[1] == 'Blade') return 'Blade'
      if (res[1] == 'Chassis') return 'Stock'
      if (nameLen == 2) return 'Handle'
    }
    //Neuro+cerebrum return
    if (this.IsInList(res[nameLen-1], ['Neuroptics', 'Cerebrum'])) return add + 'Helmet'
    if (name.endsWith('Systems')) {
      if (this.IsInList(res[0], ['Atmo', 'Gyromag', 'Repeller'])) return res[0] + '_' + 'Systems'
      return add + 'Systems'
    }
    if (this.IsInList(res[nameLen-1], ['Chassis', 'Carapace'])) return add + 'Chassis'
    //Archwing components 
    if (this.IsInList(res[nameLen-1], ['Harness', 'Systems', 'Wings'])) return 'GenericArchwing' + res[nameLen-1]
    // Excalibur swords
    if (name.startsWith('Exalted')) {
      if (res[1] == 'Umbra') return 'ExaltedUmbraBlade'
      if (res[1] == 'Prime') return 'ExaltedPrimeBlade'
      return 'ExaltedBladeWeapon'
    }
    //Get NecromechWeaponsParts Has Barrel, Receiver, Stock
    if (name.startsWith('DamagedNecramechWeapon')) return name
    //Get Standart gun parts Image
    if (this.IsInList(res[nameLen-1], ['Barrel', 'Receiver', 'Stock'])) {
      if (add != '') return 'GenericGunPrime'+res[nameLen-1]
      return res[nameLen-1]
    }
    if (name.endsWith('Link')) {
      if (add != '') return 'GenericComponentPrimePlug'
      return 'Link'
    }
    if (res[nameLen-1].startsWith('Blade') || name.endsWith('Head')) {
      if (add != '') return 'GenericWeaponPrimeBlade'
      return 'Blade'
    }
    if (name.endsWith('Handle')) {
      if (add != '') return 'GenericWeaponPrimeHilt'
      return 'Handle'
    }
    if (name.startsWith('FuraxWraith') && name.endsWith('Gauntlet')) return 'Blade'
    if (name.endsWith('Gauntlet')) {
      if (add != '') return 'GenericWeaponPrimeHilt'
      return 'Handle' 
    }
    if (name == "Crewman'sBoot") return 'CrewmensBoot'
    if (name.endsWith('Boot')) {
      if (add != '') return 'GenericWeaponPrimeGuard'
      return 'Boot' 
    }
    // Specific for prime items
    if (add == 'Prime') {
      //Get Upper and Lower Limbs
      if (res[nameLen-1] == 'Limb') return 'GenericWeaponPrimeBlade'
      if (this.IsInList(res[nameLen-1], ['Grip', 'Pouch'])) return 'GenericComponentPrimeLatch'
      if (name.endsWith('String')) return 'GenericGunPrimeStock'
      if (name.endsWith('Stars')) return 'GenericWeaponPrimeBlade'
    }
    // Specific for common items
    if (add == '') {
      //Get Gun Chassis
      if (name.endsWith('GunChassis')) return 'Stock'
      // Mecha
      if (this.IsInList(res[1], ['Moa', 'Hound'])) return res[0]
      // Kubrow
      if (res[1] == 'Kubrow') {
        if (res[0] == 'Chesa') return 'KubrowBreedChesa'
        return res[0] + 'KubrowCodex'
      }
      // Helmint
      if (res[1] == 'Charger') return 'HelminthDefaultSkin'
      // Kavat
      if (res[1] == 'Kavat') {
        if (res[0] == 'Adarza') return 'MirrorKavat'
        if (res[0] == 'Smeeta') return 'CheshireKavat'
        return name
      }
      // Components
      if (name.startsWith('Fish')) return 'Icon' + name
      if (this.IsInList(res[0], ['Echowinder', 'Synathid', 'Tromyzon', 'Scrubber', 'Longwinder', 'Brickie', 'Recaster', 'Mirewinder', 'Eye-eye', 'Charamote', 'Kriller', 'Sapcaddy'])) {
        if (nameLen == 2) return res[1]
        if (nameLen == 3) return res[1] + res[2]
      } 
      if (name.endsWith('bond')) return res[0]+'DebtBond64'
      if (this.IsInList(res[0],['Detonite', 'Mutagen']) && this.IsInList(res[1],['Injector', 'Mass'])) return res[0]+'_'+res[1]
      if (name.startsWith('Condroc')) return 'IconCondrocWing'
      if (name.startsWith('Kuaka')) return 'ForestRodentSpine'
      if (this.IsInList('Eidolon', [res[0], res[1]])) {
        if (nameLen == 2) return 'SentientShardCommon'
        if (res[0] == 'Radiant') return name
        return 'Sentient' + res[2] + res[0]
      }
      // Eidolons cores
      if (res.find(x=> x=='Sentient')) return 'QuillsUncommonPickup'
      // ---------------
      if (name.startsWith('DarkSplit')) return 'DarkSplitSwordDualSwords'
      if (name.startsWith('Ocular')) return 'OcularStem-Root'
      if (name.startsWith('Hemocyte')) return 'LephantisShard'
      if (name.startsWith('Orokin') && name.endsWith('Matrix')) return res[1] + res[2]
      if (name.startsWith('Diluted')) return 'Diluted_thermia'
      if (name.startsWith('Regal')) return 'PrimeToken'
      if (res[1] == 'Umbra') return 'ExcaliburUmbraFull'
      if (name.endsWith('VenomSac')) return 'KhutKhutVenomSac'
      if (name.endsWith('Aspect')) {
        if (res[1] == 'Day') return 'AnimusAspect'
        return 'AnimaAspect'
      }
      // Low Priority
      if (name.endsWith('Star')) {
        if (res[1] == 'Amber') return 'OroFusexOrnamentB'
        return 'OroFusexOrnamentA'
      }
      if (name == 'KavatGeneticCode') return 'KavatGeneStrain'
      if (name == 'NitainExtract') return 'DENitainExtract'
      if (name == 'OrokinCipher') return 'OrokinReceptor'
      if (name == 'VoidTraces') return 'Void_Traces'
      if (name == 'PherliacPods') return 'BallSpawnerInfestedBait'
      if (this.IsInList(res[nameLen-1],['Palpators', 'Tubercles'])) return 'Juggernaut' + res[nameLen-1]
      if (this.IsInList(res[nameLen-2],['Chitinous', 'Bile'])) return 'Juggernaut' + res[nameLen-2] + res[nameLen-1]
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
      if (name.startsWith('Corpus')) return 'CorpusSuper' + res[nameLen-1]
      if (name.startsWith('Antiserum')) return 'Actuator'
      if (this.IsInList(res[0], ['Judgement', 'Chroma', 'Scorched'])) return name +'64'
      if (name.startsWith('Ticor')) return 'Ticor_Plate'
      if (this.IsInList(res[nameLen-1],['Coordinate', 'Archive', 'Fragment'])) return 'NavCoordinateNew'
      if (name.endsWith('Corruptor')) return 'Warframe_' + res[0] + '_Corruptor'
      if (name.endsWith('Alu')) return 'CryptographicALU'
    }
    if (name.endsWith('Disc')) {
      if (add != '') return 'GenericWeaponPrimeBlade' 
      return 'Link'
    }
    if (name.startsWith('Artemis')) return name + 'Weapon'
    // Fluctus Limbs
    if (name.endsWith('Limbs')) return 'Stock'
    if (name.startsWith('Valkyr') && name.endsWith('Talons')) return 'ValkyrTalons'
        return name
  }
  // Check if some string in list
  private static IsInList(item:string, list:Array<string>):boolean {
    return list.find(x => x == item) != undefined
  }
}
