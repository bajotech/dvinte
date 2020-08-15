import Character from '../models/Character'
import Portrait from '../models/Portrait'
import Divinity from '../models/Divinity'
import Alignment from '../models/Alignment'
import Race from '../models/Race'
import Attribute from '../models/Attribute'
import AttributeTemp from '../models/AttributeTemp'
import User from '../models/User'
import BaseAttack from '../models/BaseAttack'
import BaseResist from '../models/BaseResist'
import CharacterClass from '../models/CharacterClass'

import getSize from '../../util/getSize'
import getGender from '../../util/getGender'
import getModifier from '../../util/getModifier'

class CharacterController {
  async index(req, res) {
    const list = await Character.findAll({
      where: {
        is_ativo: true,
      },
      attributes: ['id', 'name', 'gender', 'health', 'exp', 'skin', 'level'],
      include: [
        {
          model: Portrait,
          as: 'portrait',
          attributes: ['id', 'path', 'url'],
        },
        {
          model: Divinity,
          as: 'divinity',
          attributes: ['name'],
        },
        {
          model: Alignment,
          as: 'alignment',
          attributes: ['name'],
        },
        {
          model: Race,
          as: 'race',
          attributes: ['name'],
        },
        {
          model: User,
          as: 'user',
          attributes: ['name'],
        },
        {
          model: Attribute,
          as: 'attribute',
        },
      ],
      order: [['name', 'ASC']],
    })

    const chars = list.map(c => ({
      id: c.id,
      name: c.name,
      health: c.health,
      exp: c.exp,
      skin: c.skin,
      level: c.level,
      portrait: (c.portrait && c.portrait.url) || '',
      alignment: (c.alignment && c.alignment.name) || '',
      race: (c.race && c.race.name) || '',
      user: (c.user && c.user.name) || '',
    }))

    return res.json(chars)
  }

  async show(req, res) {
    const char = await Character.findByPk(req.params.id, {
      include: [
        {
          model: Portrait,
          as: 'portrait',
          attributes: ['id', 'path', 'url'],
        },
        {
          model: Divinity,
          as: 'divinity',
          attributes: ['name'],
        },
        {
          model: Alignment,
          as: 'alignment',
          attributes: ['name'],
        },
        {
          model: Race,
          as: 'race',
          attributes: ['name'],
        },
        {
          model: Attribute,
          as: 'attribute',
        },
        {
          model: AttributeTemp,
          as: 'attribute_temp',
        },
        {
          model: User,
          as: 'user',
          attributes: ['name'],
        },
        {
          association: 'classes',
          attributes: ['name', 'attack', 'fortitude', 'reflex', 'will'],
          through: { attributes: ['level'] },
        },
        {
          association: 'armors',
          attributes: [
            'id',
            'name',
            'type',
            'bonus',
            'dexterity',
            'penalty',
            'magic',
            'displacement_s',
            'displacement_m',
            'weight',
            'price',
            'book',
            'version',
          ],
          through: { attributes: ['defense', 'description'] },
        },
        {
          association: 'weapons',
          attributes: [
            'id',
            'name',
            'dice_s',
            'dice_m',
            'multiplier_s',
            'multiplier_m',
            'critical',
            'crit_from',
            'range',
            'type',
            'material',
            'weight',
            'str_bonus',
            'price',
            'book',
            'version',
          ],
          through: {
            attributes: [
              'hit',
              'damage',
              'element',
              'crit_mod',
              'crit_from_mod',
              'dex_damage',
              'description',
            ],
          },
        },
        {
          association: 'equipments',
          attributes: [
            'id',
            'name',
            'str_temp',
            'dex_temp',
            'con_temp',
            'int_temp',
            'wis_temp',
            'cha_temp',
            'weight',
            'price',
            'book',
            'version',
          ],
          through: {
            attributes: ['description'],
          },
        },
      ],
    })

    const levels = char?.classes?.map(l => l.CharacterClass.level)

    const baseAtack = await BaseAttack.findAll({
      where: { level: levels },
      raw: true,
      attributes: ['level', 'low', 'medium', 'high'],
    })

    const baseResist = await BaseResist.findAll({
      where: { level: levels },
      raw: true,
      attributes: ['level', 'low', 'high'],
    })

    const charData = {
      Cod: char?.id,
      Name: char?.name.toUpperCase() || '',
      User: char?.user?.name.toUpperCase() || '',
      Level: char?.level || 0,
      Race: char?.race?.name.toUpperCase() || '',
      Health: char?.health || 0,
      HealthNow: char?.health_now || 0,
      Age: char?.age || 0,
      Gender: getGender(char?.gender || 0),
      Size: getSize(char?.size || 0),

      Height: char?.height || '',
      Weight: char?.weight || '',
      Eye: char?.eye.toUpperCase() || '',
      Hair: char?.hair.toUpperCase() || '',
      Skin: char?.skin.toUpperCase() || '',

      Exp: char?.exp || 0,
      Alig: char?.alignment?.name.toUpperCase() || '',
      Divin: char?.divinity?.name.toUpperCase() || '',

      Str: char?.attribute?.strength || 0,
      Dex: char?.attribute?.dexterity || 0,
      Con: char?.attribute?.contitution || 0,
      Int: char?.attribute?.inteligence || 0,
      Wis: char?.attribute?.wisdom || 0,
      Cha: char?.attribute?.charisma || 0,

      StrMod: getModifier(char?.attribute?.strength) || 0,
      DexMod: getModifier(char?.attribute?.dexterity) || 0,
      ConMod: getModifier(char?.attribute?.contitution) || 0,
      IntMod: getModifier(char?.attribute?.inteligence) || 0,
      WisMod: getModifier(char?.attribute?.wisdom) || 0,
      ChaMod: getModifier(char?.attribute?.charisma) || 0,

      StrTemp: char?.attribute_temp?.strength || 0,
      DexTemp: char?.attribute_temp?.dexterity || 0,
      ConTemp: char?.attribute_temp?.contitution || 0,
      IntTemp: char?.attribute_temp?.inteligence || 0,
      WisTemp: char?.attribute_temp?.wisdom || 0,
      ChaTemp: char?.attribute_temp?.charisma || 0,

      StrModTemp: getModifier(char?.attribute_temp?.strength) || 0,
      DexModTemp: getModifier(char?.attribute_temp?.dexterity) || 0,
      ConModTemp: getModifier(char?.attribute_temp?.contitution) || 0,
      IntModTemp: getModifier(char?.attribute_temp?.inteligence) || 0,
      WisModTemp: getModifier(char?.attribute_temp?.wisdom) || 0,
      ChaModTemp: getModifier(char?.attribute_temp?.charisma) || 0,

      Portrait: char?.portrait?.url || '',

      BaseAttack: char?.classes?.reduce((total, c) => {
        const base = baseAtack.find(a => a.level === c.CharacterClass.level)
        return total + ((base && base[c.attack]) || 0)
      }, 0),

      Fortitude: char?.classes?.reduce((total, c) => {
        const base = baseResist.find(a => a.level === c.CharacterClass.level)
        return total + ((base && base[c.fortitude]) || 0)
      }, 0),

      Reflex: char?.classes?.reduce((total, c) => {
        const base = baseResist.find(a => a.level === c.CharacterClass.level)
        return total + ((base && base[c.reflex]) || 0)
      }, 0),

      Will: char?.classes?.reduce((total, c) => {
        const base = baseResist.find(a => a.level === c.CharacterClass.level)
        return total + ((base && base[c.will]) || 0)
      }, 0),

      Classes:
        char?.classes?.map(c => ({
          name: c.name.toUpperCase() || '',
          attack: c.attack || '',
          fortitude: c.fortitude,
          reflex: c.reflex,
          will: c.will,
          level: c.CharacterClass?.level || 0,
        })) || [],

      Armor:
        char?.armors?.map(c => ({
          id: c.id || 0,
          name: c.name.toUpperCase() || '',
          type: c.type || 0,
          bonus: c.bonus || 0,
          dexterity: c.dexterity || 0,
          penalty: c.penalty || 0,
          magic: c.magic || 0,
          displacement_s: c.displacement_s || 0,
          displacement_m: c.displacement_m || 0,
          weight: c.weight || 0,
          price: c.price || 0,
          book: c.book || '',
          version: c.version || '',
          defense: c.CharacterArmor?.defense || 0,
          description: c.CharacterArmor?.description || '',
        })) || [],

      Weapon:
        char?.weapons?.map(c => ({
          id: c.id || 0,
          name: c.name.toUpperCase() || '',
          dice_s: c.dice_s || 0,
          dice_m: c.dice_m || 0,
          multiplier_s: c.multiplier_s || 0,
          multiplier_m: c.multiplier_m || 0,
          critical: c.critical || 0,
          crit_from: c.crit_from || 0,
          range: c.range || 0,
          type: c.type || '',
          weight: c.weight || 0,
          material: c.material || '',
          str_bonus: c.str_bonus || 0,
          price: c.price || 0,
          book: c.book || '',
          version: c.version || '',
          hit: c.CharacterWeapon?.hit || 0,
          damage: c.CharacterWeapon?.damage || 0,
          element: c.CharacterWeapon?.element || 0,
          crit_mod: c.CharacterWeapon?.crit_mod || 0,
          crit_from_mod: c.CharacterWeapon?.crit_from_mod || 0,
          dex_damage: c.CharacterWeapon?.dex_damage || false,
          description: c.CharacterWeapon?.description || '',
        })) || [],

      Equipment:
        char?.equipments?.map(c => ({
          id: c.id || 0,
          name: c.name.toUpperCase() || '',
          str_temp: c.str_temp || 0,
          dex_temp: c.dex_temp || 0,
          con_temp: c.con_temp || 0,
          int_temp: c.int_temp || 0,
          wis_temp: c.wis_temp || 0,
          cha_temp: c.cha_temp || 0,
          weight: c.weight || 0,
          price: c.price || 0,
          book: c.book || '',
          version: c.version || '',
          description: c.CharacterEquipment?.description || '',
        })) || [],
    }
    return res.json(charData)
  }

  async store(req, res) {
    const data = req.body

    function getExp(lv) {
      let exp = 0

      switch (lv) {
        case 1:
          exp = 0
          break
        case 2:
          exp = 1000
          break
        case 3:
          exp = 3000
          break
        case 4:
          exp = 6000
          break
        case 5:
          exp = 10000
          break
        case 6:
          exp = 15000
          break
        case 7:
          exp = 21000
          break
        case 8:
          exp = 28000
          break
        case 9:
          exp = 36000
          break
        case 10:
          exp = 45000
          break
        case 11:
          exp = 55000
          break
        case 12:
          exp = 66000
          break
        case 13:
          exp = 78000
          break
        case 14:
          exp = 91000
          break
        case 15:
          exp = 105000
          break
        case 16:
          exp = 120000
          break
        case 17:
          exp = 136000
          break
        case 18:
          exp = 153000
          break
        case 19:
          exp = 171000
          break
        case 20:
          exp = 190000
          break
        default:
      }

      return exp
    }

    const charData = {
      name: data.name,
      age: data.age,
      gender: data.gender,
      skin: data.skin,
      eye: data.eye,
      hair: data.hair,
      height: data.height,
      weight: data.weight,
      level: data.level,
      health: data.health,
      health_now: data.health_now,
      exp: getExp(data.level),
      size: data.size,
      user_id: data.user_id,
      portrait_id: data.portrait_id,
      alignment_id: data.alignment_id,
      race_id: data.race_id,
      divinity_id: data.divinity_id,
      is_ativo: data.is_ativo,
    }

    const person = await Character.create(charData)

    const attrData = {
      character_id: person.id,
      strength: req.body.attributes.str,
      dexterity: req.body.attributes.dex,
      contitution: req.body.attributes.con,
      inteligence: req.body.attributes.int,
      wisdom: req.body.attributes.wis,
      charisma: req.body.attributes.cha,
    }

    const classData = req.body.classe.map(item => ({
      ...item,
      character_id: person.id,
    }))

    await Attribute.create(attrData)

    await CharacterClass.bulkCreate(classData)
    return res.json(person)
  }
}

export default new CharacterController()
